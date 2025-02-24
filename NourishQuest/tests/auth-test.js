/**
 * Auth Routes Test Suite
 * 
 * This test suite covers authentication endpoints including:
 * - Registration
 * - Login
 * - Logout
 * - Profile data retrieval
 * - Error cases and edge conditions
 */

const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { app, server, dbConnection } = require('../server');
const User = require('../models/User');

// Mock session middleware for testing
jest.mock('express-session', () => {
  const session = {};
  return () => (req, res, next) => {
    req.session = session;
    req.session.destroy = callback => {
      Object.keys(session).forEach(key => delete session[key]);
      callback && callback();
    };
    next();
  };
});

describe('Authentication Endpoints', () => {
  // Test user data
  const testUser = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123',
    age: 25,
    height: 170,
    weight: 70,
    gender: 'male'
  };

  // Before all tests, clean up existing test user
  beforeAll(async () => {
    await User.deleteOne({ email: testUser.email });
  });

  // After all tests, close database connection
  afterAll(async () => {
    await User.deleteOne({ email: testUser.email });
    
    if (dbConnection) {
      await dbConnection.close();
    }

    if (server) {
      server.close();
    }
  });

  // User Registration Tests
  describe('POST /register', () => {
    it('should render registration page', async () => {
      const response = await request(app).get('/register');
      expect(response.status).toBe(200);
      expect(response.text).toContain('Registration page.');
    });

    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/register')
        .send(testUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('msg', 'User registered successfully.');

      // Verify user was created in database
      const user = await User.findOne({ email: testUser.email });
      expect(user).not.toBeNull();
      expect(user.username).toBe(testUser.username);
      
      // Password should be hashed
      expect(user.password).not.toBe(testUser.password);
      const passwordMatch = await bcrypt.compare(testUser.password, user.password);
      expect(passwordMatch).toBe(true);
    });

    it('should reject registration with missing fields', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          username: 'incomplete',
          email: 'incomplete@example.com'
          // Missing password
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('msg', 'Please fill out all fields.');
    });

    it('should reject registration with existing username', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          username: testUser.username, // Same username
          email: 'different@example.com',
          password: 'differentpass123'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('msg', 'Username or Email already in use.');
    });

    it('should reject registration with existing email', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          username: 'differentuser',
          email: testUser.email, // Same email
          password: 'differentpass123'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('msg', 'Username or Email already in use.');
    });
  });

  // User Login Tests
  describe('POST /login', () => {
    it('should login successfully with correct credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('msg', 'Login successful.');
    });

    it('should reject login with incorrect password', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('msg', 'Invalid credentials.');
    });

    it('should reject login with non-existent email', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: 'nonexistent@example.com',
          password: testUser.password
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('msg', 'Invalid credentials.');
    });

    it('should reject login with missing fields', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          email: testUser.email
          // Missing password
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('msg', 'Please fill out all fields.');
    });
  });

  // Session and Profile Data Tests
  describe('GET /profile-data', () => {
    it('should reject profile data request without login', async () => {
      const response = await request(app).get('/profile-data');
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('msg', 'Unauthorized. Please log in.');
    });

    it('should return profile data for logged in user', async () => {
      // Create an authenticated session
      const agent = request.agent(app);
      
      // Login first
      await agent
        .post('/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });
      
      // Then request profile data
      const response = await agent.get('/profile-data');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('username', testUser.username);
      expect(response.body.user).toHaveProperty('email', testUser.email);
      expect(response.body.user).not.toHaveProperty('password'); // Password should not be returned
    });

    it('should handle non-existent user in session', async () => {
      // Mock a session with a non-existent user ID
      const nonExistentId = new mongoose.Types.ObjectId();
      
      // We'll use a custom function to set up the session manually
      const mockSession = (req, res, next) => {
        req.session = { userId: nonExistentId };
        next();
      };
      
      // Apply our custom middleware and then call the route
      const response = await request(app)
        .get('/profile-data')
        .use(mockSession);
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('msg', 'User not found.');
    });
  });

  // Logout Tests
  describe('POST /logout', () => {
    it('should successfully logout a user', async () => {
      // Create an authenticated session
      const agent = request.agent(app);
      
      // Login first
      await agent
        .post('/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });
      
      // Then logout
      const response = await agent.post('/logout');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('msg', 'Logout successful.');
      
      // Verify session was destroyed by trying to access profile data
      const profileResponse = await agent.get('/profile-data');
      expect(profileResponse.status).toBe(401);
    });

    it('should handle logout errors gracefully', async () => {
      // Create a mock to simulate an error during session destruction
      const agent = request.agent(app);
      
      // Mock session.destroy to force an error
      const mockSessionDestroy = (req, res, next) => {
        req.session = {};
        req.session.destroy = callback => {
          callback(new Error('Simulated session destruction error'));
        };
        next();
      };
      
      // Apply our error-causing middleware
      const response = await agent
        .post('/logout')
        .use(mockSessionDestroy);
      
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('msg', 'Could not log out, try again.');
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('should handle server errors during registration', async () => {
      // Mock User.findOne to throw an error
      const originalFindOne = User.findOne;
      User.findOne = jest.fn().mockImplementationOnce(() => {
        throw new Error('Database connection error');
      });
      
      const response = await request(app)
        .post('/register')
        .send({
          username: 'erroruser',
          email: 'error@example.com',
          password: 'errorpass123'
        });
      
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('msg', 'Server error.');
      
      // Restore original function
      User.findOne = originalFindOne;
    });
    
    it('should handle server errors during login', async () => {
      // Mock User.findOne to throw an error
      const originalFindOne = User.findOne;
      User.findOne = jest.fn().mockImplementationOnce(() => {
        throw new Error('Database connection error');
      });
      
      const response = await request(app)
        .post('/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });
      
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('msg', 'Server error.');
      
      // Restore original function
      User.findOne = originalFindOne;
    });
    
    it('should handle server errors during profile data retrieval', async () => {
      // Mock User.findById to throw an error
      const originalFindById = User.findById;
      User.findById = jest.fn().mockImplementationOnce(() => {
        throw new Error('Database connection error');
      });
      
      // Mock a session with a user ID
      const mockSession = (req, res, next) => {
        req.session = { userId: new mongoose.Types.ObjectId() };
        next();
      };
      
      const response = await request(app)
        .get('/profile-data')
        .use(mockSession);
      
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('msg', 'Server error.');
      
      // Restore original function
      User.findById = originalFindById;
    });
  });
});

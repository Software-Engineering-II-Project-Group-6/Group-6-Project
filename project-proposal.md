# Group 6 Project Proposal
## Team Members and Roles
**Yigit Onuk** (Back-End Development, Database Handler, Tester) 

**Liam McAfee** (Front-End Development, Tester) 

**Gracie Armour** (Back-End Development, Server Creation, Tester, GitHub Management) 

**Henry James** (Back-End Development, Tester, AI)

**Benjamin Junge** (Front-End Development, Tester)

**Alina Hyk** (undecided)

## Rules and Communication
1. **Respect:** Treat teammates courteously; value diverse perspectives and encourage open dialogue.
2. **Clear Communication and Consistent Involvement:** Please share your progress asynchronously on Discord, even if we’re not meeting on a given day. If you see a question and you know the answer, help your peers!
3. **Attend Meetings:** Please attend all scheduled meetings to stay informed. If you can’t make it, check the “Meeting History” in this document to catch up. Ideally, let your teammates know at least six hours before the meeting if you won’t be able to attend.
4. **Honor Deadlines, Ask for Help, and Ask Early:** We’re in this together as a team. Respect all deadlines, and if you believe you won’t meet one, let your teammates know at least 48 hours in advance so we can plan accordingly. If you get stuck, let your teammates know right away so they can help with your workload. 

## Project Artifacts
**Discord:** [https://discord.gg/7rysQCWG](https://discord.gg/7rysQCWG)

**GitHub:** [https://github.com/Software-Engineering-II-Project-Group-6/Group-6-Project](https://github.com/Software-Engineering-II-Project-Group-6/Group-6-Project)

## MyHealthyBody: A Nutrition Planner Website
### Abstract
Our website allows users to create a free, detailed nutrition plan, either manually or with the help of AI. Each product includes detailed descriptions along with its macro values. User profiles can be customized, and various achievements can be unlocked by staying committed to their planner which will make their diet more fun. 

### Goal
Dieting can be challenging, and it's not easy for most people to give up their favorite foods or sweets. With this app, we aim to make the process easier by offering fun achievements and a user-friendly interface. Additionally, we provide specialized nutrition plans with a variety of options. 

### Current Practice
There are similar websites available in today’s market, but most require a monthly or yearly subscription—such as the apps PlateJoy and Noom—and even those that don’t—such as MyPlate Calorie Counter or Yummly Recipes & Cooking Tools—still have in-app purchases. Very few have any sort of fun, reward-oriented features, and any that do typically do so with Noom's tone of “fitness” and sport-like determination, rather than gamified fun. 

### Novelty
Unlike our competitors, our service will be completely free. We also aim to make it more fun and engaging, like how Duolingo approaches language learning. The difference is that we focus on food and nutrition, and we do not have a bird threatening to take your family hostage if you miss a daily streak! 

### Effects
With this website, even if we manage to help just one person stay committed to their diet and achieve their goals, it will be a win for us. Making a difference in the world begins with small, simple steps. 

### Technical Approach
Our dynamic website will be developed using MongoDB, Node.js, and Mongoose. We also plan to utilize some free APIs available on GitHub for product information. 

### Risks
The riskiest part is depending on APIs for our products because depending on the APIs we choose; our product range can stay a bit limited. Although it won’t be a problem if we act early to find a solid API, it could be dangerous to wait until the last minute. We are going to mitigate this risk by acting and implementing this system earlier. 

## Implementations
### Major Features to Implement
1. Account creation with specialized goals
2. Product List and creating a personal nutrition list based on preferences
3. Filtering system based on allergies
4. Achievements 

### Stretch Goals
1. Nutrition themed games
2. Daily quests
3. AI Chatbot to help with dieting
4. Calorie/water tracker 

## Use Cases (Functional Requirements)
### Use Case 1 (by Yigit)
1. **Actors:** User who wants to see foods they aren’t allergic to, the web application that processes user inputs and provides the final nutrition plan
2. **Triggers**: The user logs in and clicks the “Create New Plan” button 
3. **Preconditions:** Allergen is included in our list of available allergens, the user already has a registered account and is logged in, the user profile contains necessary baseline data (e.g., age, weight, dietary preferences) 
4. **Postconditions:** The new customized nutrition plan is successfully created and saved to the user’s account and the user can view and track this plan moving forward.
5. **List of steps:**
- The user navigates to the “Nutrition Plans” section and selects “Create New Plan.” 
- The system prompts the user to input or confirm their dietary goals (weight loss, muscle gain, maintenance, etc.).
- The user selects dietary preferences (vegetarian, gluten-free, etc.) and sets any allergy restrictions.
- The system retrieves product information from the external nutrition API and filters them based on the user’s inputs.
- The user selects preferred products or requests an AI-generated (stretch goal) list of suggestions.
- The system calculates daily calorie/macro distribution and displays a proposed plan.
- The user confirms the plan (optionally modifies or swaps products).
- The system saves the new plan to the user’s account and displays a success message. 
6. **Extensions/Variations:**
- **Variation:** Upon creating a plan for the first time, the user unlocks a “Nutrition Novice” achievement.
7. **Exceptions:**
- **API Failure:** The external nutrition API is down or returns errors; the system notifies the user and offers limited product options or a retry.
- **Insufficient User Data:** If user profile data (e.g., weight, dietary preferences) is incomplete, the system prompts the user to fill in missing information before proceeding.
- **Server Error:** If the system is temporarily unavailable, the user receives an error message and can try again later.

### Use Case 2 (by Gracie)
1. **Actors:** User creates a new account on the platform
2. **Triggers:** User presses the “sign up” button and fills out the form
3. **Preconditions:** All required fields of the form are not empty, and each field contains valid input (text fields contain text of the required lengths, date fields contain valid dates not in the future, numeric fields contain numbers of the appropriate int vs float type, email field contains a valid email, etc.)
4. **Postconditions:** New entry added to User Accounts database table with all form field data in the appropriate fields and no database errors.
5. **List of steps:**  
- User clicks the Sign Up button, and is redirected to Sign Up form 
- User fills out Sign Up form, hits submit 
- Form input is validated client-side 
- If valid, form input is sent to server 
- Form input is validated and formatted server side 
- Form input is INSERTed into the database by the server 
- User is logged in to the newly created account
6. **Extensions/Variations:** 
- **Extension:** If account email already exists in database during server-side validation, data is not sent to the database and user is not logged in. Instead, user receives a popup notification stating that the email used is already bound to an account, with a link to send a password reset email 
7. **Exceptions:** 
- **Server Error:** If the system is temporarily unavailable, the user receives an error message and can try again later.
- **Database Error:** If the database connection is temporarily unavailable, the user receives an error message and can try again later.
- **Invalid User Input** (Client-Side): Form field with invalid input has a message appear beside it stating the reason the input is invalid.
- **Invalid User Input** (Server-Side): The user receives an error message popup, briefly describing the reason the input is invalid.

### Use Case 3 (by Liam)
1. **Actors:** A registered user who wants to track their progress (streak in this use case).
2. **Triggers:** User logs in for the day.
3. **Preconditions:** The user may or may not have an existing streak.
4. **Postconditions:**  
- If the user already has a streak, +1 will be added to the current streak when logging on for the first time of the day. 
- If the user does not have a streak, a new streak will begin with the day’s first login. 
- The achievement dashboard is updated to reflect the new streak. 
5. **List of steps:**  
- User logs into the website.
- The system checks if the user already has a streak
  - If the user has an ongoing streak, the system increments the streak by +1.
  - If the user does not have a streak, the system creates a new streak with a value of 1. 
- The achievement dashboard is updated with the new streak value, and the user 	can now view the updated streak. 
6. **Extensions/Variations:**  
- **Variation:** If the user misses a day of logging in, the streak will reset to 0. 
7. **Exceptions:**  
- If there is an issue with the server, the user is notified that their streak could not be updated. The system will attempt to update the streak during the user’s next login. 

## Non-Functional Requirements
- Due to the nutritional, health-related nature of our product, we should comply with HIPAA, using the resources and tools provided by the Department of Health and Human Services [here](https://www.hhs.gov/hipaa/for-professionals/special-topics/health-apps/index.html) 
- This website is intended to be public-facing, and have profiles which store user data, so the tools used must be scalable and provide ample security 
- Given that the website itself is intended to be a free product, the tools used should be free, or have minimal overhead costs

## External Requirements
- The product must have robust error handling for searching, user information fields, and any other inputs, so that one user error will not crash the website or cause a user to lose data or access
- The product must run continuously on a server and be accessible via public-facing URL
- Instructions to clone and self-host the webserver in its entirety, including the database and other relevant APIs and tools (which would need to be re-set up with new credentials and data not exposed in the source code), must be provided and accessible, along with the code referenced and used by said instructions
- The scope of this project must at all times remain reasonably achievable by the 6 members of our team, within the 8 week timeframe allotted for this project

## Team Process Description
### Toolset
Node.js, MongoDB, HTML, JavaScript 
### Team Roles
- **Gracie:** back-end development, server creation, tester, github management
  - Our product will require a webserver with significant back-end logic and functionality, and as per our External Requirements will need a repository of our source code with instructions and other organizational development artifacts
  - With her experience with creating webservers, doing bug testing, and working with github, she is fully capable of filling these roles 
- **Yigit:** Back-end development, Database Creator and Handler, Tester, Mongoose Schema Designer
  - Our product will use MondoDB as its database for everything, users, products etc. I will be responsible for back-end development as well as mongoose schema design for easier use of MondoDB via NodeJS.
  - Have experience in Discord bot programming with databases. It will not be any different for web applications so I am confident I can fulfill these roles  
- **Liam:** Front-end Development, Tester
  - Our product requires a user interface (UI) that is visually appealing, user-friendly, and integrates seamlessly with the back end. I will be tasked with ensuring the application delivers a functional and engaging experience for users.
  - With experience in HTML, JavaScript, and UI/UX design, Liam is well-suited for this role. They will address any potential weaknesses identified during testing to ensure the application is robust and easy to use.
 
### Schedule
#### Phase 1: Project Architecture and Design Specifications (2 weeks)
**Due:** 02/04/2025 11:59 PM
**Week 1 (01/21 - 01/27)**
- Complete system architecture diagram (high-level).
- Define data models (user, product, plan) in Mongoose.
- Prepare initial wireframes for key user flows (registration, plan creation).

**Week 2 (01/28 - 02/03)**
- Finalize design specs for each major component (frontend, backend, database).
- Document detailed use cases & user stories.
- (Milestone) Architecture & Design document completed and reviewed.

#### Phase 2: Project Implementation (2 weeks)
**Due:** 02/18/2025 11:59 PM
**Week 3 (02/04 - 02/10)**
- Implement user registration, login, logout functionality (no advanced error handling yet).
- Integrate external nutrition API for product listings (basic fetch and display).
- (Milestone) Basic CRUD operations for products and user profiles tested locally.

**Week 4 (02/11 - 02/17)**
- Implement nutrition plan creation flow (selecting products, storing plans).
- Integrate achievements or gamification elements (at least 1 achievement triggers).
- (Milestone) “Create Plan” use case functional in a development environment.

#### Phase 3: Project Testing (1 week)
**Due:** 02/25/2025 11:59 PM
**Week 5 (02/18 - 02/24)**
- Conduct unit tests for each module (frontend & backend).
- Integration testing for user flow (registration → plan creation → achievement triggered).
- Implement error handling for known exceptions.
- (Milestone) All core user flows tested without blocking issues.

#### Phase 4: Project Beta Release (0.5 week)
**Due:** 03/03/2025 11:59 PM
**Half-Week 6 (02/25 - 03/03)**
- Launch a beta version to a limited group of external testers.
- Gather user feedback and bug reports.
- (Milestone) Beta version deployed to staging environment for external feedback.

#### Phase 5: Project Final Release (1 week)
**Due:** 03/09/2025 11:59 PM
**Week 6.5 to 7 (03/04 - 03/09)**
- Fix high-priority bugs identified during beta.
- Polish UI, finalize documentation, and implement any quick improvements.
- (Milestone) Final release available publicly with stable feature set.

### Major Risks
#### Limited or Unreliable External API Data 
**Likelihood:** Medium 
**Impact:** High if the API coverage is insufficient or goes down often. 
**Mitigation:** Cache results, maintain a fallback list of products, or switch to another reliable API early in development. 

#### Scope Creep or Poor Time Management 
**Likelihood:** Medium 
**Impact:** Could delay releases or reduce overall quality if more features get added without adjusting the timeline. 
**Mitigation:** Strict adherence to the development schedule and setting clear priorities on features. 

#### Security Vulnerabilities 
**Likelihood:** Low to Medium 
**Impact:** Severe damage if user data is compromised. 
**Mitigation:** Follow best practices for password hashing, access control, and regular code reviews & penetration testing.

### External Feedback
External feedback will be most helpful when we have prototyped new designs or implementations to fulfill various requirements, this way we will have enough to show off concept or proof of concept, but receive feedback on it before we have put significant time into a more polished implementation, making it easier to correct based on said feedback.

We will receive external feedback via our Project Manager meetings each Monday, as well as in response to our presentations throughout the term.

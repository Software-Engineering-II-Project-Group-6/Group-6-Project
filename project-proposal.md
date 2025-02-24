# Group 6 Project Proposal
## Team Members and Roles
**Yigit Onuk** (Back-End Development, Database Handler, Tester) 

**Liam McAfee** (Front-End Development, Tester) 

**Gracie Armour** (Back-End Development, Server Creation, Tester, GitHub Management) 

**Henry James** (Back-End Development, Tester, AI)

**Benjamin Junge** (Front-End Development, Tester)


## Rules and Communication
1. **Respect:** Treat teammates courteously; value diverse perspectives and encourage open dialogue.
2. **Clear Communication and Consistent Involvement:** Please share your progress asynchronously on Discord, even if we’re not meeting on a given day. If you see a question and you know the answer, help your peers!
3. **Attend Meetings:** Please attend all scheduled meetings to stay informed. If you can’t make it, check the “Meeting History” in this document to catch up. Ideally, let your teammates know at least six hours before the meeting if you won’t be able to attend.
4. **Honor Deadlines, Ask for Help, and Ask Early:** We’re in this together as a team. Respect all deadlines, and if you believe you won’t meet one, let your teammates know at least 48 hours in advance so we can plan accordingly. If you get stuck, let your teammates know right away so they can help with your workload. 

## Project Artifacts
**Discord:** [https://discord.gg/7rysQCWG](https://discord.gg/7rysQCWG)

**GitHub:** [https://github.com/Software-Engineering-II-Project-Group-6/Group-6-Project](https://github.com/Software-Engineering-II-Project-Group-6/Group-6-Project)

## NourishQuest: A Nutrition Planner Website
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

### Use Case 4 (by Henry)
1. **Actors:** User who wants to easily navigate health and nutrition
2. **Triggers:** User has made an account and signed in
3. **Preconditions:** User has a valid account, all input fields have valid inputs, and they have started making a nutritional plan.
4. **Postconditions:** Users nutritional plan and chats have been saved to the database.
5. **List of steps:**  
- User enters a valid account information 
- User enters in all necessary information such as allergy information 
- User starts a chat or nutritional plan 
- User is walked through a health plan or suggestion
- User saves a chat or plan
- Information is saved to the database
- User logs off 
6. **Extensions/Variations:** 
- Guide and welcome message is pushed on new users.
- If necessary information is not inputted a prompt for this information should be displayed 
7. **Exceptions:** 
- **API failure:** This project will use a few APIs that could go down.
- Server can go down or have an issue.
- The database can have a problem and not save user data.

### Use Case 5 (by Benjamin)
1. **Actors:** User who wants a recipe that fits their plan
2. **Triggers:** User clicks the get recipe button
3. **Preconditions:** User has a valid account, all input fields have valid inputs, and they have finished making a nutritional plan.
4. **Postconditions:** A recipe is displayed  and a button is made available to the user to migrate the macros from the recipe into the users daily log.
5. **List of steps:** 
- User clicks button to get a recipe
- A quarry is sent to check with the data on the user
- Built in recipes are examined to match with the plan in question
- A list of potential meals is displayed with images so user can choose
- User chooses the recipe they want, and the instructions and ingredients are displayed
- Options for the recipe to be saved in a saved recipe folder or the nutrients added to the user's daily log are displayed 
6. **Extensions/Variations:**
- **Variation:** User may leave site during this process causing interruption 
7. **Exceptions:**
- **API Failure:** The external nutrition API is down or returns errors; the system notifies the user and offers limited product options or a retry.
- **Insufficient User Data:** If user profile data (e.g., weight, dietary preferences) is incomplete, the system prompts the user to fill in missing information before proceeding.
- **Insufficient Options:** If the user profile is set in such a way that the system cannot find recipes that would match the plan. Alert user an allow user to potentially quarry Ai (strech goal)

### Use Case 6 (by Alina)
1. **Actors:** User who is tired of regular apps that focus on strict structures and lack the flexibility to adapt to individual needs and preferences.
2. **Triggers:** The user has created a Personal Planner and is now looking for the integration of Achievements & Quests.
3. **Preconditions:** The user has a valid account and has entered all necessary information and successfully completed their Personal Planner setup.
4. **Postconditions:** A personalized list of Achievements & Quests for the week is successfully completed and displayed to the user.
5. **List of steps (success scenario):** 
- The user completes their Personal Planner. 
- Information from the Personal Planner is processed, and the data is passed along for the creation of Achievements & Quests. 
- Achievements & Quests for each day of the upcoming week are created, taking the user’s goals, dietary requirements, and calorie/water tracking into account.
- A list of Achievements & Quests for the week is displayed to the user to motivate them and provide a fun structure for their week.
- For each day, the user successfully completes challenges, followed by rewards and interactive goal tracking in the app.
- Once the week has passed and all challenges are completed, the user receives a summary of their achievements, including an in-depth description of how these contributed to their goals. 
6. **Extensions/Variations:** 
- The user can edit their goals or preferences within the Personal Planner, which leads to corresponding updates in the Achievements & Quests for the week.
- The user’s progress over the week may vary, meaning they might not complete all the proposed activities and challenges. 
7. **Exceptions:** 
- **Personal Planner failure:** The Personal Planner is not developed successfully or fails to consider certain preferences, allergies, or goals of the user, leading to a misleading Achievements & Quests plan.
- **Server issues:** Server failure prevents the user from proceeding with their weekly plan for Achievements & Quests.
- **Visualization & data set issues:** If visualization, summarization, or information retrieval features fail, the user does not receive a high-quality, complete summary report of the Achievements & Quests for the week.

## Non-Functional Requirements
- Due to the nutritional, health-related nature of our product, we should comply with HIPAA, using the resources and tools provided by the Department of Health and Human Services [here](https://www.hhs.gov/hipaa/for-professionals/special-topics/health-apps/index.html) 
- This website is intended to be public-facing, and have profiles which store user data, so the tools used must be scalable and provide ample security 
- Given that the website itself is intended to be a free product, the tools used should be free, or have minimal overhead costs
- When implementing the AI agent feature, we need to ensure that high-quality safeguards are built to prevent misinformation, as it can pose a threat to the health of users. Additionally, when selecting the data sources for Retrieval-Augmented Generation (RAG) enhancements, it is essential to verify the quality and reliability of all sources used in the dataset.
- The website and its entire functionality should be accessible to people with various physical and mental ability levels, accommodating diverse user preferences and needs based on personal, health, medical, and religious reasoning. All these groups should be equally well supported, with features designed with inclusivity and accessibility in mind. 

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
- **Benjamin:** Front-end Development, Tester 
  - Our project requires that we create a seamless and sleek UI that will allow people who use out product to do so very easily as there are many barriers to eating and living in a healthy way it is a core value for our project to need as little work on their end as possible. Therefore UI/UX is very important.
  - With experience in HTML, CSS and JavaScript Benjamin is positioned to emphasize their skills in perfecting the UI.
  - Testing is also a barrier to the project being completed so many group members are planning to test section of the project created by other teams.
- **Henry James** Back-end Developer, AI Integration, tester
  - Our product will requiure effortless navigation and exploration of all the features we offer. Each feature must be implemented flawlessly to ensure every user has a convinient and engaging experience. Through the use of well structured implementation and rigorous unit tests I will ensure all features including front-end UI features, achievements, food loading, and potentially AI API calls will work flawlessly
  - With my experience with Node.js, Javascript, and AI chatbot implementations I am confident I can fulfill my role.
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

## Software Architecture
### Major Software Components
#### 1. Front-End
**Technologies:** HTML, CSS, JavaScript.

**Responsibility:** Provides the user interface (UI) for account registration, plan creation, achievement tracking, daily streaks, and recipe retrieval.

**Rationale:** Must be intuitive, visually appealing, and accessible across different devices.

#### 2. Back-End
**Technologies:** Node.js with Express (or similar) for handling HTTP requests and implementing business logic.

**Responsibility:**
- Receives requests from the front-end. (“Get user data,” “Create plan,” “Filter recipes”)
- Interfaces with the database to read/write user information, product data, achievements, etc.
- Applies business rules. (checking user allergies, calculating macros etc.)

**Rationale:** Centralizes all business logic, ensures security and data validations, orchestrates data flow among components.



#### 3. Database
**Technology:** MongoDB, accessed via Mongoose npm package.

**Responsibility:**
- Stores user profiles (credentials, personal goals, allergies).
- Stores products, recipes, achievements, and daily logs. (This one comes from API)
- Stores user plans, progress, and relevant metadata.

**Rationale:** A NoSQL document-based database (MongoDB) allows flexible schemas for quickly evolving nutrition data and user-specific customizations.



### Interfaces Between Components
**Front End – Back End Communication:** RESTful APIs (JSON-based). HTTP endpoints such as POST /api/signup, GET /api/products, POST /api/createPlan, etc.

**Back End – Database Communication:** Mongoose models (e.g., User, Product, Plan, Achievement etc.). Query logic encapsulated in service or repository classes.



### Data Storage
**High-Level Schema of User (MongoDB Collections via Mongoose):**
``` javascript
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Hashed password (Using bcrypt)
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  goals: {
    type: String,
    default: "Maintain Weight",
  },
  allergies: {
    type: [String],
    default: [],
  },
  dailyCalorieGoal: {
    type: Number,
    default: 2000,
  },
  achievements: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
```
This is the only schema we have ready yet but the others will have a similar structure.

### Architectural Assumptions
- **API Reliability:** We assume that external nutrition APIs will be largely available with minimal downtime.
- **User Growth:** We assume a moderate number of users initially, manageable by a single database instance and basic load balancing.
- **Security:** We assume secure user authentication and minimal risk of malicious attacks at small scale, though we design for best practices in password hashing, input sanitization, and general security.
- **Scalability:** Using Node.js and MongoDB fosters horizontal scaling. We assume that in the short term, a single-server environment is enough.


### Alternative Architectural Decisions
#### Alternative for Data Storage
- **Option:** Using a relational database (e.g., PostgreSQL).
- **Pros:**
  - Clear schema enforcement.
  - Traditional relational queries (SQL) can be easier for certain analytics.
- **Cons:**
  - Less flexible for rapidly changing user/nutrition data models.
  - Migrations can be more cumbersome for schema changes.
- **Why We Chose MongoDB:**
  - Flexibility for storing nutrition data with potentially varied fields.
  - Faster iteration in early stages.


#### Alternative for Server Framework
- **Option:** Using Python (Flask or Django)
- **Pros:**
  - Python has strong library support for data science and ML.
- **Cons:**
  - Additional overhead in bridging to Node.js front-end environment, or rewriting the front-end in a different ecosystem.
  - Team’s current skill set is primarily in JavaScript/Node.js.
- **Why We Chose MongoDB:**
  - JavaScript is used for both client and server, minimizing context-switch.
  - Established ecosystem (Express, Mongoose) for quick web app development.


## Software Design
#### Front-End
**main.js:** Orchestrates page load, manages top-level events, handles authentication (client and server side).

**plan.js:** Contains logic for creating or editing a user’s nutrition plan, integrating data fetched from the back-end.

**achievements.js:** Renders achievements or gamification progress, progress bars, and notifications (notifications are just a possibility for now).


#### Back-End
**Routes:** Define HTTP endpoints and attach to respective controllers.

**Controllers:** Handle incoming requests (validation, error handling) and call functions.

**Services:** Encapsulate business logic (plan calculation, filtering for allergies, retrieving data from external APIs etc.).

**Models:** Mongoose schemas and data access objects.

**Utilities:** Reusable helpers (error handlers, API request wrappers).


#### Database
**userModel.js:** Mongoose schema and model for User.

**planModel.js:** Mongoose schema and model for Plan.

**productModel.js:** Mongoose schema and model for Product.

**achievementModel.js:** Mongoose schema and model for Achievement.

Other more model/schema possibilities too…


### Responsibilities
#### Front-End
Present data to the user, handle user interactions, send valid requests to the back-end.

#### Back-End
Validate and process data, coordinate logic between different modules, provide secure API endpoints.

#### Database
Persist all user-specific or product-related data in a structured, query able format.

## Coding Guidelines
[**HTML**](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/HTML)

[**CSS**](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/CSS)

[**JS/Node**](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/JavaScript)

For all the coding part, we will follow mdn web docs guidelines. Because it is widely adopted, covers ES6+ best practices in sync with HTML and CSS.

For enforcing it, we will do regular coding checks in our synchronous biweekly Discord meetings and any out of place/irregular code will get fixed.


## Updates to Process Description
### Risk Assessment
| Risk  | Likelihood | Impact | Rationale | Mitigation Steps | Detection |
| ----- | ---------- | ------ | --------- | ---------------- | --------- |
| Unreliable External API | Medium | High | We rely on free APIs for nutrition data, which may experience downtime or limit usage. | - Identify reliable APIs early - Cache frequently requested data | - Temporarily switch to backup API |
| Scope Creep / Time Management | Medium | Medium | With fewer team members, adding too many “fun” features can easily overwhelm the schedule. | - With fewer team members, adding too many “fun” features can easily overwhelm the schedule. | - Postpone lower-priority features - Stick to the critical path if we start to fall behind |
| Security Vulnerabilities | Low/Medium | High | Handling user credentials (and potential personal data) poses security risks that could harm users and our reputation | - Penetration tests on staging | - Temporarily disable new user signups |
| Team Member Bandwidth | Medium | Medium | Any illness, schedule conflict, or unforeseen event can slow progress. | - Weekly stand-ups checking for overload - Watch if tasks stall | - Weekly stand-ups checking for overload - Watch if tasks stall |
| Integration/Deployment Issues | Low | Medium | Environment misconfigurations can block releases and reduce system stability. | - Automated build checks | - Roll back to last stable release |

### Project Schedule
Yigit handles database-related tasks and now takes on front-end design with Liam.

Henry helps Gracie with back-end tasks.

| Milestone / Task | Owner(s) | Effort | Dependencies | Target Date |
| ---------------- | -------- | ------ | ------------ | ----------- |
| Phase 1: Architecture & Design |  |  |  | Due: 02/04 |
| 1. Create initial wireframes (registration, plan creation) | Yigit | 1 person-week | None | 01/27 |
| 2. Define Mongoose schemas (User, Product, Plan) | Yigit | 1 person-week | None | 01/27 |
| 3. Finalize Architecture & Design Document | Everyone | 1 person-week | (1), (2) | 02/03 |
| Phase 2: Core Implementation |  |  |  | Due: 02/18 |
| 4. Implement user registration & login | Yigit | 1 person-week | (2) finalized schema | 02/10 |
| 5. Integrate external nutrition API for product listings | Yigit, Liam | 1 person-week | (2) finalized schema | 02/10 |
| 6. Basic plan creation flow (back-end logic) | Gracie, Henry | 1 person-week | (4), (5) | 02/17 |
| 7. Basic front-end for plan creation & product list | Yigit, Liam | 1 person-week | (6) back-end endpoints ready | 02/17 |
| Phase 3: Achievements & Gamification |  |  |  | Due: 02/25 |
| 8. Implement achievements model & triggers | Henry, Gracie, Liam | 1 person-week | (6) plan creation complete | 02/24 |
| 9. Front-end updates for achievement display | Everyone | 1 person-week | (8) achievement logic ready | 02/24 |
| Phase 4: Testing & Beta Release |  |  |  | Due: 03/03 |
| 10. Unit tests (models, controllers, services) | Everyone | 1 person-week | Implementation tasks (4)-(9) | 03/01 |
| 11. Integration & usability testing (staging environment) | Everyone | 1 person-week | (10) | 03/03 |
| Phase 5: Final Release |  |  |  | Due: 03/09 |
| 12. Fix priority bugs, polish UI, finalize documentation | Everyone | 1 person-week | (11) test feedback | 03/09 |
| 13. Deploy final version publicly | Gracie | 0.5 week | (12) | 03/09 |


### Team Structure
#### Gracie
**Roles:**
- Back-end development (server creation, core APIs, back-end code)
- GitHub repository management
- Testing (with a focus on server-side unit tests and integration)

**Additional Details:**
- Oversees environment setup for deployments
- Coordinates any final merges/deployments

#### Henry
**Roles:**
- Assists Gracie with back-end logic (Express controllers, API endpoints)
- Works on achievements/gamification triggers in the back end with Gracie
- Testing (focusing on end-to-end scenarios with back-end changes)

**Additional Details:**
- Serves as an additional resource for code reviews
- Will document back-end endpoints if needed

#### Yigit
**Roles:**
- Database creation and handling (MongoDB, Mongoose schemas)
- Front-end design (in collaboration with Liam)
- Integration of external nutrition APIs
- Testing (covering both front-end data flows and database integration)

**Additional Details:**
- Ensures secure and efficient data storage (indexes, fallback caching)

#### Liam
**Roles:**
- Front-end development, UI/UX design, achievement planning/design in theory
- Testing (front-end unit tests, usability checks)

**Additional Details:**
- Focuses on accessibility and responsive design
- Coordinates with Yigit to ensure consistent design patterns


### Test Plan and Bugs
#### Unit Testing
**Scope:** Models, controllers, and services.

**Owners:**
- **Back-end (Gracie, Henry):** Unit tests for Express routes, controllers, achievements logic.
- **Database/Models (Yigit):** CRUD operations, schema validations.
- **Front-end (Liam, Yigit):** UI functions, small components in plain JavaScript.


#### Integration Testing
**Scope:** Full user flows (e.g., user signs up, creates a plan, achievement unlocked).

**Owners:** All four members participate in creating and running tests.


#### Usability Testing
**Scope:** Checking the front-end’s ease of use, clarity of messaging.

**Owners:** Primarily Liam (front-end lead), with support from Yigit.


#### Bug Tracking
**Tool:** GitHub Issues. (required by the course)

**Process:**
- Each reported bug includes reproduction steps, severity, expected/actual outcome.
= Bugs are fixed in separate branches, tested, then merged via pull requests.


### Documentation Plan
We will maintain a brief yet comprehensive set of documents to guide our users, administrators, and future developers. The User Guide (led by Liam, with Yigit’s input) will explain how to sign up, create/edit nutrition plans, and view achievements, focusing on the front-end experience. The Admin/Deployment Guide (managed by Gracie) will provide clear instructions on installing dependencies, configuring environment variables, and deploying the site. Each team member will add to a Developer Guide, outlining key modules, directory structures, and coding conventions. Finally, the API Reference (jointly updated by Gracie, Henry, and Yigit) will detail endpoints, request/response formats, and error handling. While we aim to include basic tooltips or on-screen help for users, more advanced in-app guidance may be postponed if time is limited!

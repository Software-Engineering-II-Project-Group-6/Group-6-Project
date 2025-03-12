# Group 6 Project Proposal
## LIVE WEBSITE LINKS
We have two links, as our code has some nebulous issues that became present on each platform we attempted to deploy to, so as a result we deployed on both, so in total all features should be testable between the two instances of the site:
- [Vercel](https://nourish-quest-demo.vercel.app/)
- [OSU Classwork Server](http://classwork.engr.oregonstate.edu:3042/)

## Team Members and Roles
**Yigit Onuk** (Front-End Main Development, Back-End Development, Database Handler, Tester) 

**Liam McAfee** (Front-End Development, Tester) 

**Gracie Armour** (Back-End Development, Server Creation, Tester, GitHub Management) 

**Henry James** (Back-End Development, Tester, AI)

**Benjamin Junge**

## Reflections

**Yigit Onuk:** Working on NourishQuest felt rewarding and demanding at the same times.  Along the way, we ran across a few API problems that pushed us to investigate other options and learned the value of adaptable designs.  Although it was challenging at times to combine several languages and technologies into one project, it gave important insight into cross compatibility and integration. Despite the challenges, working with my colleagues turned the experience into a group victory instead of a personal battle. We did it, and I'm glad we did. The knowledge gained will help me approach other tasks I will have in the future, both as a student and a worker.

**Liam McAfee** Working on NourishQuest was both challenging and rewarding. I learned a lot about integrating different features and troubleshooting issues along the way. What made it even more interesting for me was that at the start of this year I started tracking my macros and have been using Stupid Simple Macro Tracker after paying the one-time fee. Seeing how most apps either require a fee or a subscription, it was cool to help build something that’s completely free.

**Gracie Armour**

**Henry James**

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
1. Account and plan creation with specialized goals
2. Product List and creating a personal nutrition list based on preferences
3. Food filtering system and recipes
4. Achievements

### Stretch Goals
1. Nutrition themed games
2. Daily quests
3. AI Chatbot to help with dieting
4. Calorie/water tracker 

## Use Cases (Functional Requirements)
## Use Cases (Functional Requirements)

### Use Case 1 (by Yigit)

1. **Actors:** A logged-in user who wants to create or update a nutrition plan and incorporate recipes.
2. **Triggers:** The user navigates to the “My Plan” page and selects “Create New Plan.”
3. **Preconditions:**  
   - The user must have a valid account and be logged in.  
   - Necessary baseline data (e.g., age, weight, dietary preferences) must be present in the user’s profile.  
4. **Postconditions:**  
   - A new or updated nutrition plan is successfully created and stored in the database.  
   - The user can add recipes to this plan for each meal, and any custom recipes are saved to the user’s account.  
5. **List of steps:**  
   - The user clicks “Create New Plan” and is prompted for dietary goals (weight loss, muscle gain, maintenance, etc.).  
   - The system displays relevant foods and/or recipes, allowing the user to select or search for items.  
   - The user confirms choices for breakfast, lunch, dinner, or other meals.  
   - The system calculates calorie/macro distribution based on selections.  
   - The plan (with or without custom recipes) is saved to the user’s account.  
6. **Extensions/Variations:**  
   - **Variation:** If the user wants to edit a specific meal or recipe, they can swap items before finalizing the plan.  
   - **Variation:** If the user is creating a plan for the first time, they may unlock a “Plan Novice” achievement (depending on Liam’s achievement logic).  
7. **Exceptions:**  
   - **Insufficient Profile Data:** The system prompts the user to fill in missing info (like current weight) if needed.  
   - **Server Error:** If the server fails to save the plan, the user is notified and can retry later.  
   - **API Failure (Recipe/food lookups):** If an external API is down, the system notifies the user and offers limited offline suggestions.

---

### Use Case 2 (by Gracie)

1. **Actors:** A logged-in user who wants to filter out foods they’re allergic to before seeing them in search results or plan suggestions.
2. **Triggers:** The user searches for new foods/recipes or generates a plan, and the system automatically applies allergy filters.
3. **Preconditions:**  
   - User’s profile must include allergy information (e.g., peanuts, gluten).  
   - The system’s filtering logic is set up to exclude items containing these allergens.
4. **Postconditions:**  
   - Any food lists or recipe searches automatically exclude items flagged with the user’s allergens.  
   - The user sees only allergen-safe options in plan or recipe results.
5. **List of steps:**  
   - The user updates their profile to include known allergens.  
   - When performing a search or auto-generating a plan, the system retrieves the full list of items from the database or an external API.  
   - The filtering logic checks item ingredients/tags for allergens.  
   - All matching allergens are removed from the final displayed list.  
   - The user sees and selects from only safe items.  
6. **Extensions/Variations:**  
   - **Extension:** The user can optionally see a warning for borderline items (e.g., “May Contain Traces of Nuts”) but still choose them manually.  
   - **Extension:** The user could toggle allergy filters on or off if they only have mild intolerances.
7. **Exceptions:**  
   - **Incomplete Allergy List:** If the user has not updated their allergy data, the system displays all items by default.  
   - **API or Database Failure:** If the system fails to retrieve food or ingredient info, the user is notified that results may not be fully accurate.

---

### Use Case 3 (by Liam)

1. **Actors:** A logged-in user who wants to view achievements and see the leaderboard ranks.
2. **Triggers:** The user opens the “Achievements” or “Leaderboards” page in the UI.
3. **Preconditions:**  
   - The user already has at least one logged activity in the system (like logging water, finishing a day).  
   - The system tracks user points and ranks in the database.
4. **Postconditions:**  
   - The user’s achievements are displayed (locked vs. unlocked).  
   - The user’s rank and points are shown on the leaderboards.  
   - If the user meets the criteria for a new achievement, it is claimable.
5. **List of steps:**  
   - The user navigates to the Achievements page.  
   - The system queries the database for the user’s completed tasks and points.  
   - Any achievements that match criteria and are unclaimed become claimable.  
   - The user may click “Claim” to finalize that achievement and add to total points.  
   - The user may view the top 20 on the leaderboard or search for their rank.  
6. **Extensions/Variations:**  
   - **Variation:** If the user has a daily or weekly milestone in progress, achievements might display partial progress bars.  
   - **Extension:** Once the user claims an achievement, it disappears from the “unlocked” but “unclaimed” list and moves to the “claimed” achievements.  
7. **Exceptions:**  
   - **Criteria Not Met:** The user sees an error if they try to claim an achievement they don’t actually qualify for.  
   - **Server/Database Error:** If the system cannot retrieve or update user points, an error is displayed.

---

### Use Case 4 (by Henry)

1. **Actors:** A logged-in user who wants AI-driven nutritional advice via a chat interface.
2. **Triggers:** The user clicks a “Chat with AI” or “Nutrition Chatbot” button from the dashboard or main menu.
3. **Preconditions:**  
   - The system has an AI chat endpoint configured (e.g., an API key for GPT-like services).  
   - The user has a valid account and is logged in.
4. **Postconditions:**  
   - The user can send messages about diet or meal questions, and the AI’s responses are displayed.  
   - The conversation is optionally saved so the user can revisit it later.
5. **List of steps:**  
   - The user opens the “AI Chat” interface from the navigation.  
   - The user types a nutrition-related question or request (e.g., “Suggest a healthy breakfast”).  
   - The system sends the user’s message to an AI endpoint with relevant context (e.g., user allergies from Gracie’s filter).  
   - The AI responds with suggestions or advice.  
   - The user can continue the conversation or exit.  
   - Optionally, the user saves the chat conversation for future reference.  
6. **Extensions/Variations:**  
   - **Extension:** The user can integrate the AI’s suggestions directly into a new or existing nutrition plan (tying back to Yigit’s plan system).  
   - **Variation:** The system might track user metrics to refine the AI’s suggestions over time.
7. **Exceptions:**  
   - **AI Service Down:** If the AI API is offline, the user receives an error message or fallback generic advice.  
   - **Invalid Input:** If the user’s request is nonsensical or violates usage guidelines, the system warns them or refuses.  
   - **Server Error:** If the app cannot reach the AI endpoint for any other reason, the user is notified and can retry later.


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
- **Yigit:** Front-end Development, Back-end development, Database Creator and Handler, Tester, Mongoose Schema Designer
  - Our product will use MondoDB as its database for everything, users, products etc. I will be responsible for back-end development as well as mongoose schema design for easier use of MondoDB via NodeJS.
  - Have experience in Discord bot programming with databases. It will not be any different for web applications so I am confident I can fulfill these roles  
- **Liam:** Front-end Development, Tester
  - Our product requires a user interface (UI) that is visually appealing, user-friendly, and integrates seamlessly with the back end. I will be tasked with ensuring the application delivers a functional and engaging experience for users.
  - With experience in HTML, JavaScript, and UI/UX design, Liam is well-suited for this role. They will address any potential weaknesses identified during testing to ensure the application is robust and easy to use.
- **Benjamin:** Tester 
  - Our project requires that we create a seamless and sleek UI that will allow people who use out product to do so very easily as there are many barriers to eating and living in a healthy way it is a core value for our project to need as little work on their end as possible. Therefore UI/UX is very important.
  - With experience in HTML, CSS and JavaScript Benjamin is positioned to emphasize their skills in perfecting the UI.
  - Testing is also a barrier to the project being completed so many group members are planning to test section of the project created by other teams.
- **Henry James** Back-end Developer, AI Integration, Tester
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

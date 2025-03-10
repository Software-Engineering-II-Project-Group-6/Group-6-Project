# User Manual

This user manual can also be read in an easily-navigatable form on our [Wiki](https://github.com/Software-Engineering-II-Project-Group-6/Group-6-Project/wiki).

## Introduction

**NourishQuest** is a free web application that users can register for and use to make their dieting journey easier through a gamified approach to nutrition planning. By completing daily tasks and participating in leaderboards, users not only stay competitive and committed to their plans but also develop long-term healthy habits. There’s no reason not to try this app!

## Installation Guide

The website will be hosted on a server in the future. For now, users who want to try the application must run it on their local machine. To check out the website and create an account, follow these steps:

### 1. Prerequisites
Ensure you have **Node.js** installed on your local machine. If not, download and install it from [Node.js official website](https://nodejs.org/).

### 2. Cloning the Repository
- Fork and clone the repository from GitHub.
- Open a terminal and navigate to the project directory.

### 3. Installing Dependencies
Run the following command to install the necessary dependencies via the included package file:

```sh
npm i
```

These dependencies are essential for the website to function correctly. Missing any of them will prevent the application from running.

### 4. Running the Server
Start the server by executing:

```sh
npm run start
```

The default port is set to **3000**, so the terminal will provide a local address (e.g., `http://localhost:3000/`) where the website can be accessed.

## Getting Started

### 1. Registration & Login

Upon opening the website, users are directed to the **public page**, where they can register or log in. If it's their first time visiting, they should click on the **Sign Up** button and create an account.

The registration process is quick, requiring only basic information. Advanced settings, such as allergy information, can be configured later in the **Profile Settings**.

Once registered, users can log in to their account to proceed further.

### 2. Dashboard & Features

After logging in, users will land on their **Dashboard**, which will initially be empty until they create a plan.

NourishQuest consists of the following fundamental pages:

- **My Profile:** Displays personal health and biological information, as well as saved custom food recipes.
- **My Plan:** Shows a **weekly meal plan**, organized by days, with details like food names, calorie count, and macronutrient breakdown.
- **Foods:** Allows users to search the **food database** (provided via API). Foods can be filtered based on selected criteria.
- **Leaderboards:** A global ranking based on points collected by users. The top **20 users** are displayed, and a user's own rank is shown at the bottom.
- **Achievements:** Users can earn points for completing **weekly and daily tasks**, which contribute to their leaderboard ranking.
- **Dashboard:** Users can log their **daily meals** and **water consumption** for tracking purposes.
- **Recipes:** Users can view their **custom food recipes** and create new ones by adding a title and description.

### 3. Logging Out

Users can log out by clicking the **Log Out** button located in the upper-right corner of every page.

_(Note: All features are a work in progress, except for account creation.)_

## How to Report a Bug

Users are encouraged to report bugs to help improve NourishQuest. Please follow these guidelines when submitting a bug report:

1. Navigate to the **GitHub Issues** section of the repository.
2. Click **New Issue** and select the **Bug Report** template (if available).
3. Provide the following information:
   - **Title:** A short, descriptive title of the issue.
   - **Description:** A clear and concise explanation of the bug.
   - **Steps to Reproduce:** A step-by-step guide on how to replicate the issue.
   - **Expected Behavior:** What should have happened.
   - **Actual Behavior:** What actually happened.
   - **Screenshots (if applicable):** Screenshots to illustrate the issue.
   - **Environment Details:** Browser, OS, and any other relevant system information.

## Known Bugs

All known issues and limitations are documented in the **GitHub Issues** section of the repository. Before reporting a new bug, please check if it has already been listed.

A user testing NourishQuest should not encounter trivial bugs (e.g., Null Pointer Exceptions) or a large number of untracked issues. If you encounter such problems, please report them using the **bug reporting process** outlined above.

---

Thank you for using NourishQuest! We appreciate your feedback and contributions to make this application better.

# NourishQuest - A Nutrition Planner Website
Our website allows users to create a free, detailed nutrition plan, either manually or with the help of AI. Each product includes detailed descriptions along with its macro values, and filterable information such as allergens. User profiles can be customized, and various achievements can be unlocked by staying committed to their planner which will make their diet more fun!


# Help and How-Tos
Instructions on how to get started using the site, report issues, and install your own version of the webserver can be found in our [Wiki](https://github.com/Software-Engineering-II-Project-Group-6/Group-6-Project/wiki)

# Installation Guide

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


# NOTE TO INSTRUCTOR/TA
Our repo is broken up into multiple branches:
- `main` for deployment, to be kept functional and ready to demo at all times
- `dev` for testing and development, where changes are Pull Requested to for individual in-progress features and bug-fixes
- `feature-*` these branches are for individual major features, and are where the majority of our team members' code contributions will be. They can be as broken as needed while developing a given feature without affecting full-app testing and the live deployment

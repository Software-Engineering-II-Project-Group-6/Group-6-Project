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

## LIVE WEBSITE LINKS
We have two links, as our code has some nebulous issues that became present on each platform we attempted to deploy to, so as a result we deployed on both, so in total all features should be testable between the two instances of the site:
- [Vercel](https://nourish-quest-demo.vercel.app/)
- [OSU Classwork Server](http://classwork.engr.oregonstate.edu:3042/)

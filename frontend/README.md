# Recipe Collection Display

## Table of Contents

- [Description](#description)  
- [Tech Stack](#tech-stack)  
- [Features](#features)  
- [Setup & Installation](#setup--installation)  
- [API Endpoints](#api-endpoints)   

---

## Description

This project processes a JSON dataset of recipes, stores them in a database, exposes a RESTful API for retrieving and searching recipes, and delivers a React-based frontend to browse and filter recipes intuitively.

---

## Tech Stack

| Layer       | Technology              | Purpose                                                        |
|-------------|-------------------------|----------------------------------------------------------------|
| Backend     | Node.js + Express       | Server-side API and logic                                      |
| Frontend    | React                   | Interactive UI for listing, filtering, and viewing recipes     |
| Database    | MongoDB                 | Document-based storage of recipes                              |
| Styling     | Tailwind CSS (via CDN)  | Consistent, utility-based styling                              |
| HTTP Clients | Axios                  | Fetching data from REST endpoints                              |
| Components  | Material-UI, react-rating-stars-component | Table display, drawers, star ratings             |

---

## Features

- JSON parsing with conversion of invalid numeric fields (`NaN`) to `null`
- Database insertion of structured recipe data
- REST API with:
  - Paginated listing sorted by rating
  - Search endpoint with filters (title, cuisine, total_time, rating, calories)
- React frontend with:
  - Sortable table view
  - Right-drawer detail view
  - Column-level filters
  - Star-rated UI (`@mui/material/Rating<img width="1366" height="683" alt="Screenshot 2025-09-10 231720" src="https://github.com/user-attachments/assets/070c01d4-c39e-4884-aa7f-a02cea57736d" />
`)
  - Graceful empty-state messaging
 
<img width="1366" height="683" alt="Screenshot 2025-09-10 231720" src="https://github.com/user-attachments/assets/d61850f6-df88-41f9-bbd2-40fe9a40d944" />

---

## Database Connection URI

```env
# MongoDB connection string
MONGODB_URI="mongodb://<username>:<password>@localhost:27017/recipes_db"

## Setup & Installation

### Backend

```bash
cd backend
npm install
# Ensure MongoDB is running
npm run seed          # Parses JSON and populates the database
npm start             # Launches the API server

### Frontend

cd frontend
npm install
npm start             # Runs the React app (default: http://localhost:3000)

### API Endpoints checking Sample

# Get Recipes (Paginated & Sorted)

GET /api/recipes?page=1&limit=10
Returns:
{
  "page": 1,
  "limit": 10,
  "total": 8451,
  "data": [ /* recipe objects */ ]
}

# Search Recipes(filterable)

GET /api/recipes/search?title=pie&rating=>=4.5&total_time<=120
Returns:
  {
  "data": [ /* filtered recipe objects */ ]
}



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

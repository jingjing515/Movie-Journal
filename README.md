# Movie Journal Web Application

## Description
The Movie Journal is a "Software as a Service" web application designed to allow users to explore and interact with a wide range of movie-related content. Built with React, Node.js, and Prisma, this application supports CRUD operations and offers functionality both to anonymous users and registered members.

## Technologies

Movie Journal is powered by a robust stack of modern technologies designed for scalability, efficiency, and enhanced user experience. Here's a breakdown of the main technologies used:

### Frontend
- **React**: Utilized for building the user interface with a component-based architecture, enhancing the responsiveness and interactivity of the web application.
- **CSS**: Used for styling, ensuring that the application is visually appealing and functional on various devices and screen sizes.

### Backend
- **Node.js**: Serves as the runtime environment for the backend, handling server-side logic and database operations efficiently.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### Database
- **Prisma**: An open-source next-generation ORM used for robust database management. It simplifies database access, migrations, and real-time event streaming.
- **MySQL**: The chosen relational database for storing all application data, known for its reliability and broad adoption in the industry.

### Authentication
- **Auth0**: Implements modern identity management features, providing secure access management through advanced authentication and authorization services.

### API Integration
- **OMDB API**: Integrates with the Open Movie Database (OMDB) to fetch detailed information about movies, enhancing the content available within the application.

### Development Tools
- **Git**: Used for version control.
- **npm**: Serves as the package manager for JavaScript, facilitating the management of project dependencies.

### Deployment
- **Vercel**: A platform that enables developers to deploy static sites and JAMstack applications with ease, offering automated deployments, serverless functions, and more.

### Testing
- **Jest**: Utilized for JavaScript testing
- **React Testing Library**: Provides light utility functions on top of React components, facilitating testing practices that encourage better testing and maintenance practices.

### Accessibility
- **Lighthouse**: An open-source, automated tool for improving the quality of web pages. It has audits for performance, accessibility, progressive web apps, SEO, and more.

## Features

### Dynamic Content Display
- **Home**: Serves as the central hub, dynamically displaying recent movie posts, reviews, and updates. For logged-in users, it customizes the view to show personalized activity and suggestions.

### User Authentication and Management
- **Login/Register**: Manages secure user authentication and registration processes. Users are prompted to log in only when necessary to access personalized features such as commenting or rating movies.

### User Profiles and Interactions
- **Profile**: Enables users to view and edit their personal profile, including managing links to their favorite movies and followed users.

### Advanced Search Capabilities
- **Search**: Robust search features allow users to find movies based on specific criteria. Results are neatly summarized with options to dive into detailed views.

### Detailed Information Access
- **Details**: Provides comprehensive details about movies, facilitating deeper user engagement with content such as extended movie descriptions, ratings, and reviews.

## Database Structure
- The application includes three main tables:
  1. `Users`: Stores user data including login credentials and profile information.
  2. `Movies`: Contains detailed information about movies.
  3. `Reviews`: Holds user reviews for movies.

## Installation and Setup

### Prerequisites
Ensure you have Node.js (LTS version recommended), npm (or yarn), and Git installed on your system.

### Clone the Repository
Clone the Movie Journal repository to your local machine and navigate to the project directory:
```bash
git clone https://github.com/jingjing515/Movie-Journal.git
cd Movie-Journal
```

### Clone the Repository
Navigate to the project directory and install all required dependencies:
```bash
# If you are using npm
npm install

# If you are using Yarn
yarn install
```
### Configure Environment Variables

#### Client-side Configuration:
Use a `.env` file in the root directory of your client application and populate it with the necessary variables:
```bash
REACT_APP_API_URL=http://localhost:8000
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
REACT_APP_AUTH0_AUDIENCE=your-auth0-audience
REACT_APP_JWT_NAMESPACE=your-jwt-namespace
```

#### Server-side Configuration:
Similarly, use the `.env` file in the root directory of your server application and add the following:
```bash
DATABASE_URL=mysql://username:password@localhost:3306/yourdatabasename
AUTH0_JWK_URI=https://your-auth0-domain/.well-known/jwks.json
AUTH0_AUDIENCE=your-auth0-audience
AUTH0_ISSUER=https://your-auth0-domain/
```

Run the Application
After setting up the environment variables, you can start the server and client by running:
```bash
npm start
```

### Verify the Installation

Finally, open a web browser and navigate to `http://localhost:3000` to ensure that the Movie Journal application is running properly. You should be able to view the homepage and interact with the features based on the environment setup.


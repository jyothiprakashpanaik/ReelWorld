# ReelWorld

**ReelWorld** is an Instagram Reels clone built using React.js for the frontend and Firebase for the backend. This project replicates the core features of Instagram, including user authentication, posting images, viewing feeds, and interacting with posts.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Database Model](#database-model)
- [Firebase Integration](#firebase-integration)
- [React Components](#react-components)
- [Routes](#routes)
- [Design](#design)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Overview

**ReelWorld** is an Instagram clone that provides users with a familiar Instagram-like experience. It's built with React.js for the frontend and Firebase for the backend. Users can log in, sign up, reset their password, and enjoy features such as viewing a feed, liking posts, adding comments, and uploading their own reels.

## Features

- User Authentication (Login, Signup, Reset Password)
- Feed Page (View and interact with posts)
- Profile Page (View and edit user profile)
- Commenting and Liking Posts
- Reel Upload Capability

## Database Model

The project's database model is designed to be scalable and sustainable, storing collections of data that include:

1. Users Data
2. Posts Data
3. Comments Data
4. [... under development 👷‍♂]

## Firebase Integration

Firebase is used extensively to handle the backend, providing real-time database capabilities and user authentication.

### Database

- Firebase Realtime Database is used to store and manage user data, posts, comments, and other collections in real-time.

### Authentication

- Firebase Authentication is used for user sign-up, login, and password reset.


## React Components

**ReelWorld** consists of various React components, each serving a specific purpose. Here are some of the key components:

- **Login**: Handles user login logic.

- **Signup**: Manages user signup logic.

- **Profile**: Displays and allows users to edit their profile data.

- **Private Route**: Ensures that users cannot access content without logging in.

- **NavBar**: Provides navigation and a user interface for easy access to different parts of the application.

- **Like**: Enables users to like and interact with posts.

- **Comment**: Facilitates user comments on posts.

- **Posts**: Displays and manages user posts.

- **UploadPosts**: Allows users to upload their posts and reels.

- **Video**: Handles the display and playback of videos within the application.

- [... under development 👷‍♂]

These components work together to create a seamless and user-friendly experience within **ReelWorld**.


## Routes

- `/`: The Feed page where users can view and interact with posts.
- `/login`: The Login page for user authentication.
- `/signup`: The Signup page for new user registration.
- `/forgetpassword`: The Forget Password page to reset a forgotten password.
- `/Profile/:id`: The Profile page for viewing and editing user profiles.
- `/manageAccount`: The Manage Account page for user account settings.
- [... under development 👷‍♂]


## Design

Material-UI is used for designing the application, ensuring a sleek and user-friendly interface.


## Getting Started

To get **ReelWorld** up and running, follow these steps:

### Clone the Repository

First, clone the **ReelWorld** Git repository to your local machine using Git:

```bash
git clone https://github.com/jyothiprakashpanaik/ReelWorld.git
```


### Install Dependencies

Navigate to the project directory:

```bash
cd ReelWorld
```

Install the necessary npm packages using:

```bash
npm install
```

### Run the Application

You can now start the development server and run the application using:

```bash
npm start
```

This command will start the application locally, and you can access it in your web browser at `http://localhost:3000`. The development server will automatically reload the application when you make changes to the code.

Enjoy exploring and testing **ReelWorld**!


## Contributing

We welcome contributions to improve and enhance **ReelWorld**. To contribute, please follow our [Contribution Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the Apache-2.0 license. Please see the [LICENSE.md](LICENSE.md) file for details.

---

# Ionic React Firebase Authentication App

A mobile application built with Ionic React and Firebase, demonstrating user authentication and profile management with ReactFire.

## Technologies Used

- [Ionic Framework](https://ionicframework.com/docs/react) - UI components and mobile framework
- [Capacitor](https://ionicframework.com/docs/capacitor) - Native runtime for web apps
- [React](https://reactjs.org/) - Frontend framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vite](https://vitejs.dev/) - Build tool
- [Firebase](https://firebase.google.com/docs) - Backend services
- [ReactFire](https://firebaseopensource.com/projects/firebaseextended/reactfire/) - React bindings for Firebase

## Project Structure

```
ionic-react-capacitor-app/
 ├── src/
 │ ├── components/ # Reusable components
 │ ├── pages/ # Page components
 │ ├── hooks/ # Custom React hooks
 │ ├── context/ # React context providers
 │ └── config/ # Configuration files
 ├── public/ # Static assets
 └── firestore.rules # Firebase security rules

```

## Features

- User authentication (sign in/sign up)
- Profile management
- Protected routes
- Firebase Firestore integration
- Responsive UI with Ionic components

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```javascript
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain VITE_FIREBASE_PROJECT_ID=your_project_id VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id VITE_FIREBASE_APP_ID=your_app_id
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create Firebase project and add configuration

   access firebase console and create a new project, add firebase to your project, create a new web app, copy the config object and add it to your .env file.

4. Run the development server:

   ```bash
   npm run dev
   ```

## Firebase Security Rules

The application uses the following Firestore security rules:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Firebase Authentication Persistence

### Known Issues

When using Firebase Authentication with Capacitor, there's a known issue with persistence storage. The default `browserLocalPersistence` doesn't work correctly on mobile platforms.

### Implementation

We handle this by using different persistence methods based on the platform:

- Native platforms (iOS/Android): `indexedDBLocalPersistence`
- Web: `browserLocalPersistence`

```typescript
// Example from src/config/firebase.ts
setPersistence(
  auth,
  Capacitor.isNativePlatform()
    ? indexedDBLocalPersistence
    : browserLocalPersistence
);
```

### References

- [Firebase Auth Persistence Documentation](https://firebase.google.com/docs/auth/web/persistence)
- [Capacitor Platform Detection](https://capacitorjs.com/docs/apis/platform)

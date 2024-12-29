import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonSplitPane,
  IonSpinner,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Login from "./pages/Login";
import Menu from "./components/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import {
  FirebaseAppProvider,
  AuthProvider as FireAuthProvider,
  useSigninCheck,
  FirestoreProvider,
} from "reactfire";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase";
import CreateAccount from "./pages/CreateAccount";
import { Firestore, getFirestore } from "firebase/firestore";

setupIonicReact();

/**
 * Protected route component.
 * @param {object} props - The component props.
 * @param {JSX.Element} props.children - The child components.
 * @returns {JSX.Element} The protected route component.
 */
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { status, data: signInCheckResult } = useSigninCheck();

  if (status === "loading") {
    return <IonSpinner />;
  }

  return signInCheckResult.signedIn ? children : <Redirect to="/login" />;
};

/**
 * Main application component.
 * @returns {JSX.Element} The App component.
 */
const App: React.FC = () => (
  <FirebaseAppProvider firebaseApp={app}>
    <FireAuthProvider sdk={getAuth(app)}>
      <FirestoreProvider sdk={getFirestore(app)}>
        <IonApp>
          <IonReactRouter>
            <IonSplitPane contentId="main-content">
              <Menu />
              <IonRouterOutlet id="main-content">
                <Route exact path="/login" component={Login} />
                <Route exact path="/create-account" component={CreateAccount} />
                <Route
                  path="/home"
                  render={() => (
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  )}
                />
                <Route
                  exact
                  path="/settings"
                  render={() => (
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  )}
                />
                <Route
                  exact
                  path="/about"
                  render={() => (
                    <ProtectedRoute>
                      <About />
                    </ProtectedRoute>
                  )}
                />
                <Route exact path="/" render={() => <Redirect to="/home" />} />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      </FirestoreProvider>
    </FireAuthProvider>
  </FirebaseAppProvider>
);

export default App;

import { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonList,
  useIonRouter,
  IonToast,
} from "@ionic/react";
import { useAuth } from "reactfire";
import { signInWithEmailAndPassword } from "firebase/auth";

/**
 * The login page component.
 *
 * This component renders a login form with fields for an email address and a
 * password. When the form is submitted, it attempts to log in the user using
 * the provided credentials. If the login is successful, the user is redirected
 * to the home page. If the login fails, a toast with the error message is
 * displayed.
 *
 * @returns {JSX.Element} The login page component.
 */
const Login: React.FC = () => {
  const auth = useAuth();
  const router = useIonRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home", "root", "replace");
    } catch (error) {
      setErrorMessage((error as Error).message);
      setShowError(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonInput
              label="Email"
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Password"
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
          </IonItem>
        </IonList>
        <IonButton expand="block" onClick={handleLogin}>
          Log In
        </IonButton>
        <IonButton expand="block" fill="clear" routerLink="/create-account">
          Create Account
        </IonButton>
        <IonToast
          isOpen={showError}
          message={errorMessage}
          duration={3000}
          onDidDismiss={() => setShowError(false)}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;

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
import { useAuth, useFirestore } from "reactfire";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { usePageVisibility } from "../hooks/usePageVisibility";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const CreateAccount: React.FC = () => {
  const isVisible = usePageVisibility();
  const auth = useAuth();
  const db = useFirestore();
  const router = useIonRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateAccount = async () => {
    if (!email || !password || !username || !firstName || !lastName) {
      setErrorMessage("All fields are required");
      setShowError(true);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: username,
        photoURL: null,
      });

      // Store additional user data in Firebase
      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName,
        lastName,
        email,
        username,
        createdAt: serverTimestamp(),
      });

      router.push("/home", "root", "replace");
    } catch (error) {
      setErrorMessage((error as Error).message);
      setShowError(true);
    }
  };

  return (
    <IonPage className={isVisible ? "ion-page-visible" : "ion-page-invisible"}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonInput
              label="Username"
              type="text"
              value={username}
              onIonChange={(e) => setUsername(e.detail.value!)}
              required
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="First Name"
              type="text"
              value={firstName}
              onIonChange={(e) => setFirstName(e.detail.value!)}
              required
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Last Name"
              type="text"
              value={lastName}
              onIonChange={(e) => setLastName(e.detail.value!)}
              required
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Email"
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              required
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Password"
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              required
            />
          </IonItem>
        </IonList>
        <IonButton expand="block" onClick={handleCreateAccount}>
          Create Account
        </IonButton>
        <IonButton expand="block" fill="clear" routerLink="/login">
          Back to Login
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

export default CreateAccount;

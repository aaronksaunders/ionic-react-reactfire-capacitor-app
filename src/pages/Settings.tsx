import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonButton,
  useIonRouter,
  IonToast,
  IonSpinner,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { usePageVisibility } from "../hooks/usePageVisibility";
import { useAuth, useFirestore, useFirestoreDocData, useUser } from "reactfire";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { doc } from "firebase/firestore";

/**
 * Settings page component.
 * @returns {JSX.Element} The Settings page.
 */
const Settings: React.FC = () => {
  const isVisible = usePageVisibility();

  const auth = useAuth();
  const { data: user, status } = useUser();
  const router = useIonRouter();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // get the user's profile data from Firestore
  const firestore = useFirestore();
  const userDocRef = doc(firestore, "users", user?.uid || "undefined");
  const { status: profileStatus, data: profile } =
    useFirestoreDocData(userDocRef);

  /**
   * Handles the logout process.
   */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login", "root", "replace");
    } catch (error) {
      setErrorMessage((error as Error).message);
      setShowError(true);
    }
  };

  if (status === "loading" || profileStatus === "loading") {
    return (
      <IonPage
        className={isVisible ? "ion-page-visible" : "ion-page-invisible"}
      >
        <IonContent className="ion-padding ion-text-center">
          <IonSpinner />
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className={isVisible ? "ion-page-visible" : "ion-page-invisible"}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>
              <h2>Username</h2>
              <p>{profile?.username || user?.displayName}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>First Name</h2>
              <p>{profile?.firstName}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Last Name</h2>
              <p>{profile?.lastName}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Email</h2>
              <p>{user?.email}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>User ID</h2>
              <p>{user?.uid}</p>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonButton expand="block" color="danger" onClick={handleLogout}>
          Logout
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

export default Settings;

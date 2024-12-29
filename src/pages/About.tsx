import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import { usePageVisibility } from "../hooks/usePageVisibility";

/**
 * About page component.
 * @returns {JSX.Element} The About page.
 */
const About: React.FC = () => {
  const isVisible = usePageVisibility();

  return (
    <IonPage className={isVisible ? "ion-page-visible" : "ion-page-invisible"}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>About content goes here.</p>
      </IonContent>
    </IonPage>
  );
};

export default About;

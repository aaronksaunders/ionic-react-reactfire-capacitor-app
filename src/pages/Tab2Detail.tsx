import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonMenuButton,
} from "@ionic/react";
import { usePageVisibility } from "../hooks/usePageVisibility";

/**
 * Tab2 Detail page component.
 * @returns {JSX.Element} The Tab2Detail component.
 */
const Tab2Detail: React.FC = () => {
  const isVisible = usePageVisibility();
  return (
    <IonPage className={isVisible ? "ion-page-visible" : "ion-page-invisible"}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/tab2" />
          </IonButtons>
          <IonTitle>Tab 2 Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Detail page for Tab 2</p>
      </IonContent>
    </IonPage>
  );
};

export default Tab2Detail;

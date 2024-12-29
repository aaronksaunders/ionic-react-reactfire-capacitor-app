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
} from "@ionic/react";

/**
 * Tab2 page component.
 * @returns {JSX.Element} The Tab2 component.
 */
const Tab2: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton onClick={() => router.push("/home/tab2/detail")}>
          Go to Detail
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;

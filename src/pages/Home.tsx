import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonRouterOutlet,
} from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import { home, settings } from "ionicons/icons";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab2Detail from "./Tab2Detail";
import "./Home.css";
import { usePageVisibility } from "../hooks/usePageVisibility";

/**
 * Home page component with tabs.
 * @returns {JSX.Element} The Home component.
 */
const Home: React.FC = () => {
  const isVisible = usePageVisibility();

  return (
    <IonTabs className={isVisible ? "ion-page-visible" : "ion-page-invisible"}>
      <IonRouterOutlet>
        <Route path="/home/tab1" component={Tab1} exact />
        <Route path="/home/tab2" component={Tab2} exact />
        <Route path="/home/tab2/detail" component={Tab2Detail} exact />
        <Redirect from="/home" to="/home/tab1" exact />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/home/tab1">
          <IonIcon icon={home} />
          <IonLabel>Tab 1</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/home/tab2">
          <IonIcon icon={settings} />
          <IonLabel>Tab 2</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Home;

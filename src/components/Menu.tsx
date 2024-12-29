import {
  IonContent,
  IonList,
  IonItem,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuToggle,
  useIonRouter,
} from "@ionic/react";
import { useLocation } from "react-router-dom";
import "./Menu.css";

/**
 * Menu component for the drawer navigation.
 * @returns {JSX.Element} The Menu component.
 */
const Menu: React.FC = () => {
  const router = useIonRouter();
  const location = useLocation();

  /**
   * Handles navigation.
   * @param {string} path - The path to navigate to.
   */
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  /**
   * Checks if the given path is active, including child routes.
   * @param {string} path - The path to check.
   * @returns {boolean} True if the path is active, false otherwise.
   */
  const isActive = (path: string) => {
    if (path === "/home") {
      return location.pathname.startsWith("/home");
    }
    return location.pathname === path;
  };

  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle autoHide={false}>
            <IonItem
              button
              onClick={() => handleNavigation("/home")}
              className={isActive("/home") ? "active" : ""}
            >
              Home
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem
              button
              onClick={() => handleNavigation("/settings")}
              className={isActive("/settings") ? "active" : ""}
            >
              Settings
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem
              button
              onClick={() => handleNavigation("/about")}
              className={isActive("/about") ? "active" : ""}
            >
              About
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

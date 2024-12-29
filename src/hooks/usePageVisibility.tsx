import { useState } from "react";
import { useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";

/**
 * Custom hook to manage page visibility in Ionic React
 * @returns {boolean} isVisible - Current visibility state of the page
 */
export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);

  useIonViewWillEnter(() => {
    setIsVisible(true);
  });

  useIonViewWillLeave(() => {
    setIsVisible(false);
  });

  return isVisible;
};

import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const AppTour = ({ storageKey, steps, userId}:{storageKey:any, steps:any,userId:any }) => {
  useEffect(() => {
    if (!steps?.length) return;

   const key = `${storageKey}-${userId}`;

    if (localStorage.getItem(key)) return;

    const driverObj = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      steps,

      onDestroyed: () => {
        localStorage.setItem(key, "true");
      },
    });

    const timer = setTimeout(() => {
      driverObj.drive();
    }, 300);

    return () => clearTimeout(timer);
  }, [storageKey, steps]);

  return null;
};

export default AppTour;
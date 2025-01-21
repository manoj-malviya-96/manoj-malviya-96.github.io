import AtomFullScreenContainer from "../../atoms/atom-full-screen-container";
import React, { useEffect } from "react";
import { useNavbar } from "../../providers/navbar";

interface AppViewProps {
  appName: string;
  appLogo: string;
  children: React.ReactNode;
}

const AppView: React.FC<AppViewProps> = React.memo(
  ({ appName, appLogo, children }) => {
    const { updateBrand } = useNavbar();

    useEffect(() => {
      updateBrand({
        logo: appLogo,
        name: appName,
      });
    }, [appLogo, appName, updateBrand]);

    return (
      <AtomFullScreenContainer
        name={appName.toLowerCase()}
        children={children}
      />
    );
  },
);

export default AppView;

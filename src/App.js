import React from "react";
import RouterConstructor from "./providers/router";
import constructedRoutes from "./main/routes";
import AllProviders from "./main/all-providers";
import initWebsite from "./main/init";

const App = () => {
  initWebsite();
  return (
    <AllProviders>
      <RouterConstructor routes={constructedRoutes} />
    </AllProviders>
  );
};

export default App;

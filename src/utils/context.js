import React from "react";
const AppContext = React.createContext();
export const AppProvide = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
export default AppContext;

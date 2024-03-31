import React, { createContext, useContext, useState } from "react";

// Create ClearedItemsContext
const ClearedItemsContext = createContext();

// Custom hook to use ClearedItemsContext
export const useClearedItems = () => useContext(ClearedItemsContext);

// ClearedItemsProvider component
export const ClearedItemsProvider = ({ children }) => {
  const [updatedClearedItems, setUpdatedClearedItems] = useState({});

  return (
    <ClearedItemsContext.Provider value={{ updatedClearedItems }}>
      {children}
    </ClearedItemsContext.Provider>
  );
};

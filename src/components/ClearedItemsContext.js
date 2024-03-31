import React, { createContext, useContext, useState } from "react";

const ClearedItemsContext = createContext();

export const useClearedItems = () => useContext(ClearedItemsContext);

export const ClearedItemsProvider = ({ children }) => {
  const [clearedItems, setClearedItems] = useState({});

  const updateClearedItems = (updatedClearedItems) => {
    setClearedItems(updatedClearedItems);
  };
  console.log(updateClearedItems);
  return (
    <ClearedItemsContext.Provider value={{ clearedItems, updateClearedItems }}>
      {children}
    </ClearedItemsContext.Provider>
  );
};

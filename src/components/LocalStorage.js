// LocalStorage.js

export const updateLocalStorageData = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
};
// LocalStorage.js

export const getLocalStorageData = () => {
  try {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Error parsing local storage data:", error);
    return null;
  }
};

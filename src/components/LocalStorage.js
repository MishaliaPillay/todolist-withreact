// LocalStorage.js
export const getLocalStorageData = () => {
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : null;
  };
  
  export const updateLocalStorageData = (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
  };
  
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AppContext = createContext();

const AppContextProvider = (props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [todos, setTodos] = useState([]);



  const value = { BACKEND_URL, todos, setTodos };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };

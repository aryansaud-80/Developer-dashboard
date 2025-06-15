import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AppContext = createContext();

const AppContextProvider = (props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState([]);
  const [accessToken, setAccessToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDMwYjAwY2YxNjBiYmMyNTc5OWRhMCIsInVzZXJuYW1lIjoiR2FuZXNoUGF0aGFrMDEyMyIsImVtYWlsIjoiZ2FuZXNocGF0aGFrMjA2M0BnbWFpbC5jb20iLCJpYXQiOjE3NDk5MTQ3NjYsImV4cCI6MTc1MDA4NzU2Nn0.lVBNN3EZQXAzmlnpxnRpj7p2VY3_JCJ41qxHiXAWhfY'
  );

  const value = { BACKEND_URL, todos, setTodos, todo, setTodo, accessToken };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };

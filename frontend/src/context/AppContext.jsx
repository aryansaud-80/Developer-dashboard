import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AppContext = createContext();

const AppContextProvider = (props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState([]);
  const [accessToken, setAccessToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDMwYjAwY2YxNjBiYmMyNTc5OWRhMCIsInVzZXJuYW1lIjoiR2FuZXNoUGF0aGFrMDEyMyIsImVtYWlsIjoiZ2FuZXNocGF0aGFrMjA2M0BnbWFpbC5jb20iLCJpYXQiOjE3NTAwODYwNDUsImV4cCI6MTc1MDI1ODg0NX0.A896OyO1ISinbQYWwjjpkgkbh0B2NirXR1-4VSzOV9k'
  );

  const value = { BACKEND_URL, todos, setTodos, todo, setTodo, accessToken };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };

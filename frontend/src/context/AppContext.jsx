import { createContext, useEffect, useState } from 'react';

const AppContext = createContext();

const AppContextProvider = (props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [snippets, setSnippets] = useState([]);
  const [filterSnippet, setFilterSnippet] = useState([]);
  const [workTime, setWorkTime] = useState(() => {
    return Number(localStorage.getItem('workTime')) || 25;
  });
  const [shortBreak, setShortBreak] = useState(() => {
    return Number(localStorage.getItem('shortBreak')) || 5;
  });
  const [longBreak, setLongBreak] = useState(() => {
    return Number(localStorage.getItem('longBreak')) || 30;
  });

  useEffect(() => {
    localStorage.setItem('workTime', workTime);
  }, [workTime]);

  useEffect(() => {
    localStorage.setItem('shortBreak', shortBreak);
  }, [shortBreak]);

  useEffect(() => {
    localStorage.setItem('longBreak', longBreak);
  }, [longBreak]);

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState([]);
  const [accessToken, _] = useState(import.meta.env.VITE_ACCESS_TOKEN);

  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('AI');

  const value = {
    BACKEND_URL,
    todos,
    setTodos,
    todo,
    setTodo,
    accessToken,
    isSettingOpen,
    setIsSettingOpen,
    pomodoroCount,
    setPomodoroCount,
    workTime,
    setWorkTime,
    shortBreak,
    setShortBreak,
    longBreak,
    setLongBreak,
    filterSnippet,
    setFilterSnippet,
    snippets,
    setSnippets,
    news,
    setNews,
    searchQuery,
    setSearchQuery,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };

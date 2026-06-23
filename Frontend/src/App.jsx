import Sidebar from './SideBar.jsx';
import './App.css';
import ChatWindow from './ChatWindow.jsx';
import { MyContext } from './MyContex.jsx';
import { useState } from "react"; 
import { v1 as uuidv1 } from 'uuid';
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  const[prompt,setPrompt] = useState("");
  const[reply,setReply] = useState(null);
  const[currThreadId,setCurrThreadId] = useState(uuidv1());
  const[prevChats,setPrevChats] = useState([]);
  const[newChat,setNewChat] = useState(true);
  const[allThreads,setAllThreads] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [showHistory, setShowHistory] = useState(true);
  
  const token = localStorage.getItem("token");


  const providerValues = { 
     prompt,setPrompt,
     reply,setReply,
     currThreadId,setCurrThreadId,
     newChat,setNewChat,
     prevChats,setPrevChats,
     allThreads,setAllThreads,
     isAuthenticated, setIsAuthenticated,
     showHistory,setShowHistory,
   };

  useEffect(() => {
  const settings = JSON.parse(localStorage.getItem("settings"));

  if (settings?.lightMode) {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }
}, []);

  return (
    <div className="app">
     <MyContext.Provider value={providerValues}  >
      
    
      <Routes>
            
      <Route path="/login" element = {  token ? <Navigate to="/" /> : <Login />}  />

      <Route path="/register" element = { token ? <Navigate to="/" /> : <Register />}/>

      <Route path="/" element={ token ?
        (
          <div className="app">
              <Sidebar />
              <ChatWindow />
            </div>
          )
          : (
            <Navigate to="/login" />
          )
        }
      />
      </Routes>
     </MyContext.Provider>
    </div>
  
  );
}

export default App;

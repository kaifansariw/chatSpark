import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContex.jsx";
import { useContext , useState , useEffect } from "react";
import { ScaleLoader } from 'react-spinners';
import { useNavigate } from "react-router-dom";
import SettingsDrawer from "./SettingsDrawer.jsx";



function ChatWindow(){
   const { 
         prompt,
         setPrompt,
         reply,
         setReply,
         currThreadId,
         prevChats ,
         setPrevChats,
         setNewChat,
         showHistory,
         setShowHistory 
        } = useContext(MyContext);
   const [loading, setLoading] = useState(false);
   const [isOpen,setIsOpen] = useState(false);
   const user = JSON.parse( localStorage.getItem("user"));
   const navigate = useNavigate(); 
   const [showSettings, setShowSettings] = useState(false);
   const [lightMode, setLightMode] = useState(false);
   const [lastPrompt , setLastPrompt ] = useState(false);

  const getReply = async () => {

  const CurrentPrompt = prompt;

  setLastPrompt(CurrentPrompt);

  setPrevChats((prev) => [
    ...(prev || []),
  {
    role: "user",
    content: CurrentPrompt,
  },
 ]);

  setPrompt("");
 
  if (!prompt.trim()) return;
  
    setLoading(true);
    setNewChat(false);
 
  const token = localStorage.getItem("token");
 
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      message: CurrentPrompt,
      threadId: currThreadId,
    }),
  };
   
  try {

    const response = await fetch( "http://localhost:8080/api/chat", options);

    const data = await response.json();
   
    setReply(data.reply);

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
 };


//Append new chat to previous Chats
   useEffect(() => {
    
    const loadThread = async () => {
      try {
       const token = localStorage.getItem("token");
        fetch(`http://localhost:8080/api/thread/${currThreadId}`,
     {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );       
      } catch (err) {
        console.log(err);
      }
    };

    if (currThreadId) {
      loadThread();
    }
  }, [currThreadId, setPrevChats]);


  useEffect(() => {
   if (!reply) return;

   setPrevChats((prev) => [
    ...prev,
    // { role: "user", content: prompt },
    { role: "assistant", content: reply },
  ]);
    // setPrompt("");
  }, [reply]);


   useEffect(() => {

   const loadSettings = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/auth/settings",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const settings = await response.json();

      setLightMode(settings.lightMode ?? false);
      setShowHistory(settings.showHistory ?? true);

    } catch (err) {
      console.log(err);
    }

  };

  loadSettings();

  }, []);
  
   useEffect(() => {
  if (lightMode) {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
  }
 }, [lightMode]);
 
   const saveSettings = async () => {
   try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8080/api/auth/settings",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lightMode,
          showHistory,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    setShowSettings(false);

  } catch (err) {
    console.log(err);
  }
   };

return(
    <div className="chatWindow">
        <div className="navbar"> 
            <span>ChatSpark </span>
          <div className="userIconDiv" onClick={()=>setIsOpen(!isOpen)}>
             <span className="userName">Welcome {user?.name} </span>
             <span className="userIcon"><i className="fa-solid fa-user"></i></span>
           </div>
        </div>
         {
       isOpen &&
     <div className="dropDown">

      <div
        className="dropDownItem"
        onClick={() => {
        setShowSettings(true);
        setIsOpen(false);
        }}>

       <i className="fa-solid fa-gear"></i>
        Settings
      </div>

     <div
       className="dropDownItem"
       onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }}
    >
      <i className="fa-solid fa-arrow-right-from-bracket"></i>
      Log out
    </div>

  </div>
}
    <Chat/>

      <ScaleLoader color="#fff" loading={loading}>

      </ScaleLoader>
   <div className="chatInput">
     <div className="inputBox">
         <input placeholder="Ask anything"
             value={prompt || ""}
            onChange={(e)=>setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? getReply() : null } 
            />

          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
     </div>

        <p className="info">
           chatSpark can make mistakes. Check important info.
        </p>
        
   </div>
   <SettingsDrawer
    showSettings={showSettings}
    setShowSettings={setShowSettings}
    lightMode={lightMode}
    setLightMode={setLightMode}
    showHistory={showHistory}
    setShowHistory={setShowHistory}
    saveSettings={saveSettings}
   />
 </div>
  )
}

export default ChatWindow;
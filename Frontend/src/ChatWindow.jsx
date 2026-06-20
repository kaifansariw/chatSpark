import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContex.jsx";
import { useContext , useState , useEffect } from "react";
import { ScaleLoader } from 'react-spinners';


function ChatWindow(){
   const { prompt,setPrompt,reply,setReply,currThreadId, prevChats ,setPrevChats,setNewChat } = useContext(MyContext);
   const [loading, setLoading] = useState(false);
   const [isOpen,setIsOpen] = useState(false);
    const user = JSON.parse( localStorage.getItem("user"));


 const getReply = async () => {
 
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
      message: prompt,
      threadId: currThreadId,
    }),
  };
   
  try {
    console.log({
    message: prompt,
    threadId: currThreadId
});
 
    const response = await fetch( "http://localhost:8080/api/chat", options);
    console.log("Status:", response.status);
    const data = await response.json();
   
    console.log("Response Data:", data);
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
    { role: "user", content: prompt },
    { role: "assistant", content: reply },
  ]);

  setPrompt("");
}, [reply]);


return(
    <div className="chatWindow">
        <div className="navbar"> 
            <span>ChatSpark <i className="fa-solid fa-chevron-down"></i></span>
          <div className="userIconDiv" onClick={()=>setIsOpen(!isOpen)}>
             <span className="userName">Welcome {user?.name} </span>
             <span className="userIcon"><i className="fa-solid fa-user"></i></span>
           </div>
        </div>
          {
            isOpen && 
            <div className="dropDown">
              <div className="dropDownItem"> <i className="fa-solid fa-arrow-up-right-from-square"></i> Upgrade Plan</div>
              <div className="dropDownItem"> <i className="fa-solid fa-gear"></i> Settings</div>
              <div className="dropDownItem"  onClick={()=>{
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                 window.location.href="/login";
                 }}>
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
 </div>
  )
}

export default ChatWindow;
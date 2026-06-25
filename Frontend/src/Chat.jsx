import "./Chat.css";
import { useState , useEffect, useContext , useRef} from "react";
import { MyContext } from "./MyContex.jsx";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
 

function Chat(){

  const { newChat, prevChats, reply} = useContext(MyContext);
  const [ latestReply , setLatestReply ] = useState(null);
  const chats = Array.isArray(prevChats) ? prevChats : [];
  const chatRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(()=>{
    if(reply === null) {
     setLatestReply(null);  //previous chat loading
     return;
    }
  
    if (!reply) return;
    if(!prevChats?.length) return;

    const content = reply.split(" ");  //individual words
       
    let idx = 1;

    const interval = setInterval(() => {

  if(idx <= content.length){
     setLatestReply(
       content.slice(0, idx).join(" ")
     );
     idx++;
  }
    else{
       setLatestReply(reply); // full reply
       clearInterval(interval);
      }
    }, 40);

       return () => clearInterval(interval);

   },[prevChats,reply]);


   
useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth"
  });
}, [prevChats, latestReply]);


return(
    <>
  {
  newChat && (
  <div className="welcomeCards">

    <div className="welcomeCard">
      <h3>FAQs</h3>
      <p>
        chatSpark works on the openai model.<br/>
        Response from this model will be slightly slow.<br/>
        It works on open-ai mini-4.1.<br/>
      </p>
    </div>

    <div className="welcomeCard">
      <h3>Functionality</h3>
       <p>
        Switch to light mode from settings.<br/>
        Show and hide history.
      </p>
    </div>

    <div className="welcomeCard">
      <h3>Working</h3>
      <p>
        Write prompt in, input box and get the response.
      </p>
    </div>

  </div>
  )}  
  
 <div className="chats" ref={chatRef}>

  {
  chats.map((chat, idx) => {

    const isLatestAssistant =  idx === chats.length - 1 &&
      chat.role === "assistant" &&
      latestReply !== null;

    return (
      <div key={idx} className={ chat.role === "user" ? "userDiv" : "gptDiv"}>
        {chat.role === "user" ? (
          <p className="userMessage">
            {chat.content}
          </p>
        ) : (
          <ReactMarkdown
            rehypePlugins={[rehypeHighlight]}
          >
            {isLatestAssistant
              ? latestReply
              : chat.content}
          </ReactMarkdown>
        )}
      </div>
      
    );
   })}
   <div ref={bottomRef}></div>
    </div>
  </>
)
}
  


export default Chat;
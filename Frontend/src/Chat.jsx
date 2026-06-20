import "./Chat.css";
import { useState ,useEffect, useContext} from "react";
import { MyContext } from "./MyContex.jsx";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
 

function Chat(){

  const { newChat, prevChats, reply} = useContext(MyContext);
  const [ latestReply , setLatestReply ] = useState(null);
  const chats = Array.isArray(prevChats) ? prevChats : [];
 
  useEffect(()=>{
    if(reply === null) {
     setLatestReply(null);  //previous chat loading
     return;
    }
  
    if (!reply) return;
    if(!prevChats?.length) return;

       const content = reply.split(" ");  //individual words
       
       let idx = 0;
       const interval = setInterval(()=>{
         setLatestReply(content.slice(0,idx).join(" "));
         idx++;
    
     if(idx >= content.length) clearInterval(interval);
       },40);

       return () => clearInterval(interval);

   },[prevChats,reply]);


return(
    <>
    {newChat  && <h1>Start a new chat !</h1>}
  
      <div className="chats">
        {
       chats.slice(0,-1).map((chat,idx)=>
            <div className={ chat.role == "user" ? "userDiv" : "gptDiv"} key={idx}>
             {
              chat.role === "user" ?
               <p className="userMessage">{chat.content}</p> :
             <ReactMarkdown rehypePlugins = {[rehypeHighlight]}  children ={chat.content}/> 
             }
            </div>
           )
        }
    
    {/* to print the latest reply with  */}


    {
      Array.isArray(prevChats) &&
      prevChats?.length > 0 && (
      <>
         {
          latestReply === null ? (
           <div className="gptDiv" key={"non-typing"}>
             <ReactMarkdown rehypePlugins = {[rehypeHighlight]}  children = { prevChats[prevChats.length-1].content }/> 
          </div> 
          ) :  (
            <div className="gptDiv" key={"typing"}>
             <ReactMarkdown rehypePlugins = {[rehypeHighlight]}  children ={latestReply }  /> 
            </div> 
          )
        }
      </> 
      )
  }

      </div>
    </>
   );
 }

export default Chat;
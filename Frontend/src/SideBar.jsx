import './SideBar.css';
import { useContext, useEffect} from 'react';
import { MyContext } from './MyContex.jsx';
import { v1 as uuidv1 } from 'uuid';


 function Sidebar(){

    const { 
      allThreads,
     setAllThreads, 
     currThreadId , 
     setNewChat , 
     setPrompt,
     setReply, 
     setCurrThreadId, 
     setPrevChats
    } = useContext(MyContext);

   const getAllThreads = async()=>{
      try {
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
        lastMessage: thread.messages?.length
          ? thread.messages[thread.messages.length - 1].content
          : "",
      }));
      // console.log(filteredData);
      setAllThreads(filteredData);
    }catch(err){
        console.log(err);
      }
   };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = () => {
     setNewChat(true);
     setPrompt("");
     setReply(null);
     setCurrThreadId(uuidv1());
     setPrevChats([]);
  };
      
const changeThread = async(newThreadId) => {
  setCurrThreadId(newThreadId);

    try{
   const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
    const res = await response.json();
    console.log(res);
    setPrevChats(res);
    // setPrompt("");
    setReply(null);
    // setNewChat(false);
  }catch(err){
      console.log(err);
    }
}

 const deleteThread = async (threadId) => {

  try {
    
    const response =await fetch(`http://localhost:8080/api/thread/${threadId}`, {
      method: "DELETE",
    });
    const res = await response.json();
    console.log(res);

    setAllThreads((prev) =>
      prev.filter(thread => thread.threadId !== threadId)
    );

     if (threadId === currThreadId) {
      createNewChat();
    }
  } catch (err) {
    console.log(err);
  }
};

 return(
     <section className="sidebar">
        <button onClick={createNewChat}>
            <img src="src/assets/" alt="gpt logo" className='logo'/>
           <span> <i className="fa-solid fa-pen-to-square"></i></span>
        </button>
            
       
        <ul className="history">
        {
        allThreads?.map((thread,idx) => (
          <li key={idx}
           onClick={(e)=>changeThread(thread.threadId)}
           className={thread.threadId === currThreadId ? "hightlighted" : " "}>
            {thread.title} 
            <i className="fa-solid fa-trash" 
            onClick={(e)=>{
              e.stopPropagation(); //Stop event bubbling
            deleteThread(thread.threadId) }
          }
            >
             </i>
          </li>
        ))}

      </ul>

        <div className="sign">
              <p>By Kaif Ansari &hearts;</p>
        </div>
     </section>  
    );  
}

export default Sidebar;
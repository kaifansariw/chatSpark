import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/test", async (req, res) => {
    try{
     const thread = new Thread({
      threadId:"kaif",
      title: "Testing new Thread",
     });
     const response = await thread.save();
     res.send(response);

    }catch(error){
     console.log(error);
     res.status(500).json({error: "Failed to save in Db"});
    }
});


//to get all the threads
router.get("/thread", auth , async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({updatedAt: -1});

    const threadSummaries = threads.map((thread) => ({
      threadId: thread.threadId,
      title: thread.title,
      lastMessage: thread.messages?.length
        ? thread.messages[thread.messages.length - 1].content
        : "",
    }));

    res.json(threadSummaries);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to save in DB" });
  }
});


router.get('/thread/:threadId', auth , async(req,res)=>{
    const { threadId } = req.params;
   
    try{
    const thread = await Thread.findOne({threadId});

     if(!thread){
      return res.json([]);
     }

    res.json(thread.messages);

    }catch(error){
     console.log(error);
    return res.json.status(500).json({error:"Failed to fetch chat"});
     }
});


router.delete('/thread/:threadId',auth, async(req,res)=>{
    const {threadId} = req.params;
    try{
        const deletedThread = await Thread.findOneAndDelete({threadId});
        if(!deletedThread){
            return res.status(404).json({error:"Thread not found"});
        }
        return res.status(200).json({message:"Thread was created successfully"});
        
    }catch(error){
       console.log(error);
       return res.json.status(500).json({error:"Failed to delete thread"});
    }
});


router.post('/chat', auth , async(req,res)=>{

    console.log("POST /chat hit");
    console.log(req.body);
    console.log("Body:", req.body);
    const {threadId,message} = req.body;

    try{
        let thread = await Thread.findOne({threadId});

        if(!thread){
            console.log("Creating new thread with title",message.slice(0,30));
            thread = new Thread({
                threadId,
                title: message.slice(0, 30),
                messages:[{
                    role:"user",
                    content:message
                }],
            });

            await thread.save();
        } else {

            // Save every new user message
            await Thread.updateOne(
                { threadId },
                {
                    $push: {
                        messages: {
                            role: "user",
                            content: message
                        }
                    },
                    $set: {
                        updatedAt: new Date()
                    }
                }
            );

            // Update title if still "New chat"
            if(thread.title === "New chat"){
                thread.title = message.slice(0,30);
                await thread.save();
            }
        }

        const assistantReply = await getOpenAIAPIResponse(message);

        await Thread.updateOne(
            { threadId },
            {
                $push: {
                    messages: {
                        role: "assistant",
                        content: assistantReply
                    }
                },
                $set: {
                updatedAt: new Date()
              }
            }
        );

        res.json({ reply: assistantReply });

    } catch(error){
        console.log(error);
        res.status(500).json({ error: "Failed to save in DB" });
    }
});



export default router;
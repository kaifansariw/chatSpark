import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api",chatRoutes);
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

const connectDB = async () => {
  try{
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  }catch(error){
    console.log(error);
  }
}
    console.log("Chat routes loaded");



// app.post("/test", async (req, res) => {

//   const { message } = req.body;

//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`
//     },
//     body: JSON.stringify({
//       model: "gpt-4.1-mini",
//       messages: [
//         {
//           role: "user",
//           content: req.body.message
//         }
//       ]
//     })
//   };

//   try {
//     const response = await fetch(
//       "https://models.inference.ai.azure.com/chat/completions", options);

//     const data = await response.json();
//     console.log(data.choices[0].message.content);

//      res.send(data.choices[0].message.content);

//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: error.message
//     });
//  }
// });
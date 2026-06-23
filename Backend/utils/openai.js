import dotenv from "dotenv";

const getOpenAIAPIResponse = async(message) => {
 
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: message,
        }
      ]
    })
  };

  try {
    const response = await fetch("https://models.inference.ai.azure.com/chat/completions", options);
    const data = await response.json();
    return data.choices[0].message.content;

  }catch (error) {
   console.log(error);
  }
}

export default getOpenAIAPIResponse;
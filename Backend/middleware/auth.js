import jwt from "jsonwebtoken";

const auth = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "No token provided"
    });
  }

  const token = authHeader.split(" ")[1];
   
  if (!token || token === "null") {
    return res.status(401).json({
      error: "Invalid token"
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    
   console.log("JWT ERROR:", error);

   return res.status(401).json({
    error: error.message
  });
}
};

export default auth;


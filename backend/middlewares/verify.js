import jwt from 'jsonwebtoken';
const secret = "avadhesh"; 

function authenticate(req, res, next) {
  const token = req.cookies.uid;

  if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = jwt.verify(token, secret);
    req.user = user; 
    res.redirect("http://localhost:5173/GROUP-PROJECT-1/WeddingCategories");
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export default authenticate;

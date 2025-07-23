// Internal Imports
import { TokenDecoded } from "../utility/tokenUtility.js";

// Middleware for verifying JWT token
export const AuthMiddleware = (req, res, next) => {
  const token = req.cookies.motherToken;
  // Decode the token
  const decodedToken = TokenDecoded(token);

  if (decodedToken === null) {
    return res.json({ status: "Failed", message: "Unauthorize" });
  } else {
    const email = decodedToken.email;
    const mother_id = decodedToken.mother_id;
    req.headers.email = email;
    req.headers.motherId = mother_id;
    next();
  }
};

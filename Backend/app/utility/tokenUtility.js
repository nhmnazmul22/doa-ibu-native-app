// External Imports
import jwt from "jsonwebtoken";

// Internal Imports
import { JWT_EXPIRED_TIME, JWT_KEY } from "../config/config.js";

// Token Encoded
export const TokenEncoded = (mother_id, email) => {
  const KEY = JWT_KEY;
  const JWT_OPTIONS = {
    expiresIn: JWT_EXPIRED_TIME,
  };
  const PAYLOAD = {
    mother_id: mother_id,
    email: email,
  };
  const token = jwt.sign(PAYLOAD, KEY, JWT_OPTIONS);
  return token;
};

// Token Decoded
export const TokenDecoded = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    return decoded;
  } catch (err) {
    return null;
  }
};

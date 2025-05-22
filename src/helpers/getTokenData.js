import jwt from "jsonwebtoken";

export default function getTokenData(req) {
  try {
    const token = req.cookies.get("authToken")?.value || "";

    if (!token) {
      throw new Error("Token not found");
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);

    return {
      email: data.email,
    };
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Invalid token");
  }
}

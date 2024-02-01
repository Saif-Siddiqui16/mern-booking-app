import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(400).json({ message: "token not found" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

  req.userId = (decoded as JwtPayload).userId;
  next();
};

export default verifyToken;

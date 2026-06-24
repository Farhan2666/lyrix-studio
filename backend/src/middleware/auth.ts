import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../index";

const JWT_SECRET = process.env.JWT_SECRET || "lyrix-studio-dev-secret";

export interface AuthRequest extends Request {
  userId?: string;
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: { message: "Authentication required", status: 401 } });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: { message: "Invalid or expired token", status: 401 } });
  }
}

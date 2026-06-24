import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../index";
import { authenticate, AuthRequest } from "../middleware/auth";

const JWT_SECRET = process.env.JWT_SECRET || "lyrix-studio-dev-secret";

export const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existing) {
      res.status(409).json({ error: { message: "Email or username already exists", status: 409 } });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, username, hashedPassword },
      select: { id: true, email: true, username: true, createdAt: true },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: { message: "Registration failed", status: 500 } });
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: { message: "Invalid credentials", status: 401 } });
      return;
    }

    const valid = await bcrypt.compare(password, user.hashedPassword);
    if (!valid) {
      res.status(401).json({ error: { message: "Invalid credentials", status: 401 } });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      user: { id: user.id, email: user.email, username: user.username },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: { message: "Login failed", status: 500 } });
  }
});

authRouter.get("/me", authenticate, async (req: AuthRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, email: true, username: true, avatarUrl: true, permissions: true, premiumExpiry: true, createdAt: true },
  });
  if (!user) {
    res.status(404).json({ error: { message: "User not found", status: 404 } });
    return;
  }
  res.json({ user });
});

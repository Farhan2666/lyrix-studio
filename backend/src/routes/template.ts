import { Router, Request, Response } from "express";
import { prisma } from "../index";

export const templateRouter = Router();

templateRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const templates = await prisma.template.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ templates });
  } catch (err) {
    res.status(500).json({ error: { message: "Failed to fetch templates", status: 500 } });
  }
});

templateRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const template = await prisma.template.findUnique({
      where: { id },
    });
    if (!template) {
      res.status(404).json({ error: { message: "Template not found", status: 404 } });
      return;
    }
    res.json({ template });
  } catch (err) {
    res.status(500).json({ error: { message: "Failed to fetch template", status: 500 } });
  }
});

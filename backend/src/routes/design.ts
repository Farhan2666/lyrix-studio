import { Router, Response } from "express";
import { prisma } from "../index";
import { authenticate, AuthRequest } from "../middleware/auth";

export const designRouter = Router();

designRouter.use(authenticate);

designRouter.post("/new", async (req: AuthRequest, res: Response) => {
  try {
    const { title, templateId, cssProperties } = req.body;
    const design = await prisma.design.create({
      data: {
        userId: req.userId!,
        title: title || "Untitled Design",
        templateId: templateId || null,
        cssProperties: cssProperties || {},
      },
    });
    res.status(201).json({ design });
  } catch (err) {
    console.error("Create design error:", err);
    res.status(500).json({ error: { message: "Failed to create design", status: 500 } });
  }
});

designRouter.patch("/update/:id", async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const design = await prisma.design.findFirst({
      where: { id, userId: req.userId },
    });
    if (!design) {
      res.status(404).json({ error: { message: "Design not found", status: 404 } });
      return;
    }

    const updated = await prisma.design.update({
      where: { id },
      data: {
        cssProperties: req.body.cssProperties ?? design.cssProperties,
        animationProfile: req.body.animationProfile ?? design.animationProfile,
        hardwareSettings: req.body.hardwareSettings ?? design.hardwareSettings,
      },
    });

    res.json({ design: updated, version: updated.updatedAt.getTime() });
  } catch (err) {
    res.status(500).json({ error: { message: "Update failed", status: 500 } });
  }
});

designRouter.get("/preview/:id", async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const design = await prisma.design.findFirst({
      where: { id, userId: req.userId },
      include: { audioFile: true },
    });
    if (!design) {
      res.status(404).json({ error: { message: "Design not found", status: 404 } });
      return;
    }
    res.json({ design });
  } catch (err) {
    res.status(500).json({ error: { message: "Preview failed", status: 500 } });
  }
});

designRouter.get("/list", async (req: AuthRequest, res: Response) => {
  try {
    const designs = await prisma.design.findMany({
      where: { userId: req.userId },
      orderBy: { updatedAt: "desc" },
      select: { id: true, title: true, updatedAt: true, templateId: true },
    });
    res.json({ designs });
  } catch (err) {
    res.status(500).json({ error: { message: "List failed", status: 500 } });
  }
});

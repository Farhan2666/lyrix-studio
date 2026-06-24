import { Router, Request, Response } from "express";
import multer from "multer";
import { prisma } from "../index";

export const audioRouter = Router();

const upload = multer({ dest: "/tmp/lyrix-uploads/" });

audioRouter.post("/analyze", upload.single("file"), async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: { message: "No audio file provided", status: 400 } });
      return;
    }

    // Placeholder: real analysis with LibROSA/Python
    const audio = await prisma.audioFile.create({
      data: {
        fingerprint: `fp-${Date.now()}`,
        storagePath: file.path,
        title: req.body.title || null,
        artist: req.body.artist || null,
        bpm: 120,
        duration: 180,
      },
    });

    res.json({
      audio,
      analysis: {
        bpm: 120,
        key: "C minor",
        waveform: "placeholder",
        duration: 180,
      },
    });
  } catch (err) {
    console.error("Audio analyze error:", err);
    res.status(500).json({ error: { message: "Audio analysis failed", status: 500 } });
  }
});

audioRouter.get("/match/:fingerprint", async (req: Request, res: Response) => {
  try {
    const fingerprint = req.params.fingerprint as string;
    const audio = await prisma.audioFile.findUnique({
      where: { fingerprint },
    });
    if (!audio) {
      res.status(404).json({ error: { message: "Audio not found", status: 404 } });
      return;
    }
    res.json({ audio });
  } catch (err) {
    res.status(500).json({ error: { message: "Match failed", status: 500 } });
  }
});

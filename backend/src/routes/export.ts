import { Router, Response } from "express";
import { authenticate, AuthRequest } from "../middleware/auth";

export const exportRouter = Router();

exportRouter.use(authenticate);

interface ExportJob {
  id: string;
  userId: string;
  designId: string;
  format: string;
  resolution: string;
  status: "queued" | "processing" | "completed" | "failed";
  progress: number;
  downloadUrl: string | null;
  createdAt: Date;
}

const exportJobs: ExportJob[] = [];

exportRouter.post("/video", async (req: AuthRequest, res: Response) => {
  try {
    const { designId, quality } = req.body;

    const job: ExportJob = {
      id: `job-${Date.now()}`,
      userId: req.userId!,
      designId,
      format: quality?.format || "mp4",
      resolution: quality?.resolution || "1080p",
      status: "queued",
      progress: 0,
      downloadUrl: null,
      createdAt: new Date(),
    };

    exportJobs.push(job);

    // Simulate async processing
    setTimeout(() => {
      const j = exportJobs.find((j) => j.id === job.id);
      if (j) {
        j.status = "completed";
        j.progress = 100;
        j.downloadUrl = `https://cdn.lyrix.studio/exports/${job.id}.${job.format}`;
      }
    }, 5000);

    res.status(201).json({ job_id: job.id, status: "queued" });
  } catch (err) {
    res.status(500).json({ error: { message: "Export failed", status: 500 } });
  }
});

exportRouter.get("/status/:jobId", async (req: AuthRequest, res: Response) => {
  const job = exportJobs.find((j) => j.id === req.params.jobId && j.userId === req.userId);
  if (!job) {
    res.status(404).json({ error: { message: "Job not found", status: 404 } });
    return;
  }
  res.json({
    job_id: job.id,
    status: job.status,
    progress: job.progress,
    download_url: job.downloadUrl,
  });
});

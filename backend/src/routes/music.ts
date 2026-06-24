import { Router, Request, Response } from "express";
import {
  searchSongs,
  getLyrics,
  getLyricsBySearch,
  getTrending,
  getArtistInfo,
  getTemplatesForGenre,
} from "../services/music-service";

export const musicRouter = Router();

musicRouter.get("/search", async (req: Request, res: Response) => {
  try {
    const query = (req.query.q as string) || "";
    const results = await searchSongs(query);
    res.json({ results });
  } catch (err) {
    console.error("Music search error:", err);
    res.status(500).json({ error: { message: "Search failed", status: 500 } });
  }
});

musicRouter.get("/lyrics/:trackId", async (req: Request, res: Response) => {
  try {
    const id = req.params.trackId as string;
    const lyrics = await getLyrics(id);
    if (!lyrics) {
      res.status(404).json({ error: { message: "Lyrics not found", status: 404 } });
      return;
    }
    res.json({ lyrics });
  } catch (err) {
    res.status(500).json({ error: { message: "Failed to fetch lyrics", status: 500 } });
  }
});

musicRouter.get("/lyrics", async (req: Request, res: Response) => {
  try {
    const title = req.query.title as string;
    const artist = req.query.artist as string;
    if (!title) {
      res.status(400).json({ error: { message: "Title is required", status: 400 } });
      return;
    }
    const lyrics = await getLyricsBySearch(title, artist || "");
    if (!lyrics) {
      res.status(404).json({ error: { message: "Lyrics not found", status: 404 } });
      return;
    }
    res.json({ lyrics });
  } catch (err) {
    res.status(500).json({ error: { message: "Failed to fetch lyrics", status: 500 } });
  }
});

musicRouter.get("/trending", async (_req: Request, res: Response) => {
  try {
    const trending = await getTrending();
    res.json({ trending });
  } catch (err) {
    res.status(500).json({ error: { message: "Failed to fetch trending", status: 500 } });
  }
});

musicRouter.get("/artist", async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    if (!name) {
      res.status(400).json({ error: { message: "Artist name is required", status: 400 } });
      return;
    }
    const info = await getArtistInfo(name);
    if (!info) {
      res.status(404).json({ error: { message: "Artist not found", status: 404 } });
      return;
    }
    res.json({ artist: info });
  } catch (err) {
    res.status(500).json({ error: { message: "Failed to fetch artist", status: 500 } });
  }
});

musicRouter.get("/suggest-templates", async (req: Request, res: Response) => {
  try {
    const genre = req.query.genre as string;
    if (!genre) {
      res.status(400).json({ error: { message: "Genre is required", status: 400 } });
      return;
    }
    const templates = await getTemplatesForGenre(genre);
    res.json({ templates });
  } catch (err) {
    res.status(500).json({ error: { message: "Failed to suggest templates", status: 500 } });
  }
});

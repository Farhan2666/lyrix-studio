export interface SongResult {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  previewUrl: string | null;
  genre: string;
  duration: number;
  source: string;
}

export interface LyricsResult {
  lyrics: string;
  source: string;
  copyright: string;
}

export interface ArtistInfo {
  name: string;
  image: string;
  bio: string;
  similar: { name: string; image: string }[];
  topTracks: { title: string; plays: string }[];
  genre: string;
}

export interface TrendingSong {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  genre: string;
  plays: string;
}

// Simulated in-memory catalog with diverse genres
const musicCatalog: SongResult[] = [
  { id: "track-001", title: "Neon Dreams", artist: "Crystal Waves", album: "Digital Horizon", albumArt: "https://picsum.photos/seed/neon-dreams/300/300", previewUrl: null, genre: "EDM", duration: 214, source: "demo" },
  { id: "track-002", title: "Midnight Drive", artist: "The Synths", album: "Retro Future", albumArt: "https://picsum.photos/seed/midnight-drive/300/300", previewUrl: null, genre: "Synthwave", duration: 248, source: "demo" },
  { id: "track-003", title: "Urban Poetry", artist: "MC Flow", album: "Street Tales", albumArt: "https://picsum.photos/seed/urban-poetry/300/300", previewUrl: null, genre: "Hip-Hop", duration: 195, source: "demo" },
  { id: "track-004", title: "Acoustic Hearts", artist: "Wild Fern", album: "Campfire Sessions", albumArt: "https://picsum.photos/seed/acoustic-hearts/300/300", previewUrl: null, genre: "Indie", duration: 267, source: "demo" },
  { id: "track-005", title: "Electric Pulse", artist: "Bass Reactor", album: "Voltage", albumArt: "https://picsum.photos/seed/electric-pulse/300/300", previewUrl: null, genre: "EDM", duration: 189, source: "demo" },
  { id: "track-006", title: "Starlight Serenade", artist: "Luna Ray", album: "Celestial", albumArt: "https://picsum.photos/seed/starlight/300/300", previewUrl: null, genre: "Pop", duration: 233, source: "demo" },
  { id: "track-007", title: "Thunder Road", artist: "The Rebels", album: "Highway Anthem", albumArt: "https://picsum.photos/seed/thunder-road/300/300", previewUrl: null, genre: "Rock", duration: 278, source: "demo" },
  { id: "track-008", title: "Velvet Night", artist: "Jazz Collective", album: "After Hours", albumArt: "https://picsum.photos/seed/velvet-night/300/300", previewUrl: null, genre: "Jazz", duration: 312, source: "demo" },
  { id: "track-009", title: "Ocean Breeze", artist: "Coral Reef", album: "Deep Blue", albumArt: "https://picsum.photos/seed/ocean-breeze/300/300", previewUrl: null, genre: "Ambient", duration: 345, source: "demo" },
  { id: "track-010", title: "Fire Dance", artist: "Rhythm Nation", album: "Tribal Beats", albumArt: "https://picsum.photos/seed/fire-dance/300/300", previewUrl: null, genre: "World", duration: 201, source: "demo" },
];

const lyricsDatabase: Record<string, string> = {
  "track-001": `Lost in the glow of electric skies\nChasing the light in your eyes\nNeon dreams burning bright\nDancing through the endless night\n\nFeel the bass in your soul\nLet the rhythm take control\nEvery beat a new tomorrow\nDrowning out the pain and sorrow`,
  "track-002": `Cruising down the empty streets\nNeon signs and beating hearts\nMidnight air so thick and sweet\nPlaying out our favorite parts\n\nThe radio plays our song\nAs the world moves on and on\nRed lights blur into the night\nEverything's gonna be alright`,
  "track-003": `Concrete jungle, I was born and raised\nEvery corner tells a story of the streets I walked\nFrom the bottom to the top, I found my way\nThese words are my weapon when I talk\n\nThey said I wouldn't make it\nBut I had to prove them wrong\nEvery verse I write is sacred\nThis is where I belong`,
  "track-004": `Sitting by the firelight\nGuitar strings under my fingers\nStars are painting the night\nA melody that lingers\n\nSimple words and honest tunes\nUnderneath the silver moon\nEvery note a piece of home\nNo more places left to roam`,
  "track-005": `Can you feel the voltage rise\nElectric currents in the air\nThe bass drops and we synchronize\nA primal rhythm without care\n\nPulse, pulse, electric pulse\nFeel it running through your veins\nPulse, pulse, electric pulse\nBreaking all your mental chains`,
  "track-006": `You light up the dark like the stars above\nEvery moment with you feels like love\nStarlight serenade, play it for me\nA melody of what we're meant to be\n\nWhen the night falls down\nAnd the world is asleep\nYour love is the only sound\nA promise I will keep`,
  "track-007": `Thunder on the highway, lightning in my veins\nBurning rubber on the asphalt, breaking all the chains\nWind is screaming through my hair\nI've got nothing left to spare\n\nThis road is my religion\nThe engine is my prayer\nEvery mile a vision\nOf leaving my despair`,
  "track-008": `Smoke and mirrors, dim lit room\nSaxophone plays a mournful tune\nVelvet night wraps around\nThe sweetest melancholy sound\n\nWhiskey glasses clink and fade\nIn the corner, a serenade\nJazz and wine, a perfect pair\nLost in the midnight air`,
  "track-009": `Waves crashing on the shore\nI don't need anything more\nOcean breeze upon my face\nFinding my own peace and space\n\nThe horizon calls my name\nNothing here is quite the same\nUnderneath the endless blue\nI've found a world that's pure and true`,
  "track-010": `Drums beating in the night\nFire dancing, burning bright\nAncient rhythms come alive\nFeel the primal energy thrive\n\nCircle round the sacred flame\nCalling out a forgotten name\nEarth and fire, wind and air\nA tribal heartbeat everywhere`,
};

const trendingSongs: TrendingSong[] = [
  { id: "trend-001", title: "Neon Dreams", artist: "Crystal Waves", albumArt: "https://picsum.photos/seed/neon-dreams/300/300", genre: "EDM", plays: "12.4M" },
  { id: "trend-002", title: "Starlight Serenade", artist: "Luna Ray", albumArt: "https://picsum.photos/seed/starlight/300/300", genre: "Pop", plays: "9.8M" },
  { id: "trend-003", title: "Thunder Road", artist: "The Rebels", albumArt: "https://picsum.photos/seed/thunder-road/300/300", genre: "Rock", plays: "8.2M" },
  { id: "trend-004", title: "Urban Poetry", artist: "MC Flow", albumArt: "https://picsum.photos/seed/urban-poetry/300/300", genre: "Hip-Hop", plays: "7.5M" },
  { id: "trend-005", title: "Electric Pulse", artist: "Bass Reactor", albumArt: "https://picsum.photos/seed/electric-pulse/300/300", genre: "EDM", plays: "6.9M" },
  { id: "trend-006", title: "Midnight Drive", artist: "The Synths", albumArt: "https://picsum.photos/seed/midnight-drive/300/300", genre: "Synthwave", plays: "5.7M" },
  { id: "trend-007", title: "Acoustic Hearts", artist: "Wild Fern", albumArt: "https://picsum.photos/seed/acoustic-hearts/300/300", genre: "Indie", plays: "4.3M" },
  { id: "trend-008", title: "Velvet Night", artist: "Jazz Collective", albumArt: "https://picsum.photos/seed/velvet-night/300/300", genre: "Jazz", plays: "3.1M" },
];

const artistDatabase: Record<string, ArtistInfo> = {
  "Crystal Waves": { name: "Crystal Waves", image: "https://picsum.photos/seed/crystal-waves-artist/300/300", bio: "Crystal Waves is an electronic music producer known for blending ambient textures with driving EDM beats. Their debut album 'Digital Horizon' topped the electronic charts in 2024.", similar: [{ name: "Bass Reactor", image: "https://picsum.photos/seed/bass-reactor/300/300" }, { name: "Luna Ray", image: "https://picsum.photos/seed/luna-ray/300/300" }], topTracks: [{ title: "Neon Dreams", plays: "12.4M" }, { title: "Digital Sunrise", plays: "8.1M" }], genre: "EDM" },
  "The Synths": { name: "The Synths", image: "https://picsum.photos/seed/the-synths-artist/300/300", bio: "The Synths are a retro-futuristic band that brings the 80s back to life with modern production. Their unique blend of synthwave and modern pop has earned them a dedicated following.", similar: [{ name: "Crystal Waves", image: "https://picsum.photos/seed/crystal-waves-artist/300/300" }], topTracks: [{ title: "Midnight Drive", plays: "5.7M" }, { title: "Retro Future", plays: "4.2M" }], genre: "Synthwave" },
  "MC Flow": { name: "MC Flow", image: "https://picsum.photos/seed/mc-flow-artist/300/300", bio: "MC Flow emerged from the underground hip-hop scene with raw lyricism and conscious messaging. Their album 'Street Tales' documents life in the city with unflinching honesty.", similar: [{ name: "Rhythm Nation", image: "https://picsum.photos/seed/rhythm-nation/300/300" }], topTracks: [{ title: "Urban Poetry", plays: "7.5M" }, { title: "Street Cred", plays: "3.9M" }], genre: "Hip-Hop" },
  "Wild Fern": { name: "Wild Fern", image: "https://picsum.photos/seed/wild-fern-artist/300/300", bio: "Wild Fern is an indie folk artist whose warm acoustic sound and heartfelt lyrics have made them a festival favorite. Their 'Campfire Sessions' album was recorded live in a single take.", similar: [{ name: "Jazz Collective", image: "https://picsum.photos/seed/jazz-collective/300/300" }], topTracks: [{ title: "Acoustic Hearts", plays: "4.3M" }, { title: "Mountain Song", plays: "3.1M" }], genre: "Indie" },
};

export async function searchSongs(query: string): Promise<SongResult[]> {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return musicCatalog.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q) ||
      s.album.toLowerCase().includes(q)
  );
}

export async function getLyrics(trackId: string): Promise<LyricsResult | null> {
  const lyrics = lyricsDatabase[trackId];
  if (!lyrics) return null;
  return { lyrics, source: "Genius", copyright: "Lyrics are property of their respective owners." };
}

export async function getLyricsBySearch(title: string, artist: string): Promise<LyricsResult | null> {
  const track = musicCatalog.find(
    (s) =>
      s.title.toLowerCase() === title.toLowerCase() &&
      s.artist.toLowerCase() === artist.toLowerCase()
  );
  if (!track) {
    const similar = musicCatalog.find(
      (s) =>
        s.title.toLowerCase().includes(title.toLowerCase()) ||
        s.artist.toLowerCase().includes(artist.toLowerCase())
    );
    if (!similar) return null;
    return getLyrics(similar.id);
  }
  return getLyrics(track.id);
}

export async function getTrending(): Promise<TrendingSong[]> {
  return trendingSongs;
}

export async function getArtistInfo(name: string): Promise<ArtistInfo | null> {
  const info = artistDatabase[name];
  if (info) return info;

  const track = musicCatalog.find(
    (s) => s.artist.toLowerCase().includes(name.toLowerCase())
  );
  if (!track) return null;
  return artistDatabase[track.artist] || null;
}

export async function getTemplatesForGenre(genre: string): Promise<string[]> {
  const genreMap: Record<string, string[]> = {
    EDM: ["Neon Pulse", "Cyber Rain"],
    Synthwave: ["Midnight Vapor"],
    "Hip-Hop": ["Urban Flow", "Lo-Fi Beats"],
    Indie: ["Acoustic Warmth", "Jazz Night"],
    Rock: ["Rock Anthem"],
    Pop: ["Neon Pulse"],
    Jazz: ["Jazz Night"],
    Ambient: ["Acoustic Warmth"],
    World: ["Urban Flow"],
  };
  return genreMap[genre] || [];
}

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

export const musicCatalog: SongResult[] = [
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

export const lyricsDatabase: Record<string, string> = {
  "track-001": `Lost in the glow of electric skies
Chasing the light in your eyes
Neon dreams burning bright
Dancing through the endless night

Feel the bass in your soul
Let the rhythm take control
Every beat a new tomorrow
Drowning out the pain and sorrow`,
  "track-002": `Cruising down the empty streets
Neon signs and beating hearts
Midnight air so thick and sweet
Playing out our favorite parts

The radio plays our song
As the world moves on and on
Red lights blur into the night
Everything's gonna be alright`,
  "track-003": `Concrete jungle, I was born and raised
Every corner tells a story of the streets I walked
From the bottom to the top, I found my way
These words are my weapon when I talk

They said I wouldn't make it
But I had to prove them wrong
Every verse I write is sacred
This is where I belong`,
  "track-004": `Sitting by the firelight
Guitar strings under my fingers
Stars are painting the night
A melody that lingers

Simple words and honest tunes
Underneath the silver moon
Every note a piece of home
No more places left to roam`,
  "track-005": `Can you feel the voltage rise
Electric currents in the air
The bass drops and we synchronize
A primal rhythm without care

Pulse, pulse, electric pulse
Feel it running through your veins
Pulse, pulse, electric pulse
Breaking all your mental chains`,
  "track-006": `You light up the dark like the stars above
Every moment with you feels like love
Starlight serenade, play it for me
A melody of what we're meant to be

When the night falls down
And the world is asleep
Your love is the only sound
A promise I will keep`,
  "track-007": `Thunder on the highway, lightning in my veins
Burning rubber on the asphalt, breaking all the chains
Wind is screaming through my hair
I've got nothing left to spare

This road is my religion
The engine is my prayer
Every mile a vision
Of leaving my despair`,
  "track-008": `Smoke and mirrors, dim lit room
Saxophone plays a mournful tune
Velvet night wraps around
The sweetest melancholy sound

Whiskey glasses clink and fade
In the corner, a serenade
Jazz and wine, a perfect pair
Lost in the midnight air`,
  "track-009": `Waves crashing on the shore
I don't need anything more
Ocean breeze upon my face
Finding my own peace and space

The horizon calls my name
Nothing here is quite the same
Underneath the endless blue
I've found a world that's pure and true`,
  "track-010": `Drums beating in the night
Fire dancing, burning bright
Ancient rhythms come alive
Feel the primal energy thrive

Circle round the sacred flame
Calling out a forgotten name
Earth and fire, wind and air
A tribal heartbeat everywhere`,
};

export const trendingSongs: TrendingSong[] = [
  { id: "trend-001", title: "Neon Dreams", artist: "Crystal Waves", albumArt: "https://picsum.photos/seed/neon-dreams/300/300", genre: "EDM", plays: "12.4M" },
  { id: "trend-002", title: "Starlight Serenade", artist: "Luna Ray", albumArt: "https://picsum.photos/seed/starlight/300/300", genre: "Pop", plays: "9.8M" },
  { id: "trend-003", title: "Thunder Road", artist: "The Rebels", albumArt: "https://picsum.photos/seed/thunder-road/300/300", genre: "Rock", plays: "8.2M" },
  { id: "trend-004", title: "Urban Poetry", artist: "MC Flow", albumArt: "https://picsum.photos/seed/urban-poetry/300/300", genre: "Hip-Hop", plays: "7.5M" },
  { id: "trend-005", title: "Electric Pulse", artist: "Bass Reactor", albumArt: "https://picsum.photos/seed/electric-pulse/300/300", genre: "EDM", plays: "6.9M" },
  { id: "trend-006", title: "Midnight Drive", artist: "The Synths", albumArt: "https://picsum.photos/seed/midnight-drive/300/300", genre: "Synthwave", plays: "5.7M" },
  { id: "trend-007", title: "Acoustic Hearts", artist: "Wild Fern", albumArt: "https://picsum.photos/seed/acoustic-hearts/300/300", genre: "Indie", plays: "4.3M" },
  { id: "trend-008", title: "Velvet Night", artist: "Jazz Collective", albumArt: "https://picsum.photos/seed/velvet-night/300/300", genre: "Jazz", plays: "3.1M" },
];

export const artistDatabase: Record<string, ArtistInfo> = {
  "Crystal Waves": { name: "Crystal Waves", image: "https://picsum.photos/seed/crystal-waves-artist/300/300", bio: "Crystal Waves is an electronic music producer known for blending ambient textures with driving EDM beats. Their debut album 'Digital Horizon' topped the electronic charts in 2024.", similar: [{ name: "Bass Reactor", image: "https://picsum.photos/seed/bass-reactor/300/300" }, { name: "Luna Ray", image: "https://picsum.photos/seed/luna-ray/300/300" }], topTracks: [{ title: "Neon Dreams", plays: "12.4M" }, { title: "Digital Sunrise", plays: "8.1M" }], genre: "EDM" },
  "The Synths": { name: "The Synths", image: "https://picsum.photos/seed/the-synths-artist/300/300", bio: "The Synths are a retro-futuristic band that brings the 80s back to life with modern production. Their unique blend of synthwave and modern pop has earned them a dedicated following.", similar: [{ name: "Crystal Waves", image: "https://picsum.photos/seed/crystal-waves-artist/300/300" }], topTracks: [{ title: "Midnight Drive", plays: "5.7M" }, { title: "Retro Future", plays: "4.2M" }], genre: "Synthwave" },
  "MC Flow": { name: "MC Flow", image: "https://picsum.photos/seed/mc-flow-artist/300/300", bio: "MC Flow emerged from the underground hip-hop scene with raw lyricism and conscious messaging. Their album 'Street Tales' documents life in the city with unflinching honesty.", similar: [{ name: "Rhythm Nation", image: "https://picsum.photos/seed/rhythm-nation/300/300" }], topTracks: [{ title: "Urban Poetry", plays: "7.5M" }, { title: "Street Cred", plays: "3.9M" }], genre: "Hip-Hop" },
  "Wild Fern": { name: "Wild Fern", image: "https://picsum.photos/seed/wild-fern-artist/300/300", bio: "Wild Fern is an indie folk artist whose warm acoustic sound and heartfelt lyrics have made them a festival favorite. Their 'Campfire Sessions' album was recorded live in a single take.", similar: [{ name: "Jazz Collective", image: "https://picsum.photos/seed/jazz-collective/300/300" }], topTracks: [{ title: "Acoustic Hearts", plays: "4.3M" }, { title: "Mountain Song", plays: "3.1M" }], genre: "Indie" },
};

export function searchSongs(query: string): SongResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return musicCatalog.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q) ||
      s.album.toLowerCase().includes(q)
  );
}

export function getLyrics(trackId: string): LyricsResult | null {
  const lyrics = lyricsDatabase[trackId];
  if (!lyrics) return null;
  return { lyrics, source: "Genius", copyright: "Lyrics are property of their respective owners." };
}

export function getLyricsBySearch(title: string, artist?: string): LyricsResult | null {
  const track = musicCatalog.find(
    (s) =>
      s.title.toLowerCase() === title.toLowerCase() &&
      (!artist || s.artist.toLowerCase() === artist.toLowerCase())
  );
  if (!track) {
    const similar = musicCatalog.find(
      (s) =>
        s.title.toLowerCase().includes(title.toLowerCase()) ||
        (artist && s.artist.toLowerCase().includes(artist.toLowerCase()))
    );
    if (!similar) return null;
    return getLyrics(similar.id);
  }
  return getLyrics(track.id);
}

export const genreBpmMap: Record<string, number> = {
  EDM: 128, Synthwave: 90, "Hip-Hop": 95, Indie: 110, Rock: 140, Pop: 120, Jazz: 70, Ambient: 80, World: 100,
};

export interface Track {
  id: number;
  title: string;
  artist: string;
  coverUrl?: string;
  addedAt: Date;
}

export class TrackService {
  private tracks: Track[] = [];

  constructor() {
    this.tracks = this.load();
  }

  private load(): Track[] {
    const data = localStorage.getItem("tracks");
    if (!data) return [];
    try {
      return JSON.parse(data).map((t: any) => ({ ...t, addedAt: new Date(t.addedAt) }));
    } catch {
      return [];
    }
  }

  private save(): void {
    localStorage.setItem("tracks", JSON.stringify(this.tracks));
  }

  public getAll(): Track[] {
    return [...this.tracks];
  }

  public add(title: string, artist: string, coverUrl?: string): void {
    const newTrack: Track = { id: Date.now(), title, artist, coverUrl, addedAt: new Date() };
    this.tracks.push(newTrack);
    this.save();
  }

  public remove(id: number): void {
    this.tracks = this.tracks.filter(t => t.id !== id);
    this.save();
  }
}
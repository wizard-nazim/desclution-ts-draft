export class TrackService {
    tracks = [];
    listeners = [];
    constructor() {
        this.tracks = this.load();
    }
    load() {
        const data = localStorage.getItem("tracks");
        if (!data)
            return [];
        try {
            return JSON.parse(data).map((t) => ({
                ...t,
                addedAt: new Date(t.addedAt)
            }));
        }
        catch {
            return [];
        }
    }
    save() {
        localStorage.setItem("tracks", JSON.stringify(this.tracks));
        this.notify();
    }
    notify() {
        this.listeners.forEach(listener => listener([...this.tracks]));
    }
    subscribe(listener) {
        this.listeners.push(listener);
        // Immediately provide current data to the new subscriber
        listener([...this.tracks]);
    }
    getAll() {
        return [...this.tracks];
    }
    add(title, artist, coverUrl) {
        const newTrack = {
            id: Date.now(),
            title,
            artist,
            coverUrl,
            addedAt: new Date()
        };
        this.tracks.push(newTrack);
        this.save();
    }
    remove(id) {
        this.tracks = this.tracks.filter(t => t.id !== id);
        this.save();
    }
}
//# sourceMappingURL=trackService.js.map
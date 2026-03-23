// Types & Interfaces
interface User {
  firstName: string;
  lastName: string;
  role: string;
}

interface Track {
  id: number;
  title: string;
  artist: string;
  coverUrl?: string;
  addedAt: Date;
}

// Data
const currentUser: User = {
  firstName: "Nazim",
  lastName: "Rafudeen",
  role: "Admin",
};

// Track Manager Class
class TrackManager {
  private tracks: Track[] = [];
  private nextId = 1;

  constructor() {
    this.loadFromStorage();
    this.renderTracks();
  }

  private saveToStorage() {
    localStorage.setItem("tracks", JSON.stringify(this.tracks));
    localStorage.setItem("nextId", this.nextId.toString());
  }

  private loadFromStorage() {
    const storedTracks = localStorage.getItem("tracks");
    const storedNextId = localStorage.getItem("nextId");

    if (storedTracks) {
      this.tracks = JSON.parse(storedTracks).map((t: any) => ({
        ...t,
        addedAt: new Date(t.addedAt),
      }));
    }
    if (storedNextId) {
      this.nextId = parseInt(storedNextId, 10);
    }
  }

  addTrack(title: string, artist: string, coverUrl?: string) {
    const newTrack: Track = {
      id: this.nextId++,
      title,
      artist,
      coverUrl,
      addedAt: new Date(),
    };
    this.tracks.push(newTrack);
    this.saveToStorage();
    this.renderTracks();
  }

  deleteTrack(id: number) {
    this.tracks = this.tracks.filter(track => track.id !== id);
    this.saveToStorage();
    this.renderTracks();
  }

  renderTracks() {
    const list = document.getElementById("tracksList") as HTMLUListElement | null;
    if (!list) return;

    list.innerHTML = "";
    this.tracks.forEach(track => {
      const li = document.createElement("li");
      li.className = "track-item";

      const cover = track.coverUrl
        ? `<img src="${track.coverUrl}" alt="${track.title} cover" class="track-cover">`
        : `<div class="track-cover">💿</div>`;

      li.innerHTML = `
        ${cover}
        <div class="track-info">
          <h3>${track.title}</h3>
          <p>${track.artist}</p>
        </div>
        <div class="track-date">
          Added: ${track.addedAt.toLocaleDateString()}
        </div>
        <button class="delete-btn">✖</button>
      `;

      const deleteBtn = li.querySelector(".delete-btn") as HTMLButtonElement;
      deleteBtn.addEventListener("click", () => this.deleteTrack(track.id));

      list.appendChild(li);
    });
  }
}

// Rendering Functions
const renderNavbar = (user: User): string => `
  <nav class="navbar">
    <div class="logo"><strong>Desclution</strong></div>
    <ul class="nav-links">
      <li><a href="#">Dashboard</a></li>
      <li><a href="#">Projects</a></li>
      <li><a href="#">Media</a></li>
    </ul>
    <div class="user-profile">${user.firstName} (${user.role})</div>
  </nav>
`;

const renderHero = (user: User): string => `
  <div class="hero">
    <h1>Welcome back, ${user.firstName}</h1>
    <p>System Status: <span style="color: #00ff5e;">Online</span></p>
  </div>
`;

// Form Setup
function setupForm(manager: TrackManager) {
  const form = document.getElementById("trackForm") as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = (document.getElementById("title") as HTMLInputElement).value.trim();
    const artist = (document.getElementById("artist") as HTMLInputElement).value.trim();
    const cover = (document.getElementById("coverUrl") as HTMLInputElement).value.trim() || undefined;

    if (title && artist) {
      manager.addTrack(title, artist, cover);
      form.reset();
    }
  });
}

// Init
const app = document.querySelector("#navbar") as HTMLElement | null;
if (app) app.innerHTML = renderNavbar(currentUser);

const hero = document.querySelector("#hero") as HTMLElement | null;
if (hero) hero.innerHTML = renderHero(currentUser);

const manager = new TrackManager();
setupForm(manager);

// Demo tracks (only add if no stored tracks)
if (localStorage.getItem("tracks") === null) {
  manager.addTrack("Afternoon", "vetkat", "https://i1.sndcdn.com/artworks-Ud2YSLtr4yD33tIm-UsYZhA-t500x500.jpg?w=300&h=300&fit=crop");
  manager.addTrack("Sabr", "Nazim Rafudeen", "https://i1.sndcdn.com/artworks-alS5LTECt8b6FSwo-xyWdIg-t500x500.jpg?w=300&h=300&fit=crop");
  manager.addTrack("Breathe Deeper", "Tame Impala", "https://i1.sndcdn.com/artworks-pJs4W0WhnD1U-0-t500x500.jpg?w=300&h=300&fit=crop");
}



/*
//Alternative: add regardless:

if (localStorage.getItem("tracks")){
manager.addTrack("Afternoon", "vetkat", "https://i1.sndcdn.com/artworks-Ud2YSLtr4yD33tIm-UsYZhA-t500x500.jpg?w=300&h=300&fit=crop");
  manager.addTrack("Sabr", "Nazim Rafudeen", "https://i1.sndcdn.com/artworks-alS5LTECt8b6FSwo-xyWdIg-t500x500.jpg?w=300&h=300&fit=crop");
  manager.addTrack("Breathe Deeper", "Tame Impala", "https://i1.sndcdn.com/artworks-pJs4W0WhnD1U-0-t500x500.jpg?w=300&h=300&fit=crop");
}      
  */


// const deleteAllBtn = 
// if (localStorage.getItem("tracks")){
//   manager.deleteTrack();
// }


/*


      li.innerHTML = `
        ${cover}
        <div class="track-info">
          <h3>${track.title}</h3>
          <p>${track.artist}</p>
        </div>
        <div class="track-date">
          Added: ${track.addedAt.toLocaleDateString()}
        </div>
        <button class="delete-btn">✖</button>
      `;

      const deleteBtn = li.querySelector(".delete-btn") as HTMLButtonElement;
      deleteBtn.addEventListener("click", () => this.deleteTrack(track.id));

      list.appendChild(li);




*/


"use strict";
// Data
const currentUser = {
    firstName: "Nazim",
    lastName: "Rafudeen",
    role: "Admin",
};
// Track Manager Class
class TrackManager {
    tracks = [];
    nextId = 1;
    constructor() {
        this.loadFromStorage();
        this.renderTracks();
    }
    saveToStorage() {
        localStorage.setItem("tracks", JSON.stringify(this.tracks));
        localStorage.setItem("nextId", this.nextId.toString());
    }
    loadFromStorage() {
        const storedTracks = localStorage.getItem("tracks");
        const storedNextId = localStorage.getItem("nextId");
        if (storedTracks) {
            this.tracks = JSON.parse(storedTracks).map((t) => ({
                ...t,
                addedAt: new Date(t.addedAt),
            }));
        }
        if (storedNextId) {
            this.nextId = parseInt(storedNextId, 10);
        }
    }
    addTrack(title, artist, coverUrl) {
        const newTrack = {
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
    deleteTrack(id) {
        this.tracks = this.tracks.filter(track => track.id !== id);
        this.saveToStorage();
        this.renderTracks();
    }
    renderTracks() {
        const list = document.getElementById("tracksList");
        if (!list)
            return;
        list.innerHTML = "";
        this.tracks.forEach(track => {
            const li = document.createElement("li");
            li.className = "track-item";
            const cover = track.coverUrl
                ? `<img src="${track.coverUrl}" alt="${track.title} cover" class="track-cover">`
                : `<div class="track-cover">🎵</div>`;
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
            const deleteBtn = li.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", () => this.deleteTrack(track.id));
            list.appendChild(li);
        });
    }
}
// Rendering Functions
const renderNavbar = (user) => `
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
const renderHero = (user) => `
  <div class="hero">
    <h1>Welcome back, ${user.firstName}!</h1>
    <p>System Status: <span style="color: #00ff5e;">Online</span></p>
  </div>
`;
// Form Setup
function setupForm(manager) {
    const form = document.getElementById("trackForm");
    if (!form)
        return;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value.trim();
        const artist = document.getElementById("artist").value.trim();
        const cover = document.getElementById("coverUrl").value.trim() || undefined;
        if (title && artist) {
            manager.addTrack(title, artist, cover);
            form.reset();
        }
    });
}
// Init
const app = document.querySelector("#navbar");
if (app)
    app.innerHTML = renderNavbar(currentUser);
const hero = document.querySelector("#hero");
if (hero)
    hero.innerHTML = renderHero(currentUser);
const manager = new TrackManager();
setupForm(manager);
// Demo tracks (only add if no stored tracks)
//2 equals u comparing two values, 
if (localStorage.getItem("tracks") === null) {
    manager.addTrack("Afternoon", "vetkat", "https://i1.sndcdn.com/artworks-Ud2YSLtr4yD33tIm-UsYZhA-t500x500.jpg?w=300&h=300&fit=crop");
    manager.addTrack("Sabr", "Nazim Rafudeen", "https://i1.sndcdn.com/artworks-alS5LTECt8b6FSwo-xyWdIg-t500x500.jpg?w=300&h=300&fit=crop");
    manager.addTrack("Breathe Deeper", "Tame Impala", "https://i1.sndcdn.com/artworks-pJs4W0WhnD1U-0-t500x500.jpg?w=300&h=300&fit=crop");
}
/*
//Alternative: add regardless (even if its != || === to null)

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

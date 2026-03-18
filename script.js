"use strict";
//  Data
const currentUser = {
    firstName: "Wizard",
    lastName: "Nazim",
    role: "Admin"
};
let tracks = []; // my "database"
let nextId = 1;
// Functions 
const renderNavbar = (user) => {
    return `

    <nav class="navbar">
     
    <div class="logo"><strong>Desclution</strong></div>

      <ul class="nav-links">
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Projects</a></li>
        <li><a href="#">Media</a></li>
      </ul>
      
      <div class="user-profile">
        ${user.firstName} (${user.role})
      </div>





      
    </nav>
    
   <div class="hero">
      <h1>Welcome back, ${user.firstName}</h1>
      <p>System Status: <span style="color: #00ff5e;">Online</span></p>
    </div>
      
  
    `;
};
function renderTracks() {
    const list = document.getElementById("tracksList");
    if (!list)
        return;
    list.innerHTML = ""; // clear
    tracks.forEach(track => {
        const li = document.createElement("li");
        li.className = "track-item";
        const cover = track.coverUrl
            ? `<img src="${track.coverUrl}" alt="${track.title} cover" class="track-cover">`
            : `<div class="track-cover" style="display:flex; align-items:center; justify-content:center; font-size:2rem;">🎵</div>`;
        li.innerHTML = `
      
    ${cover}
      <div class="track-info">
        <h3>${track.title}</h3>
        <p>${track.artist}</p>
      </div>

      <div class="track-date">
        Added: ${track.addedAt.toLocaleDateString()}
      </div>
      
    `;
        list.appendChild(li);
    });
}
function addTrack(title, artist, coverUrl) {
    const newTrack = {
        id: nextId++,
        title,
        artist,
        coverUrl,
        addedAt: new Date()
    };
    tracks.push(newTrack);
    renderTracks();
}
// Init
const app = document.querySelector("#navbar");
app.innerHTML = renderNavbar(currentUser);
// Keep original super hero if you want 
// or remove .hero from renderNavbar if you new banner better
// Form handling
const form = document.getElementById("trackForm");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const titleInput = document.getElementById("title");
        const artistInput = document.getElementById("artist");
        const coverInput = document.getElementById("coverUrl");
        const title = titleInput.value.trim();
        const artist = artistInput.value.trim();
        const cover = coverInput.value.trim() || undefined;
        if (title && artist) {
            addTrack(title, artist, cover);
            form.reset();
        }
    });
}
// demo tracks:
addTrack("Midnight Echoes", "Luna Waves", "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300&h=300&fit=crop");
addTrack("Neon Horizon", "Cyber Pulse", "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300&h=300&fit=crop");
addTrack("Silent Orbit", "Astral Collective");

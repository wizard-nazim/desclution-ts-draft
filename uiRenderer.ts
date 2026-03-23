import { Track } from './trackService.js';

export const renderTrackList = (tracks: Track[]) => {
  const listContainer = document.getElementById("tracksList");
  if (!listContainer) return;

  if (tracks.length === 0) {
    listContainer.innerHTML = `<p class="empty-msg">No tracks in your collection yet.</p>`;
    return;
  }

  listContainer.innerHTML = tracks.map(track => `
    <li class="track-item">
      <div class="track-cover">
        ${track.coverUrl 
          ? `<img src="${track.coverUrl}" style="width:100%; height:100%; object-fit:cover;">` 
          : '💿'}
      </div>
      <div class="track-info">
        <h3>${track.title}</h3>
        <p>${track.artist}</p>
      </div>
      <button class="delete-btn" data-id="${track.id}">✖</button>
    </li>
  `).join('');
};

export const renderUserUI = (firstName: string, role: string) => {
  const profileContainer = document.querySelector(".nav-placeholder");
  if (profileContainer) {
    profileContainer.innerHTML = `${firstName} (${role})`;
  }
  
  const heroContainer = document.getElementById("hero");
  if (heroContainer) {
    heroContainer.innerHTML = `
      <div style="text-align: center; margin-top: 2rem;">
        <h1>Welcome back, ${firstName}</h1>
        <p>System Status: <span style="color: #1b9621;">Online</span></p>
      </div>`;
  }
};
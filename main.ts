import { TrackService } from './trackService.js';
import { renderTrackList, renderUserUI } from './uiRenderer.js';

const service = new TrackService();

// Mock User Data (Moved from the old script.ts)
const user = { firstName: "Nazim", role: "Admin" };

const updateView = () => {
  renderTrackList(service.getAll());
};

// Initial Render
renderUserUI(user.firstName, user.role);
updateView();

const form = document.getElementById("trackForm") as HTMLFormElement;
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Added .trim() to prevent empty-space entries
  const title = (document.getElementById("title") as HTMLInputElement).value.trim();
  const artist = (document.getElementById("artist") as HTMLInputElement).value.trim();
  const coverUrl = (document.getElementById("coverUrl") as HTMLInputElement).value.trim();
  
  if (title && artist) {
    service.add(title, artist, coverUrl || undefined);
    updateView();
    form.reset();
  }
});

document.getElementById("tracksList")?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("delete-btn")) {
    const id = Number(target.getAttribute("data-id"));
    service.remove(id);
    updateView();
  }
});
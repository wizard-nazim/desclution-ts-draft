import { TrackService } from './trackService.js';
import { renderTrackList } from './uiRenderer.js';

const service = new TrackService();

const updateView = () => {
  renderTrackList(service.getAll());
};

// Initial Render
updateView();

const form = document.getElementById("trackForm") as HTMLFormElement;
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = (document.getElementById("title") as HTMLInputElement).value;
  const artist = (document.getElementById("artist") as HTMLInputElement).value;
  const coverUrl = (document.getElementById("coverUrl") as HTMLInputElement).value;
  
  service.add(title, artist, coverUrl);
  updateView();
  form.reset();
});

// Event Delegation for Deleting
document.getElementById("tracksList")?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("delete-btn")) {
    const id = Number(target.getAttribute("data-id"));
    service.remove(id);
    updateView();
  }
});
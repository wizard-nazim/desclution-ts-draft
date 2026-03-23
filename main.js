import { TrackService } from './trackService.js';
import { renderTrackList, renderUserUI } from './uiRenderer.js';
const service = new TrackService();
// Mock User Data
const user = { firstName: "Nazim", role: "Admin" };
// Initialization
renderUserUI(user.firstName, user.role);
// The service now handles telling the UI when to update!
service.subscribe(renderTrackList);
const form = document.getElementById("trackForm");
form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleInput = document.getElementById("title");
    const artistInput = document.getElementById("artist");
    const coverInput = document.getElementById("coverUrl");
    const title = titleInput.value.trim();
    const artist = artistInput.value.trim();
    const coverUrl = coverInput.value.trim();
    if (title && artist) {
        // Service handles the update notification internally
        service.add(title, artist, coverUrl || undefined);
        form.reset();
    }
});
document.getElementById("tracksList")?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("delete-btn")) {
        const id = Number(target.getAttribute("data-id"));
        service.remove(id);
    }
});
//# sourceMappingURL=main.js.map
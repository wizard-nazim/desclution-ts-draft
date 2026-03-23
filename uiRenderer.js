export const renderTrackList = (tracks) => {
    const listContainer = document.getElementById("tracksList");
    if (!listContainer)
        return;
    listContainer.innerHTML = tracks.map(track => `
    <li class="track-item">
      <div class="track-cover">
        ${track.coverUrl ? `<img src="${track.coverUrl}" style="width:100%; height:100%; border-radius:inherit;">` : '💿'}
      </div>
      <div class="track-info">
        <h3>${track.title}</h3>
        <p>${track.artist}</p>
      </div>
      <button class="delete-btn" data-id="${track.id}">✖</button>
    </li>
  `).join('');
};
//# sourceMappingURL=uiRenderer.js.map
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Data
var currentUser = {
    firstName: "Nazim",
    lastName: "Rafudeen",
    role: "Admin",
};
// Track Manager Class
var TrackManager = /** @class */ (function () {
    function TrackManager() {
        this.tracks = [];
        this.nextId = 1;
        this.loadFromStorage();
        this.renderTracks();
    }
    TrackManager.prototype.saveToStorage = function () {
        localStorage.setItem("tracks", JSON.stringify(this.tracks));
        localStorage.setItem("nextId", this.nextId.toString());
    };
    TrackManager.prototype.loadFromStorage = function () {
        var storedTracks = localStorage.getItem("tracks");
        var storedNextId = localStorage.getItem("nextId");
        if (storedTracks) {
            this.tracks = JSON.parse(storedTracks).map(function (t) { return (__assign(__assign({}, t), { addedAt: new Date(t.addedAt) })); });
        }
        if (storedNextId) {
            this.nextId = parseInt(storedNextId, 10);
        }
    };
    TrackManager.prototype.addTrack = function (title, artist, coverUrl) {
        var newTrack = {
            id: this.nextId++,
            title: title,
            artist: artist,
            coverUrl: coverUrl,
            addedAt: new Date(),
        };
        this.tracks.push(newTrack);
        this.saveToStorage();
        this.renderTracks();
    };
    TrackManager.prototype.deleteTrack = function (id) {
        this.tracks = this.tracks.filter(function (track) { return track.id !== id; });
        this.saveToStorage();
        this.renderTracks();
    };
    TrackManager.prototype.renderTracks = function () {
        var _this = this;
        var list = document.getElementById("tracksList");
        if (!list)
            return;
        list.innerHTML = "";
        this.tracks.forEach(function (track) {
            var li = document.createElement("li");
            li.className = "track-item";
            var cover = track.coverUrl
                ? "<img src=\"".concat(track.coverUrl, "\" alt=\"").concat(track.title, " cover\" class=\"track-cover\">")
                : "<div class=\"track-cover\">\uD83D\uDCBF</div>";
            li.innerHTML = "\n        ".concat(cover, "\n        <div class=\"track-info\">\n          <h3>").concat(track.title, "</h3>\n          <p>").concat(track.artist, "</p>\n        </div>\n        <div class=\"track-date\">\n          Added: ").concat(track.addedAt.toLocaleDateString(), "\n        </div>\n        <button class=\"delete-btn\">\u2716</button>\n      ");
            var deleteBtn = li.querySelector(".delete-btn");
            deleteBtn.addEventListener("click", function () { return _this.deleteTrack(track.id); });
            list.appendChild(li);
        });
    };
    return TrackManager;
}());
// Rendering Functions
var renderNavbar = function (user) { return "\n  <nav class=\"navbar\">\n    <div class=\"logo\"><strong>Desclution</strong></div>\n    <ul class=\"nav-links\">\n      <li><a href=\"#\">Dashboard</a></li>\n      <li><a href=\"#\">Projects</a></li>\n      <li><a href=\"#\">Media</a></li>\n    </ul>\n    <div class=\"user-profile\">".concat(user.firstName, " (").concat(user.role, ")</div>\n  </nav>\n"); };
var renderHero = function (user) { return "\n  <div class=\"hero\">\n    <h1>Welcome back, ".concat(user.firstName, "</h1>\n    <p>System Status: <span style=\"color: #00ff5e;\">Online</span></p>\n  </div>\n"); };
// Form Setup
function setupForm(manager) {
    var form = document.getElementById("trackForm");
    if (!form)
        return;
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        var title = document.getElementById("title").value.trim();
        var artist = document.getElementById("artist").value.trim();
        var cover = document.getElementById("coverUrl").value.trim() || undefined;
        if (title && artist) {
            manager.addTrack(title, artist, cover);
            form.reset();
        }
    });
}
// Init
var app = document.querySelector("#navbar");
if (app)
    app.innerHTML = renderNavbar(currentUser);
var hero = document.querySelector("#hero");
if (hero)
    hero.innerHTML = renderHero(currentUser);
var manager = new TrackManager();
setupForm(manager);
// Demo tracks (only add if no stored tracks)
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

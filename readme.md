# Desclution TS Draft

A small **TypeScript learning project** that demonstrates typed interfaces, a class-based architecture, DOM rendering, and `localStorage` persistence.

Users can **add and remove tracks**, the UI updates dynamically, and the state is automatically saved between browser sessions.

---

- Fully typed `Track` interface with optional fields
- `TrackManager` / `trackService` class for state management
- Modular DOM rendering (`uiRenderer.ts`)
- `localStorage` persistence (data survives page refresh)
- Clean separation of concerns (service + renderer + main entry)

---

## How to Run

1. **Install global tools** (one-time):
   ```bash
   npm install -g typescript live-server
   ```

2. compile all ts files: ```tsc``` 

> ```npm install -g typescript live-server``` 
> ```tsc script.ts```
> ```live-server```
>```tsc --watch / tsc -w ```
3. (Optional) Watch mode for auto-recompilation: ```tsc -w```

4. Start live-server: ```live-server```

---

### This project was built to practice:

- Optional fields in interfaces (?)
- Array of typed objects (Track[])
- Class-based architecture
- DOM manipulation with TypeScript
- Event listeners + preventDefault()
- Type casting (as HTMLInputElement)
- Template literals for dynamic HTML
- Date handling
- localStorage serialization/deserialization


### Self Notes:

> For album covers: paste direct image URLs ( from Unsplash, Pexels)
> blank → shows 💿 emoji fallback
### Next Steps (Planned)

- Full ES modules (import/export)
- Proper typing on JSON.parse / deserialization
- Safer rendering (e.g., virtual DOM or more robust updates)
- Complete separation of UI and state logic

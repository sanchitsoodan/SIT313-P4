# SIT313 - Task P3: Home Page (React & Components)

This project migrates and expands the **DEV@Deakin** web platform into a modern **React application** using Vite. It implements a clean parent-child component architecture, array data rendering via `.map()`, and matches the wireframe design criteria from the SIT313 Task P3 tasksheet.

---

## 📁 Project Structure & Component Architecture

```
Task-P3/codes/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx       # Top navigation bar
│   │   ├── Banner.jsx           # Hero banner with slide-up text
│   │   ├── About.jsx            # About Me profile and biography
│   │   ├── Projects.jsx         # My Projects grid with interactive buttons
│   │   ├── FeaturedContent.jsx  # Parent component for Articles & Tutorials
│   │   ├── ContentCard.jsx      # Child card component (Image, Title, Desc, Star Rating, Author)
│   │   ├── Gallery.jsx          # 6-photo image gallery
│   │   ├── Contact.jsx          # Contact information section
│   │   └── Footer.jsx           # Wireframe footer (Newsletter bar + Explore, Support, Stay Connected + Bottom legal links)
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # React 18 DOM root entrypoint
│   └── styles.css               # Unified styling (#176b4d theme) and responsive breakpoints
├── index.html                   # HTML entrypoint for Vite
├── vite.config.js               # Vite configuration
├── package.json                 # Project dependencies (React 18, Vite, Lucide-React)
├── .gitignore                   # Excludes node_modules/, dist/, .env
└── README.md                    # Project documentation
```

---

## 🚀 How to Run Locally

### 1. Install Dependencies
Open your terminal in this directory (`taskP3/codes/`) and run:
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

---

## ✨ Features Implemented (Task P3 Design Criteria)

1. **React Component Architecture**:
   - Organized into parent and children components under `src/components/`.
2. **Featured Articles & Featured Tutorials**:
   - Data stored in array of objects and rendered using the `.map()` function.
   - Each card displays an image, title, description, star rating ⭐ with score, and author/username.
   - Includes centered `See all articles` and `See all tutorials` buttons.
3. **Wireframe Footer**:
   - **Newsletter Sign-up Bar**: `SIGN UP FOR OUR DAILY INSIDER`, email input, and Subscribe button with live state feedback.
   - **3 Columns**: `Explore` (Home, Questions, Articles, Tutorials), `Support` (FAQs, Help, Contact Us), `Stay connected` (Social icons).
   - **Bottom Bar**: `DEV@Deakin 2026`, `Privacy Policy`, `Terms`, `Code of Conduct`.
4. **Preserved Elements & Original Photos**:
   - Top navigation, Hero banner, About Me, Projects, Gallery, and Contact sections all preserved with original photo links.

---

## 📹 Video Walkthrough & Report Checklist

- [ ] **DEV@Deakin Website**: Walk through all sections in the browser (`http://localhost:5173`).
- [ ] **Component Structure**: Show the React component tree in VS Code (`App.jsx`, `FeaturedContent.jsx`, `ContentCard.jsx`, `Footer.jsx`).
- [ ] **Data Mapping (`.map()`)**: Explain how the articles and tutorials arrays are mapped to `ContentCard` components.
- [ ] **GitLab Repository**: Link to internal GitLab repository.

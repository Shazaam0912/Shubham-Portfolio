# Portfolio Website 🚀

A modern, interactive personal portfolio built with **React**, **TypeScript**, **GSAP**, and **Three.js** — featuring a 3D animated character, smooth scroll animations, bilingual support (English & Japanese), and a macOS-style scrollbar.

---

## ✨ Features

- 🎭 **3D Character** — Animated WebGL character powered by Three.js & React Three Fiber
- 🎞️ **GSAP Animations** — Smooth scroll-triggered animations and text effects
- 🌐 **Bilingual** — Full English & Japanese language support
- 🖱️ **Custom Cursor** — Stylized cursor with hover interactions
- 📱 **Responsive** — Works across desktop and mobile
- 🍎 **macOS Scrollbar** — Thin, pill-shaped, auto-hiding scrollbar

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| 3D / WebGL | Three.js, React Three Fiber, React Three Drei |
| Animations | GSAP (ScrollTrigger, ScrollSmoother) |
| Styling | CSS Modules, Custom CSS |
| Icons | React Icons |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ombdj1209/dev-website.git

# 2. Navigate into the project
cd dev-website

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

> ⚠️ **GSAP Note:** This project uses GSAP trial plugins (`ScrollSmoother`). Trial plugins **cannot be used in production hosting**. For production, purchase a GSAP Club membership and replace the plugins: https://gsap.com/docs/v3/Installation/

---

## ✏️ Customizing Your Data

All personal content — name, bio, career, projects, contact info, and social links — is stored in a single file:

### 📄 [`src/data/userData.json`](src/data/userData.json)

The file supports two languages: `"en"` (English) and `"ja"` (Japanese). Edit both sections to keep them in sync.

---

### 🔤 Navbar

```json
"navbar": {
  "logo": "YourLogo",
  "email": "your@email.com",
  "links": [
    { "text": "ABOUT", "href": "#about" },
    { "text": "WORK", "href": "#work" },
    { "text": "CONTACT", "href": "#contact" }
  ]
}
```

| Field | Description |
|---|---|
| `logo` | Text shown as your logo/brand name in the navbar |
| `email` | Email displayed in the navbar |
| `links` | Navigation links — keep `href` values as-is (they are section anchors) |

---

### 🏠 Landing / Hero Section

```json
"landing": {
  "intro1": "Hello! I'm",
  "firstName": "YOUR",
  "lastName": "NAME",
  "info1": "A Versatile",
  "roles": ["Role One", "Role Two"]
}
```

| Field | Description |
|---|---|
| `intro1` | Greeting text before your name |
| `firstName` | Your first name (displayed large, uppercase) |
| `lastName` | Your last name (displayed large, uppercase) |
| `info1` | Short descriptor before your roles |
| `roles` | Array of rotating role titles (e.g. `"Developer"`, `"Designer"`) |

---

### 👤 About Section

```json
"about": {
  "title": "About Me",
  "description": "Write your bio here..."
}
```

| Field | Description |
|---|---|
| `title` | Section heading |
| `description` | Your personal bio paragraph |

---

### 💼 Career / Experience Timeline

```json
"career": {
  "title1": "My career",
  "title2": "&",
  "title3": "experience",
  "timeline": [
    {
      "role": "Job Title",
      "company": "Company Name",
      "year": "2024",
      "description": "What you did here..."
    }
  ]
}
```

| Field | Description |
|---|---|
| `title1`, `title2`, `title3` | Section heading split into 3 parts for animation |
| `timeline` | Array of career entries — add as many as needed |
| `role` | Your job title or degree |
| `company` | Company or institution name |
| `year` | Year of the role |
| `description` | Brief description of responsibilities/achievements |

> ➕ To **add a new career entry**, copy one object inside `"timeline": [...]` and paste it with your new details.

---

### 🗂️ Work / Projects Section

```json
"work": {
  "title1": "My",
  "title2": "Work",
  "toolsLabel": "Tools and features",
  "projects": [
    {
      "name": "Project Name",
      "category": "Project Category",
      "tools": "React, Node.js, etc.",
      "desc": "Short description of the project."
    }
  ]
}
```

| Field | Description |
|---|---|
| `name` | Project name |
| `category` | Type of project (e.g. `"Web App"`, `"Hackathon"`) |
| `tools` | Comma-separated list of tools/technologies used |
| `desc` | Short project description |

> ➕ To **add a new project**, copy one object inside `"projects": [...]` and fill in your details.

---

### 🧠 What I Do Section

```json
"whatido": {
  "cards": [
    {
      "title": "CARD TITLE",
      "descriptionLabel": "Description",
      "description": "What you do in this area...",
      "skillsLabel": "Skills",
      "skills": ["Skill 1", "Skill 2", "Skill 3"]
    }
  ]
}
```

| Field | Description |
|---|---|
| `title` | Card heading (e.g. `"DATA & AI"`, `"SOFTWARE DEV"`) |
| `description` | Paragraph describing this area of expertise |
| `skills` | Array of skill/certification tags shown on the card |

---

### 📬 Contact Section

```json
"contact": {
  "title": "Contact",
  "emailLabel": "Email",
  "email": "your@email.com",
  "phoneLabel": "Phone",
  "phone": "+1 234 567 8900",
  "socialLabel": "Social",
  "socials": [
    { "name": "Github", "url": "https://github.com/yourusername" },
    { "name": "Linkedin", "url": "https://linkedin.com/in/yourusername" },
    { "name": "Twitter", "url": "https://x.com/yourusername" },
    { "name": "Instagram", "url": "https://instagram.com/yourusername" }
  ],
  "footer": {
    "text1": "Designed and Developed",
    "text2": "by",
    "name": "Your Name",
    "year": "2025"
  }
}
```

| Field | Description |
|---|---|
| `email` | Your contact email |
| `phone` | Your phone number |
| `socials` | Array of social links — update `url` with your actual profile URLs |
| `footer.name` | Your name shown in the footer credit |
| `footer.year` | Year shown in the footer |

---

### 🌐 Japanese Translation (`"ja"` section)

The file has a duplicate `"ja"` section with the same structure. If you support Japanese, translate all text fields there. If you don't need Japanese, you can leave it as-is or copy the English content.

---

## 📁 Project Structure

```
dev-website/
├── public/
│   ├── images/          # Tech stack images (webp)
│   └── models/          # 3D character model (.glb)
├── src/
│   ├── components/      # All React components
│   │   ├── Character/   # 3D character scene & utilities
│   │   ├── styles/      # Component-level CSS files
│   │   └── utils/       # GSAP scroll & animation utilities
│   ├── context/         # React context providers
│   ├── data/
│   │   └── userData.json  ← ✏️ EDIT THIS FILE to customize content
│   ├── App.tsx
│   ├── index.css        # Global styles & macOS scrollbar
│   └── main.tsx
├── package.json
└── vite.config.ts
```

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Credits

Designed and developed by **Shubham Bhardwaj**. Feel free to fork and customize for your own portfolio!

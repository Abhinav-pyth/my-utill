# 🚀 App Hub - Your HTML Apps Collection

A unified portal to host and manage multiple simple HTML applications. Deploy on Vercel and add new apps by simply committing files to GitHub.

## ✨ Features

- 📱 Beautiful dashboard with grid/list views
- 🔍 Search and filter apps by category
- 🖼️ Preview apps in an iframe with fullscreen mode
- 🌙 Dark theme with modern UI
- 📦 Zero config deployment on Vercel
- ⚡ Add new apps in 30 seconds

## 🚀 Quick Start

### Local Development
```bash
npm install
npm run dev
```

### Deploy to Vercel
1. Push this repo to GitHub
2. Connect your repo to Vercel
3. Done! Vercel auto-deploys on every push.

## 📝 How to Add a New HTML App

### Step 1: Add your HTML file

Place your HTML file in the `public/apps/` directory:

```
public/apps/my-new-app.html
```

### Step 2: Register it in the config

Open `src/apps-config.json` and add a new entry:

```json
{
  "id": "my-new-app",
  "name": "My New App",
  "description": "A brief description of what this app does",
  "path": "/apps/my-new-app.html",
  "icon": "🎯",
  "category": "Utility",
  "color": "from-green-500 to-green-600"
}
```

### Step 3: Commit and push

```bash
git add .
git commit -m "Add my new app"
git push
```

That's it! Vercel will auto-deploy and your new app will be live.

## 📁 Project Structure

```
├── public/
│   └── apps/              ← Put your HTML files here
│       ├── todo.html
│       ├── calculator.html
│       ├── weather.html
│       └── timer.html
├── src/
│   ├── App.tsx            ← Main routing
│   ├── apps-config.json   ← App registry (edit this!)
│   ├── pages/
│   │   ├── Home.tsx       ← Dashboard page
│   │   └── AppViewer.tsx  ← App preview page
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
└── README.md
```

## 🎨 Config Options

| Field | Description | Example |
|-------|-------------|---------|
| `id` | Unique identifier | `"my-app"` |
| `name` | Display name | `"My App"` |
| `description` | Short description | `"Does cool stuff"` |
| `path` | Path to HTML file | `"/apps/my-app.html"` |
| `icon` | Emoji icon | `"🎮"` |
| `category` | App category | `"Utility"` |
| `color` | Tailwind gradient | `"from-blue-500 to-blue-600"` |

### Available Categories

Edit the `categories` array in `src/apps-config.json` to add your own:

```json
{
  "categories": ["All", "Productivity", "Utility", "Widget", "Games", "Tools"]
}
```

### Available Colors

Use Tailwind gradient classes:
- `from-blue-500 to-blue-600`
- `from-purple-500 to-purple-600`
- `from-green-500 to-green-600`
- `from-red-500 to-red-600`
- `from-yellow-500 to-orange-500`
- `from-pink-500 to-rose-500`
- `from-cyan-500 to-teal-500`
- `from-indigo-500 to-violet-500`

## 🔧 Tech Stack

- React 18
- Vite
- Tailwind CSS v4
- React Router
- Lucide Icons
- TypeScript

## 📋 Requirements for HTML Apps

Your HTML files should be **self-contained** (all CSS/JS inline) since they're loaded in an iframe. This makes them completely portable and easy to share.

## License

MIT

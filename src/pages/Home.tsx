import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import appsConfig from "../apps-config.json";
import { Search, Grid3X3, LayoutList, Plus, Github, ExternalLink } from "lucide-react";

interface AppItem {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: string;
  category: string;
  color: string;
}

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const apps: AppItem[] = appsConfig.apps;
  const categories: string[] = appsConfig.categories;

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || app.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [apps, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30">
                H
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">App Hub</h1>
                <p className="text-sm text-slate-400">Your HTML apps collection</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200 text-sm"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <Link
                to="/docs"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-200 text-sm shadow-lg shadow-indigo-500/30"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add App</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-xl transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                  : "bg-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 rounded-xl transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                  : "bg-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <LayoutList className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                  : "bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Apps Grid/List */}
        {filteredApps.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No apps found</h3>
            <p className="text-slate-400">
              Try a different search term or category
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredApps.map((app) => (
              <GridCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredApps.map((app) => (
              <ListCard key={app.id} app={app} />
            ))}
          </div>
        )}

        {/* How to Add Section */}
        <div className="mt-16 p-8 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-400" />
            How to Add a New App
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold">1</span>
                <h4 className="font-medium text-white">Add HTML File</h4>
              </div>
              <p className="text-sm text-slate-400 pl-9">
                Place your HTML file in the <code className="px-1.5 py-0.5 rounded bg-white/10 text-indigo-300 text-xs">public/apps/</code> directory
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold">2</span>
                <h4 className="font-medium text-white">Update Config</h4>
              </div>
              <p className="text-sm text-slate-400 pl-9">
                Add an entry in <code className="px-1.5 py-0.5 rounded bg-white/10 text-indigo-300 text-xs">src/apps-config.json</code>
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold">3</span>
                <h4 className="font-medium text-white">Push & Deploy</h4>
              </div>
              <p className="text-sm text-slate-400 pl-9">
                Commit to GitHub and Vercel will auto-deploy your new app
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-slate-500">
            Built with React + Vite • Deployed on Vercel • {apps.length} apps available
          </p>
        </div>
      </footer>
    </div>
  );
}

function GridCard({ app }: { app: AppItem }) {
  return (
    <Link
      to={`/app/${app.id}`}
      className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
    >
      <div className={`h-2 w-full bg-gradient-to-r ${app.color}`} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{app.icon}</div>
          <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">
          {app.name}
        </h3>
        <p className="text-sm text-slate-400 mb-4 line-clamp-2">{app.description}</p>
        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-slate-300">
          {app.category}
        </span>
      </div>
    </Link>
  );
}

function ListCard({ app }: { app: AppItem }) {
  return (
    <Link
      to={`/app/${app.id}`}
      className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200 hover:bg-white/10"
    >
      <div className="text-3xl">{app.icon}</div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
          {app.name}
        </h3>
        <p className="text-sm text-slate-400 truncate">{app.description}</p>
      </div>
      <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-slate-300">
        {app.category}
      </span>
      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
    </Link>
  );
}

export default Home;

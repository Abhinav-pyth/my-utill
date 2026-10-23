import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import appsConfig from "../apps-config.json";
import { Search, Grid3X3, LayoutList, ExternalLink, Sparkles, Zap, Layout, X } from "lucide-react";

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

  const uniqueCategories = useMemo(() => {
    return [...new Set(apps.map((a) => a.category))].length;
  }, [apps]);

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden noise-overlay">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute top-2/3 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-6000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/5 backdrop-blur-xl bg-slate-950/60 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30 animate-pulse-glow">
                    H
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-950" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white tracking-tight">App Hub</h1>
                  <p className="text-xs text-slate-400">Your personal app collection</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-slate-300 font-medium">{apps.length} Apps Live</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-slate-300">Curated collection of useful web apps</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              All your{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-text">
                HTML apps
              </span>
              <br />
              in one place
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              Launch, search, and organize your collection of simple web applications. 
              Beautiful, fast, and always at your fingertips.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-2">
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-white">{apps.length}</div>
              <div className="text-xs text-slate-400 mt-1">Total Apps</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-2">
                <Layout className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">{uniqueCategories}</div>
              <div className="text-xs text-slate-400 mt-1">Categories</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="w-5 h-5 text-pink-400" />
              </div>
              <div className="text-2xl font-bold text-white">∞</div>
              <div className="text-xs text-slate-400 mt-1">Possibilities</div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="text"
                placeholder="Search apps by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 backdrop-blur-sm transition-all duration-300 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-4 rounded-2xl transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-105"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
                title="Grid view"
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-4 rounded-2xl transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-105"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
                title="List view"
              >
                <LayoutList className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((category) => {
              const count = category === "All" ? apps.length : apps.filter(a => a.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`group/btn px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30 scale-105"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20"
                  }`}
                >
                  {category}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    selectedCategory === category
                      ? "bg-white/20"
                      : "bg-white/10 group-hover/btn:bg-white/20"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-400">
              Showing <span className="text-white font-medium">{filteredApps.length}</span>{" "}
              {filteredApps.length === 1 ? "app" : "apps"}
              {selectedCategory !== "All" && (
                <span> in <span className="text-indigo-400">{selectedCategory}</span></span>
              )}
            </p>
          </div>

          {/* Apps Grid/List */}
          {filteredApps.length === 0 ? (
            <div className="text-center py-24 animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
                <Search className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No apps found</h3>
              <p className="text-slate-400 max-w-sm mx-auto">
                Try a different search term or switch to another category
              </p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="mt-6 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all text-sm"
              >
                Clear filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredApps.map((app, index) => (
                <GridCard key={app.id} app={app} index={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredApps.map((app, index) => (
                <ListCard key={app.id} app={app} index={index} />
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-slate-950/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  H
                </div>
                <span className="text-sm text-slate-400">
                  App Hub — Your personal app collection
                </span>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  All systems operational
                </span>
                <span>Built with React + Vite</span>
                <span>Deployed on Vercel</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function GridCard({ app, index }: { app: AppItem; index: number }) {
  const staggerClass = `stagger-${Math.min(index + 1, 8)}`;
  
  return (
    <Link
      to={`/app/${app.id}`}
      className={`group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 card-glow animate-fade-in-up ${staggerClass}`}
    >
      {/* Top gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${app.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Hover glow effect */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 rounded-full`} />
      
      <div className="p-6 relative">
        <div className="flex items-start justify-between mb-5">
          <div className="relative">
            <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
              {app.icon}
            </div>
            <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-20 blur-xl rounded-full transition-opacity duration-300`} />
          </div>
          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all duration-300">
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
          </div>
        </div>
        <h3 className="text-base font-semibold text-white mb-1.5 group-hover:text-indigo-300 transition-colors duration-300">
          {app.name}
        </h3>
        <p className="text-sm text-slate-400 mb-5 line-clamp-2 leading-relaxed">{app.description}</p>
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${app.color} bg-opacity-10 text-white/80 border border-white/10`}>
            {app.category}
          </span>
          <span className="text-xs text-slate-500 group-hover:text-indigo-400 transition-colors opacity-0 group-hover:opacity-100 duration-300">
            Open →
          </span>
        </div>
      </div>
    </Link>
  );
}

function ListCard({ app, index }: { app: AppItem; index: number }) {
  const staggerClass = `stagger-${Math.min(index + 1, 8)}`;
  
  return (
    <Link
      to={`/app/${app.id}`}
      className={`group flex items-center gap-5 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-indigo-500/5 animate-fade-in-up ${staggerClass}`}
    >
      <div className="relative">
        <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
          {app.icon}
        </div>
        <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-20 blur-lg rounded-full transition-opacity duration-300`} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300">
          {app.name}
        </h3>
        <p className="text-sm text-slate-400 truncate">{app.description}</p>
      </div>
      <span className={`hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-slate-300`}>
        {app.category}
      </span>
      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-indigo-500/20 transition-all duration-300">
        <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
      </div>
    </Link>
  );
}

export default Home;

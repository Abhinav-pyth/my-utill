import { useParams, Link, useNavigate } from "react-router-dom";
import appsConfig from "../apps-config.json";
import { ArrowLeft, ExternalLink, Maximize2, Home, Minimize2 } from "lucide-react";
import { useState } from "react";

function AppViewer() {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const app = appsConfig.apps.find((a) => a.id === appId);

  if (!app) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
        {/* Background orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        </div>
        
        <div className="text-center relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-5xl">😕</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">App Not Found</h2>
          <p className="text-slate-400 mb-8 max-w-sm">
            The app "<span className="text-indigo-400 font-medium">{appId}</span>" doesn't exist in the configuration.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-sm text-white text-sm font-medium flex items-center gap-2">
            <span>{app.icon}</span>
            <span>{app.name}</span>
          </span>
          <button
            onClick={() => setIsFullscreen(false)}
            className="p-2.5 rounded-lg bg-slate-900/80 backdrop-blur-sm hover:bg-slate-900 text-white transition-all duration-200 shadow-lg"
            title="Exit fullscreen"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
        </div>
        <iframe
          src={app.path}
          className="w-full h-full border-0"
          title={app.name}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Toolbar */}
      <div className="relative z-10 border-b border-white/5 backdrop-blur-xl bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-200 hover:-translate-x-0.5"
                title="Back to home"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="hidden sm:block w-px h-8 bg-white/10" />
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="text-2xl">{app.icon}</div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-0 blur-lg rounded-full transition-opacity duration-300`} />
                </div>
                <div>
                  <h1 className="text-base font-semibold text-white">{app.name}</h1>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gradient-to-r ${app.color} text-white/90`}>
                      {app.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullscreen(true)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-200 hover:scale-105"
                title="Fullscreen"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <a
                href={app.path}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-200 hover:scale-105"
                title="Open in new tab"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* App Preview */}
      <div className="relative z-10 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto h-full">
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-white h-[calc(100vh-140px)] relative group">
            {/* Browser chrome */}
            <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-white border border-slate-200 text-xs text-slate-500 max-w-xs truncate">
                  {window.location.origin}{app.path}
                </div>
              </div>
              <div className="w-12" />
            </div>
            <iframe
              src={app.path}
              className="w-full border-0"
              style={{ height: 'calc(100% - 40px)' }}
              title={app.name}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppViewer;

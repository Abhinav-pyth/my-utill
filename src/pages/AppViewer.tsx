import { useParams, Link, useNavigate } from "react-router-dom";
import appsConfig from "../apps-config.json";
import { ArrowLeft, ExternalLink, Maximize2, Home } from "lucide-react";
import { useState } from "react";

function AppViewer() {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const app = appsConfig.apps.find((a) => a.id === appId);

  if (!app) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-white mb-2">App Not Found</h2>
          <p className="text-slate-400 mb-6">
            The app "{appId}" doesn't exist in the configuration.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-all duration-200"
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
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-4 right-4 z-50 p-2 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white transition-all duration-200 shadow-lg"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="text-2xl">{app.icon}</div>
              <div>
                <h1 className="text-lg font-semibold text-white">{app.name}</h1>
                <p className="text-xs text-slate-400">{app.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullscreen(true)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
                title="Fullscreen"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <a
                href={app.path}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
                title="Open in new tab"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* App Preview */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto h-full">
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white h-[calc(100vh-180px)]">
            <iframe
              src={app.path}
              className="w-full h-full border-0"
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

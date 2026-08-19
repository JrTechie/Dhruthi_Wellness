import React, { useState } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { createNutriFlowVideoProject } from './videoFlowPipeline';

interface VideoFlowEditorProps {
  projectTitle?: string;
}

export const VideoFlowEditorPreview: React.FC<VideoFlowEditorProps> = ({
  projectTitle = "NutriFlow VideoFlow Interactive Reel",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  const [activeTrack, setActiveTrack] = useState<string>('track-content');
  const project = createNutriFlowVideoProject({
    title: projectTitle,
    fps,
    durationInSeconds: durationInFrames / fps,
    width,
    height,
  });

  const currentTimeSec = (frame / fps).toFixed(2);

  return (
    <div className="w-full h-full bg-slate-950 text-white font-sans flex flex-col justify-between p-8 relative overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Controls */}
      <div className="relative z-10 flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-2xl px-6 py-4 backdrop-blur-lg shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <h2 className="text-xl font-bold text-emerald-400 tracking-tight">
            VideoFlow Pipeline Engine
          </h2>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
          <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700">
            {currentTimeSec}s / {(durationInFrames / fps).toFixed(2)}s
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800">
            {fps} FPS • {width}x{height}
          </span>
        </div>
      </div>

      {/* Center Video Flow Canvas Preview Card */}
      <div className="relative z-10 flex-1 my-6 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center shadow-2xl">
        <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/10">
          <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-white max-w-lg leading-tight tracking-tight">
          {projectTitle}
        </h1>
        <p className="text-slate-400 mt-3 text-lg font-medium max-w-md">
          Driven by @videoflow/core & @videoflow/renderer-browser data models
        </p>

        {/* Dynamic Frame Marker */}
        <div className="mt-8 flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">{frame}</div>
            <div className="text-xs text-slate-500 uppercase font-semibold mt-0.5">Current Frame</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-200">{project.tracks.length}</div>
            <div className="text-xs text-slate-500 uppercase font-semibold mt-0.5">Active Tracks</div>
          </div>
        </div>
      </div>

      {/* Timeline Tracks Inspector */}
      <div className="relative z-10 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 backdrop-blur-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            VideoFlow Timeline Layers & Keyframes
          </span>
          <span className="text-xs text-emerald-400 font-semibold">
            {project.tracks.reduce((acc, t) => acc + t.layers.length, 0)} Active Layers
          </span>
        </div>

        <div className="space-y-2.5">
          {project.tracks.map((track) => (
            <div
              key={track.id}
              onClick={() => setActiveTrack(track.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                activeTrack === track.id
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-white'
                  : 'bg-slate-950/60 border-slate-850 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${activeTrack === track.id ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                <span className="font-semibold text-sm">{track.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {track.layers.map((layer) => (
                  <span
                    key={layer.id}
                    className="px-2.5 py-1 rounded bg-slate-800/80 text-xs font-mono text-emerald-300 border border-slate-700"
                  >
                    {layer.type} ({layer.startTime}s - {layer.startTime + layer.duration}s)
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

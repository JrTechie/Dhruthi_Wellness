export interface VideoFlowProjectConfig {
  title: string;
  fps: number;
  durationInSeconds: number;
  width: number;
  height: number;
}

export interface VideoFlowLayer {
  id: string;
  type: string;
  startTime: number;
  duration: number;
  properties: Record<string, unknown>;
  animations?: Array<{
    property: string;
    keyframes: Array<{ time: number; value: number }>;
  }>;
}

export interface VideoFlowTrack {
  id: string;
  name: string;
  layers: VideoFlowLayer[];
}

export interface VideoFlowProject {
  version: string;
  metadata: {
    title: string;
    fps: number;
    duration: number;
    dimensions: { width: number; height: number };
    createdAt: string;
  };
  tracks: VideoFlowTrack[];
  transitions: Array<{
    id: string;
    type: string;
    duration: number;
    fromLayerId: string;
    toLayerId: string;
  }>;
}

/**
 * Creates a sample VideoFlow document object programmatically.
 */
export function createNutriFlowVideoProject(config: VideoFlowProjectConfig): VideoFlowProject {
  const { title, fps, durationInSeconds, width, height } = config;

  return {
    version: '1.3.0',
    metadata: {
      title,
      fps,
      duration: durationInSeconds,
      dimensions: { width, height },
      createdAt: new Date().toISOString(),
    },
    tracks: [
      {
        id: 'track-background',
        name: 'Background Track',
        layers: [
          {
            id: 'layer-bg-1',
            type: 'color',
            startTime: 0,
            duration: durationInSeconds,
            properties: {
              color: '#0F172A',
            },
          },
        ],
      },
      {
        id: 'track-content',
        name: 'Content & Visuals',
        layers: [
          {
            id: 'layer-heading',
            type: 'text',
            startTime: 0.5,
            duration: durationInSeconds - 1,
            properties: {
              text: title,
              fontSize: 48,
              color: '#10B981',
              fontFamily: 'Inter, sans-serif',
              align: 'center',
              position: { x: width / 2, y: height / 3 },
            },
            animations: [
              {
                property: 'opacity',
                keyframes: [
                  { time: 0, value: 0 },
                  { time: 0.8, value: 1 },
                ],
              },
            ],
          },
          {
            id: 'layer-flow-card',
            type: 'card',
            startTime: 1.0,
            duration: durationInSeconds - 1.5,
            properties: {
              width: 800,
              height: 500,
              fill: 'rgba(30, 41, 59, 0.9)',
              borderRadius: 24,
              borderColor: '#10B981',
              borderWidth: 2,
              position: { x: width / 2, y: height / 2 + 100 },
            },
          },
        ],
      },
    ],
    transitions: [
      {
        id: 'trans-1',
        type: 'fade',
        duration: 0.5,
        fromLayerId: 'layer-bg-1',
        toLayerId: 'layer-heading',
      },
    ],
  };
}

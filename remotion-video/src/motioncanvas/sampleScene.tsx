import { makeScene2D, Circle, Txt, Rect, Line } from '@motion-canvas/2d';
import { createSignal, easeInOutCubic, all, chain, createRef, Vector2 } from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const circleRef = createRef<Circle>();
  const textRef = createRef<Txt>();
  const rectRef = createRef<Rect>();
  const lineRef = createRef<Line>();

  const progress = createSignal(0);

  const container = new Rect({
    ref: rectRef,
    width: 900,
    height: 1400,
    fill: '#0F172A',
    radius: 32,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowBlur: 40,
  });

  const bgCircle = new Circle({
    width: 600,
    height: 600,
    fill: 'rgba(16, 185, 129, 0.15)',
    position: [-100, -200],
  });

  const vectorLine = new Line({
    ref: lineRef,
    points: [
      new Vector2(-350, 200),
      new Vector2(-150, 0),
      new Vector2(50, 150),
      new Vector2(350, -200),
    ],
    stroke: '#10B981',
    lineWidth: 8,
    end: progress,
    lineCap: 'round',
    lineJoin: 'round',
  });

  const animCircle = new Circle({
    ref: circleRef,
    width: 160,
    height: 160,
    fill: '#059669',
    shadowColor: 'rgba(16, 185, 129, 0.6)',
    shadowBlur: 30,
    scale: 0,
  });

  const titleTxt = new Txt({
    ref: textRef,
    text: 'NutriFlow Motion Canvas',
    fontSize: 54,
    fontWeight: 700,
    fill: '#FFFFFF',
    fontFamily: 'Inter, sans-serif',
    position: [0, 450],
    opacity: 0,
  });

  container.add(bgCircle);
  container.add(vectorLine);
  container.add(animCircle);
  container.add(titleTxt);

  view.add(container);

  // Animations timeline
  yield* all(
    circleRef().scale(1, 0.8, easeInOutCubic),
    textRef().opacity(1, 0.8),
    lineRef().end(1, 1.2, easeInOutCubic)
  );

  yield* chain(
    circleRef().position([0, -100], 0.6, easeInOutCubic),
    circleRef().position([0, 0], 0.6, easeInOutCubic)
  );
});

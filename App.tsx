import * as React from 'react';
import './style.css';

const { useState } = React;

type Point = {
  x: number;
  y: number;
};

export default function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const [stack, setStack] = useState<Point[]>([]);

  const handleClick = (event: React.MouseEvent): void => {
    const { clientX, clientY } = event;
    setPoints([...points, { x: clientX - 10, y: clientY - 10 }]);
  };

  const undo = (): void => {
    if (points.length <= 0) return;
    const newPoints = [...points];
    const poppedPoint = newPoints.pop();
    setStack([...stack, poppedPoint]);
    setPoints(newPoints);
  };

  const redo = (): void => {
    if (stack.length <= 0) return;
    const newStack = [...stack];
    const poppedItem = newStack.pop();
    setStack(newStack);
    setPoints([...points, poppedItem]);
  };
  return (
    <div className="app">
      <div className="buttons-wrapper">
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>
      <div className="clickable" onClick={handleClick}>
        {points.map((point: Point, index: number) => {
          return (
            <div
              key={index}
              style={{ left: point.x, top: point.y }}
              className="point"
            >
              {index}
            </div>
          );
        })}
      </div>
    </div>
  );
}

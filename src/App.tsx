import React from "react";

import "./App.css";

interface Points {
  y: number;
  x: number;
}

function App() {
  const [points, setPoints] = React.useState<Array<Points>>([]);
  const [cachedPoints, setCachedPoints] = React.useState<Array<Points>>([]);

  const handleAddPoint = (event: React.MouseEvent) => {
    const { clientY, clientX } = event;

    setPoints((prev) => [...prev, { y: clientY, x: clientX }]);
  };

  const handleUndoPoint = () => {
    if (!points.length) return;

    const lastPoint = [points[points.length - 1]];

    setCachedPoints((prevState) => [...prevState, ...lastPoint]);
    setPoints(points.slice(0, points.length - 1));
  };

  const handleRedoPoint = () => {
    if (!cachedPoints.length) return;

    const lastCachedPoint = [cachedPoints[cachedPoints.length - 1]];

    setCachedPoints(cachedPoints.slice(0, cachedPoints.length - 1));
    setPoints((prevState) => [...prevState, ...lastCachedPoint]);
  };

  return (
    <div className="App">
      <div className="buttons">
        <button onClick={handleUndoDots}>undo</button>
        <button onClick={handleRedoDots}>redo</button>
      </div>
      <div className="board" onClick={handleAddPoint}>
        {points.map((point, index) => (
          <div
            key={index}
            className="point"
            style={{ top: `${point.y}px`, left: `${point.x}px` }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

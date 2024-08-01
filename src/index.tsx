/// <reference types="vinxi/types/client" />
import ReactDOM from "react-dom/client";
import { useState, useEffect, useMemo } from "react";

import "./global.css";

type Image = {
  image: string;
  width: number;
  height: number;
};

function pack(images: Image[], columns: number): Image[][] {
  const packed: Image[][] = Array.from({ length: columns }, () => []);
  const heights = Array.from({ length: columns }, () => 0);

  for (const image of images) {
    const column = heights.indexOf(Math.min(...heights));
    packed[column].push(image);
    heights[column] += image.height;
  }

  return packed;
}

function ShowImage() {
  const [imgs, setImgs] = useState([]);
  useEffect(() => {
    fetch("/api/hebrew-imgs")
      .then((res) => res.json())
      .then((data) => setImgs(data));
  }, []);

  const columns = useMemo(() => pack(imgs, 3), [imgs]);

  return (
    <section className="images-container">
      {columns.map((column, i) => (
        <div key={i} className="image-container">
          {column.map((image) => (
            <img
              src={`/hebrew-imgs/${image.image}`}
              alt={image.image}
              style={{ aspectRatio: `${image.width}/${image.height}` }}
              key={image.image}
            />
          ))}
        </div>
      ))}
    </section>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ShowImage />);

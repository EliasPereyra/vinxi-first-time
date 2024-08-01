import { eventHandler, getRequestURL } from "vinxi/http";
import fs from "node:fs/promises";
import imageSize from "image-size";

export default eventHandler(async (event) => {
  const dirUrl = getRequestURL(event);

  if (dirUrl.pathname.startsWith("/api/hebrew-imgs")) {
    const files = await fs.readdir("./hebrew-imgs");
    const images: {
      image: string;
      width: number;
      height: number;
    }[] = [];
    for (const image of files.filter((file) => file.endsWith(".jpg"))) {
      const { width, height } = imageSize(`./hebrew-imgs/${image}`);
      images.push({ image, height: height!, width: width! });
    }

    return images;
  }
});

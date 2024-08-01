import { createApp } from "vinxi";
import reactReferesh from "@vitejs/plugin-react";

export default createApp({
  routers: [
    {
      name: "images",
      type: "static",
      base: "/hebrew-imgs",
      dir: "./hebrew-imgs",
    },
    {
      name: "api",
      type: "http",
      base: "/api",
      handler: "./api/index.ts",
    },
    {
      name: "client",
      type: "spa",
      handler: "./index.html",
      target: "browser",
      plugins: () => [reactReferesh()],
    },
  ],
});

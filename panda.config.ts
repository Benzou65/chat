import { defineConfig, defineGlobalStyles } from "@pandacss/dev";
import benzouPreset from "./benzou-preset";

const globalCss = defineGlobalStyles({
  html: {
    backgroundColor: "gray.900",
    height: "100%",
  },
  body: {
    minHeight: "100%",
  },
});

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  jsxFramework: "react",

  // Where to look for your css declarations
  include: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],

  // Files to exclude
  exclude: [],

  globalCss,

  presets: ["@pandacss/preset-base", "@pandacss/preset-panda", benzouPreset],

  // Useful for theme customization
  theme: {},

  // The output directory for your css system
  outdir: "styled-system",
});

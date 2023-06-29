import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

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

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        sizes: {
          headerHeight: { value: "10vw" },
          footerHeight: { value: "72px" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});

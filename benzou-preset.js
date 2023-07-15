import { definePreset } from "@pandacss/dev";

export default definePreset({
  theme: {
    extend: {
      tokens: {
        sizes: {
          header: { value: "10vw" },
          footer: { value: "80px" },
        },
        spacing: {
          footer: { value: "100px" },
        },
      },
    },
  },
});

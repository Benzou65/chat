import { definePreset } from "@pandacss/dev";

export default definePreset({
  theme: {
    extend: {
      tokens: {
        sizes: {
          header: { value: "10vw" },
        },
        spacing: {
          footer: { value: "100px" },
        },
      },
    },
  },
});

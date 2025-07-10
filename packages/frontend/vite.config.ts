import react from "@vitejs/plugin-react";
import path from "path";
import AutoImports from "unplugin-auto-import/vite";
import { defineConfig } from "vite";

const PROT = process.env.PORT ?? 9001;

export default defineConfig({
  build: {
    sourcemap: true,
    target: "modules",
  },
  preview: {
    port: +PROT,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    react(),
    AutoImports({
      dts: true, // or a custom path
      include: [
        // /\.*.$/,
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      ],
      imports: [
        "react",
        "react-router-dom",
        {
          moment: [["default", "moment"]],
        },
        {
          "usehooks-ts": [
            "useIntersectionObserver",
            "useLocalStorage",
            "useMediaQuery",
            "usePrevious",
            "useWindowSize",
          ],
          "@chakra-ui/react": [
            "createStandaloneToast",
            "extendTheme",
            "ChakraProvider",
            "Spinner",
            "Textarea",
            "Button",
            "FormControl",
            "FormLabel",
            "Input",
            "IconButton",
            "Stack",
            "useToast",
            "Modal",
            "ModalOverlay",
            "ModalContent",
            "ModalHeader",
            "ModalBody",
            "ModalFooter",
            "ModalCloseButton",
            "useDisclosure",
            "Popover",
            "PopoverTrigger",
            "PopoverContent",
            "PopoverArrow",
            "PopoverCloseButton",
            "PopoverHeader",
            "PopoverBody",
            "PopoverFooter",
          ],
        },
        {
          axios: [["default", "Axios"]],
          clsx: [["default", "clsx"]],
          "@/components/Avatar": [["Avatar", "Avatar"]],
        },
      ],
      dirs: [
        "./src/views",
        "./src/interfaces",
        "./src/hooks",
        "./src/components",
      ],
      eslintrc: {
        enabled: true,
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
      "/ws": {
        target: "ws://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
    port: +PROT,
  },
});

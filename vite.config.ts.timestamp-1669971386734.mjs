// vite.config.ts
import react from "file:///D:/empower/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "node:path";
import { defineConfig } from "file:///D:/empower/frontend/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "D:\\empower\\frontend";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@/pages": path.resolve(__vite_injected_original_dirname, "./src/pages"),
      "@/generic": path.resolve(__vite_injected_original_dirname, "./src/components/generic"),
      "@/components": path.resolve(__vite_injected_original_dirname, "./src/components"),
      "@/providers": path.resolve(__vite_injected_original_dirname, "./src/providers"),
      "@/services": path.resolve(__vite_injected_original_dirname, "./src/services"),
      "@/assets": path.resolve(__vite_injected_original_dirname, "./src/assets"),
      "@/types": path.resolve(__vite_injected_original_dirname, "./src/types"),
      "@/context": path.resolve(__vite_injected_original_dirname, "./src/context"),
      "@/hooks": path.resolve(__vite_injected_original_dirname, "./src/hooks"),
      "@/store": path.resolve(__vite_injected_original_dirname, "./src/store"),
      "@/utils": path.resolve(__vite_injected_original_dirname, "./src/utils"),
      "@/styles": path.resolve(__vite_injected_original_dirname, "./src/styles"),
      "@/vars": path.resolve(__vite_injected_original_dirname, "./src/vars")
    }
  },
  plugins: [react()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxlbXBvd2VyXFxcXGZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxlbXBvd2VyXFxcXGZyb250ZW5kXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9lbXBvd2VyL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcblxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0cmVzb2x2ZToge1xuXHRcdGFsaWFzOiB7XG5cdFx0XHQnQC9wYWdlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9wYWdlcycpLFxuXHRcdFx0J0AvZ2VuZXJpYyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9jb21wb25lbnRzL2dlbmVyaWMnKSxcblx0XHRcdCdAL2NvbXBvbmVudHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvY29tcG9uZW50cycpLFxuXHRcdFx0J0AvcHJvdmlkZXJzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3Byb3ZpZGVycycpLFxuXHRcdFx0J0Avc2VydmljZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvc2VydmljZXMnKSxcblx0XHRcdCdAL2Fzc2V0cyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9hc3NldHMnKSxcblx0XHRcdCdAL3R5cGVzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3R5cGVzJyksXG5cdFx0XHQnQC9jb250ZXh0JzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2NvbnRleHQnKSxcblx0XHRcdCdAL2hvb2tzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2hvb2tzJyksXG5cdFx0XHQnQC9zdG9yZSc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9zdG9yZScpLFxuXHRcdFx0J0AvdXRpbHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvdXRpbHMnKSxcblx0XHRcdCdAL3N0eWxlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9zdHlsZXMnKSxcblx0XHRcdCdAL3ZhcnMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvdmFycycpXG5cdFx0fVxuXHR9LFxuXHRwbHVnaW5zOiBbcmVhY3QoKV1cbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUCxPQUFPLFdBQVc7QUFDblEsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBRjdCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVM7QUFBQSxJQUNSLE9BQU87QUFBQSxNQUNOLFdBQVcsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUNoRCxhQUFhLEtBQUssUUFBUSxrQ0FBVywwQkFBMEI7QUFBQSxNQUMvRCxnQkFBZ0IsS0FBSyxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLE1BQzFELGVBQWUsS0FBSyxRQUFRLGtDQUFXLGlCQUFpQjtBQUFBLE1BQ3hELGNBQWMsS0FBSyxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBLE1BQ3RELFlBQVksS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUNsRCxXQUFXLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDaEQsYUFBYSxLQUFLLFFBQVEsa0NBQVcsZUFBZTtBQUFBLE1BQ3BELFdBQVcsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUNoRCxXQUFXLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDaEQsV0FBVyxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQ2hELFlBQVksS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUNsRCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxZQUFZO0FBQUEsSUFDL0M7QUFBQSxFQUNEO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQ2xCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

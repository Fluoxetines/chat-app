import hljs from "hightlight.js";

hljs.configure({
  languages: ["javascript", "jsx", "sh", "bash", "html", "scss", "css", "json"],
});

if (typeof window !== "undefined") {
  window.hljs = hljs;
}

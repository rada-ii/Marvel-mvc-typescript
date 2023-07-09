import "./style.css";
import { fetchImagesFromMarvelAPI } from "./controllers/imageController";

import { renderImages, clearImages } from "./views/imageView";

function initializeApp(): void {
  const button = document.getElementById("fetch-button");
  if (!button) return;

  button.addEventListener("click", async () => {
    try {
      clearImages();
      button.disabled = true;
      const images = await fetchImagesFromMarvelAPI();
      renderImages(images);
    } catch (error) {
      console.error("Error initializing app:", error);
    } finally {
      button.disabled = false;
    }
  });
}

initializeApp();

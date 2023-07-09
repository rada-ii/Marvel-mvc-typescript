import { Image } from "../models/imageModel";

export function renderImages(images: Image[]): void {
  const container = document.getElementById("image-container");
  if (!container) return;

  container.innerHTML = "";

  images.forEach((image) => {
    const imageElement = document.createElement("img");
    imageElement.src = image.imageUrl;
    imageElement.alt = image.name;
    container.appendChild(imageElement);
  });
}

export function clearImages(): void {
  const container = document.getElementById("image-container");
  if (!container) return;

  container.innerHTML = "";
}

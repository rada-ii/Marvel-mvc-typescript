import axios from "axios";
import { Image } from "../models/imageModel";
import SparkMD5 from "spark-md5";

const publicKey = "84ba4923e28d71a6d15697ef6cbf41c5";
const privateKey = "58a062859b51b990a9851925260e317c1a9dfe73";
const imageLimit = 9; 
const totalCharacters = 1493; 
export async function fetchImagesFromMarvelAPI(): Promise<Image[]> {
  try {
    const offset = getRandomOffset(totalCharacters);
    const response = await axios.get(
      "https://gateway.marvel.com/v1/public/characters",
      {
        params: {
          apikey: publicKey,
          ts: Date.now(),
          hash: createHash(Date.now(), privateKey, publicKey),
          limit: imageLimit,
          offset: offset,
        },
      }
    );

    const imageData = response.data;

    const images: Image[] = imageData.data.results.map((result: any) => {
      return {
        id: result.id,
        name: result.name,
        imageUrl: result.thumbnail.path + "." + result.thumbnail.extension,
      };
    });

    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Failed to fetch images");
  }
}

function createHash(
  timestamp: number,
  privateKey: string,
  publicKey: string
): string {
  const hashGenerator = new SparkMD5();
  hashGenerator.append(timestamp.toString());
  hashGenerator.append(privateKey);
  hashGenerator.append(publicKey);
  return hashGenerator.end();
}

function getRandomOffset(total: number): number {
  return Math.floor(Math.random() * total);
}

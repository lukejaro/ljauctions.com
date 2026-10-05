import type { ImageMetadata } from "astro";
import calling from "../assets/photos/luke-calling.png";
import stage from "../assets/photos/luke-on-stage.png";
import waving from "../assets/photos/luke-waving.png";
import guest from "../assets/photos/luke-with-guest.png";

export interface GalleryShot {
  src: ImageMetadata;
  alt: string;
  widths: number[];
  position: string;
}

/** Home hero. Tight on the face; the soft table sits below the frame. */
export const heroPhoto = {
  src: calling,
  alt: "Luke Jaroszewski calling bids into a microphone, with notes in one hand and bidders seated behind him.",
  widths: [190, 380],
  position: "50% 18%",
} as const;

export const wavingPhoto = {
  src: waving,
  alt: "Luke Jaroszewski smiling and waving, wearing a dark jacket, in front of a wood wall.",
  widths: [480, 720, 960, 1063],
  position: "50% 30%",
} as const;

export const stageShot: GalleryShot = {
  src: stage,
  alt: "Luke Jaroszewski on stage with both arms raised while calling a sale.",
  widths: [420],
  position: "50% 70%",
};

const callingShot: GalleryShot = {
  src: calling,
  alt: heroPhoto.alt,
  widths: [190, 380],
  position: "50% 18%",
};

export const guestShot: GalleryShot = {
  src: guest,
  alt: "Luke Jaroszewski talking with a guest beside auction tables.",
  widths: [400, 720, 900],
  position: "center 40%",
};

const wavingShot: GalleryShot = {
  src: waving,
  alt: wavingPhoto.alt,
  widths: [480, 720, 960, 1063],
  position: "50% 30%",
};

/**
 * Home gallery. Two photos that are not the hero or the story, side by side at 3:2.
 */
export const homeShots: GalleryShot[] = [guestShot, wavingShot];

/**
 * About gallery. Photos not already used on this page, three across at 4:5.
 */
export const aboutShots: GalleryShot[] = [
  wavingShot,
  { ...guestShot, position: "50% 30%" },
  { ...stageShot, position: "50% 30%" },
];

export { callingShot };

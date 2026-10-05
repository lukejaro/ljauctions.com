import type { ImageMetadata } from "astro";
import calling from "../assets/photos/luke-calling.png";
import stage from "../assets/photos/luke-on-stage.png";
import portrait from "../assets/photos/luke-portrait.png";
import waving from "../assets/photos/luke-waving.png";
import guest from "../assets/photos/luke-with-guest.png";

export interface GalleryShot {
  src: ImageMetadata;
  alt: string;
  widths: number[];
  position: string;
}

/** Home hero. Action on the stand; no event or venue in the alt text. */
export const heroPhoto = {
  src: calling,
  alt: "Luke Jaroszewski calling bids into a microphone, with notes in one hand and bidders seated behind him.",
  widths: [480, 720, 1000, 1122],
  position: "40% 25%",
} as const;

export const wavingPhoto = {
  src: waving,
  alt: "Luke Jaroszewski smiling and waving, wearing a dark jacket, in front of a wood wall.",
  widths: [480, 720, 960, 1063],
  position: "72% 14%",
} as const;

export const portraitPhoto = {
  src: portrait,
  alt: "Luke Jaroszewski in profile, holding a microphone, wearing a navy blazer.",
  widths: [480, 720, 935],
  position: "18% 22%",
} as const;

const stageShot: GalleryShot = {
  src: stage,
  alt: "Luke Jaroszewski on stage with both arms raised while calling a sale.",
  widths: [400, 720, 1000, 1097],
  position: "center 28%",
};

const callingShot: GalleryShot = {
  src: calling,
  alt: "Luke Jaroszewski calling bids into a microphone, with notes in one hand and bidders seated behind him.",
  widths: [400, 720, 1000, 1122],
  position: "center 32%",
};

export const guestShot: GalleryShot = {
  src: guest,
  alt: "Luke Jaroszewski talking with a guest beside auction tables.",
  widths: [400, 720, 900],
  position: "center 40%",
};

/** Action photos for the home gallery. */
export const homeShots: GalleryShot[] = [stageShot, callingShot, guestShot];

/** Every photo, for the About gallery. */
export const aboutShots: GalleryShot[] = [
  {
    src: waving,
    alt: wavingPhoto.alt,
    widths: [400, 720, 1000, 1063],
    position: "72% 14%",
  },
  {
    src: portrait,
    alt: portraitPhoto.alt,
    widths: [400, 720, 935],
    position: "18% 22%",
  },
  stageShot,
  callingShot,
  guestShot,
];

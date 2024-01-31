export interface MenuItem {
  name: string;
  ingredients: string;
  emotion: MenuMood;
  type: "coffee" | string;
  image: string;
}

export type MenuMood = "happy" | "sad" | "angry" | "stressed" | "neutral";
export type MenuMoodExtended = MenuMood | "none";
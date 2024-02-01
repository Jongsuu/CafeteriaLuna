export interface MenuItem {
  name: string;
  ingredients: string;
  emotion: MenuMood;
  type: MenuType;
  image: string;
}

export interface MenuSections {
  coffee: boolean;
  smoothie: boolean;
  cake: boolean;
  tea: boolean;
  breakfast: boolean;
}

export type MenuMood = "happy" | "sad" | "angry" | "stressed" | "neutral";
export type MenuType = "coffee" | "smoothie" | "cake" | "tea" | "breakfast";
export type MenuMoodExtended = MenuMood | "none";

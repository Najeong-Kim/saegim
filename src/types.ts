export type Era = "past" | "present" | "future";

export type UserInput = {
  worry: string;
  era: Era;
};

export type AnimalType = "tiger" | "bear" | "magpie";

export interface Choice {
  id: string;
  text: string;
  approach: "action" | "self_regulation" | "wisdom";
}

export interface Scene {
  id: number;
  description: string;
  choices: Choice[];
}

export interface FixedEnding {
  summary: string;
  visualGoal: string;
}

export interface StoryResponse {
  animal: AnimalType;
  emotion: string;
  need: string;
  title: string;
  fixedEnding: FixedEnding;
  intro: string;
  scenes: Scene[];
  ending: string;
  reflection: string;
  imageScene: string;
}

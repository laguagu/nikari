export type Material =
  | "wood"
  | "lacqueredWood"
  | "laminate"
  | "metal"
  | "leather"
  | "plastic"
  | "fabric"
  | "outdoor"
  | "vegetableTannedLeather"
  | "aniline"
  | "sauna";

export type MaterialCareInstructions = {
  [K in Material]?: {
    "1": string;
    "2": string;
    "3"?: string;
    "4"?: string;
  };
};

export type MaterialInstructions = {
  material: Material;
  instructions:
    | { "1": string; "2": string; "3"?: string; "4"?: string }
    | undefined;
};

export type CareInstructionsFormProps = {
  materials: { [key: string]: boolean } | null;
};

export interface CareGuidesProps {
  careGuides: MaterialInstructions[];
}

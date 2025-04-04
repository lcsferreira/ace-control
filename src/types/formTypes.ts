import { PlayerPosition } from "./userTypes";

export interface PlayerConfigForm {
  phone: string;
  height: number;
  weight: number;
  inGameNumber: number;
  position: PlayerPosition;
  image?: File | string | null;
}

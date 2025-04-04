export enum PlayerPosition {
  Levantador = "Levantador",
  Oposto = "Oposto",
  Ponteiro = "Ponteiro",
  Central = "Central",
  Líbero = "Líbero",
}

export type AttackStats = {
  total: number;
  points: number;
  errors: number;
  blockeds: number;
  efficiency: number;
};

export type BlockStats = {
  total: number;
  points: number;
  errors: number;
  blockeds: number;
};

export type ServeStats = {
  total: number;
  aces: number;
  errors: number;
  efficiency: number;
};

export type ReceptionStats = {
  total: number;
  errors: number;
  efficiency: number;
};

export type DefenseStats = {
  total: number;
  errors: number;
  efficiency: number;
};

export type SetterStats = {
  total: number;
  assists: number;
  errors: number;
  efficiency: number;
};

export type PlayerStats = {
  attack: AttackStats;
  block: BlockStats;
  serve: ServeStats;
  reception: ReceptionStats;
  defense: DefenseStats;
  setter: SetterStats;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  team: string;
  role: string;
  height: number;
  weight: number;
  inGameNumber: number;
  position: PlayerPosition;
  image: string;
  stats: PlayerStats;
  hasConfigured: boolean;
};

import { User } from "./userTypes";

export type TeamStats = {
  totalPoints: number;
  pointsPerSet: number;
  totalErrors: number;
  aces: number;
  attackEfficiency: number;
  blockEfficiency: number;
  receptionEfficiency: number;
};

export type Team = {
  id: string;
  name: string;
  logo: string;
  createdAt: string;
  colors: {
    primary: string;
    secondary: string;
  };
  players: User[];
  stats: TeamStats;
};

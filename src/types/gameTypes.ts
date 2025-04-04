export type Game = {
  id: string;
  date: string;
  team1: string;
  team2: string;
  winner: string;
  loser: string;
  sets: Set[];
};

export type Set = {
  id: string;
  team1Points: number;
  team2Points: number;
  team1Score: number;
  team2Score: number;
  team1Errors: number;
  team2Errors: number;
  team1Aces: number;
  team2Aces: number;
};

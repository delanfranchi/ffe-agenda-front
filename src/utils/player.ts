import { Player } from "../_types";

export const sortPlayerByElo = (players: Player[]) => {
  return players.sort((a, b) => b.elo - a.elo);
};

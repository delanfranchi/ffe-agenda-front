import { Player } from "../_types";

export const sortPlayerByElo = (players: Player[]) => {
  return players.sort((a, b) => b.elo - a.elo);
};

export const getClubParticipants = (players: Player[], club: string) => {
  return players.filter((player) =>
    player.club?.toLowerCase().includes(club.toLowerCase())
  );
};

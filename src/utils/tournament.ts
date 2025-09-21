import { Tournament } from "@types";
import { html } from "lit";
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

export const formatDay = (date: string): string => {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
  });
};
export const formatMonth = (date: string): string => {
  return new Date(date).toLocaleDateString("fr-FR", {
    month: "short",
  });
};
export const formatYear = (date: string): string => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
  });
};

export const dateMarkup = (tournament: Tournament) => {
  const day = formatDay(tournament.date);
  const month = formatMonth(tournament.date);
  const year = formatYear(tournament.date);
  return html`
    <div class="flex flex-col items-center uppercase w-14 ">
      <div class="text-3xl/none font-bold">${day}</div>
      <div class="text-lg/none">${month}</div>
      <div class="text-sm/none mt-1">${year}</div>
    </div>
  `;
};

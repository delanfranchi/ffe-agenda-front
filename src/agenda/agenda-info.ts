import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import tailwind from "@tailwind";
import type { Tournament, Player } from "@types";
import { API_URL } from "../const";

@customElement("ffe-agenda-info")
export class FfeAgendaInfo extends LitElement {
  @property({ type: Object }) tournament!: Tournament;
  @property({ type: String }) club: string = "";

  @state() private players: Player[] = [];
  @state() private clubParticipants: Player[] = [];
  @state() private loading: boolean = false;
  @state() private loaded: boolean = false;

  static styles = [
    tailwind,
    css`
      :host {
        display: block;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    if (this.tournament && !this.loaded && !this.loading) {
      this.loadTournamentDetails();
    }
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (
      changedProperties.has("tournament") &&
      this.tournament &&
      !this.loaded &&
      !this.loading
    ) {
      this.loadTournamentDetails();
    }
  }

  private async loadTournamentDetails() {
    if (this.loaded || this.loading) return;

    this.loading = true;

    try {
      const apiUrl = API_URL;
      const apiUrlWithoutTrailingSlash = apiUrl.endsWith("/")
        ? apiUrl.slice(0, -1)
        : apiUrl;
      const response = await fetch(
        `${apiUrlWithoutTrailingSlash}/api/tournaments/${this.tournament.id}/players`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.data) {
        this.players = data.data;
        this.extractClubParticipants();
        this.loaded = true;
      }
    } catch (error) {
      console.error("Error loading tournament details:", error);
    } finally {
      this.loading = false;
    }
  }

  private extractClubParticipants() {
    if (!this.club) {
      this.clubParticipants = [];
      return;
    }

    this.clubParticipants = this.players.filter((player) =>
      player.club.toLowerCase().includes(this.club.toLowerCase())
    );
  }

  private formatDate(date: string): string {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  }

  render() {
    if (!this.tournament) return nothing;

    return html`
      <div class="mb-6">
        <h3
          class="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-gray-200"
        >
          Informations générales
        </h3>
        <div
          class="grid grid-cols-[auto_1fr] gap-2 gap-x-4 items-start sm:grid-cols-1 sm:gap-1"
        >
          <span
            class="font-medium text-gray-600 min-w-[120px] sm:min-w-0 sm:font-semibold"
            >Nom :</span
          >
          <span class="text-gray-900">${this.tournament.name}</span>

          <span
            class="font-medium text-gray-600 min-w-[120px] sm:min-w-0 sm:font-semibold"
            >Date :</span
          >
          <span class="text-gray-900"
            >${this.formatDate(this.tournament.date)}</span
          >

          <span
            class="font-medium text-gray-600 min-w-[120px] sm:min-w-0 sm:font-semibold"
            >Lieu :</span
          >
          <span class="text-gray-900">${this.tournament.location}</span>

          <span
            class="font-medium text-gray-600 min-w-[120px] sm:min-w-0 sm:font-semibold"
            >Département :</span
          >
          <span class="text-gray-900">${this.tournament.department}</span>

          <span
            class="font-medium text-gray-600 min-w-[120px] sm:min-w-0 sm:font-semibold"
            >Type :</span
          >
          <span class="text-gray-900">${this.tournament.type}</span>

          <span
            class="font-medium text-gray-600 min-w-[120px] sm:min-w-0 sm:font-semibold"
            >Statut :</span
          >
          <span class="text-gray-900">${this.tournament.status}</span>

          ${this.tournament.endDate
            ? html`
                <span
                  class="font-medium text-gray-600 min-w-[120px] sm:min-w-0 sm:font-semibold"
                  >Date de fin :</span
                >
                <span class="text-gray-900"
                  >${this.formatDate(this.tournament.endDate)}</span
                >
              `
            : nothing}
          ${this.tournament.maxPlayers
            ? html`
                <span
                  class="font-medium text-gray-600 min-w-[120px] sm:min-w-0 sm:font-semibold"
                  >Places max :</span
                >
                <span class="text-gray-900">${this.tournament.maxPlayers}</span>
              `
            : nothing}
          ${this.tournament.currentPlayers
            ? html`
                <span
                  class="font-medium text-gray-600 min-w-[120px] sm:min-w-0 sm:font-semibold"
                  >Participants actuels :</span
                >
                <span class="text-gray-900"
                  >${this.tournament.currentPlayers}</span
                >
              `
            : nothing}
          ${this.tournament.registrationDeadline
            ? html`
                <span
                  class="font-medium text-gray-600 min-w-[120px] sm:min-w-0 sm:font-semibold"
                  >Date limite d'inscription :</span
                >
                <span class="text-gray-900"
                  >${this.formatDate(
                    this.tournament.registrationDeadline
                  )}</span
                >
              `
            : nothing}
        </div>
      </div>

      <div class="mb-6">
        <h3
          class="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-gray-200"
        >
          Participants
        </h3>
        <ffe-player-list
          .players=${this.players}
          .club=${this.club}
        ></ffe-player-list>
      </div>

      ${this.club && this.clubParticipants.length > 0
        ? html`
            <div class="mb-6">
              <h3
                class="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b-2 border-gray-200"
              >
                Participants du club (${this.club})
              </h3>
              <ffe-player-list
                .players=${this.clubParticipants}
                .club=${this.club}
                .showOnlyClub=${true}
              ></ffe-player-list>
            </div>
          `
        : nothing}
    `;
  }
}

import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import tailwind from "@tailwind";
import type { Tournament, Player } from "@types";
import { API_URL } from "../global";
import { dateMarkup } from "../utils/tournament";
import { getClubParticipantsCount } from "../utils/player";
import { icon } from "../_svg";

@customElement("ffe-agenda-info")
export class FfeAgendaInfo extends LitElement {
  @property({ type: Object }) tournament!: Tournament;
  @property({ type: String }) club: string = "";

  @state() private players: Player[] = [];
  @state() private details: Tournament | null = null;
  @state() private loading: boolean = false;
  @state() private loaded: boolean = false;
  @state() private showOnlyClub: boolean = false;

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
      const baseUrl = this.getBaseApiUrl();
      const tournamentId = this.tournament.id;

      // Fetch both players and details in parallel for better performance
      const [playersResponse, detailsResponse] = await Promise.all([
        this.fetchTournamentData(
          `${baseUrl}/api/tournaments/${tournamentId}/players`
        ),
        this.fetchTournamentData(`${baseUrl}/api/tournaments/${tournamentId}`),
      ]);

      // Process players data
      this.players = this.extractPlayersFromResponse(playersResponse);

      // Process tournament details
      this.details = this.extractDetailsFromResponse(detailsResponse);

      this.loaded = true;
    } catch (error) {
      this.handleLoadError(error);
    } finally {
      this.loading = false;
    }
  }

  private getBaseApiUrl(): string {
    const apiUrl = API_URL;
    return apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
  }

  private async fetchTournamentData(url: string): Promise<any> {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return response.json();
  }

  private extractPlayersFromResponse(response: any): Player[] {
    if (response.success && Array.isArray(response.data)) {
      return response.data;
    }

    // Fallback: if response is directly an array
    if (Array.isArray(response)) {
      return response;
    }

    console.warn("Unexpected players response format:", response);
    return [];
  }

  private extractDetailsFromResponse(response: any): Tournament | null {
    if (response.success && response.data?.tournament) {
      return response.data.tournament;
    }

    if (response.success && response.data) {
      return response.data;
    }

    console.warn("Unexpected details response format:", response);
    return null;
  }

  private handleLoadError(error: any): void {
    console.error("Error loading tournament details:", error);
    this.players = [];
    this.details = null;
    this.loaded = true; // Mark as loaded to prevent retry loops
  }

  render() {
    if (!this.tournament) return nothing;

    const tournamentData = this.details || this.tournament;
    const clubPlayerCount = getClubParticipantsCount(this.players, this.club);

    return html`
      ${this.renderTournamentHeader(tournamentData)}
      ${this.renderParticipantControls(clubPlayerCount)}
      ${this.renderPlayerList()}
    `;
  }

  private renderTournamentHeader(tournament: Tournament) {
    return html`
      <div class="flex items-start gap-2">
        <div class="shrink-0">${dateMarkup(tournament)}</div>
        <div class="flex items-start justify-between pt-1">
          <div class="flex-1">
            <div class="text-sm/tight">
              ${tournament.location} • ${tournament.department}
            </div>
            <div
              class="text-xl/tight lg:text-2xl/tight  font-bold font-headings mb-6 pr-6 text-pretty"
            >
              ${tournament.name}
            </div>
            ${this.renderTournamentDetails()}
            <div class="mb-8">
              <a
                href="${tournament.url}"
                class="flex items-center gap-2 font-semibold group"
                target="_blank"
                rel="noopener"
              >
                ${icon("arrowRight")}
                <span class="group-hover:underline">Voir sur le site FFE</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderTournamentDetails() {
    const detail = this.details;
    if (!detail) return nothing;
    return html`
      <div class="flex gap-x-5 flex-wrap my-2">
        ${this.info("Rondes", detail.rounds)}
        ${this.info("Cadence", detail.timeControl)}
        ${this.info("Appariement", detail.pairingSystem)}
      </div>
      <div class="mb-3">${detail.address}</div>
    `;
  }

  private info(label: string, value?: string | number) {
    if (!value) return nothing;
    return html` <div class="flex gap-2">
      <div class="font-semibold">${label}</div>
      <div>${value}</div>
    </div>`;
  }

  private renderParticipantControls(clubPlayerCount: number) {
    if (this.players.length === 0) return nothing;
    return html`
      <div class="flex justify-between items-center mb-1">
        <div class="flex gap-2">
          <button
            data-active=${!this.showOnlyClub || nothing}
            class="btn"
            @click=${() => (this.showOnlyClub = false)}
          >
            ${icon("user")} Tous les participants (${this.players.length})
          </button>
          ${this.club && clubPlayerCount > 0
            ? html`
                <button
                  data-active=${this.showOnlyClub || nothing}
                  class="btn"
                  @click=${() => (this.showOnlyClub = true)}
                >
                  ${icon("star")} Club (${clubPlayerCount})
                </button>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  private renderPlayerList() {
    return html`
      <ffe-player-list
        .players=${this.players}
        .club=${this.club}
        .showOnlyClub=${this.showOnlyClub}
      ></ffe-player-list>
    `;
  }
}

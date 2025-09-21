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
      const apiUrl = API_URL;
      const apiUrlWithoutTrailingSlash = apiUrl.endsWith("/")
        ? apiUrl.slice(0, -1)
        : apiUrl;

      const requestUrl = `${apiUrlWithoutTrailingSlash}/api/tournaments/${this.tournament.id}/players`;

      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error text:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();

      if (data.success && data.data) {
        this.players = data.data;
        this.loaded = true;
      } else {
        console.warn("Response format unexpected:", data);
        // Fallback: try to use the data directly if it's an array
        if (Array.isArray(data)) {
          this.players = data;
          this.loaded = true;
        }
      }
    } catch (error) {
      console.error("Error loading tournament details:", error);
      // Set empty players array on error to prevent UI issues
      this.players = [];
      this.loaded = true; // Mark as loaded to prevent retry loops
    } finally {
      this.loading = false;
    }
  }

  render() {
    if (!this.tournament) return nothing;
    const clubPlayerCount = getClubParticipantsCount(this.players, this.club);

    return html`
      <div class="flex items-start gap-2">
        <div class="shrink-0">${dateMarkup(this.tournament)}</div>
        <div class="flex items-start justify-between pt-1">
          <div class="flex-1">
            <div class="text-sm/tight ">
              ${this.tournament.location} • ${this.tournament.department}
            </div>
            <div class="text-lg/tight mb-1 font-bold font-headings">
              ${this.tournament.name}
            </div>
            <div class="mb-6">
              <a href="${this.tournament.url}" class="btn btn-outline">
                ${icon("arrowRight")} Voir sur le site FFE</a
              >
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center mb-1">
        <div class="flex gap-2">
          <button
            data-active=${!this.showOnlyClub || nothing}
            class="btn"
            @click=${() => (this.showOnlyClub = false)}
          >
            ${icon("user")} Tous les participants (${this.players.length})
          </button>
          ${this.club && clubPlayerCount
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
      <ffe-player-list
        .players=${this.players}
        .club=${this.club}
        .showOnlyClub=${this.showOnlyClub}
      ></ffe-player-list>
    `;
  }
}

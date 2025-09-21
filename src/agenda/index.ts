import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import type {
  Tournament,
  ApiResponse,
  ChessAgendaProps,
  TournamentListResponse,
} from "@types";
import "./agenda-item";
import "../loader";
import tailwind from "@tailwind";
import { API_URL } from "../global";

@customElement("ffe-agenda-widget")
export class FfeAgendaWidget extends LitElement implements ChessAgendaProps {
  static styles = [
    tailwind,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: Array }) departements: number[] = [];
  @property({ type: String }) club: string = "";
  @property({ type: Number }) limit: number = 20;
  @property({ type: Boolean }) showOnlyClub: boolean = false;

  @state() private tournaments: Tournament[] = [];
  @state() private loading: boolean = false;
  @state() private error: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.loadTournaments();
  }

  private async loadTournaments() {
    if (!this.departements || this.departements.length === 0) {
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      const params = new URLSearchParams({
        limit: this.limit.toString(),
        showOnlyClub: this.showOnlyClub.toString(),
        next: "true",
      });

      // Ajouter chaque département avec department[]
      this.departements.forEach((dept) => {
        params.append("department[]", dept.toString());
      });

      if (this.club) {
        params.set("club", this.club);
      }

      const apiUrl = API_URL;
      const apiUrlWithoutTrailingSlash = apiUrl.endsWith("/")
        ? apiUrl.slice(0, -1)
        : apiUrl;
      const response = await fetch(
        `${apiUrlWithoutTrailingSlash}/api/tournaments?${params}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData: ApiResponse<TournamentListResponse> =
        await response.json();

      if (responseData.success && responseData.data) {
        this.tournaments = responseData.data.tournaments;
      } else {
        throw new Error(responseData.error || "Unknown error");
      }
    } catch (error) {
      this.error = error instanceof Error ? error.message : "Unknown error";
    } finally {
      this.loading = false;
    }
  }

  render() {
    if (this.loading) {
      return html` <ffe-agenda-loader></ffe-agenda-loader> `;
    }

    if (this.error) {
      return html`
        <div>
          <div class="p-2">Erreur: ${this.error}</div>
        </div>
      `;
    }

    if (this.tournaments.length === 0) {
      return html`
        <div>
          <div class="text-center p-2">Aucun tournoi trouvé</div>
        </div>
      `;
    }

    return html`
      <div>
        ${repeat(
          this.tournaments,
          (tournament) => tournament.id,
          (tournament) => html`
            <ffe-agenda-item
              .tournament=${tournament}
              .club=${this.club}
              class="block border-b-2 border-current"
            >
            </ffe-agenda-item>
          `
        )}
      </div>
    `;
  }
}

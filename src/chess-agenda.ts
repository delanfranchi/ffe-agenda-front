import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import type { Tournament, ApiResponse, ChessAgendaProps } from "./_types/index";
import "./chess-agenda-item";
import tailwind from "@tailwind";

@customElement("chess-agenda")
export class ChessAgenda extends LitElement implements ChessAgendaProps {
  @property({ type: Array }) departements: number[] = [];
  @property({ type: String }) club: string = "";
  @property({ type: Number }) limit: number = 20;
  @property({ type: Boolean }) showOnlyClub: boolean = false;
  @property({ type: String }) apiBaseUrl: string =
    "https://ffe-agenda-back.vercel.app/";

  @state() private tournaments: Tournament[] = [];
  @state() private loading: boolean = false;
  @state() private error: string | null = null;

  static styles = [
    tailwind,
    css`
      :host {
        display: block;
      }

      chess-agenda-item {
        display: block;
        margin: 0 0 1.25em 0;
        padding-bottom: 1.25em;
        border-bottom: 1px solid currentColor;
      }
    `,
  ];

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

      const apiUrl = this.apiBaseUrl;
      const response = await fetch(`${apiUrl}/api/agenda?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<Tournament[]> = await response.json();

      if (data.success && data.data) {
        this.tournaments = data.data;
        console.log("Tournaments loaded:", this.tournaments);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (error) {
      this.error = error instanceof Error ? error.message : "Unknown error";
      console.error("Error loading tournaments:", error);
    } finally {
      this.loading = false;
    }
  }

  render() {
    if (this.loading) {
      return html`
        <div>
          <div class="text-center p-2">Chargement des tournois...</div>
        </div>
      `;
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
            <chess-agenda-item
              .tournament=${tournament}
              .apiBaseUrl=${this.apiBaseUrl}
              .club=${this.club}
            >
            </chess-agenda-item>
          `
        )}
      </div>
    `;
  }
}

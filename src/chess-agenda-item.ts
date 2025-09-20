import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Tournament, Player } from "./_types/index";
import tailwind from "@tailwind";

@customElement("chess-agenda-item")
export class ChessAgendaItem extends LitElement {
  @property({ type: Object }) tournament!: Tournament;
  @property({ type: String }) apiBaseUrl: string = "http://localhost:3012";
  @property({ type: String }) club: string = "";

  @state() private players: Player[] = [];
  @state() private clubParticipants: Player[] = [];
  @state() private loading: boolean = false;
  @state() private loaded: boolean = false;
  @state() private showParticipants: boolean = false;

  private observer?: IntersectionObserver;

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
    this.setupIntersectionObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.loaded && !this.loading) {
            this.loadTournamentDetails();
          }
        });
      },
      {
        rootMargin: "50px", // Commencer à charger 50px avant que l'élément soit visible
      }
    );

    this.observer.observe(this);
  }

  private async loadTournamentDetails() {
    if (this.loaded || this.loading) return;

    this.loading = true;

    try {
      const apiUrl = this.apiBaseUrl;
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
        this.extractParticipants();
        this.loaded = true;
      }
    } catch (error) {
      console.error("Error loading tournament details:", error);
    } finally {
      this.loading = false;
    }
  }

  private extractParticipants() {
    if (!this.club) {
      this.clubParticipants = [];
      return;
    }

    this.clubParticipants = this.players.filter((player) =>
      player.club.toLowerCase().includes(this.club.toLowerCase())
    );
  }

  private toggleParticipants() {
    this.showParticipants = !this.showParticipants;
  }

  private formatDate(date: string): string {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  render() {
    return html`
      <div class="border-b border-current last:border-b-0">
        <div class="text-sm mb-1">
          ${this.formatDate(this.tournament.date)} ― ${this.tournament.location}
          (${this.tournament.department})
        </div>
        <div class="text-xl font-bold mb-1">${this.tournament.name}</div>

        ${this.loading
          ? html`<div class="text-sm text-gray-500">Chargement...</div>`
          : nothing}
        ${this.clubParticipants.length > 0
          ? html`
              <button
                class="mt-1 px-3 py-1 text-xs border border-current rounded hover:bg-gray-100 transition-colors"
                @click=${this.toggleParticipants}
              >
                ${this.clubParticipants.length}
                joueur${this.clubParticipants.length > 1 ? "s" : nothing} du
                club ${this.club}
              </button>
              ${this.showParticipants
                ? html`
                    <div class="mt-2 pl-4 border-l border-current">
                      ${this.clubParticipants.map(
                        (player) => html`
                          <div class="text-xs my-1">
                            ${player.firstName} ${player.name} (${player.elo})
                          </div>
                        `
                      )}
                    </div>
                  `
                : nothing}
            `
          : nothing}
      </div>
    `;
  }
}

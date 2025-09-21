import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Tournament, Player } from "../_types/index";
import tailwind from "@tailwind";
import "./club-participants";

@customElement("ffe-agenda-item")
export class FfeAgendaItem extends LitElement {
  @property({ type: Object }) tournament!: Tournament;
  @property({ type: String }) apiBaseUrl: string =
    "https://ffe-agenda-back.vercel.app";
  @property({ type: String }) club: string = "";

  @state() private players: Player[] = [];
  @state() private clubParticipants: Player[] = [];
  @state() private loading: boolean = false;
  @state() private loaded: boolean = false;

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
        rootMargin: "200px", // Commencer à charger 50px avant que l'élément soit visible
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

  private formatDate(date: string): string {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  render() {
    return html`
      <div class="py-3">
        <div class="text-sm leading-tight">
          ${this.formatDate(this.tournament.date)} ― ${this.tournament.location}
          (${this.tournament.department})
        </div>
        <div class="text-xl font-bold mb-1 leading-tight">
          ${this.tournament.name}
        </div>

        <ffe-club-participants
          .participants=${this.clubParticipants}
        ></ffe-club-participants>
      </div>
    `;
  }
}

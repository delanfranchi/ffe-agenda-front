import { LitElement, html, css, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type { Tournament, Player } from "@types";
import tailwind from "@tailwind";
import "./club-participants";
import "./agenda-info";
import "../dialog";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { FfeDialog } from "../dialog";
import { API_URL } from "../const";

@customElement("ffe-agenda-item")
export class FfeAgendaItem extends LitElement {
  @property({ type: Object }) tournament!: Tournament;
  @property({ type: String }) club: string = "";

  @state() private players: Player[] = [];
  @state() private clubParticipants: Player[] = [];
  @state() private loading: boolean = false;
  @state() private loaded: boolean = false;

  @query("#infoDialog") private infoDialog!: FfeDialog;

  private observer?: IntersectionObserver;

  svgInfo = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="m9,12 3,3 3,-3"></path>
    </svg>
  `;

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

  private formatName(name: string) {
    // Extract text in parentheses using regex
    const match = name.match(/\((.*?)\)/);
    let textInparenthesis = "";
    if (match) {
      textInparenthesis = match[1].trim();
    }

    const textWithoutTextInparenthesis = name
      .replace(match?.[0] || "", "")
      .trim();
    return html`
      <div class="font-bold">${textWithoutTextInparenthesis}</div>
      ${textInparenthesis
        ? html`<div class="text-[.85em]">(${textInparenthesis})</div>`
        : nothing}
    `;
  }

  showInfoDialog() {
    // Récupérer le dialog à chaque fois pour s'assurer qu'il existe
    const dialogElement = this.infoDialog;
    if (dialogElement && dialogElement.show) {
      dialogElement.show();
    }
  }

  render() {
    return html`
      <div class="py-3">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="text-sm/tight ">
              ${this.formatDate(this.tournament.date)} ―
              ${this.tournament.location} (${this.tournament.department})
            </div>
            <div class="text-lg/tight mb-1">
              ${this.formatName(this.tournament.name)}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <ffe-club-participants
            .participants=${this.clubParticipants}
          ></ffe-club-participants>

          <button
            @click=${this.showInfoDialog}
            class="bg-transparent flex items-center gap-2"
            title="Informations détaillées"
          >
            ${unsafeHTML(this.svgInfo)} Infos
          </button>
        </div>

        <ffe-dialog id="infoDialog">
          <ffe-agenda-info
            .tournament=${this.tournament}
            .club=${this.club}
          ></ffe-agenda-info>
        </ffe-dialog>
      </div>
    `;
  }
}

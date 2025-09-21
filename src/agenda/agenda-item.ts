import { LitElement, html, css, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type { Tournament, Player } from "@types";
import tailwind from "@tailwind";
import "./agenda-info";
import "../dialog";
import { FfeDialog } from "../dialog";
import { API_URL } from "../const";
import { icon } from "../_svg";
import { getClubParticipants } from "../utils/player";
import "./player-list";

@customElement("ffe-agenda-item")
export class FfeAgendaItem extends LitElement {
  @property({ type: Object }) tournament!: Tournament;
  @property({ type: String }) club: string = "";

  @state() private players: Player[] = [];
  @state() private clubParticipants: Player[] = [];
  @state() private loading: boolean = false;
  @state() private loaded: boolean = false;

  @query("#infoDialog") private infoDialog!: FfeDialog;
  @query("#participantsDialog") private participantsDialog!: FfeDialog;

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
    this.clubParticipants = getClubParticipants(this.players, this.club);
  }

  private formatDate(date: string): string {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }

  private formatDay(date: string): string {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
    });
  }
  private formatMonth(date: string): string {
    return new Date(date).toLocaleDateString("fr-FR", {
      month: "short",
    });
  }
  private formatYear(date: string): string {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
    });
  }

  showInfoDialog() {
    // Récupérer le dialog à chaque fois pour s'assurer qu'il existe
    const dialogElement = this.infoDialog;
    if (dialogElement && dialogElement.show) {
      dialogElement.show();
    }
  }

  showParticipantsDialog() {
    const dialogElement = this.participantsDialog;
    if (dialogElement && dialogElement.show) {
      dialogElement.show();
    }
  }

  render() {
    const clubParticipantsCount = this.clubParticipants.length;
    const buttonText =
      clubParticipantsCount > 1
        ? `${clubParticipantsCount} Participants du club`
        : `${clubParticipantsCount} Participant du club`;

    const buttonDefaultClass =
      "flex items-center gap-2 border-2 rounded-md px-2 py-1 text-sm font-semibold";

    const day = this.formatDay(this.tournament.date);
    const month = this.formatMonth(this.tournament.date);
    const year = this.formatYear(this.tournament.date);

    return html`
      <div class="py-4 flex gap-3">
        <div class="flex flex-col items-center uppercase w-14">
          <div class="text-3xl/none font-bold">${day}</div>
          <div class="text-lg/none">${month}</div>
          <div class="text-sm/none mt-1">${year}</div>
        </div>
        <div>
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="text-sm/tight ">
                ${this.tournament.location} • ${this.tournament.department})
              </div>
              <div class="text-lg/tight mb-1 font-bold font-headings">
                ${this.tournament.name}
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click=${this.showInfoDialog}
              class="${buttonDefaultClass} bg-transparent border-current "
            >
              ${icon("info")} Infos
            </button>

            ${this.clubParticipants.length > 0
              ? html`<button
                  id="participantsButton"
                  @click=${this.showParticipantsDialog}
                  class="${buttonDefaultClass} border-primary bg-primary text-primary-content"
                >
                  ${icon("user")}
                  <span>${buttonText}</span>
                </button> `
              : nothing}
          </div>
        </div>

        <ffe-dialog id="infoDialog">
          <ffe-agenda-info
            .tournament=${this.tournament}
            .club=${this.club}
          ></ffe-agenda-info>
        </ffe-dialog>

        <ffe-dialog id="participantsDialog" title="${buttonText}">
          ${this.clubParticipants.length > 0
            ? html`<ffe-player-list
                .club=${this.club}
                .players=${this.clubParticipants}
                .showOnlyClub=${true}
              ></ffe-player-list>`
            : nothing}
        </ffe-dialog>
      </div>
    `;
  }
}

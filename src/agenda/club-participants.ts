import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwind from "@tailwind";
import type { Player } from "@types";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import "../dialog";

@customElement("ffe-club-participants")
export class FfeClubParticipants extends LitElement {
  @property({ type: Array }) participants: Player[] = [];
  @property({ type: Boolean }) loading: boolean = false;

  svgUser = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
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

  showDialog() {
    // Récupérer le dialog à chaque fois pour s'assurer qu'il existe
    const dialogElement = this.renderRoot.querySelector("ffe-dialog") as any;
    if (dialogElement && dialogElement.show) {
      dialogElement.show();
    }
  }

  render() {
    if (!this.participants.length) return nothing;
    const text =
      this.participants.length === 1
        ? "Participant du club"
        : "Participants du club";

    console.log(this.participants);
    return html`
      <div class="relative">
        <button
          id="participantsButton"
          @click=${this.showDialog}
          class="px-3 py-1 rounded-full text-sm bg-neutral-content text-neutral-bg flex items-center gap-2 font-bold hover:bg-neutral-200 transition-colors"
        >
          ${unsafeHTML(this.svgUser)}
          <span>${this.participants.length} ${text}</span>
        </button>

        <ffe-dialog title="Participants du club">
          ${this.participants.length === 0
            ? html`<div class="text-gray-500 text-center py-4">
                Aucun participant du club
              </div>`
            : html`
                <div class="space-y-2">
                  ${this.participants.map(
                    (participant) => html`
                      <div class="flex items-center justify-between  ">
                        <div>
                          <div class="font-medium ">${participant.name}</div>
                        </div>
                        <div>${participant.elo}</div>
                      </div>
                    `
                  )}
                </div>
              `}
        </ffe-dialog>
      </div>
    `;
  }
}

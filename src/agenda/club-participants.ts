import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwind from "@tailwind";
import type { Player } from "../_types/index";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

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

      /* Styles pour l'API Popover native */
      [popover] {
        position: fixed;
        inset: 0;
        width: fit-content;
        height: fit-content;
        margin: auto;
        border-radius: 0.5rem;
        padding: 1rem;
        background: white;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05);
        color: #1f2937;
        overflow: auto;
      }

      /* Style personnalisé quand le popover est ouvert */
      :popover-open {
        width: 300px;
        height: fit-content;
        position: absolute;
        inset: unset;
        margin: 0;
      }
    `,
  ];

  togglePop() {
    const popover = this.renderRoot.querySelector(
      "#participantsPopover"
    ) as HTMLElement;
    if (popover) {
      if (popover.matches(":popover-open")) {
        popover.hidePopover();
      } else {
        popover.showPopover();
      }
    }
  }

  render() {
    if (!this.participants.length) return nothing;
    const text =
      this.participants.length === 1
        ? "Participant du club"
        : "Participants du club";
    return html`
      <div class="relative">
        <button
          id="participantsButton"
          @click=${this.togglePop}
          class="px-3 py-1   rounded-full text-sm bg-neutral-content text-neutral-bg flex items-center gap-2 font-bold"
        >
          ${unsafeHTML(this.svgUser)}
          <span>${this.participants.length} ${text} </span>
        </button>

        <div id="participantsPopover" popover>
          ${this.participants.length === 0
            ? html`<div class="text-gray-500">Aucun participant du club</div>`
            : html`
                <ul class="space-y-2">
                  ${this.participants.map(
                    (participant) => html`
                      <li class="flex items-center gap-2">
                        <span class="font-medium">${participant.name}</span>
                        <span class="text-sm text-gray-500"
                          >(${participant.elo})</span
                        >
                      </li>
                    `
                  )}
                </ul>
              `}
        </div>
      </div>
    `;
  }
}

import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwind from "@tailwind";
import type { Player } from "../_types/index";

@customElement("ffe-club-participants")
export class FfeClubParticipants extends LitElement {
  @property({ type: Array }) participants: Player[] = [];
  @property({ type: Boolean }) loading: boolean = false;

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
    return html`
      <div class="relative">
        <button
          id="participantsButton"
          @click=${this.togglePop}
          class="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
        >
          ${this.loading
            ? html`<ffe-agenda-loader></ffe-agenda-loader>`
            : html`Participants du club (${this.participants.length})`}
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

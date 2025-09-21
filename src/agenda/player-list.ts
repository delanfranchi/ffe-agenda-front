import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Player } from "@types";
import tailwind from "@tailwind";
import { repeat } from "lit/directives/repeat.js";

@customElement("ffe-player-list")
export class FfePlayerList extends LitElement {
  static styles = [
    tailwind,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property({ type: String }) club: string = "";
  @property({ type: Boolean }) showOnlyClub: boolean = false;
  @property({ type: Array }) players: Player[] = [];
  @state() private renderPlayers: Player[] = [];

  private get clubPlayers() {
    if (!this.club) {
      return this.players;
    }
    return this.players.filter((player) =>
      player.club.toLowerCase().includes(this.club.toLowerCase())
    );
  }

  protected willUpdate(_changedProperties: PropertyValues): void {
    const players = this.showOnlyClub ? this.clubPlayers : this.players;
    const sortedPlayers = players.sort((a, b) => b.elo - a.elo);
    this.renderPlayers = sortedPlayers;
  }

  render() {
    if (this.renderPlayers.length === 0) {
      return html`
        <div class="text-center py-6 text-lg opacity-50">
          Aucun participant pour l'instant
        </div>
      `;
    }

    return html`
      <div>
        ${repeat(
          this.renderPlayers,
          (player) => player.id,
          (player, index) => {
            const matchClub = player.club
              .toLowerCase()
              .includes(this.club.toLowerCase());
            const isLast = index === this.renderPlayers.length - 1;
            return html`
              <div
                class="flex items-center  rounded-md p-2  w-full gap-3 hover:bg-[rgba(0,0,0,0.05)] transition-all duration-100"
              >
                <div>
                  <div class="font-medium">${player.name}</div>
                </div>

                <div class="ml-auto flex items-center gap-2 ">
                  ${!this.showOnlyClub
                    ? html`<div
                        class="text-xs ${matchClub
                          ? "text-primary font-semibold "
                          : ""}"
                      >
                        ${player.club}
                      </div>`
                    : nothing}
                  <div class="w-[8ch] text-right">${player.elo}</div>
                </div>
              </div>
              ${!isLast
                ? html`<div
                    class="border-b border-current border-dashed"
                  ></div>`
                : nothing}
            `;
          }
        )}
      </div>
    `;
  }
}

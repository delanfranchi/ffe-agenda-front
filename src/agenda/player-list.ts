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
    this.renderPlayers = this.showOnlyClub ? this.clubPlayers : this.players;
  }

  render() {
    if (this.renderPlayers.length === 0) {
      return html`
        <div class="text-center py-4">Aucun participant du club</div>
      `;
    }

    return html`
      <div>
        ${repeat(
          this.renderPlayers,
          (player) => player.id,
          (player, index) => {
            const matchClub =
              this.showOnlyClub &&
              player.club.toLowerCase().includes(this.club.toLowerCase());
            const isOdd = index % 2 === 0;
            return html`
              <div
                class="flex items-center justify-between rounded-md p-2 ${isOdd
                  ? "bg-[rgba(0,0,0,0.05)]"
                  : ""}"
              >
                <div>
                  <div class="font-medium">${player.name}</div>

                  ${!this.showOnlyClub
                    ? html`<div
                        class="text-sm ${matchClub ? "text-primary" : ""}"
                      >
                        ${player.club}
                      </div>`
                    : nothing}
                </div>
                <div>${player.elo}</div>
              </div>
            `;
          }
        )}
      </div>
    `;
  }
}

import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwind from "@tailwind";

@customElement("ffe-dialog")
export class FfeDialog extends LitElement {
  @property({ type: String }) title: string = "";
  @property({ type: Boolean, reflect: true }) open: boolean = false;

  static styles = [
    tailwind,
    css`
      :host {
        display: block;
      }

      dialog {
        border: none;
        border-radius: 0.75rem;
        padding: 0;
        max-width: 95vw;
        max-height: 95vh;
        width: 44rem;
        background: white;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      }

      dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
      }

      @media (max-width: 640px) {
        dialog {
          max-width: 95vw;
          margin: 1rem;
        }
      }
    `,
  ];

  private dialogElement?: HTMLDialogElement;

  firstUpdated() {
    this.dialogElement = this.renderRoot.querySelector(
      "dialog"
    ) as HTMLDialogElement;
  }

  show() {
    if (this.dialogElement) {
      this.dialogElement.showModal();
      this.open = true;
    }
  }

  hide() {
    if (this.dialogElement) {
      this.dialogElement.close();
      this.open = false;
    }
  }

  private handleClose() {
    this.hide();
  }

  private handleBackdropClick(event: MouseEvent) {
    if (event.target === this.dialogElement) {
      this.hide();
    }
  }

  render() {
    return html`
      <dialog @click=${this.handleBackdropClick} @close=${this.handleClose}>
        <div
          class="flex justify-between items-center px-6 pt-6 pb-0 border-b border-gray-200 mb-6"
        >
          <h2 class="text-xl font-semibold text-gray-900 m-0">${this.title}</h2>
          <button
            class="bg-transparent border-none text-2xl text-gray-500 cursor-pointer p-1 rounded-md transition-all hover:bg-gray-100 hover:text-gray-700"
            @click=${this.handleClose}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>
        <div class="px-6 pb-6 overflow-y-auto max-h-[70vh]">
          <slot></slot>
        </div>
      </dialog>
    `;
  }
}

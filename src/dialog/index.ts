import { LitElement, html, css, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import tailwind from "@tailwind";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

@customElement("ffe-dialog")
export class FfeDialog extends LitElement {
  @property({ type: Boolean, reflect: true }) open: boolean = false;
  @property({ type: String }) title: string = "";

  static styles = [
    tailwind,
    css`
      :host {
        display: block;
      }

      dialog {
        background: var(--ffe-neutral-bg, #fff);
        border: none;
        border-radius: 0.75rem;
        padding: 0;
        max-width: 95vw;
        max-height: 95vh;
        width: 44rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      }
      dialog::-webkit-scrollbar {
        border-radius: 5px;
        width: 3px;
        background: transparent;
      }
      dialog::-webkit-scrollbar-thumb {
        background: var(--ffe-neutral-content, #000);
        border-radius: 5px;
      }

      dialog::backdrop {
        background: rgba(0, 0, 0, 0.2);
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

  @query("#dialog") private dialogElement!: HTMLDialogElement;

  disconnectedCallback() {
    super.disconnectedCallback();
    document.body.removeAttribute("inert");
  }

  show() {
    if (this.dialogElement) {
      // Désactiver l'interactivité du body avec inert
      document.body.setAttribute("inert", "");
      this.dialogElement.showModal();
      this.open = true;
    }
  }

  hide() {
    if (this.dialogElement) {
      // Restaurer l'interactivité du body
      document.body.removeAttribute("inert");
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

  closeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

  render() {
    return html`
      <dialog
        id="dialog"
        @click=${this.handleBackdropClick}
        @close=${this.handleClose}
        class="relative p-5 lg:p-6"
      >
        ${this.title
          ? html`<div
              class="text-2xl font-bold font-headings mb-3 text-pretty pr-6"
            >
              ${this.title}
            </div>`
          : nothing}
        <button
          class=" absolute top-3 right-3 z-10 bg-transparent border-none text-2xl text-neutral-content cursor-pointer p-1 rounded-md transition-all hover:bg-primary hover:text-primary-content"
          @click=${this.handleClose}
          aria-label="Fermer"
        >
          ${unsafeHTML(this.closeSvg)}
        </button>
        <slot></slot>
      </dialog>
    `;
  }
}

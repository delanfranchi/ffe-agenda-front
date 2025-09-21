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
        position: fixed;

        /* Initial hidden state */
        opacity: 0;
        transform: translateY(-20px);
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

      dialog[open]::backdrop {
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(4px);
        backdrop-filter: blur(0px);
      }
      dialog::backdrop {
        transition-delay: 0.2s;
        transition-duration: 0.3s;
      }

      @media (max-width: 640px) {
        dialog {
          max-width: 95vw;
          margin: 1rem;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        dialog {
          opacity: 1;
          transform: none;
        }

        dialog::backdrop {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(4px);
        }
      }
    `,
  ];

  @query("#dialog") private dialogElement!: HTMLDialogElement;

  private currentAnimation: Animation | null = null;
  private currentOpacityAnimation: Animation | null = null;
  private isAnimating = false;

  disconnectedCallback() {
    super.disconnectedCallback();
    document.body.removeAttribute("inert");
  }

  show() {
    if (this.dialogElement && !this.isAnimating) {
      // Désactiver l'interactivité du body avec inert
      document.body.setAttribute("inert", "");
      this.dialogElement.showModal();
      this.open = true;

      this.animateIn();
    }
  }

  hide() {
    if (this.dialogElement && !this.isAnimating) {
      this.open = false;
      this.animateOut();
    }
  }

  private animateIn() {
    if (this.dialogElement && !this.isAnimating) {
      this.isAnimating = true;

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        // Skip animation for accessibility
        this.dialogElement.style.opacity = "1";
        this.dialogElement.style.transform = "translateY(0)";
        this.isAnimating = false;
        return;
      }

      // Cancel any existing animations
      if (this.currentAnimation) {
        this.currentAnimation.cancel();
      }
      if (this.currentOpacityAnimation) {
        this.currentOpacityAnimation.cancel();
      }

      // Animate dialog - separate animations for opacity and transform
      this.currentOpacityAnimation = this.dialogElement.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        {
          duration: 200,
          easing: "linear",
          fill: "forwards",
        }
      );

      this.currentAnimation = this.dialogElement.animate(
        [{ transform: "translateY(20px)" }, { transform: "translateY(0)" }],
        {
          duration: 200,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)", // ease
          fill: "forwards",
        }
      );
      this.currentAnimation.addEventListener("finish", () => {
        this.isAnimating = false;
      });
    }
  }

  private animateOut() {
    if (this.dialogElement && !this.isAnimating) {
      this.isAnimating = true;

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        // Skip animation for accessibility
        this.dialogElement.close();
        document.body.removeAttribute("inert");
        this.isAnimating = false;
        return;
      }

      // Cancel any existing animations
      if (this.currentAnimation) {
        this.currentAnimation.cancel();
      }
      if (this.currentOpacityAnimation) {
        this.currentOpacityAnimation.cancel();
      }

      // Animate dialog out - separate animations for opacity and transform
      this.currentOpacityAnimation = this.dialogElement.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        {
          duration: 200,
          easing: "linear",
          fill: "forwards",
        }
      );

      this.currentAnimation = this.dialogElement.animate(
        [{ transform: "translateY(0)" }, { transform: "translateY(20px)" }],
        {
          duration: 200,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)", // ease
          fill: "forwards",
        }
      );

      this.currentAnimation.addEventListener("finish", () => {
        this.dialogElement.close();
        document.body.removeAttribute("inert");
        this.isAnimating = false;
      });
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

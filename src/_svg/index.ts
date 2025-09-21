import { html, svg } from "lit";

const svgs = {
  user: svg`
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
    `,
  info: svg`
           <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
    `,
  close: svg`
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    `,
};

export const icon = (name: keyof typeof svgs, size: string = "1.25em") => {
  return html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${size}"
      height="${size}"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-${name}"
    >
      ${svgs[name]}
    </svg>
  `;
};

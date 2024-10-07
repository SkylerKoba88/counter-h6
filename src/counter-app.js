import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.counter = 20;
    this.min = 0;
    this.max = 0;
    this.fancy = false;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: {type: Number, reflect: true},
      min: {type: Number},
      max: {type: Number},
      fancy: {type: Boolean, reflect: true}
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
        text-align: center;
      }
      :host([fancy]) h1 {
        color: teal;
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        border: solid black 4px;
        border-radius: 4px;
      }
      div {
        display: block;
        padding: 0;
        margin: 0;
      }
      button {
        color: var(--ddd-primary-6);
        background-color: white;
        border: var(--ddd-primary-6);
        border-radius: 4px;
        font-size: 24px;
        padding-left: 8px;
        padding-right: 8px;
      }
      button:active {
        color: white;
        background-color: var(--ddd-accent-6);
      }
    `];
  }
  increment() {
    if (this.counter < this.max) {
      this.counter ++;
    }
    this.changeColor();
    return this.counter;
  }
  decrement() {
    if (this.counter > this.min) {
      this.counter --;
    }
    this.changeColor();
    return this.counter;
  }

  changeColor() {
    console.log("changing color");
    if (this.counter === 18 || this.counter === 21 || 
      this.counter === this.min || this.counter === this.max) {
      this.fancy = true;
    } else {
      this.fancy = false;
    }
  }
  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
  updated(changedProperties) {
    if (changedProperties.has(this.counter === 21)) {
      this.makeItRain();
    }
  }

  render() {
    return html`
<div class="wrapper">
<confetti-container id="confetti">
  <div>${this.title}
    <h1 id="counterTitle">${this.counter}</h1>
    <button @click=${this.decrement} ?disabled="${this.min === this.counter}">-</button>
    <button @click=${this.increment} ?disabled="${this.max === this.counter}">+</button>

  </div>
  <slot></slot>
  </confetti-container>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);
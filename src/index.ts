const DEFAULT_MAX_HEIGHT = 400

const fitToContent = (textarea: HTMLTextAreaElement, maxHeight: number): void => {
  let adjustedHeight = textarea.clientHeight

  if (maxHeight > adjustedHeight) {
    adjustedHeight = Math.max(textarea.scrollHeight, adjustedHeight)
    adjustedHeight = Math.min(maxHeight, adjustedHeight)

    if (adjustedHeight > textarea.clientHeight) {
      textarea.style.minHeight = `${adjustedHeight}px`
    }
  }
}

export class AutosizeTextarea extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['max-height']
  }

  connectedCallback(): void {
    this.addEventListener('input', this.fitToContent)
    // NOTE: focus does not bubble
    this.addEventListener('focusin', this.fitToContent)

    // NOTE: wait childNodes
    window.setTimeout(this.fitToContent, 0)
  }

  disconnectedCallback(): void {
    this.removeEventListener('input', this.fitToContent)
    this.removeEventListener('focusin', this.fitToContent)
  }

  attributeChangedCallback(): void {
    this.fitToContent()
  }

  reset(): void {
    const {textarea} = this
    if (!textarea) return

    textarea.style.minHeight = ''
  }

  fitToContent = (): void => {
    // eslint-disable-next-line no-invalid-this
    const {textarea, maxHeight} = this
    if (!textarea) return

    fitToContent(textarea, maxHeight)
  }

  get textarea(): HTMLTextAreaElement | undefined {
    return this.querySelector('textarea') ?? undefined
  }

  get maxHeight(): number {
    const maxHeight = this.getAttribute('max-height')
    return maxHeight ? Number.parseInt(maxHeight, 10) : DEFAULT_MAX_HEIGHT
  }
}

declare global {
  interface Window {
    AutosizeTextarea: typeof AutosizeTextarea
  }
}

if (!window.customElements.get('autosize-textarea')) {
  window.AutosizeTextarea = AutosizeTextarea
  window.customElements.define('autosize-textarea', AutosizeTextarea)
}

import { loadDefaultJapaneseParser } from 'budoux'
const parser = loadDefaultJapaneseParser()

export const useBudoux = () => {
  const parse = (text: string, className?: string) => {
    return parser.parse(text).map((s) => (
      <span key={s} className={className} style={{ display: 'inline-block' }}>
        {s}
      </span>
    ))
  }
  const applyElement = (element: HTMLElement, threshold?: number) => {
    return parser.applyElement(element, threshold)
  }
  const translateHTMLString = (content: string) => {
    return parser.translateHTMLString(content)
  }
  return {
    parse,
    applyElement,
    translateHTMLString,
  }
}

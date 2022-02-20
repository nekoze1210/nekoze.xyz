import { VFC } from 'react'
import { Code } from '@/types/post'

export const CodeBlock: VFC<Code> = ({ id, text, language }) => {
  return (
    <pre id={id}>
      <code>{text}</code>
      <style lang={language}>{`
        code {
          vertical-align: middle;
          white-space: pre;
          word-break: break-all;
          max-width: 100%;
          display: block;
          font-size: 0.8rem;
          line-height: 1.4;
          padding: 1.25rem 1.5rem;
          margin: 0.85rem 0;
          background-color: #282c34;
          color: #ccc;
          border-radius: 6px;
          overflow: auto;
        }
      `}</style>
    </pre>
  )
}

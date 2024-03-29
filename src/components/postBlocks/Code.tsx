'use client'

import Prism from 'prismjs'
import { useEffect, FC } from 'react'

import { Code } from '@/types/post'
import 'prismjs/components/prism-jsx'
import 'prismjs/themes/prism-tomorrow.css'

export const CodeBlock: FC<Code> = ({ id, text, language }) => {
  useEffect(() => {
    Prism.highlightAll()
  })
  return (
    <pre id={id} className='rounded-md'>
      <code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(
            text,
            Prism.languages[language.toLowerCase()] || Prism.languages.javascript,
            '',
          ),
        }}
      />
    </pre>
  )
}

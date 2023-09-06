import React from 'react'

const MarkdownFormatter = ({ content }) => {
  if (!content) {
    return null
  }

  const lines = content.split('\n')
  const formattedElements = []

  lines.forEach((line, index) => {
    if (line.startsWith('#')) {
      // Handle headings
      const level = line.match(/^(#+)\s/)
      if (level) {
        const headingLevel = Math.min(level[1].length, 3)
        let headingSize = 'lg'
        switch (headingLevel) {
          case 1:
            headingSize = '2xl'
            break
          case 2:
            headingSize = 'xl'
            break
          case 3:
            headingSize = 'lg'
            break
          default:
            headingSize = 'sm'
        }
        const text = line.replace(/^#+\s/, '')
        formattedElements.push(
          React.createElement(
            `h${headingLevel}`,
            { key: index, className: `text-${headingSize} my-4 font-black` },
            text
          )
        )
      }
    } else if (line.startsWith('*')) {
      // Handle bold
      const parts = line.split('**')
      const formattedParts = parts.map((part, idx) => {
        if (idx % 2 === 1) {
          return React.createElement(
            'strong',
            { key: idx, className: 'font-semibold text-lg' },
            part
          )
        }
        return part
      })
      formattedElements.push(
        React.createElement(
          'p',
          { key: index, className: 'font-semibold' },
          ...formattedParts
        )
      )
    } else if (line.trim() === '') {
      // Handle empty line as a newline
      formattedElements.push(
        React.createElement(React.Fragment, { key: index }, <br />)
      )
    } else {
      // Regular text
      formattedElements.push(
        React.createElement(
          'p',
          { key: index, className: 'leading-10 text-lg' },
          line
        )
      )
    }
  })

  return <>{formattedElements}</>
}

export default MarkdownFormatter

export default function prettier() {
  return {
    base: {
      arrowParens: 'avoid',
      jsxBracketSameLine: true,
      singleQuote: true,
      trailingComma: 'all',
      bracketSpacing: true,
      quoteProps: 'consistent',
    },
  };
}

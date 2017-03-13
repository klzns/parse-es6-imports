const parseImport = require('./parser')

module.exports = function parse(str) {
  const lines = str.split('\n')
  const results = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (isLineWithComment(line) || isEmptyLine(line)) {
      continue
    }

    if (isLineWithImport(line)) {
      const result = parseImport(line)
      results.push(result)
      continue
    }

    break
  }

  return results
}

function isEmptyLine(line) {
  return line.trim() === ''
}

function isLineWithImport(line) {
  return line.trim().indexOf('import') === 0
}

function isLineWithComment(line) {
  return line.trim().indexOf('//') === 0 || line.trim().indexOf('/*') === 0
}

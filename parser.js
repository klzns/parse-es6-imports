const IMPORT_KEYWORD = 'import'
const FROM_KEYWORD = 'from'
const AS_KEYWORD = 'as'
const NAMED_IMPORTS_OPEN_TOKEN = '{'
const NAMED_IMPORTS_CLOSE_TOKEN = '}'

module.exports = function parseImport(line) {
  const trimmedLine = line.trim()
  const lineWithoutImport = removeImportKeyword(trimmedLine)
  
  if (!hasFrom(lineWithoutImport)) {
    const fromModule = removeQuotesAndSemicolon(lineWithoutImport)
    return {
      defaultImport: null,
      namedImports: [],
      starImport: null,
      fromModule,
    }
  }

  const [beforeFrom, afterFrom] = lineWithoutImport.split(FROM_KEYWORD)
  const fromModule = removeQuotesAndSemicolon(afterFrom)

  const defaultOrStarImportStr = getDefaultOrStarImportStr(beforeFrom)
  const namedImportStr = getNamedImportsStr(beforeFrom)

  const { defaultImport, starImport } = parseDefaultOrStarImport(defaultOrStarImportStr)
  const namedImports = parseNamedImports(namedImportStr)

  return {
    defaultImport,
    namedImports,
    starImport,
    fromModule,
  }
}

function removeImportKeyword(line) {
  return line.slice(IMPORT_KEYWORD.length)
}

function hasFrom(line) {
  return line.indexOf(` ${FROM_KEYWORD} `) !== -1
}

function getDefaultOrStarImportStr(importVariables) {
  if (containsNamedImports(importVariables)) {
    const [beforeNamedImports] = importVariables.split(NAMED_IMPORTS_OPEN_TOKEN)
    return beforeNamedImports
  }
  
  return importVariables
}

function getNamedImportsStr(importVariables) {
  if (containsNamedImports(importVariables)) {
    const [_, afterNamedImports] = importVariables.split(NAMED_IMPORTS_OPEN_TOKEN)
    return afterNamedImports.replace(NAMED_IMPORTS_CLOSE_TOKEN, '')
  }

  return null
}

function containsNamedImports(str) {
  return str.indexOf(NAMED_IMPORTS_OPEN_TOKEN) !== -1 &&
         str.indexOf(NAMED_IMPORTS_CLOSE_TOKEN) !== -1
}

function parseDefaultOrStarImport(str) {
  const noDefaultOrStarImport = {
    defaultImport: null,
    starImport: null,
  }

  const cleanStr = str.trim().replace(',', '')

  if (cleanStr === '') {
    return noDefaultOrStarImport
  }

  if (hasAs(cleanStr)) {
    const { value } = parseAs(cleanStr)
    return {
      defaultImport: null,
      starImport: value,
    }
  }

  return {
    defaultImport: cleanStr,
    starImport: null,
  }
}

function parseNamedImports(namedImportsStr) {
  if (!namedImportsStr) return []

  const namedImportsValues = namedImportsStr.split(',')
  return namedImportsValues.map(mapNameAndValue)
}

function mapNameAndValue(str) {
  const trimmedStr = str.trim()

  if (hasAs(trimmedStr)) {
    return parseAs(trimmedStr)
  }

  return {
    name: trimmedStr,
    value: trimmedStr,
  }
}

function hasAs(str) {
  return str.indexOf(` ${AS_KEYWORD} `) !== -1
}

function parseAs(str) {
  const [ name, value ] = str.split(` ${AS_KEYWORD} `)

  return {
    name,
    value,
  }
}

function removeQuotesAndSemicolon(str) {
  return str.trim().replace(/[\;\'\"]/g, '')
}

const parse = require('../index')
const fs = require('fs')
const path = require('path')

const fixturesPath = path.join('./', 'tests', 'fixtures')
const readFixture = (fixture) =>
  fs.readFileSync(path.join(fixturesPath, fixture), 'utf8')

describe('Should parse', () => {
  it('the right number of imports', () => {
    const str = readFixture('multiple-imports.js')

    const result = parse(str)

    expect(result).toHaveLength(3)
  })

  it('default import', () => {
    const str = readFixture('default-import.js')

    const result = parse(str)

    expect(result).toHaveLength(1)
    expect(result[0].fromModule).toBe('./fileA')
    expect(result[0].defaultImport).toBe('moduleA')
  })

  it('named import', () => {
    const str = readFixture('named-imports.js')
    
    const result = parse(str)

    expect(result).toHaveLength(1)
    expect(result[0].fromModule).toBe('./fileA')
    expect(result[0].defaultImport).toBeNull()
    expect(result[0].namedImports).toHaveLength(1)
    expect(result[0].namedImports[0].name).toBe('namedImport')
    expect(result[0].namedImports[0].value).toBe('namedImport')
  })

  it('multiple named imports', () => {
    const str = readFixture('multiple-named-imports.js')
    
    const result = parse(str)

    expect(result).toHaveLength(1)
    expect(result[0].fromModule).toBe('./fileA')
    expect(result[0].defaultImport).toBeNull()
    expect(result[0].namedImports).toHaveLength(2)
    expect(result[0].namedImports[0].name).toBe('firstNamedImport')
    expect(result[0].namedImports[0].value).toBe('firstNamedImport')
    expect(result[0].namedImports[1].name).toBe('secondNamedImport')
    expect(result[0].namedImports[1].value).toBe('secondNamedImport')
  })

  it('named import with as', () => {
    const str = readFixture('as-import.js')
    
    const result = parse(str)

    expect(result).toHaveLength(1)
    expect(result[0].fromModule).toBe('./fileA')
    expect(result[0].defaultImport).toBeNull()
    expect(result[0].namedImports).toHaveLength(1)
    expect(result[0].namedImports[0].name).toBe('namedImport')
    expect(result[0].namedImports[0].value).toBe('otherName')
  })

  it('star import', () => {
    const str = readFixture('star-import.js')
    
    const result = parse(str)

    expect(result).toHaveLength(1)
    expect(result[0].fromModule).toBe('./fileA')
    expect(result[0].defaultImport).toBeNull()
    expect(result[0].namedImports).toHaveLength(0)
    expect(result[0].starImport).toBe('module')
  })

  it('default and named imports', () => {
    const str = readFixture('default-and-named-imports.js')
    
    const result = parse(str)

    expect(result).toHaveLength(1)
    expect(result[0].fromModule).toBe('./fileA')
    expect(result[0].defaultImport).toBe('defaultImport')
    expect(result[0].starImport).toBeNull()
    expect(result[0].namedImports).toHaveLength(2)
    expect(result[0].namedImports[0].name).toBe('firstNamedImport')
    expect(result[0].namedImports[0].value).toBe('firstNamedImport')
    expect(result[0].namedImports[1].name).toBe('secondNamedImport')
    expect(result[0].namedImports[1].value).toBe('secondNamedImport')
  })

  it('star and named imports', () => {
    const str = readFixture('star-and-named-imports.js')
    
    const result = parse(str)

    expect(result).toHaveLength(1)
    expect(result[0].fromModule).toBe('./fileA')
    expect(result[0].defaultImport).toBeNull()
    expect(result[0].starImport).toBe('module')
    expect(result[0].namedImports).toHaveLength(1)
    expect(result[0].namedImports[0].name).toBe('namedImport')
    expect(result[0].namedImports[0].value).toBe('otherName')
  })

  it('just file import', () => {
    const str = readFixture('just-file.js')
    
    const result = parse(str)

    expect(result).toHaveLength(1)
    expect(result[0].fromModule).toBe('./fileA')
    expect(result[0].defaultImport).toBeNull()
    expect(result[0].starImport).toBeNull()
    expect(result[0].namedImports).toHaveLength(0)
  })
})
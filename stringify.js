const isPlainObject = require('lodash/isPlainObject')

const SPACE = ' '

function map(obj, fn) {
  return Object.keys(obj).reduce((output, key, index) => output.concat(fn(obj[key], key, index)), [])
}

function prettyPrintObject(obj, level, recursiveHandler) {
  return `{${map(obj, (value, keyName) => `
${SPACE.repeat(level + 1)}${!(/^[a-z$_][\w$]*$/i).test(keyName) ? `"${keyName.replace(/"/g, '\\"')}"` : keyName}: ${recursiveHandler(value, keyName, level + 1)}`).join(',')}
${SPACE.repeat(level)}}`
}

function prettyPrintArray(arr, level, recursiveHandler) {
  return `[${arr.map((value, keyName) => `
${SPACE.repeat(level + 1)}${recursiveHandler(value, keyName, level + 1)}`).join(',')}
${SPACE.repeat(level)}]`
}

function stringify(config, name, level = 0) {
  if (typeof config === 'string') return `"${config.replace(/"/g, '\\"')}"`
  if (
    typeof config === 'number' ||
    typeof config === 'boolean' ||
    typeof config === 'undefined' ||
    config === null
  ) return String(config)

  if (Array.isArray(config)) {
    return prettyPrintArray(config, level, stringify)
  }

  if (isPlainObject(config)) {
    return prettyPrintObject(config, level, stringify)
  }

  if (typeof config === 'function') {
    return config.toString()
  }

  throw new Error({ message: `未知类型值：${config}` })
}

window.stringify = stringify

module.exports = stringify

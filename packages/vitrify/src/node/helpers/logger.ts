// https://github.com/quasarframework/quasar/blob/dev/app/lib/helpers/logger.js
import chalk from 'chalk'
const { bgGreen, green, inverse, bgRed, red, bgYellow, yellow } = chalk
import readline from 'readline'
import type { AddressInfo, Server } from 'net'
import type { ResolvedConfig, Logger } from 'vite'
import os from 'os'
import type { Hostname } from '../helpers/utils.js'
import { resolveHostname } from '../helpers/utils.js'

/**
 * Main approach - App CLI related
 */

const dot = '•'
const banner = 'App ' + dot
const greenBanner = green(banner)
const redBanner = red(banner)
const yellowBanner = yellow(banner)

export const clearConsole = process.stdout.isTTY
  ? () => {
      // Fill screen with blank lines. Then move to 0 (beginning of visible part) and clear it
      const blank = '\n'.repeat(process.stdout.rows)
      console.log(blank)
      readline.cursorTo(process.stdout, 0, 0)
      readline.clearScreenDown(process.stdout)
    }
  : () => {}

export const log = function (msg?: string) {
  console.log(msg ? ` ${greenBanner} ${msg}` : '')
}

export const warn = function (msg?: string, pill?: string) {
  if (msg !== void 0) {
    const pillBanner = pill !== void 0 ? bgYellow.black('', pill, '') + ' ' : ''

    console.warn(` ${yellowBanner} ⚠️  ${pillBanner}${msg}`)
  } else {
    console.warn()
  }
}

export const fatal = function (msg?: string, pill?: string) {
  if (msg !== void 0) {
    const pillBanner = pill !== void 0 ? errorPill(pill) + ' ' : ''

    console.error(`\n ${redBanner} ⚠️  ${pillBanner}${msg}\n`)
  } else {
    console.error()
  }

  process.exit(1)
}

/**
 * Extended approach - Compilation status & pills
 */

export const successPill = (msg?: string) => bgGreen.black('', msg, '')
export const infoPill = (msg?: string) => inverse('', msg, '')
export const errorPill = (msg?: string) => bgRed.white('', msg, '')
export const warningPill = (msg?: string) => bgYellow.black('', msg, '')

export const success = function (msg?: string, title = 'SUCCESS') {
  console.log(` ${greenBanner} ${successPill(title)} ${green(dot + ' ' + msg)}`)
}
export const getSuccess = function (msg?: string, title?: string) {
  return ` ${greenBanner} ${successPill(title)} ${green(dot + ' ' + msg)}`
}

export const info = function (msg?: string, title = 'INFO') {
  console.log(` ${greenBanner} ${infoPill(title)} ${green(dot)} ${msg}`)
}
export const getInfo = function (msg?: string, title?: string) {
  return ` ${greenBanner} ${infoPill(title)} ${green(dot)} ${msg}`
}

export const error = function (msg?: string, title = 'ERROR') {
  console.log(` ${redBanner} ${errorPill(title)} ${red(dot + ' ' + msg)}`)
}
export const getError = function (msg?: string, title = 'ERROR') {
  return ` ${redBanner} ${errorPill(title)} ${red(dot + ' ' + msg)}`
}

export const warning = function (msg?: string, title = 'WARNING') {
  console.log(
    ` ${yellowBanner} ${warningPill(title)} ${yellow(dot + ' ' + msg)}`
  )
}
export const getWarning = function (msg?: string, title = 'WARNING') {
  return ` ${yellowBanner} ${warningPill(title)} ${yellow(dot + ' ' + msg)}`
}

export function printHttpServerUrls(
  server: Server,
  config: ResolvedConfig
): void {
  const address = server.address()
  const isAddressInfo = (x: any): x is AddressInfo => x?.address
  if (isAddressInfo(address)) {
    const hostname = resolveHostname(config.server.host)
    const protocol = config.server.https ? 'https' : 'http'
    printServerUrls(
      hostname,
      protocol,
      address.port,
      config.base,
      config.logger.info
    )
  }
}

function printServerUrls(
  hostname: Hostname,
  protocol: string,
  port: number,
  base: string,
  info: Logger['info']
): void {
  if (hostname.host === '127.0.0.1') {
    const url = `${protocol}://${hostname.name}:${chalk.bold(port)}${base}`
    info(`  > Local: ${chalk.cyan(url)}`)
    if (hostname.name !== '127.0.0.1') {
      info(`  > Network: ${chalk.dim('use `--host` to expose')}`)
    }
  } else {
    Object.values(os.networkInterfaces())
      .flatMap((nInterface) => nInterface ?? [])
      .filter((detail) => detail && detail.address && detail.family === 'IPv4')
      .map((detail) => {
        const type = detail.address.includes('127.0.0.1')
          ? 'Local:   '
          : 'Network: '
        const host = detail.address.replace('127.0.0.1', hostname.name)
        const url = `${protocol}://${host}:${chalk.bold(port)}${base}`
        return `  > ${type} ${chalk.cyan(url)}`
      })
      .forEach((msg) => info(msg))
  }
}

// https://github.com/quasarframework/quasar/blob/dev/app/lib/helpers/logger.js
import chalk from 'chalk'
import type { AddressInfo, Server } from 'net'
import type { ResolvedConfig, Logger } from 'vite'
import os from 'os'
import type { Hostname } from '../helpers/utils.js'
import { resolveHostname } from '../helpers/utils.js'

export const exitLogs: string[] = []

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
  if (hostname.host === 'localhost') {
    const url = `${protocol}://${hostname.name}:${chalk.bold(port)}${base}`
    info(`  > Local: ${chalk.cyan(url)}`)
    if (hostname.name !== 'localhost') {
      info(`  > Network: ${chalk.dim('use `--host` to expose')}`)
    }
  } else {
    Object.values(os.networkInterfaces())
      .flatMap((nInterface) => nInterface ?? [])
      .filter((detail) => detail && detail.address && detail.family === 'IPv4')
      .map((detail) => {
        const type = detail.address.includes('localhost')
          ? 'Local:   '
          : 'Network: '
        const host = detail.address.replace('localhost', hostname.name)
        const url = `${protocol}://${host}:${chalk.bold(port)}${base}`
        return `  > ${type} ${chalk.cyan(url)}`
      })
      .forEach((msg) => info(msg))
  }
}

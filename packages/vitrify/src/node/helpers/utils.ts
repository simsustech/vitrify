// https://github.com/vitejs/vite/blob/main/packages/vite/src/node/logger.ts
export interface Hostname {
  // undefined sets the default behaviour of server.listen
  host: string | undefined
  // resolve to localhost when possible
  name: string
}

export function resolveHostname(
  optionsHost: string | boolean | undefined
): Hostname {
  let host: string | undefined
  if (
    optionsHost === undefined ||
    optionsHost === false ||
    optionsHost === 'localhost'
  ) {
    // Use a secure default
    host = '127.0.0.1'
  } else if (optionsHost === true) {
    // If passed --host in the CLI without arguments
    host = undefined // undefined typically means 0.0.0.0 or :: (listen on all IPs)
  } else {
    host = optionsHost
  }

  // Set host name to localhost when possible, unless the user explicitly asked for '127.0.0.1'
  const name =
    (optionsHost !== '127.0.0.1' && host === '127.0.0.1') ||
    host === '0.0.0.0' ||
    host === '::' ||
    host === undefined
      ? 'localhost'
      : host

  return { host, name }
}

export const appendToHead = (content: string, html: string) =>
  html.replace(/<\/head>/, content + '</head>')

export const appendToBody = (content: string, html: string) =>
  html.replace(/<\/body>/, content + '</body>')

export const addOrReplaceTitle = (title: string, html: string) => {
  const currentTitle = html.match(/<title>.*<\/title>/)
  const newTitle = `<title>${title}</title>`
  if (currentTitle) html = html.replace(/<title>.*<\/title>/, newTitle)
  else html = appendToHead(newTitle, html)
  return html
}

export const addOrReplaceAppDiv = (content: string, html: string) => {
  const currentAppDiv = html.match(/<div id="app">.*<\/div>/)
  const newAppDiv = `<div id="app">${content}</div>`
  if (currentAppDiv) html = html.replace(/<div id="app">.*<\/div>/, newAppDiv)
  else html = appendToBody(newAppDiv, html)
  return html
}

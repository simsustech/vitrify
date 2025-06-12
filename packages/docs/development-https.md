## HTTPS

Configure `config.server.https` to enable HTTPS in development mode.

> :warning: **When using multiple development server simultaneously in SSR mode, enable HTTPS for all servers**: Connections to unsecure servers from a HTTPS domain will be blocked by the browser.

If using self-signed certificates, you need to also add an exception for the domain at which the secure WebSocket server is located. Visit `https://{hostname}:{hmrPort}` in the browser and create a security exception.

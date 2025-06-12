# Vitrify

## Commands

### build

```
Usage:
  $ vitrify build

Options:
  -m, --mode [mode]            Build mode (default: csr)
  --base [base]                Base public path
  --outDir [outDir]            Output directory
  --appDir [appDir]            App directory
  --publicDir [publicDir]      Public directory
  --productName [productName]  Product name
  -h, --help                   Display this message
```

### dev

```
Usage:
  $ vitrify dev

Options:
  -m, --mode [mode]        Development server mode (default: csr)
  --host [host]            Specify which IP addresses the server should listen on (default: 127.0.0.1)
  --appDir [appDir]        Application directory
  --publicDir [publicDir]  Public directory
  -h, --help               Display this message
```

### test

```
Usage:
  $ vitrify test

Options:
  -h, --help  Display this message
```

### run

```
Usage:
  $ vitrify run <file>

Options:
  -h, --help  Display this message
```

## Structure

```mermaid
  graph TD;
    node/bin/cli.ts-->node/bin/build.ts;
    node/bin/cli.ts-->node/bin/dev.ts;
    node/bin/cli.ts-->node/bin/test.ts;
    node/bin/cli.ts-->node/bin/run.ts;
    node/bin/build.ts-->node/index.ts
    node/bin/dev.ts-->node/index.ts
    node/index.ts{Load baseConfig}-->vitrify.config.js{Load vitrify.config.js};
    subgraph baseconfig
    vitrify.config.js-->node/plugins{Load plugins};
    node/plugins-->merge{Merge vitrify.config.js with Vitrify configuration};
    end
    merge-- mode: fastify -->frameworkFastify{Load framework entrypoints from fastify/...};
    merge-- mode: csr/ssr/ssg -->framework{Load framework entrypoints from vite/...};
    frameworkFastify-->fastifySetup{onSetup / onRendered};
    fastifySetup-->frameworkSetup;
    build-- mode: ssg -->prerender{Run prerender.js}
    framework-->frameworkSetup{onAppCreated / onMounted}
    frameworkSetup-->frameworkOnRendered{onRendered};
    frameworkOnRendered-->frameworkOnTemplateRendered{onTemplateRendered};
    frameworkOnTemplateRendered-->build{Build the application};
    frameworkOnTemplateRendered-->dev{Start dev server};
    node/bin/test.ts-->test{Run a pre-configured Vitest instance};
    node/bin/run.ts-->run{Inject context into script and run script};
```

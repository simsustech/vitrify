# Optimizations

## Side effects

If one of your dependencies has undesired side effects, re-export it in a virtual module and set `moduleSideEffects: false`in `resolveId()`.

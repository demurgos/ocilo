/**
 * Polyfill to ensure that the `asyncIterator` symbol is defined
 */
function asyncIterator(): void {
  if (!Symbol.asyncIterator) {
    (Symbol as any).asyncIterator = Symbol.for("Symbol.asyncIterator");
  }
}

/**
 * Applies all the polyfills
 */
function all(): void {
  asyncIterator();
}

all();

export {};

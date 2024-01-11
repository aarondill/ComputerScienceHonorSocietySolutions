/** Given 2 ints, a and b, return true if one of them is 10 or if their sum is 10. */
const makes10 = (a, b) => a === 10 || b === 10 || a + b === 10;

// Test cases -- Run the program in node or the browser to test it.

/**
 * @template {unknown[]} A
 * @template R
 * @param {R} v
 * @param {(...arg: A)=>R} f
 * @param {A} args
 * @return {boolean}
 */
const assert_eq = (v, f, ...args) => {
  const real = f.apply(undefined, args);
  const name = f.name || "f";
  const msg = `Test case: ${name}(${args.join()})\t=> ${v}:`;
  if (real === v) {
    console.log(`${msg}\tPassed!`);
    return true;
  }

  console.error(`${msg}\tFailed! Returned: ${real}`);
  if (globalThis.process) {
    globalThis.process.exitCode = 1; // If running in node, set exit code to 1
  }
  return false;
};

// The given cases
assert_eq(true, makes10, 9, 10);
assert_eq(false, makes10, 9, 9);
assert_eq(true, makes10, 1, 9);

// Note: Only include this line if running in node.
export {};

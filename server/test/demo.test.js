/**
 * @description test_demo
 */
function add(a, b) {
  return a + b;
}

test("test_add", () => {
  expect(add(1, 2)).toBe(3);
});

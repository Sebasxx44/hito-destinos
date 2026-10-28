import test from "node:test";
import assert from "node:assert/strict";
import { parseFavorites } from "hito-destinos/favorites";

const validIds = ["petra", "atacama", "kioto"];

test("recovers safely from corrupt or non-array storage", () => {
  for (const value of [null, "broken", "null", "25", '"petra"', '{"petra":true}']) {
    assert.deepEqual(parseFavorites(value, validIds), []);
  }
});

test("ignores invalid entries and preserves only canonical destination ids", () => {
  const value = JSON.stringify([null, 3, {}, ["petra"], "missing", "petra", "kioto"]);
  assert.deepEqual(parseFavorites(value, validIds), ["petra", "kioto"]);
});

test("deduplicates favorites without mutating the canonical catalog", () => {
  assert.deepEqual(parseFavorites('["petra","petra","atacama","petra"]', validIds), ["petra", "atacama"]);
  assert.deepEqual(validIds, ["petra", "atacama", "kioto"]);
});

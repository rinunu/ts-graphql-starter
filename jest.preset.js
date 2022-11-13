const nxPreset = require('@nrwl/jest/preset').default;

/** @type {import('ts-jest').InitialOptionsTsJest} */
module.exports = {
  ...nxPreset,
  // docs/testing.md 参照
  maxWorkers: 1,
};

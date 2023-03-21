
module.exports = {
    verbose: true,
    collectCoverageFrom: [
      '**/*.{js,jsx}'
    ],
    testPathIgnorePatterns :[
      "/src/__tests__/fixtures/*"
    ],
    testMatch: [
      "**/*.test.js"
    ]
  };
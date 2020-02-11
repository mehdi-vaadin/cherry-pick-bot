module.exports = {
  roots: ['<rootDir>/src/', '<rootDir>/test/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.[tj]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  "compilerOptions": {
    "downlevelIteration": true,
    "module": "commonjs",
    "target": "es2018",
    "outDir": "lib",
    "lib": [
      "es6",
      "es2016.array.include",
      "es2018",
      "dom"
    ],
    "sourceMap": true,
    "rootDir": "src",
    "experimentalDecorators": true,
    "allowJs": true,
    "strict": true,
    "allowSyntheticDefaultImports": true
  },
  "exclude": [
    "node_modules"
  ]
}

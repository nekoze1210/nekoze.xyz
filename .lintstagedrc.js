module.exports = {
  '*.{ts,jsx,tsx}': [
    (filenames) =>
      `next lint --fix --file ${filenames
        .map((file) => file.split(process.cwd())[1])
        .join(' --file ')}`,
    'prettier --write',
    (filenames) =>
      `next lint --file ${filenames.map((file) => file.split(process.cwd())[1]).join(' --file ')}`,
  ],
  '*.${css,scss,sass}': ['yarn lint:style:fix', 'yarn lint:style'],
}

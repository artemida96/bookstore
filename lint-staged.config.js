const path = require('path')

module.exports = {
  '**/*.{js,ts,json,html,css}': (files) => {
    const relativePaths = files.map((file) =>
      path.relative(process.cwd(), file)
    )

    return ['eslint --fix', `prettier --write  ${relativePaths.join(' ')}`]
  },
}

const shell = require('shelljs')

const childProcess = require('child_process')

const branch = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\s+/, '')

const fileName = process.argv[2] || 'init'

const exec = shell.exec

const echo = shell.echo

const exit = shell.exit

if (exec('git add .').code !== 0) {
  echo('Error: Git add failed')
  exit(1)
}
if (exec(`git commit -am "${fileName}"`).code !== 0) {
  echo('Error: Git commit failed')
  exit(1)
}
if (exec(`git push --set-upstream origin "${branch}"`).code !== 0) {
  echo('Error: Git push failed')
  exit(1)
}

exec(`echo git success ${fileName}`)

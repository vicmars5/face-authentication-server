const program = require('commander')
const faceAPI = require('./utils/face-api')

program
  .version('v0.0.1')

program
  .command('persongroups')
  .description('List person groups')
  .action( async () => {
    try {
      const res = await faceAPI.getPersonGroups()
      console.log('Person groups')
      console.log(JSON.stringify(res.data))
    } catch (error) {
      console.error(error)
    }
  })

program
  .command('-h, --help')
  .description('Help')
  .action( async () => {
    program.help()
  })

if (!process.argv.slice(2).length) {
  program.help();
}

program.parse(process.argv)
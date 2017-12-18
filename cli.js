const program = require('commander')
const faceAPI = require('./utils/face-api')

program
  .version('v0.0.1')

program
  .command('persongroups')
  .description('List person groups')
  .action( async () => {
    try {
      const groups = await faceAPI.getPersonGroups()
      console.log('Person groups')
      console.log(JSON.stringify(groups, null, 2))
    } catch (error) {
      console.error(error)
    } })

program
  .command('list-persons <group-id>')
  .description('List persons')
  .action(async (groupId) => {
    try {
      const persons = await faceAPI.getPersons(groupId, {})
      console.log('persons:', persons)
    } catch (err) {
      console.error(err)
    }
  })

program
  .command('add-person-photo <group-id> <person-id> <photo-url>')
  .description('Add photo to person')
  .action(async (groupId, personId, photoUrl) => {
    try {
      console.log(`groupId ${groupId}`)
      console.log(`personId: ${personId}`)
      console.log(`photoUrl: ${photoUrl}`)
      const userData = {
        photoUrl
      }
      const params = {
        userData: JSON.stringify(userData) 
      }
      const body = {
        url: photoUrl
      }
      const res = await faceAPI.postPersonFace(groupId, personId, params, body)
      console.log('Response: ', res)
    } catch (err) {
      console.error(err)
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

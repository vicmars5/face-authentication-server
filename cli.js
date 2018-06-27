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
  .command('train-person-group <group-id>')
  .description('Queue a person group training task, the training task may not be started immediately.')
  .action(async (groupId) => {
    try {
      const res = await faceAPI.trainPersonGroup(groupId)
      console.log('response:', res)
    } catch (err) {
      console.error(err)
    }
  })

program
  .command('train-person-group-status <group-id>')
  .description('Retrieve the training status of a person group')
  .action(async (personGroupId) => {
    try {
      const res = await faceAPI.trainPersonGroupStatus(personGroupId)
      console.log('response:', res)
    } catch (err) {
      console.error(err)
    }
  })

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
  .command('detect-photo <group-id> <photo-path>')
  .description('MS Desc: Detect human faces in an image and returns face locations, and optionally with faceIds, landmarks, and attributes.')
  .action(async (groupId, photoPath) => {
    try {
      const res = await faceAPI.detectFace(photoPath)
      console.log('response', res)
    } catch (err) {
      console.error(err)
    }
  })

program
  .command('identify-photo <face-id> <person-group-id>')
  .description('Find possible person in persongroup')
  .action(async (faceId, personGroupId) => {
    try {
      const res = await faceAPI.identifyFace([faceId], personGroupId)
      console.log('response: ')
      console.log(JSON.stringify(res, null, 2))
    } catch (err) {
      console.error(err.response.data)
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

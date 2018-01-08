const program = require('commander')
const storage = require('./utils/object-storage.js')

program
  .version('v0.0.1')

program
  .command('share-link <file-key>')
  .option('-t, --time <minutes>', 'Expiration time in minutes')
  .description('Get share link for file. Time in minutes, default: 10 min.')
  .action(async (fileKey, options) => {
    try {
      time = options.time || 10
      const shareLink = await storage.getShareLink(fileKey, {
        expires: time
      })
      console.log('share link is: ', shareLink)
    } catch (err) {
      console.error(err)
    }
  })

if (!process.argv.slice(2).length) {
  program.help();
}

program.parse(process.argv)

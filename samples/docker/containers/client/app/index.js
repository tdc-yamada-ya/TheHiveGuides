const TheHiveClient = require('./thehive-client')

const url = process.env.THEHIVE_URL
const apiKey = process.env.THEHIVE_KEY

if (!url) {
  throw new Error(`The THEHIVE_URL environment variable is required.`)
}

if (!apiKey) {
  throw new Error(`The THEHIVE_API_KEY environment variable is required.`)
}

const theHiveClient = new TheHiveClient({ url, apiKey })
const title = 'ケース ' + new Date().toISOString()

theHiveClient.createCase({
  title,
  description: title
})

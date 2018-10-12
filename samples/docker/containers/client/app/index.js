const TheHiveClient = require('./thehive-client')

async function main () {
  const url = process.env.THEHIVE_URL
  const apiKey = process.env.THEHIVE_KEY

  if (!url) {
    throw new Error(`The THEHIVE_URL environment variable is required.`)
  }

  if (!apiKey) {
    throw new Error(`The THEHIVE_API_KEY environment variable is required.`)
  }

  const theHiveClient = new TheHiveClient({url, apiKey})
  const caseTitle = 'ケース ' + new Date().toISOString()

  await theHiveClient.createCase({
    title: caseTitle,
    description: caseTitle
  })

  const alertTitle = 'アラート ' + new Date().toISOString()

  await theHiveClient.createAlert({
    title: alertTitle,
    description: alertTitle,
    type: 'external',
    source: 'instance1',
    sourceRef: 'alert-ref'
  })
}

main()

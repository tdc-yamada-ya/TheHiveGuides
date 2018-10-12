const axios = require('axios')

const DEFAULT_TIMEOUT = 10000
const CASE_URI = '/api/case'
const ALERT_URI = '/api/alert'

class TheHiveClient {
  constructor (config) {
    if (!config) {
      throw new Error('The config parameter is required.')
    }

    if (!config.url) {
      throw new Error('The config.url parameter is required.')
    }

    if (!config.apiKey) {
      throw new Error('The config.apiKey parameter is required.')
    }

    this.url = config.url
    this.apiKey = config.apiKey
    this.axios = config.axios || axios.create({ timeout: DEFAULT_TIMEOUT })
  }

  callAPI (method, uri, data) {
    return this.axios({
      method,
      url: this.url + uri,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      data: data
    })
  }

  async createCase (data) {
    const response = await this.callAPI('post', CASE_URI, data)
    return response.data
  }

  async createAlert (data) {
    const response = await this.callAPI('post', ALERT_URI, data)
    return response.data
  }
}

module.exports = TheHiveClient

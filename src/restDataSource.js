import Axios from 'axios'

const baseUrl = 'http://localhost:3500/'
const partiesUrl = baseUrl + 'parties/'

export class RestDataSource {
  constructor (bus) {
    this.eventBus = bus
  }

  async getParties () {
    return (await this.sendRequest('GET', partiesUrl)).data
  }

  async deleteParty (party) {
    await this.sendRequest('DELETE', `${partiesUrl}${party.id}`, party)
  }

  async saveParty (party) {
    await this.sendRequest('POST', partiesUrl, party)
  }

  async updateParty (party) {
    await this.sendRequest('PUT', `${partiesUrl}${party.id}`, party)
  }

  async sendRequest (httpMethod, url, party) {
    console.log('Sending request to ' + baseUrl + ' , data: ' + party)
    try {
      return await Axios.request({
        method: httpMethod,
        url: url,
        data: party
      })
    } catch (err) {
      swal('Error', err.message, 'error')
      throw err
    }
  }
}

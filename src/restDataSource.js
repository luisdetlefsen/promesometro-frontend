import Axios from 'axios'

const baseUrl = 'http://localhost:3500/'
const partiesUrl = baseUrl + 'parties/'
const candidatesUrl = baseUrl + 'candidates/'

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

  async getAllCandidates () {
    return (await this.sendRequest('GET', candidatesUrl)).data
  }

  async deleteCandidate (candidate) {
    await this.sendRequest('DELETE', `${candidatesUrl}${candidate.id}`, candidate)
  }

  async updateCandidate (candidate) {
    await this.sendRequest('PUT', `${candidatesUrl}${candidate.id}`, candidate)
  }

  async saveCandidate (candidate) {
    await this.sendRequest('POST', candidatesUrl, candidate)
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
      window.swal('Error', err.message, 'error')
      throw err
    }
  }
}

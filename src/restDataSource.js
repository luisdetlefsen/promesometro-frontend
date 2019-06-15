import Axios from 'axios'

// const baseUrl = 'http://localhost:3500/'
const baseUrl = 'https://uhwvsjvsme.execute-api.us-east-1.amazonaws.com/dev/'
const partiesUrl = baseUrl + 'parties/'
const candidatesUrl = baseUrl + 'candidates/'
const candidateRolesUrl = baseUrl + 'candidateRoles/'
const promisesUrl = baseUrl + 'promises/'

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

  async getAllCandidateRoles () {
    return (await this.sendRequest('GET', candidateRolesUrl)).data
  }

  async deleteCandidateRole (candidateRole) {
    await this.sendRequest('DELETE', `${candidateRolesUrl}${candidateRole.id}`, candidateRole)
  }

  async updateCandidateRole (candidateRole) {
    await this.sendRequest('PUT', `${candidateRolesUrl}${candidateRole.id}`, candidateRole)
  }

  async saveCandidateRole (candidateRole) {
    await this.sendRequest('POST', candidateRolesUrl, candidateRole)
  }

  async savePromise (promise) {
    await this.sendRequest('POST', promisesUrl, promise)
  }

  async getAllPromises () {
    return (await this.sendRequest('GET', promisesUrl)).data
  }

  async sendRequest (httpMethod, url, party) {
    try {
      return await Axios.request({
        method: httpMethod,
        url: url,
        data: party,
        withCredentials: false
      })
    } catch (err) {
      window.swal('Error', err.message, 'error')
      throw err
    }
  }
}

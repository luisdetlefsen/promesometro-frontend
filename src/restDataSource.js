import Axios from 'axios'

// const baseUrl = 'http://localhost:3500/'
// const baseUrl = 'https://uhwvsjvsme.execute-api.us-east-1.amazonaws.com/dev/'
// const baseUrl = 'https://i2grkc0sea.execute-api.us-east-1.amazonaws.com/dev1/'
// const baseUrl = 'http://promesometro-backend.us-east-1.elasticbeanstalk.com/'
const baseUrl = 'http://localhost:8080/'
const partiesUrl = baseUrl + 'parties/'
const candidatesUrl = baseUrl + 'candidates/'
const candidateRolesUrl = baseUrl + 'candidateTypes/'
const promisesUrl = baseUrl + 'promises/'
const promiseMediaUrl = baseUrl + 'promiseMediaContent/'
const commentsUrl = baseUrl + 'comments/'
const reactionsUrl = baseUrl + 'reactions/'
const reactionTypesUrl = baseUrl + 'reactionTypes/'

export class RestDataSource {
  constructor (bus) {
    this.eventBus = bus
  }
  // migrated
  async getParties () {
    let res = (await this.sendRequest('GET', partiesUrl))

    return res.data._embedded.parties
  }
  // migrated
  async deleteParty (party) {
    await this.sendRequest('DELETE', `${partiesUrl}${party.idParty}`, party)
  }
  // migrated
  async saveParty (party) {
    await this.sendRequest('POST', partiesUrl, party)
  }
  // migrated
  async updateParty (party) {
    await this.sendRequest('PUT', `${partiesUrl}${party.idParty}`, party)
  }
  // migrated
  async getAllCandidates () {
    return (await this.sendRequest('GET', candidatesUrl)).data._embedded.candidates
  }
  // migrated
  async deleteCandidate (candidate) {
    await this.sendRequest('DELETE', `${candidatesUrl}${candidate.idCandidate}`, candidate)
  }
  // migrated
  async updateCandidate (candidate) {
    await this.sendRequest('PUT', `${candidatesUrl}${candidate.idCandidate}`, candidate)
  }
  // migrated
  async saveCandidate (candidate) {
    await this.sendRequest('POST', candidatesUrl, candidate)
  }
  // migrated
  async getAllCandidateRoles () {
    let res = (await this.sendRequest('GET', candidateRolesUrl))
    return res.data._embedded.candidateTypes
  }
  // migrated
  async deleteCandidateRole (candidateRole) {
    await this.sendRequest('DELETE', `${candidateRolesUrl}${candidateRole.idCandidateType}`, candidateRole)
  }
  // migrated
  async updateCandidateRole (candidateRole) {
    await this.sendRequest('PUT', `${candidateRolesUrl}${candidateRole.idCandidateType}`, candidateRole)
  }
  // migrated
  async saveCandidateRole (candidateRole) {
    await this.sendRequest('POST', candidateRolesUrl, candidateRole)
  }

  // migrated
  async savePromiseMediaContent (pmc) {
    let res = await this.sendRequest('POST', promiseMediaUrl, pmc)
    return res.data
  }

  // migrated
  async savePromise (promise) {
    await this.sendRequest('POST', promisesUrl, promise)
  }
  // migrated
  async getAllPromises () {
    return (await this.sendRequest('GET', promisesUrl)).data
  }
  // migrated
  async getPagedPromises (page) {
    return (await this.sendRequest('GET', promisesUrl + 'page=' + page)).data._embedded.promises
  }

  async getPromiseComments (promiseId) {
    return (await this.sendRequest('GET', commentsUrl + 'promise/' + promiseId)).data
  }

  async saveComment (commentData) {
    await this.sendRequest('POST', commentsUrl, commentData)
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

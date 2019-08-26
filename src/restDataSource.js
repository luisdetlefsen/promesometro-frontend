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
const similarPromisesUrl = baseUrl + 'searchSimilar'
const promisesApprovedUrl = promisesUrl + 'search/findAllByApproved'

export class RestDataSource {
  constructor (bus) {
    this.eventBus = bus
  }

  async getParties () {
    let res = (await this.sendRequest('GET', partiesUrl))
    return res.data._embedded.parties
  }

  async deleteParty (party) {
    await this.sendRequest('DELETE', `${partiesUrl}${party.idParty}`, party)
  }

  async saveParty (party) {
    return (await this.sendRequest('POST', partiesUrl, party)).data
  }

  async updateParty (party) {
    await this.sendRequest('PUT', `${partiesUrl}${party.idParty}`, party)
  }

  async getAllCandidates () {
    return (await this.sendRequest('GET', candidatesUrl)).data._embedded.candidates
  }

  async deleteCandidate (candidate) {
    await this.sendRequest('DELETE', `${candidatesUrl}${candidate.idCandidate}`, candidate)
  }

  async updateCandidate (candidate) {
    let updateCandidateResult = await this.sendRequest('PUT', `${candidatesUrl}${candidate.idCandidate}`, candidate)
    return updateCandidateResult
  }

  async saveCandidate (candidate) {
    let res = await this.sendRequest('POST', candidatesUrl, candidate)
    return res
  }

  async getAllCandidateRoles () {
    let res = (await this.sendRequest('GET', candidateRolesUrl))
    return res.data._embedded.candidateTypes
  }

  async deleteCandidateRole (candidateRole) {
    await this.sendRequest('DELETE', `${candidateRolesUrl}${candidateRole.idCandidateType}`, candidateRole)
  }

  async updateCandidateRole (candidateRole) {
    let res = await this.sendRequest('PUT', `${candidateRolesUrl}${candidateRole.idCandidateType}`, candidateRole)
    return res
  }

  async saveCandidateRole (candidateRole) {
    let res = await this.sendRequest('POST', candidateRolesUrl, candidateRole)
    return res.data
  }

  async savePromiseMediaContent (pmc) {
    let res = await this.sendRequest('POST', promiseMediaUrl, pmc)
    return res.data
  }

  async savePromise (promise) {
    let res = await this.sendRequest('POST', promisesUrl, promise)
    return res
  }

  async updatePromise (promise) {
    await this.sendRequest('PATCH', `${promisesUrl}${promise.idPromise}`, promise)
  }

  async getAllPromises () {
    return (await this.sendRequest('GET', promisesUrl)).data
  }

  async getAllApprovedPromises () {
    return (await this.sendRequest('GET', promisesApprovedUrl)).data
  }

  async getPagedApprovedPromises (page) {
    return (await this.sendRequest('GET', promisesApprovedUrl + '?page=' + page)).data._embedded.promises
  }

  async getPagedPromises (page) {
    return (await this.sendRequest('GET', promisesUrl + '?page=' + page)).data._embedded.promises
  }

  async getPromise (promiseId) {
    return (await this.sendRequest('GET', promisesUrl + promiseId)).data
  }

  async getPromiseComments (promiseId) {
    return (await this.sendRequest('GET', commentsUrl + 'search/findAllByPromise?promiseId=' + promiseId)).data
  }

  async saveComment (commentData) {
    let result = await this.sendRequest('POST', commentsUrl, commentData)
    return result.data
  }

  async getAllReactionTypes () {
    return (await this.sendRequest('GET', reactionTypesUrl)).data._embedded.reactionTypes
  }

  async saveReaction (reaction) {
    let res = await this.sendRequest('POST', reactionsUrl, reaction)
    return res
  }

  async updateReaction (reaction) {
    await this.sendRequest('PUT', `${reactionsUrl}${reaction.idReaction}`, reaction)
  }

  async deleteReaction (reaction) {
    await this.sendRequest('DELETE', `${reactionsUrl}${reaction.idReaction}`)
  }

  async findReaction (email, promiseId) {
    let res
    try {
      res = await Axios.request({
        method: 'GET',
        url: reactionsUrl + 'search/findReactionByUserEmailIsAndPromise?emailAddress=' + email + '&promiseId=' + promiseId,
        withCredentials: false,
        maxRedirects: 1
      })
    } catch { // it will throw a 404 if it is not found. We don't care}

    }
    return res
  }

  async searchSimilarPromises (promiseText, candidateId) {
    let data = {
      promiseText: promiseText,
      idCandidate: candidateId
    }
    let res = await this.sendRequest('POST', similarPromisesUrl, data)
    return res.data
  }

  async sendRequest (httpMethod, url, party) {
    try {
      let res = await Axios.request({
        method: httpMethod,
        url: url,
        data: party,
        withCredentials: false,
        maxRedirects: 1
      })
      return res
    } catch (err) {
      window.swal('Error', err.message, 'error')
      throw err
    }
  }
}

module.exports = function () {
  var data = {
    parties: [
      { id: 1, name: 'UNE', imgUrl: '', secretary: 'secre', founded: '2019-05-13', founder: 'Trump', siteUrl: 'partido.com', description: 'asdf' },
      { id: 2, name: 'TODOS', imgUrl: '', secretary: 'secre', founded: '2019-05-13', founder: 'Trump', siteUrl: 'partido.com', description: 'asdf' },
      { id: 3, name: 'PODEMOS', imgUrl: '', secretary: 'secre', founded: '2019-05-13', founder: 'Trump', siteUrl: 'partido.com', description: 'asdf' },
      { id: 4, name: 'WINAQ', imgUrl: '', secretary: 'secre', founded: '2019-05-13', founder: 'Trump', siteUrl: 'partido.com', description: 'asdf' }
    ],
    candidates: [
      { id: 1, name: 'Mateo', partyName: 'UNE', partyId: 1, candidateRoleId: 1, candidateRoleName: 'Presidente', imgUrl: 'https://cdn.theatlantic.com/assets/media/img/mt/2019/06/AP_19163744452821/lead_720_405.jpg', description: 'asdf', siteUrl: 'www', twitter: 'twit.twer', stall: '8' },
      { id: 2, name: 'Marcos', partyName: 'TODOS', partyId: 2, candidateRoleId: 1, candidateRoleName: 'Presidente', imgUrl: '', description: 'asdf', siteUrl: '', twitter: '', stall: '' },
      { id: 3, name: 'Lucas', partyName: 'PODEMOS', partyId: 3, candidateRoleId: 1, candidateRoleName: 'Presidente', imgUrl: '', description: 'asdf', siteUrl: '', twitter: '', stall: '' },
      { id: 4, name: 'Juan', partyName: 'WINAQ', partyId: 4, candidateRoleId: 1, candidateRoleName: 'Presidente', imgUrl: '', description: 'asdf', siteUrl: '', twitter: '', stall: '' }
    ],
    candidateRoles: [
      { id: 1, name: 'Presidente' },
      { id: 2, name: 'Diputado' },
      { id: 3, name: 'Alcalde' }
    ]
  }
  return data
}

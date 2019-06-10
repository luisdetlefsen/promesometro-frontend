module.exports = function () {
  var data = {
    parties: [
      { id: 1, name: 'UNE', imgUrl: '' },
      { id: 2, name: 'TODOS', imgUrl: '' },
      { id: 3, name: 'PODEMOS', imgUrl: '' },
      { id: 4, name: 'WINAQ', imgUrl: '' }
    ],
    candidates: [
      { id: 1, name: 'Mateo', partyName: 'UNE', partyId: 1, candidateRoleId: 1, candidateRoleName: 'Presidente', imgUrl: '' },
      { id: 2, name: 'Marcos', partyName: 'TODOS', partyId: 2, candidateRoleId: 1, candidateRoleName: 'Presidente', imgUrl: '' },
      { id: 3, name: 'Lucas', partyName: 'PODEMOS', partyId: 3, candidateRoleId: 1, candidateRoleName: 'Presidente', imgUrl: '' },
      { id: 4, name: 'Juan', partyName: 'WINAQ', partyId: 4, candidateRoleId: 1, candidateRoleName: 'Presidente', imgUrl: '' }
    ],
    candidateRoles: [
      { id: 1, name: 'Presidente' },
      { id: 2, name: 'Diputado' },
      { id: 3, name: 'Alcalde' }
    ]
  }
  return data
}

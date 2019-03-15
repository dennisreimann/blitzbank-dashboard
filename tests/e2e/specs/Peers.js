// https://docs.cypress.io/api/introduction/api.html
describe('Peers', () => {
  beforeEach(() => {
    cy.visit('/peers')
  })

  it('shows the page', () => {
    cy.contains('h1', 'Peers')
  })
})

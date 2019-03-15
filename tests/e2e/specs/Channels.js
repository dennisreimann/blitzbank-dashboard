// https://docs.cypress.io/api/introduction/api.html
describe('Channels', () => {
  beforeEach(() => {
    cy.visit('/channels')
  })

  it('shows the page', () => {
    cy.contains('h1', 'Channels')
  })
})

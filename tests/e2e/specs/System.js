// https://docs.cypress.io/api/introduction/api.html
describe('System', () => {
  beforeEach(() => {
    cy.visit('/system')
  })

  it('shows the page', () => {
    cy.contains('h1', 'Node Information')
    cy.contains('h2', 'LND')
    cy.contains('h2', 'Bitcoin')
  })
})

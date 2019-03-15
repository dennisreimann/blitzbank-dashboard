// https://docs.cypress.io/api/introduction/api.html
describe('Tools', () => {
  beforeEach(() => {
    cy.visit('/tools')
  })

  it('shows the page', () => {
    cy.contains('h1', 'Tools')
    cy.contains('h3', 'New address')
  })
})

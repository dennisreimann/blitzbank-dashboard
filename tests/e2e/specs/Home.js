// https://docs.cypress.io/api/introduction/api.html
describe('Home', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows a dashboard with the basic node information', () => {
    cy.contains('h1', 'alice')
  })
})

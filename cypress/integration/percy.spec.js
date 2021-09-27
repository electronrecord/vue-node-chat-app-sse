import '@percy/cypress'

describe('testing percy', function () {
  it('should check the homepage', function () {
    cy.visit('/')
      .get('body')
      .should('be.visible')
    cy.percySnapshot('After');
  })
})

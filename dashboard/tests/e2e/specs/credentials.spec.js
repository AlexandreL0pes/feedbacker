describe('Credentials', () => {
  it('should generate an api key', () => {
    cy.visit('/')

    cy.get('#header-login-button').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('igor@igor.me')
    cy.get('#password-field').type('1234')

    cy.get('#submit-button').click()

    cy.url().should('include', '/feedbacks')

    cy.wait(4000)
    cy.visit(`/credentials`)
    cy.wait(2000)

    // Get value from element
    const oldApikey = cy.get('#apikey').invoke('text')

    cy.get('#generate-apikey').click()
    cy.wait(2000)
    const newApikey = cy.get('#apikey').invoke('text')

    expect(oldApikey).to.not.equal(newApikey)
  })
})
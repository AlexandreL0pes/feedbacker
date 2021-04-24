describe('Home', () => {
  it('should render create account modal when click on cta create account button', () => {
    cy.visit('/')

    cy.get('#cta-create-account-button').click()

    cy.get('#modal-create-account')
  })

  it('should render create account modal when click on header account button', () => {
    cy.visit('/')

    cy.get('#header-create-account-button').click()

    cy.get('#modal-create-account')
  })

  it('should render login modal when click on header login button', () => {
    cy.visit('/')

    cy.get('#header-login-button').click()

    cy.get('#modal-login')
  })

  it('should login with an email and password', () => {
    cy.visit('/')

    cy.get('#header-login-button').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('igor@igor.me')
    cy.get('#password-field').type('1234')

    cy.get('#submit-button').click()

    cy.url().should('include', '/feedbacks')
  })

  it('should show an error with an invalid email', () => {
    cy.visit('/')

    cy.get('#header-login-button').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('igor@')
    cy.get('#password-field').type('1234')

    cy.get('#submit-button').click()

    cy.get('#email-error')
  })

  it('should logout work correctly', () => {
    cy.visit('/')

    cy.get('#header-login-button').click()
    cy.get('#modal-login')

    cy.get('#email-field').type('igor@igor.me')
    cy.get('#password-field').type('1234')

    cy.get('#submit-button').click()

    cy.url().should('include', '/feedbacks')
    cy.get('#logout-button').click()
    cy.url().should('include', '/')
  })
})
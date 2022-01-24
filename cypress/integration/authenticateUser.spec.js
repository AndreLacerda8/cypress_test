/// <reference types="cypress" />


describe('Authenticate User', () => {
  it('should display a modal error, when email or password is incorrect', () => {
    cy.visit('http://localhost:3000')
    cy.get('[type="email"]').type('incorrect@mail.com')
    cy.get('[type="password"]').type('incorrectpassword')
    cy.intercept('POST', 'http://localhost:3333/login', {
      statusCode: 401,
      body: {
        message: 'Senha ou e-mail inválidos'
      }
    })
    cy.get('.sc-fKVqWL > .sc-hGPBjI').click()
    cy.get('.sc-ezbkAF').contains('Senha ou e-mail inválidos')
  })

  it('should go to /dashboard when email and password correct', () => {
    cy.visit('http://localhost:3000')
    cy.get('[type="email"]').type('correct@mail.com')
    cy.get('[type="password"]').type('correctpassword')
    cy.intercept('POST', '/login', {
      statusCode: 200,
      body: {
        user: {
          id: 0,
          email: "correct@mail.com",
          is_admin: 0,
          name: "Name",
          token: "token",
          token_created_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
          picture: null
        },
        token: {
          type: "bearer",
          token: "token",
          expires_at: new Date(Date.now() + 1000*60*60*24)
        }
      }
    })
    cy.intercept('GET', 'all-bets', {
      statusCode: 200,
      body: []
    })
    cy.get('.sc-fKVqWL > .sc-hGPBjI').click()
    cy.url().should('include', '/dashboard')
  })
})

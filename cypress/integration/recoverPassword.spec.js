/// <reference types="cypress" />

describe('Recover password', () => {
  it('should display a modal error when user not found', () => {
    cy.visit('http://localhost:3000/resetpassword')
    cy.get('.sc-bBHxTw').type('nonexists@mail.com')
    cy.intercept('POST', '/reset', {
      statusCode: 404,
      body: {
        message: "Usuário não encontrado em nossa base de dados"
      }
    })
    cy.get('.sc-fKVqWL > .sc-hGPBjI').click()
    cy.get('.sc-ezbkAF').contains('Usuário não encontrado em nossa base de dados')
  })

  it('should navigate to /uploadpassword when email is valid', () => {
    cy.visit('http://localhost:3000/resetpassword')
    cy.get('.sc-bBHxTw').type('exists@mail.com')
    cy.intercept('POST', '/reset', {
      statusCode: 200,
      body: {
        id: 0,
        email: "exists@mail.com",
        is_admin: 0,
        name: "Name",
        token: "token",
        token_created_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
    })
    cy.get('.sc-fKVqWL > .sc-hGPBjI').click()
    cy.url().should('include', '/uploadpassword')
  })

  it('should navigate to /login when send new password', () => {
    cy.visit('http://localhost:3000/resetpassword')
    cy.get('.sc-bBHxTw').type('exists@mail.com')
    cy.intercept('POST', '/reset', {
      statusCode: 200,
      body: {
        id: 0,
        email: "exists@mail.com",
        is_admin: 0,
        name: "Name",
        token: "token",
        token_created_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
    })
    cy.get('.sc-fKVqWL > .sc-hGPBjI').click()
    cy.wait(200)
    cy.get('.sc-bBHxTw').type('newpassword')
    cy.intercept('POST', '/reset/token', {
      statusCode: 200,
      body: {}
    })
    cy.get('.sc-fKVqWL > .sc-hGPBjI').click()
    cy.url().should('include', '/login')
  })
})
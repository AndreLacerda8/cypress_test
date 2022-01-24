/// <reference types="cypress" />

describe('Create User', () => {
  it('should display a modal error when email already exits', () => {
    cy.visit('http://localhost:3000/registration')
    cy.get('[placeholder="Name"]').type('Name')
    cy.get('[placeholder="Email"]').type('already@exists.com')
    cy.get('[placeholder="Password"]').type('password')
    cy.intercept('POST', 'user/create', {
      statusCode: 400,
      body: {
        error: { message: "Email already exists" }
      }
    })
    cy.get('.sc-fKVqWL > .sc-hGPBjI').click()
    cy.get('.sc-ezbkAF').contains('Email already exists')
  })

  it('should navigate to /dashboard when all data is correct', () => {
    cy.visit('http://localhost:3000/registration')
    cy.get('[placeholder="Name"]').type('Name')
    cy.get('[placeholder="Email"]').type('test@mail.com')
    cy.get('[placeholder="Password"]').type('password')
    cy.intercept('POST', 'user/create', {
      statusCode: 200,
      body: {
        user: {
          email: "test@mail.com",
          name: "Name",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          id: 7
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
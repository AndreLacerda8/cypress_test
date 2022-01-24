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
})
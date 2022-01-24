/// <reference types="cypress" />

describe('Save Bet', () => {
  it('should display a modal error when the minimum value has not been reached', () => {
    window.localStorage.setItem('authTokenLottery', 'token')
    cy.visit('http://localhost:3000/newbet')
    cy.get('.eidyyN').click()
    cy.get('.sc-ikJyIC > :nth-child(1)').click()
    cy.get('.sc-hiCibw').click()
    cy.intercept('POST', 'bet/new-bet', {
      statusCode: 400,
      body: {
        message: "The value min authorized is R$ 30,00"
      }
    })
    cy.get('.sc-efQSVx').click()
    cy.get('.sc-ezbkAF').contains('The value min authorized is R$ 30,00')
  })

  it('should navigate to /dashboard when its all correct', () => {
    window.localStorage.setItem('authTokenLottery', 'token')
    cy.visit('http://localhost:3000/newbet')
    cy.get('.eidyyN').click()
    cy.get('.sc-ikJyIC > :nth-child(1)').click()
    cy.get('.sc-hiCibw').click()
    cy.intercept('POST', 'bet/new-bet', {
      statusCode: 200,
      body: {
        bet: []
      }
    })
    cy.get('.sc-efQSVx').click()
    cy.url().should('include', '/dashboard')
  })
})
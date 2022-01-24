/// <reference types="cypress" />

describe('Logout', () => {
  it('should navigate to /login when click in logout button', () => {
    window.localStorage.setItem('authTokenLottery', 'token')
    cy.visit('http://localhost:3000/dashboard')
    cy.intercept('GET', 'all-bets', {
      statusCode: 200,
      body: []
    })
    cy.get(':nth-child(2) > .sc-egiyK').click()
    cy.url().should('include', '/login')
  })
})
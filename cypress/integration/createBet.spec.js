/// <reference types="cypress" />

describe('Create bet', () => {
  it('should add correct numbers in cart', () => {
    window.localStorage.setItem('authTokenLottery', 'token')
    cy.visit('http://localhost:3000/newbet')
    cy.get('.jIKGnW').click()
    cy.get('.sc-ikJyIC > :nth-child(1)').click()
    cy.get('button.sc-dPiLbb.euYQMT.selected').invoke('text').then(numbers => {
      const selectedNumbers = numbers.split('').reduce((acc, num, index) => {
        if(index === numbers.length - 1){
          return acc + num
        }
        return index % 2 === 1 ? acc + num + ',' : acc + num
      }, '')
      cy.get('.sc-hiCibw').click()
      cy.get('.sc-cidDSM > p').invoke('text').should('include', selectedNumbers)
    })
  })

  it('should add correct infos in cart', () => {
    window.localStorage.setItem('authTokenLottery', 'token')
    cy.visit('http://localhost:3000/newbet')
    cy.get('.jIKGnW').click()
    cy.get('.sc-ikJyIC > :nth-child(1)').click()
    cy.get('.sc-hiCibw').click()
    cy.get('div > h4').contains('Mega-Sena')
    cy.get('.sc-cidDSM > div > span').invoke('text').then(singlePrice => {
      cy.get('.sc-iAKWXU').should('include.text', singlePrice)
    })
  })
})
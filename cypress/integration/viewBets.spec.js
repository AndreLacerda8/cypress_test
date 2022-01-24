/// <reference types="cypress" />

describe('View Bets', () => {
  it('should show all bets', () => {
    window.localStorage.setItem('authTokenLottery', 'token')
    cy.intercept('GET', '/bet/all-bets', {
      statusCode: 200,
      body: [
        {
          "id": 35,
          "user_id": 3,
          "game_id": 1,
          "choosen_numbers": "1,2,6,7,8,9,10,11,16,17,18,19,20,23,24",
          "price": 2.5,
          "created_at": "2022-01-17T14:13:11.000-03:00",
          "type": {
            "id": 1,
            "type": "Lotofácil",
            "color": "#7F3992"
          }
        },
        {
          "id": 30,
          "user_id": 3,
          "game_id": 2,
          "choosen_numbers": "10,15,36,37,42,51",
          "price": 4.5,
          "created_at": "2022-01-17T14:13:11.000-03:00",
          "type": {
            "id": 2,
            "type": "Mega-Sena",
            "color": "#01AC66"
          }
        },
        {
          "id": 53,
          "user_id": 3,
          "game_id": 3,
          "choosen_numbers": "12,29,32,33,42",
          "price": 2,
          "created_at": "2022-01-24T13:31:41.000-03:00",
          "type": {
            "id": 3,
            "type": "Quina",
            "color": "#F79C31"
          }
        }
      ]
    })
    cy.visit('http://localhost:3000/dashboard')
    cy.get('.sc-iCfMLu > :nth-child(2)').children().should('have.length', 3)
  })
  
  it('should filter bets', () => {
    window.localStorage.setItem('authTokenLottery', 'token')
    cy.intercept('GET', '/bet/all-bets', {
      statusCode: 200,
      body: [
        {
          "id": 35,
          "user_id": 3,
          "game_id": 1,
          "choosen_numbers": "1,2,6,7,8,9,10,11,16,17,18,19,20,23,24",
          "price": 2.5,
          "created_at": "2022-01-17T14:13:11.000-03:00",
          "type": {
            "id": 1,
            "type": "Lotofácil",
            "color": "#7F3992"
          }
        },
        {
          "id": 30,
          "user_id": 3,
          "game_id": 2,
          "choosen_numbers": "10,15,36,37,42,51",
          "price": 4.5,
          "created_at": "2022-01-17T14:13:11.000-03:00",
          "type": {
            "id": 2,
            "type": "Mega-Sena",
            "color": "#01AC66"
          }
        },
        {
          "id": 53,
          "user_id": 3,
          "game_id": 3,
          "choosen_numbers": "12,29,32,33,42",
          "price": 2,
          "created_at": "2022-01-24T13:31:41.000-03:00",
          "type": {
            "id": 3,
            "type": "Quina",
            "color": "#F79C31"
          }
        }
      ]
    })
    cy.visit('http://localhost:3000/dashboard')

    cy.intercept('GET', '/bet/all-bets?type%5B%5D=Lotof%C3%A1cil', {
      statusCode: 200,
      body: [
        {
          "id": 35,
          "user_id": 3,
          "game_id": 1,
          "choosen_numbers": "1,2,6,7,8,9,10,11,16,17,18,19,20,23,24",
          "price": 2.5,
          "created_at": "2022-01-17T14:13:11.000-03:00",
          "type": {
            "id": 1,
            "type": "Lotofácil",
            "color": "#7F3992"
          }
        }
      ]
    })
    cy.get('.eidyyN').click()
    cy.get('.sc-gKclnd').contains('Lotofácil')

    cy.intercept('GET', '/bet/all-bets?type%5B%5D=Mega-Sena', {
      statusCode: 200,
      body: [
        {
          "id": 30,
          "user_id": 3,
          "game_id": 2,
          "choosen_numbers": "10,15,36,37,42,51",
          "price": 4.5,
          "created_at": "2022-01-17T14:13:11.000-03:00",
          "type": {
            "id": 2,
            "type": "Mega-Sena",
            "color": "#01AC66"
          }
        }
      ]
    })
    cy.get('.jIKGnW').click()
    cy.wait(200)
    cy.get('.sc-gKclnd').contains('Mega-Sena')

    cy.intercept('GET', '/bet/all-bets?type%5B%5D=Quina', {
      statusCode: 200,
      body: [
        {
          "id": 53,
          "user_id": 3,
          "game_id": 3,
          "choosen_numbers": "12,29,32,33,42",
          "price": 2,
          "created_at": "2022-01-24T13:31:41.000-03:00",
          "type": {
            "id": 3,
            "type": "Quina",
            "color": "#F79C31"
          }
        }
      ]
    })
    cy.get('.eHkIaE').click()
    cy.wait(200)
    cy.get('.sc-gKclnd').contains('Quina')
  })
})
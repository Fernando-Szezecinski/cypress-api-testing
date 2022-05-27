/// <reference types="cypress" />

describe('Rest API test with Cypress', () => {

    const baseUrl = Cypress.env('poke_api_url_base')

    it('should include "application/json; charset=utf-8" in the correct headers', () => {

        cy.request(`${baseUrl}/pokemon/25`)
            .as('pokemon')

        cy.get('@pokemon')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')
    })

    it('should return HTTP status code 200', () => {
        cy.request(`${baseUrl}/pokemon/25`)
            .as('pokemon')

        cy.get('@pokemon')
            .its('status')
            .should('equal', 200)
    })

    it('should return pokemon name as pikachu', () => {
        cy.request(`${baseUrl}/pokemon/25`)
            .as('pokemon')

        cy.get('@pokemon')
            .its('body')
            .should('include', { name: 'pikachu' })
    })

    it.only('should return HTTP status code 404 for inexistent pokemon', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/pokemon/1000`,
            failOnStatusCode: false
        }).as('pokemon')

        cy.get('@pokemon')
            .its('status')
            .should('equal', 404)
    })
})
///<reference types="cypress"/>

describe('Funcionalidade: Login', () =>{

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve azer login com sucesso', () => {

        cy.get('#username').type('deivid.teste@teste.com.br')
        cy.get('#password').type('teste@123')
        cy.get('#rememberme').click()
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')
        
    });

    it('Deve exibir uma mensagem de erro ao exibir usúario inválido', () => {
        cy.get('#username').type('deivid@teste.com.br')
        cy.get('#password').type('teste@123')
        cy.get('#rememberme').click()
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve exibir uma mensagem de erro ae exibir senha inválida', () => {
        cy.get('#username').type('deivid.teste@teste.com.br')
        cy.get('#password').type('teste122')
        cy.get('#rememberme').click()
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('exist')
        
    });

})
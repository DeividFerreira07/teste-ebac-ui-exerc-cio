///<reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () =>{

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {

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

    it('Deve fazer login com sucesso - usando massa de dados', () => {

        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('#rememberme').click()
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')
    });

    it('Deve fazer login com sucesso - usando fixture', () => {
        cy.fixture('perfil').then( dados => {
            cy.get('#username').type(dados.usuario , {log: false })
            cy.get('#password').type(dados.senha , {log: false })
            cy.get('#rememberme').click()
            cy.get('.woocommerce-form > .button').click()

            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')
        })
        
    });

    it.only('Deve fazer login com sucesso - usando comandos customizado', () => {
        cy.login('deivid.teste@teste.com.br' , 'teste@123')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')
    });

})
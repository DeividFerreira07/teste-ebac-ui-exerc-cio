///<reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        produtosPage.visitarUrl()
    });

   it('Deve selecionar um produto da lista', () => {
    produtosPage.buscarProdutoLista('Abominable Hoodie')
        cy.get('#tab-title-description > a').should('contain', 'Descrição')

   });

    it('Deve buscar um produto com sucesso', () => {
        produtosPage.buscarProduto('Zeppelin yoga Pant')
        cy.get('.product_title').should('exist' )
    });

    it('Deve visitar a página do produto', () => {
        produtosPage.visitarProduto('Zeppelin Yoga Pant')
        cy.get('.product_title').should('exist' )
    });

    it('Deve adicionar produto ao carrinho', () => {
        let qtd = 5
        produtosPage.buscarProduto('Abominable Hoodie')
        produtosPage.addProdutoCarrinho('L', 'Green', qtd)
        
        cy.get('.woocommerce-message').should('exist')
    });
    
     it.only('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
             produtosPage.buscarProduto(dados[2].nomeProduto)
             produtosPage.addProdutoCarrinho(
                 dados[2].tamanho,
                 dados[2].cor,
                 dados[2].quantidade)
        
             cy.get('.summary > .yith-wcwl-add-to-wishlist > .yith-wcwl-add-button > .add_to_wishlist > :nth-child(2) > span').should('exist')

        })

       
    });
});
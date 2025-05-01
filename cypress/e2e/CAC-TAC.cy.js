describe('Central de atendimento ao cliente TAT', () => {
   beforeEach ( ( ) => {
    cy.visit('./src/index.html')
  })

    
    it('Verifica o título da aplicação', ( ) => {
     cy.title( ).should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
    it('Preenche os campo obrigatótios e envia o formulário', () => {
      const longText = Cypress._.repeat('O site do CAT (Centro de Apoio ao Trabalhador) é extremamente útil e bem estruturado, oferecendo informações claras e acessíveis para quem busca oportunidades de emprego e qualificação profissional. A navegação é intuitiva.',5)
      cy.get('#firstName').type ('Karine')
      cy.get('#lastName').type ('Santos')
      cy.get('#email').type ('karine-patricio@hotmail.com')
      cy.get('#phone').type('910665684')
      cy.get('#open-text-area').type(longText, {delay: 0})
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible')

    })

      it('Exibe mensagem de erro para formulário com email em formatação inválida', ( ) => {
      cy.get('#firstName').type ('Karine')
      cy.get('#lastName').type ('Santos')
      cy.get('#email').type ('karine-patricio.hotmail.com')
      cy.get('#phone').type('910665684')
      cy.get('#open-text-area').type('Teste')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
     

    })

     it('Validar que o campo telefone só aceita númeors', ( ) => {
      cy.get('#phone')
       .type('abcde')
       .should('have.value',  '')
    
   })
     
   it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ( ) => {
    cy.get('#firstName').type ('Karine')
    cy.get('#lastName').type ('Santos')
    cy.get('#email').type ('karine-patricio@hotmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  
   })

   it('Preenche e limpa os campos nome, sobrenome, email e telefone', ( ) => {
    cy.get('#firstName')
       .type ('Karine')
       .should('have.value', 'Karine')
       .clear()
       .should('have.value', '')
    cy.get('#lastName')
       .type ('Santos')
       .should('have.value', 'Santos')
       .clear()
       .should('have.value', '')
    cy.get('#email')
       .type ('karine-patricio@hotmail.com')
       .should('have.value', 'karine-patricio@hotmail.com')
       .clear()
       .should('have.value', '')
     cy.get('#phone')
      .type('910665684')
      .should('have.value', '910665684')
      .clear()
      .should('have.value', '')
      cy.contains('button', 'Enviar').click()

  
   })

   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ( ) => {
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  
   })

   it('envia o formuário com sucesso usando um comando customizado', () => {
    
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  
   })

   it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
       .select('YouTube')
       .should('have.value', 'youtube') 
  
  
   })

   it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
       .select('mentoria')
       .should('have.value', 'mentoria') 
    
   })
   it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
       .select(1)
       .should('have.value', 'blog') 
  
  
   })
   it('marca cada tipo de atendimento "Feedback"' , () => {
      cy.get('input[ type="radio"][value="feedback"]').check()
        .should('be.checked')
    
    
     })
     it('marca cada tipo de atendimento' , () => {
      cy.get('input[ type="radio"]')
        .each( typeofservice => {
           cy.wrap(typeofservice)
             .check()
             .should('be.checked')
        })
                   
    
     })
     it('marca ambos checkboxes, depois desmarca o último' , () => {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
        
        
     })

     it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário' , () => {
      cy.get('#firstName').type ('Karine')
      cy.get('#lastName').type ('Santos')
      cy.get('#email').type ('karine-patricio.hotmail.com')
      cy.get('#open-text-area').type('Teste')
      cy.get('input[ type="radio"][value="feedback"]').check()
      cy.get('input[ type="checkbox"][value="phone"]').check()
      cy.contains('button', 'Enviar').click() 

      cy.get('.error').should('be.visible')
        
     })
     it('seleciona um arquivo da pasta fixture' , () => {
      cy.get('#firstName').type ('Karine')
      cy.get('#lastName').type ('Santos')
      cy.get('#email').type ('karine-patricio@hotmail.com')
      cy.get('#open-text-area').type('Teste')
      cy.get('input[ type="file"][id="file-upload"]')
        .selectFile('cypress/fixtures/example.json')
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')

        })

      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible')
        
     })
     it('seleciona um arquivo simulando um drag-and-drop' , () => {
      cy.get('input[ type="file"][id="file-upload"]')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })

      })
      it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias' , () => {
         cy.fixture('example.json').as('sampleFile')
         cy.get('input[ type="file"][id="file-upload"]')
           .selectFile('@sampleFile')
           .should(input => {
              expect(input[0].files[0].name).to.equal('example.json')
           })
   
         })
         it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique' , () => {
          cy.contains('a', 'Política de Privacidade')
            .should('have.attr', 'href', 'privacy.html')
            .and('have.attr','target', '_blank')
          
                
          })
            
    
     

})
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data= {
    firstname: 'Karol',
    lastname:'Santos',
    email:'karoline.santos@hotmail.com',
    telefone: '914556678',
    text:'Test.'
}) => {
    cy.get('#firstName').type (data.firstname)
    cy.get('#lastName').type (data.lastname)
    cy.get('#email').type (data.email)
    cy.get('#phone').type(data.telefone)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()

})
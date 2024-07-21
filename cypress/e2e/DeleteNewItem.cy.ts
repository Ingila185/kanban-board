describe('template spec', () => {
  it('Deletes new item successfully', () => {
    cy.visit('http://localhost:4200/')

    cy.get('#inplacespan').click();
    cy.get('#name').type('Test Name');
    cy.get('#description').type('Test Description');
    cy.get('form').submit();
    cy.get('body').contains('Test Name');
    
    
    cy.get('#menuOptions').click();


    })
})
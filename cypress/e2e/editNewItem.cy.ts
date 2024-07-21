describe('Add New Todo + Edit Spec', () => {
  it('Edits new item successfully', () => {
    cy.visit('http://localhost:4200/')

    cy.get('#inplacespan').click();
    cy.get('#name').type('Test Name');
    cy.get('#description').type('Test Description');
    cy.get('form').submit();
    cy.get('body').contains('Test Name');
    cy.contains('button','Edit').click();
    cy.get('#username').clear();
    cy.get('#username').type('Edit Name');
    cy.get('#description').clear();
    cy.get('#description').type('Edit Description');
    cy.get('form').submit();
    cy.get('body').contains('Edit Name');
  })


})
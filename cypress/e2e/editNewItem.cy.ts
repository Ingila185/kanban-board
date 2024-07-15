describe('Add New Todo + Edit Spec', () => {
  it('loads successfully', () => {
    cy.visit('http://localhost:4200/')
    cy.get('body').contains('Kanban Board')
  }),
  it('Adds new item successfully', () => {
    cy.visit('http://localhost:4200/')
    cy.get('#inplacespan').click();
    cy.get('#name').type('Test Name');
    cy.get('#description').type('Test Description');
    cy.get('form').submit();
    cy.get('body').contains('Test Name');
  }),
  it('Edits new item successfully', () => {
    cy.visit('http://localhost:4200/')
    cy.get('#menuOptions').click();
    /*cy.get('#name').type('Test Name');
    cy.get('#description').type('Test Description');
    cy.get('form').submit();
    cy.get('body').contains('Test Name');*/
  })


})

describe('Drag and Drop Test', () => {
    it('should drag and drop new todo to In-Progress items', () => {
        cy.visit('http://localhost:4200/')

        cy.get('#inplacespan').click();
        cy.get('#name').type('Test Name');
        cy.get('#description').type('Test Description');
        cy.get('form').submit();
        cy.get('body').contains('Test Name');
        cy.get('#dragElement').trigger('dragstart', { dataTransfer: new DataTransfer() })
        .trigger('dragenter') 
        .trigger('dragover') 
        .get('#dropElement')
        .trigger('drop')
        .trigger('dragend');
    });  

  });
console.log('All cypress commands',Cypress.Commands._commands);
describe('Edit_Profile', () => {
  beforeEach(() =>
  {
    cy.login('mahnoorhassan1787@gmail.com','P@ssword123')
    
  })
   it('Loginpage should be loaded ', () => {
    cy.url().should('include','/login');
    cy.get('input[id="react-aria-:Rbbrqltlla:"]').should("be.visible");
    cy.get('input[type="password"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  })
}
)
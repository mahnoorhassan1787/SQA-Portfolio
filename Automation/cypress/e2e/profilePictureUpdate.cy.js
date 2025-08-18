
describe('ProfilePictureUpdate', () => {
     beforeEach(() =>
  {
           cy.visit('https://trackx.wenawa.com');
           cy.get('input[id="react-aria-:Rbbrqltlla:"]').eq(0).type('mahnoorhassan1787@gmail.com');
    cy.get('input[type="password"]').type('P@ssword123');
    cy.get('button[type="submit"]').click(); 
    cy.wait(1000);
    cy.get('a[class="flex items-center gap-4"] svg').click(); 
    cy.wait(1000);
    cy.get('a[class="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"]').click(); 
    cy.wait(1000);

   
  })
  it('Verify profile photo upload button is visible', () => {    

       cy.get('#profile').should("be.visible");
  })
  it('Upload profile picture jpeg', () => {    
       
       cy.get('label[for="profile"]').click();
       const filepath='1699265737810.jpg';
       cy.get('#profile').attachFile(filepath);       
       cy.wait(5000);
       cy.get('section[aria-label="Notifications alt+T"]').should('contain.text','User Updated Successfully').and('be.visible');
       cy.wait(5000);

  })
  it('Upload profile picture Png file', () => {    

       cy.get('label[for="profile"]').click();
       const filepath='diamond.png';
       cy.get('#profile').attachFile(filepath);       
       cy.wait(5000);
       cy.get('section[aria-label="Notifications alt+T"]').should('contain.text','User Updated Successfully').and('be.visible');
       cy.wait(5000);
  })
  it('NEGITIVE_CASE=Upload profile picture largeSize Jpeg file ', () => {    

       cy.get('label[for="profile"]').click();
       const filepath='image1.jpg';
       cy.get('#profile').attachFile(filepath);       
       cy.wait(5000);
       cy.get('section[aria-label="Notifications alt+T"]').should('contain.text','User Not Updated Successfully').and('be.visible');
       cy.wait(5000);
  })
   it('NEGITIVE_CASE=Upload Wrong formate file like PDF ', () => {    

       cy.get('label[for="profile"]').click();
       const filepath='TRACKX_Documentation.pdf';
       cy.get('#profile').attachFile(filepath);       
       cy.wait(5000);
       cy.get('section[aria-label="Notifications alt+T"]').should('contain.text','User Not Updated Successfully').and('be.visible');
       cy.wait(10000);
  })
  it('NEGITIVE_CASE=Upload Wrong formate file like DOC ', () => {    

       cy.get('label[for="profile"]').click();
       const filepath='SEOhandsonexersice.docx';
       cy.get('#profile').attachFile(filepath);       
       cy.wait(5000);
       cy.get('section[aria-label="Notifications alt+T"]').should('contain.text','User Not Updated Successfully').and('be.visible');
       cy.wait(10000);
  })
})

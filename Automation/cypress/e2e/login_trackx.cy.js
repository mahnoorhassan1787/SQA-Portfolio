const { expect } = require("chai");

describe('LoginTackX', () => {
  beforeEach(() =>
  {
      cy.visit('https://trackx.wenawa.com')
    
  })
  
  it('Loginpage should be loaded ', () => {
    cy.url().should('include','/login');
    cy.get('input[id="react-aria-:Rbbrqltlla:"]').should("be.visible");
    cy.get('input[type="password"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  })
   it('Show error with empty form submission  ', () => {
      cy.get('button[type="submit"]').click();  
      cy.get('div[id="react-aria-:RbbrqltllaH4:"]').should('be.visible').and("contain",'Email is required');
      cy.get('div[id="react-aria-:RjbrqltllaH4:"]').should('be.visible').and("contain",'Password is required');

  })
  it('Show error with empty email but valid password  ', () => {
      cy.get('input[id="react-aria-:Rbbrqltlla:"]').eq(0).type('mahnoorhassan1787@gmail.com');
      cy.get('button[type="submit"]').click();  
      cy.get('div[id="react-aria-:RjbrqltllaH4:"]').should('be.visible').and("contain",'Password is required');

 })

it('Show error with Valid email but empty password  ', () => {
      cy.get('input[type="password"]').type('P@ssword123');
      cy.get('button[type="submit"]').click();  
      cy.get('div[id="react-aria-:RbbrqltllaH4:"]').should('be.visible').and("contain",'Email is required');


  })
  it('Show error with invalid credentials ', () => {
     cy.get('input[id="react-aria-:Rbbrqltlla:"]').eq(0).type('mahnvdfgoorhassan1787@gmail.com');
     cy.get('input[type="password"]').type('P@ssword123');
     cy.get('button[type="submit"]').click(); 
     cy.get('ol[dir="ltr"] li div div').should('contain.text','Email or password is incorrect').and('be.visible');
     

  })
  it('Checking password field is masked ', () => {
    const passwordinput="P@khmhidf";
     cy.get('input[type="password"]').type(passwordinput).should('have.attr', 'type', 'password');
     const inputvalue=cy.get('input[type="password"]').invoke('val');
     expect(inputvalue).not.to.equal(passwordinput);

  })
   it('Show error with invalid credentials ', () => {
     cy.get('input[id="react-aria-:Rbbrqltlla:"]').eq(0).type('mahnoorhassan1787@gmail.com');
     cy.get('input[type="password"]').type('P@ssword123');
     cy.get('button[type="submit"]').click(); 
     cy.get('ol[dir="ltr"] li div div').should('contain.text','Login Successful').and('be.visible');
     

  })
  it('Shouldnt allow login with invalid email formate ', () => {
     cy.get('input[id="react-aria-:Rbbrqltlla:"]').eq(0).type('mahnoorhassan1787gmail.com');
     cy.get('input[type="password"]').type('P@ssword123');
     cy.get('button[type="submit"]').click(); 
     cy.get('ol[dir="ltr"] li div div').should('contain.text','Email or password is incorrect').and('be.visible');
     

  })
  it('Forgot password functionality check ', () => {     
     cy.get('a[class="text-blue-500 text-sm text-center hover:underline"]').click(); 
     cy.url().should('include', '/forgot-password');  

    })
   it('loginValid with url change on dashboard', () => {
    cy.get('input[id="react-aria-:Rbbrqltlla:"]').eq(0).type('mahnoorhassan1787@gmail.com');
    cy.get('input[type="password"]').type('P@ssword123');
    cy.get('button[type="submit"]').click();  
    cy.wait(5000);  
    cy.url().should('include','/dashboard');

  })
  it('View password using eyebutton on and off', () => {    
    cy.get('input[id="react-aria-:Rbbrqltlla:"]').eq(0).type('mahnoorhassan1787@gmail.com');
    cy.get('input[type="password"]').type('P@ssword123');

    //Eyebutton  
    cy.get('button[type="button"]').click();
    cy.wait(5000);
    cy.get('button[type="button"]').click();
    cy.wait(5000);    
      

  

})



})




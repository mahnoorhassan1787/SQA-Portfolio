// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';

require('cypress-xpath');

Cypress.Commands.add('login', (email, password) => { 
    cy.visit('https://dev-trackx.wenawa.com/login');
    cy.get('input[id="react-aria-:Rbbrqltlla:"]').eq(0).type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click(); 
    cy.wait(10000);
})
Cypress.Commands.add('Branch', (Branch_Path,branch) => { 
    cy.get(Branch_Path).click();
    cy.contains('div',branch).scrollIntoView().should('be.visible').click();
    cy.wait(5000);
})
Cypress.Commands.add('Module_Select', (module_path,submodule_path) => { 
    cy.xpath(module_path).click();
    cy.wait(1000);
    cy.get(submodule_path).click();
    cy.wait(4000);
    cy.get('button[class="gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-12 w-10 ml-auto flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-200 ease-in-out"]').click();
})

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
/// <reference types="Cypress"/>
import "cypress-file-upload"
Cypress.Commands.add('login', (email, password) => { 
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

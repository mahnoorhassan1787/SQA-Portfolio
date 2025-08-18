describe('leaveRequest_spec', () => {
beforeEach(() =>{
  cy.login('admin@yopmail.com','Admin@123')
  cy.Branch('body > div:nth-child(2) > main:nth-child(1) > div:nth-child(1) > div:nth-child(2) > header:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(2)','karachi');
  cy.Module_Select('//span[normalize-space()="Leaves Management"]','a[href="/leaves/my-leaves"]');
    
})
it.skip('My leave page load successfully (urlcheck)', () => {
    cy.url().should('include', '/leaves/my-leaves');
})
it.skip('verify Heading "My leave Balances")', () => {
    cy.get('h2').should('contain.text', 'My Leaves Balances');
})

it.skip('Pending Requests summary cards are visible', () => {
    cy.contains('div','Pending Requests').should('be.visible');

})
it.skip('Total Rejected summary cards are visible', () => {
    cy.contains('div','Total Rejected').should('be.visible');

})
it.skip('Approved Leaves summary cards are visible', () => {
    cy.contains('div','Approved Leaves').should('be.visible');

})
it.skip('Total Leave Days summary cards are visible', () => {
    cy.contains('div','Total Leave Days').should('be.visible');

})
it.skip('Verify “Request Leave” button is visible and clickable', () => {
    cy.xpath('//button[normalize-space()="Request Leave"]').contains('Request Leave').should('be.visible').click();

})
it.skip('Request a leave', () => {
    cy.xpath('//button[normalize-space()="Request Leave"]').contains('Request Leave').should('be.visible').click();
    cy.get('div[role$="dialog"]').contains('Request Leave').should('be.visible');
    cy.xpath('//span[normalize-space()="Select a leave type"]').click({force: true});
    cy.get('[role="option"]', { timeout: 5000 }) // Could be <div> or <button> with role="option"
    .contains('Paid') // 0 for EXcel 1 for PDF
    .should('be.visible')
    .click();
    cy.get('body > div:nth-child(21) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1)').contains('Pick a date').click();
   cy.contains('[role="gridcell"]', '25').click();
   cy.get('body > div:nth-child(21) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1)').click();

   cy.wait(1000);
   cy.get('body > div:nth-child(21) > form:nth-child(2) > div:nth-child(2) > div:nth-child(2)').contains('Pick a date').click();
   cy.contains('[role="gridcell"]', '26').click();
   cy.get('body > div:nth-child(21) > form:nth-child(2) > div:nth-child(2) > div:nth-child(2)').click();
   cy.get('textarea[placeholder="Please provide a reason for your leave request"]').type('i am sick i want paid leave');
   cy.get('button[type="submit"]').click();
   cy.get('section[aria-label="Notifications alt+T"]').should('have.text','Leave Submitted Successfully' );

})
it.skip('Request a leave without data and click submit', () => {
   cy.xpath('//button[normalize-space()="Request Leave"]').contains('Request Leave').should('be.visible').click();

   cy.get('button[type="submit"]').click();
   // required feilds altert assertion 
    cy.get('div[role$="dialog"]').contains('Leave type is required').should('be.visible');
    cy.get('div[role$="dialog"]').contains('Start date is required').should('be.visible');
    cy.get('div[role$="dialog"]').contains('End date is required').should('be.visible');
    cy.get('div[role$="dialog"]').contains('Reason must be at least 5 character').should('be.visible');
})
it.skip('Assertion to calculate the total number of days after setting dates range ', () => {

    cy.xpath('//button[normalize-space()="Request Leave"]').contains('Request Leave').should('be.visible').click();
    cy.xpath('//span[normalize-space()="Select a leave type"]').click({force: true});
    cy.get('[role="option"]', { timeout: 5000 }) // Could be <div> or <button> with role="option"
    .contains('Paid') // 0 for EXcel 1 for PDF
    .should('be.visible')
    .click();
   cy.get('body > div:nth-child(21) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1)').contains('Pick a date').click();
   cy.contains('[role="gridcell"]', '26').click();
   cy.get('body > div:nth-child(21) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1)').click();

   cy.wait(1000);
   cy.get('body > div:nth-child(21) > form:nth-child(2) > div:nth-child(2) > div:nth-child(2)').contains('Pick a date').click();
   cy.contains('[role="gridcell"]', '27').click();
   cy.get('body > div:nth-child(21) > form:nth-child(2) > div:nth-child(2) > div:nth-child(2)').click();
   cy.xpath('//div[@class="grid grid-cols-1 md:grid-cols-2 gap-6"]//div[2]').contains('2 days').should('be.visible');
})
it.skip('Request a leave without data and click Cancel Button', () => {
   cy.xpath('//button[normalize-space()="Request Leave"]').contains('Request Leave').should('be.visible').click();

   cy.xpath('//button[normalize-space()="Cancel"]').click();
       cy.get('div[role$="dialog"]').should('not.exist');   
})
it.skip('Request a leave with data and click Cancel Button', () => {
   cy.xpath('//button[normalize-space()="Request Leave"]').contains('Request Leave').should('be.visible').click();
    cy.xpath('//span[normalize-space()="Select a leave type"]').click({force: true});
    cy.get('[role="option"]', { timeout: 5000 }) // Could be <div> or <button> with role="option"
    .contains('Paid') // 0 for EXcel 1 for PDF
    .should('be.visible')
    .click();
   cy.get('body > div:nth-child(21) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1)').contains('Pick a date').click();
   cy.contains('[role="gridcell"]', '26').click();
   cy.get('body > div:nth-child(21) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1)').click();

   cy.wait(1000);
   cy.get('body > div:nth-child(21) > form:nth-child(2) > div:nth-child(2) > div:nth-child(2)').contains('Pick a date').click();
   cy.contains('[role="gridcell"]', '27').click();
   cy.get('body > div:nth-child(21) > form:nth-child(2) > div:nth-child(2) > div:nth-child(2)').click();
   cy.xpath('//button[normalize-space()="Cancel"]').click();
   cy.get('div[role$="dialog"]').should('not.exist');   
})
it.skip('Request a leave and close the dailog with CLOSE Button', () => {
   cy.xpath('//button[normalize-space()="Request Leave"]').contains('Request Leave').should('be.visible').click();

       cy.get('button[class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"]').click();
       cy.get('div[role$="dialog"]').should('not.exist');   
})
it('Request a leave when no extra leave are left ', () => {
    cy.xpath('//button[normalize-space()="Request Leave"]').contains('Request Leave').should('be.visible').click();
    cy.get('div[role$="dialog"]').contains('Request Leave').should('be.visible');
    cy.xpath('//span[normalize-space()="Select a leave type"]').click({force: true});
    cy.get('[role="option"]', { timeout: 5000 }) // Could be <div> or <button> with role="option"
    .contains('Paid') // 0 for EXcel 1 for PDF
    .should('be.visible')
    .click();
    cy.get('body > div:nth-child(21) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1)').contains('Pick a date').click();
   cy.contains('[role="gridcell"]', '31').click();
   cy.get('body > div:nth-child(21) > form:nth-child(2) > div:nth-child(2) > div:nth-child(1)').click();

   cy.wait(1000);
   cy.get('body > div:nth-child(21) > form:nth-child(2) > div:nth-child(2) > div:nth-child(2)').contains('Pick a date').click();
   cy.contains('[role="gridcell"]', '31').click();
   cy.get('body > div:nth-child(21) > form:nth-child(2) > div:nth-child(2) > div:nth-child(2)').click();
   cy.get('textarea[placeholder="Please provide a reason for your leave request"]').type('i am sick i want paid leave');
   cy.get('button[type="submit"]').click();
   cy.get('section[aria-label="Notifications alt+T"]').should('have.text','Insufficient leave balance. Available: -16, Requested: 1');
})
})
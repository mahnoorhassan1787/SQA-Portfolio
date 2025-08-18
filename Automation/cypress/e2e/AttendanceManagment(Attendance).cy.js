describe('Attendance_spec', () => {
beforeEach(() =>{
  cy.login('admin@yopmail.com','Admin@123')
  cy.Branch('body > div:nth-child(2) > main:nth-child(1) > div:nth-child(1) > div:nth-child(2) > header:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(2)','karachi');
  cy.Module_Select('//span[normalize-space()="Attendance Management"]','body > div:nth-child(2) > main:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > nav:nth-child(1) > div:nth-child(10) > div:nth-child(2) > a:nth-child(1) > span:nth-child(2)');
  
})
    it.skip('Search attendance by employee by typing name', () => {
      cy.xpath('//span[normalize-space()="Select Employee"]').click();
      cy.wait(2000);
      cy.get('input[role="combobox"][placeholder="Search..."]').type("john lucy").type('{enter}');

            
  })
  it.skip('Search attendance by employee by scrolling and select', () => {
      cy.xpath('//span[normalize-space()="Select Employee"]').click();
      cy.wait(2000);
      cy.contains('div' ,'haroon majeed').scrollIntoView().should('be.visible').click();
           
  })

  it.skip('Search attendance by employee by scrolling and select the deselect the selection by x button', () => {
      cy.xpath('//span[normalize-space()="Select Employee"]').click();
      cy.wait(2000);
      cy.contains('div' ,'Syed Hamza Imran').scrollIntoView().should('be.visible').click();
      cy.wait(5000);
      cy.get('path[d="m6 6 12 12"]').click();
           
  })
   it.skip('Search attendance by department by typing name', () => {
      cy.xpath('//span[normalize-space()="Select Department"]').click();
      cy.wait(2000);
      cy.get('input[role="combobox"][placeholder="Search..."]').type("HR").type('{enter}');
   })
  it.skip('Search attendance by department by scrolling and select', () => {
     cy.xpath('//span[normalize-space()="Select Department"]').click();
      cy.wait(2000);
      //cy.contains('div',/^HR$/).scrollIntoView().should('be.visible').click();
      cy.contains('div',"FRONTEND").scrollIntoView().should('be.visible').click();

           
  })
  it.skip('Search attendance by department by scrolling and select the deselect the selection by x button', () => {
      cy.xpath('//span[normalize-space()="Select Department"]').click();
      cy.wait(2000);
      //cy.contains('div',/^HR$/).scrollIntoView().should('be.visible').click();
      cy.contains('div',"FRONTEND").scrollIntoView().should('be.visible').click();

      cy.wait(5000);
      cy.get('body > div:nth-child(2) > main:nth-child(1) > div:nth-child(1) > div:nth-child(2) > main:nth-child(2) > div:nth-child(1) > main:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(3) > div:nth-child(1) > div:nth-child(2) > svg:nth-child(1)').click();
      
           
  })
  it.skip('Search attendance by combination employee and department', () => {
      cy.xpath('//span[normalize-space()="Select Department"]').click();
      cy.wait(2000);
      //cy.contains('div',/^HR$/).scrollIntoView().should('be.visible').click();
      cy.contains('div',"BACKEND TEAM").scrollIntoView().should('be.visible').click();
      cy.xpath('//span[normalize-space()="Select Employee"]').click();
      cy.wait(2000);
      cy.contains('div' ,'Syed Hamza Imran').scrollIntoView().should('be.visible').click();
      cy.wait(5000);
      
  })
  it.skip('Search attendance by combination employee and department THE DESELECT ONE BY ONE', () => {
      cy.xpath('//span[normalize-space()="Select Department"]').click();
      cy.wait(2000);
      //cy.contains('div',/^HR$/).scrollIntoView().should('be.visible').click();
      cy.contains('div',"BACKEND TEAM").scrollIntoView().should('be.visible').click();
      cy.xpath('//span[normalize-space()="Select Employee"]').click();
      cy.wait(2000);
      cy.contains('div' ,'Syed Hamza Imran').scrollIntoView().should('be.visible').click();
      cy.wait(5000);
      cy.get('body > div:nth-child(2) > main:nth-child(1) > div:nth-child(1) > div:nth-child(2) > main:nth-child(2) > div:nth-child(1) > main:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(3) > div:nth-child(1) > div:nth-child(2) > svg:nth-child(1)').click();
      cy.wait(5000);
      cy.get('path[d="m6 6 12 12"]').click();
      
  })
  
  it.skip(' Search attendance by setting date range ', () => {
      cy.get('#date').click();
     cy.get('table').find('button[aria-selected="true"]').eq(0).click();//click the button which have attribute of aria-selected ture   
 //first month selection 
      cy.contains('June 2025') // Ensure June calendar is showing
      .parents('.space-y-4.rdp-caption_start') // move to calendar container
      .find('td')
      .contains(/^18$/) // Click exact date 17
      .click();
//second month selection
      cy.contains('July 2025') // Ensure July calendar is showing
      .parents('.space-y-4.rdp-caption_end') // move to calendar container
      .find('td')
      .contains(/^18$/) // Click exact date 17
      .click();  
       cy.get('#date').click();
  
})
it.skip('Generate attendance report pdf format by Employees', () => {
    cy.xpath('//button[normalize-space()="Generate Report"]').click();
   
     cy.contains('button', 'Select Employee(s)')
    .should('be.visible')
    .click();
  // Step 2: Wait for the dropdown options to appear and select the one by index
     cy.get('[role="option"]', { timeout: 5000 }) // Could be <div> or <button> with role="option"
    .eq(0) // 0 for employess and 1 for department
    .should('be.visible')
    .click();

    cy.wait(5000);

     cy.get('button[class="gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground flex w-full p-1 rounded-md border min-h-10 h-auto justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto flex-nowrap items-center overflow-hidden"]').click();
  // Step 2: Wait for the dropdown options to appear and select the one by index
     cy.contains('div' ,'haroon majeed').scrollIntoView().should('be.visible').click();
     cy.contains('div' ,'john lucy').scrollIntoView().should('be.visible').click();
     cy.contains('div', 'Close')
    .should('be.visible')
    .click();
    cy.xpath('(//button[@role="combobox"])[4]').click();
   cy.get('[role="option"]', { timeout: 5000 }) // Could be <div> or <button> with role="option"
    .eq(1) // 0 for EXcel 1 for PDF
    .should('be.visible')
    .click();
    cy.get('body > div:nth-child(21) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > button:nth-child(1)').click();
    // close the form 
    cy.get('button[class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"]').click();



  })
  it('Generate attendance report Excel format by Department', () => {
    cy.xpath('//button[normalize-space()="Generate Report"]').click();
   
     cy.contains('button', 'Select Employee(s)')
    .should('be.visible')
    .click();
  // Step 2: Wait for the dropdown options to appear and select the one by index
     cy.get('[role="option"]', { timeout: 5000 }) // Could be <div> or <button> with role="option"
    .eq(1) // 0 for employess and 1 for department
    .should('be.visible')
    .click();

    cy.wait(5000);
    cy.get('div[class="flex-1 min-w-[220px]"] button[role="combobox"]').click();
    cy.contains('div' ,'HR').scrollIntoView().should('be.visible').click();
    cy.xpath('(//button[@role="combobox"])[5]').click();//skip these two line if you want excel format
    cy.get('[role="option"]', { timeout: 5000 }) // Could be <div> or <button> with role="option"
    .eq(0) // 0 for EXcel 1 for PDF
    .should('be.visible')
    .click();
    cy.get('body > div:nth-child(21) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > button:nth-child(1)').click();
    // close the form 
    cy.get('button[class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"]').click();


  })
})
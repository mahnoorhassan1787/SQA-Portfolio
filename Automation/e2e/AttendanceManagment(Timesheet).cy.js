describe('TimeSheet_spec', () => {
beforeEach(() =>{
  cy.login('admin@yopmail.com','Admin@123')
  cy.Branch('body > div:nth-child(2) > main:nth-child(1) > div:nth-child(1) > div:nth-child(2) > header:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(2)','karachi');
  cy.Module_Select('//span[normalize-space()="Attendance Management"]','a[href="/timesheet"]');
  
})
 it.skip('Setting date with forward and backward buttons', () => {

    //5 time forward button 
    for (let i = 0; i < 5; i++) {
  cy.get('button[class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground w-10 rounded-none border-l border-gray-200 h-10"]').click(); 
   cy.wait(1000);
}
//5 time forward button 
    for (let i = 0; i < 5; i++) {
  cy.get('button[class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground w-10 rounded-none border-r border-gray-200 h-10"]').click();
  cy.wait(1000);
}
            
  })
  it.skip('Search time sheet by Employees', () => {
    cy.get('button[class="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-52"]').click();
     cy.contains('div' ,'Huzaifa khan').scrollIntoView().should('be.visible').click();
   
            
  })
  it.skip('Search time sheet by Employees and Export the report', () => {
    const firstname='Huzaifa';const lastname='khan';const Startdate='2025-06-20';const enddate='2025-07-20';
    cy.get('button[class="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-52"]').click();
     cy.contains('div' ,firstname+" "+lastname).scrollIntoView().should('be.visible').click();
     cy.xpath('//button[normalize-space()="Export Timesheet"]').click();
     cy.get('#startDate').type(Startdate);
     cy.get('#endDate').type(enddate);
     cy.get('button[class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 col-span-3"]').click();
     cy.get('[role="option"]', { timeout: 5000 }) // Could be <div> or <button> with role="option"
    .eq(1) // 0 for EXcel 1 for PDF
    .should('be.visible')
    .click();
    cy.xpath('//button[normalize-space()="Export"]').click();
    cy.xpath('//button[normalize-space()="Export"]').click();
    cy.get('section[aria-label="Notifications alt+T"]').should('have.text','Export SuccessfulTimesheet exported as PDF: Timesheet_'+firstname+'_'+lastname+'_'+Startdate+'_to_'+enddate+'.pdf' );
    //close the dailog
    cy.get('button[class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"]').click();

   
            
  })
  it.skip('Search time sheet by Employees and Export the report when no data is available ', () => {
    cy.get('button[class="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-52"]').click();
     cy.contains('div' ,'john lucy').scrollIntoView().should('be.visible').click();
     cy.xpath('//button[normalize-space()="Export Timesheet"]').click();
     cy.get('#startDate').type('2025-06-20');
     cy.get('#endDate').type('2025-07-20');
     cy.get('button[class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 col-span-3"]').click();
     cy.get('[role="option"]', { timeout: 5000 }) // Could be <div> or <button> with role="option"
    .eq(1) // 0 for EXcel 1 for PDF
    .should('be.visible')
    .click();
    cy.xpath('//button[normalize-space()="Export"]').click();
    cy.get('section[aria-label="Notifications alt+T"]').should('have.text','No Data AvailableNo timesheet entries found for the selected date range' );

    //close the dailog
    cy.get('button[class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"]').click();

   
            
  })
  it('Search timesheet in Calender view and generate report', () => {
    cy.xpath('(//button[normalize-space()="Calendar View"])[1]').click();
    // select employees 
    cy.get('div[class="flex items-center gap-3"] div[class="relative"]').click();

    const employees = ['Huzaifa khan', 'john lucy', 'umer aslam'];
    for (let i = 0; i < employees.length; i++) {
        cy.contains('div' ,employees[i]).scrollIntoView().should('be.visible').click();   
              
    }
    cy.get('div[class="flex items-center gap-3"] div[class="relative"]').click({force: true});
     cy.xpath('//button[normalize-space()="Export Timesheet"]').click();
     cy.get('#startDate').type('2025-06-20');
     cy.get('#endDate').type('2025-07-20');
     cy.get('button[class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 col-span-3"]').click();
     cy.get('[role="option"]', { timeout: 5000 }) // Could be <div> or <button> with role="option"
    .eq(1) // 0 for EXcel 1 for PDF
    .should('be.visible')
    .click();
    cy.xpath('//button[normalize-space()="Export"]').click();

})


})
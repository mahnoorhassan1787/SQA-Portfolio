describe('leaveTypes_spec', () => {
beforeEach(() =>{
  cy.login('admin@yopmail.com','Admin@123')
  cy.Branch('body > div:nth-child(2) > main:nth-child(1) > div:nth-child(1) > div:nth-child(2) > header:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(2)','karachi');
  cy.Module_Select('//span[normalize-space()="Leaves Management"]','a[href="/leaves/leave-types"]');
    
})
it.skip('My leave page load successfully (urlcheck)', () => {
    cy.url().should('include', '/leaves/leave-types');
    
})
it.skip('Leave Types is visible  ', () => {
    cy.contains('div','Leave Types').should('be.visible');

})
it.skip('Add Leave type', () => {
  //new data variables 
  const typename='maternity leave', descriptionLeave='need a leave ', hexacode='#444444'
   cy.xpath('//button[normalize-space()="Add Leave Type"]').click();
   cy.get('input[placeholder="Enter leave type name"]').type(typename);
   cy.get('textarea[placeholder="Enter leave type description"]').type(descriptionLeave);
   cy.xpath('//input[@placeholder="Enter hex color code"]').clear();
   cy.xpath('//input[@placeholder="Enter hex color code"]').type(hexacode);
   cy.xpath('//button[normalize-space()="Create"]').click();
   cy.get('section[aria-label="Notifications alt+T"]').should('have.text','Leave Type Created Successfully' );
})
it.skip('Adding leave type without adding any data (click on create )(mandatory field should be required)', () => {
   cy.xpath('//button[normalize-space()="Add Leave Type"]').click();
   cy.wait(1000);
   cy.xpath('//button[normalize-space()="Create"]').click();
   cy.wait(1000);
   // required feilds altert assertion 
    cy.get('div[role$="dialog"]').contains('Name is required').should('be.visible');
    cy.get('div[role$="dialog"]').contains('Description must be at least 5 characters').should('be.visible');
  
})
it.skip('Add duplicate leave type', () => {
   cy.xpath('//button[normalize-space()="Add Leave Type"]').click();
   cy.get('input[placeholder="Enter leave type name"]').type('ABC leave');
   cy.get('textarea[placeholder="Enter leave type description"]').type('ABC leave description');
   cy.xpath('//input[@placeholder="Enter hex color code"]').clear();
   cy.xpath('//input[@placeholder="Enter hex color code"]').type('#555555');
   cy.xpath('//button[normalize-space()="Create"]').click();
   cy.get('section[aria-label="Notifications alt+T"]').should('have.text','Leave type already exists with this name' );
})
it.skip('Check CANCEL button it working', () => {
   cy.xpath('//button[normalize-space()="Add Leave Type"]').click();
  
   cy.xpath('//button[normalize-space()="Cancel"]').click();
   
})
it.skip('Add leave type and Cancel it before creating it', () => {
   cy.xpath('//button[normalize-space()="Add Leave Type"]').click();
   cy.get('input[placeholder="Enter leave type name"]').type('ABC leave');
   cy.get('textarea[placeholder="Enter leave type description"]').type('ABC leave description');
   cy.xpath('//input[@placeholder="Enter hex color code"]').clear();
   cy.xpath('//input[@placeholder="Enter hex color code"]').type('#555555');
   cy.wait(5000);
   cy.xpath('//button[normalize-space()="Cancel"]').click();
   
})

it.skip('Check CLOSE button it working ', () => {
   cy.xpath('//button[normalize-space()="Add Leave Type"]').click();
  
   cy.xpath('//body/div[@role="dialog"]/button[1]').click();
   
})
it.skip('Delete the existing leave type', () => {
  //Add values you want to delete 
   const targetData = {
    name: 'bikhih',
    discrption: 'm0j ijho0jpo',
    status: 'Active',
    color: '#584242',
    
  };

  cy.get('table tbody tr').each(($row) => {
    cy.wrap($row).within(() => {
      cy.get('td').eq(0).invoke('text').then((name) => {
        cy.get('td').eq(1).invoke('text').then((discrption) => {
          cy.get('td').eq(2).invoke('text').then((status) => {
            cy.get('td').eq(3).invoke('text').then((color) => {
              
                if (
                  name.trim() === targetData.name &&
                  discrption.trim() === targetData.discrption &&
                  status.trim() === targetData.status &&
                  color.trim() === targetData.color 
                  
                )
                 {
                  // Click Approve button in the last cell (Actions)
                  cy.get('td').eq(4).get('button.bg-danger').find('svg').should('have.attr', 'aria-hidden', 'true').click();

                 }
              });
            });
          });
        });
      });
    });
    cy.get('section[aria-label="Notifications alt+T"]').should('have.text','Leave Type Deleted Successfully' );

  });
it.skip('Delete the existing leave type but Close it before deleteing it', () => {
  //Add values you want to delete 
   const targetData = {
    name: 'ABC leave',
    discrption: 'ABC leave description',
    status: 'Active',
    color: '#555555',
    
  };

  cy.get('table tbody tr').each(($row) => {
    cy.wrap($row).within(() => {
      cy.get('td').eq(0).invoke('text').then((name) => {
        cy.get('td').eq(1).invoke('text').then((discrption) => {
          cy.get('td').eq(2).invoke('text').then((status) => {
            cy.get('td').eq(3).invoke('text').then((color) => {
              
                if (
                  name.trim() === targetData.name &&
                  discrption.trim() === targetData.discrption &&
                  status.trim() === targetData.status &&
                  color.trim() === targetData.color 
                  
                )
                 {
                  // Click Approve button in the last cell (Actions)
                  cy.get('td').eq(4).get('button.bg-danger').find('svg').should('have.attr', 'aria-hidden', 'true').click();
                 cy.wait(2000);
                  cy.xpath('//button[normalize-space()="Close"]').click();

                 }
              });
            });
          });
        });
      });
    });
    //cy.get('section[aria-label="Notifications alt+T"]').should('have.text','Leave Type Deleted Successfully' );

  })
it('Edit the existing leave type', () => {
  //Add values you want to delete 
   const Editdata = {
   name: 'ABC leave',
    discrption: 'ABC leave description',
    status: 'Active',
    color: '#555555',
    
  };
   const targetData = {
   name: 'ABC leave123',
    discrption: 'ABC leave description123',
    status: 'Active',
    color: '#555559',
    
  };

  cy.get('table tbody tr').each(($row) => {
    cy.wrap($row).within(() => {
      cy.get('td').eq(0).invoke('text').then((name) => {
        cy.get('td').eq(1).invoke('text').then((discrption) => {
          cy.get('td').eq(2).invoke('text').then((status) => {
            cy.get('td').eq(3).invoke('text').then((color) => {
              
                if (
                  name.trim() === targetData.name &&
                  discrption.trim() === targetData.discrption &&
                  status.trim() === targetData.status &&
                  color.trim() === targetData.color 
                  
                )
                 {
                  // Click Approve button in the last cell (Actions)             

                  cy.get('td').eq(4).get('button.bg-blue-500').click();
                  cy.wait(5000); 
                 

                 }
              });
            });
          });
        });
      });
    });
   cy.get('div[role$="dialog"]').contains('Name').should('be.visible');
   cy.get('input[placeholder="Enter leave type name"]', { timeout: 10000 }).should('be.visible').clear().type(Editdata.name);
   cy.get('textarea[placeholder="Enter leave type description"]').clear().type(Editdata.discrption);
   cy.xpath('//input[@placeholder="Enter hex color code"]').clear();
   cy.xpath('//input[@placeholder="Enter hex color code"]').type(Editdata.color);
   cy.xpath('//button[normalize-space()="Update"]').click();
   cy.wait(5000);    
   cy.get('section[aria-label="Notifications alt+T"]').should('have.text','Leave Type Updated Successfully' );

  })
  
  
   
})


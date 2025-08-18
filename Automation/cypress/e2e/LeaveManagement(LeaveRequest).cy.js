describe('Myleave_spec', () => {
beforeEach(() =>{
  cy.login('admin@yopmail.com','Admin@123')
  cy.Branch('body > div:nth-child(2) > main:nth-child(1) > div:nth-child(1) > div:nth-child(2) > header:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(2)','karachi');
  cy.Module_Select('//span[normalize-space()="Leaves Management"]','a[href="/leaves/leave-requests"]');
    
})
it.skip('Leave request page load successfully (urlcheck)', () => {
    cy.url().should('include', '/leaves/leave-requests');
})

it.skip('Pending Approvals summary cards are visible', () => {
    cy.contains('div','Pending Approvals').should('be.visible');

})
it.skip('Total Approved summary cards are visible', () => {
    cy.contains('div','Total Approved').should('be.visible');

})
it.skip('Total reject Leaves summary cards are visible', () => {
    cy.contains('div','Total Reject').should('be.visible');

})
it.skip('Total Leave days summary cards are visible', () => {
    cy.contains('div','Total Leave Days').should('be.visible');

})
it.skip('Select department to search leaves accordingly(scroll)', () => {
    cy.get('button[class="relative w-[200px]"]').should('be.visible').click();
    cy.contains('div','HR').scrollIntoView().should('be.visible').click();
    

    
})
it.skip('Select department to search leaves accordingly(scroll) Export report', () => {
    cy.get('button[class="relative w-[200px]"]').should('be.visible').click();
    cy.contains('div','HR').scrollIntoView().should('be.visible').click();
    cy.xpath('//button[normalize-space()="Export Report"]').click();

    
})
it.skip('Select department to search leaves accordingly(type) Export report', () => {
    cy.get('button[class="relative w-[200px]"]').should('be.visible').click();
    cy.get('input[placeholder="Search..."]').type('HR').type('{enter}');
    cy.wait(1000);
    cy.xpath('//button[normalize-space()="Export Report"]').click();    
})
it.skip('Select department to search leaves And Cancel selection (X)', () => {
    cy.get('button[class="relative w-[200px]"]').should('be.visible').click();
    cy.get('input[placeholder="Search..."]').type('HR').type('{enter}');
    cy.wait(1000);
    cy.get('body > div:nth-child(2) > main:nth-child(1) > div:nth-child(1) > div:nth-child(2) > main:nth-child(2) > div:nth-child(1) > main:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > button:nth-child(1) > div:nth-child(1) > div:nth-child(2) > svg:nth-child(1)').click();
})
  it.skip('should validate leave request table data', () => {
    const expectedData = [
      {
        type: 'Paid Leave',
        date: '2025-08-27to 2025-08-31',
        days: '5',
        status: 'Approved',
        employee: 'umer aslam'
      },
      {
        type: 'Paid Leave',
        date: '2025-08-07to 2025-08-09',
        days: '3',
        status: 'Approved',
        employee: 'umer aslam'
      },
      {
        type: 'Paid Leave',
        date: '2025-07-28to 2025-08-01',
        days: '5',
        status: 'Approved',
        employee: 'umer aslam'
      },
      {
        type: 'leave',
        date: '2025-08-14to 2025-08-16',
        days: '3',
        status: 'Approved',
        employee: 'bilal khan'
      },
      {
        type: 'leave',
        date: '2025-07-28to 2025-08-02',
        days: '6',
        status: 'Approved',
        employee: 'bilal khan'
      },
      {
        type: 'leave',
        date: '2025-08-23to 2025-08-29',
        days: '7',
        status: 'Rejected',
        employee: 'atif aslam'
      },
      {
        type: 'leave',
        date: '2025-07-31to 2025-08-04',
        days: '5',
        status: 'Rejected',
        employee: 'atif aslam'
      },
      {
        type: 'leave',
        date: '2025-07-26to 2025-07-29',
        days: '4',
        status: 'Approved',
        employee: 'atif aslam'
      },
      {
        type: 'leave',
        date: '2025-08-17to 2025-08-24',
        days: '8',
        status: 'Approved',
        employee: 'atif aslam'
      }
    ];

    // Assuming each row is a <tr> inside a <tbody>
    //cy.get('tr').should('have.length', expectedData.length);

    expectedData.forEach((row, index) => {
      cy.get(`table tbody tr`).eq(index).within(() => {
        cy.get('td').eq(0).should('contain.text', row.type);
        cy.get('td').eq(1).should('contain.text', row.date);
        cy.get('td').eq(2).should('contain.text', row.days);
        cy.get('td').eq(3).should('contain.text', row.status);
        cy.get('td').eq(4).should('contain.text', row.employee);
      });
    });
  
});
it.skip('Accept the leave request for target data  ', () => {
  const targetData = {
    type: 'Formal Leave',
    date: '2025-07-31',
    days: '1',
    status: 'Pending',
    employee: 'Admin solution',
  };

  cy.get('table tbody tr').each(($row) => {
    cy.wrap($row).within(() => {
      cy.get('td').eq(0).invoke('text').then((type) => {
        cy.get('td').eq(1).invoke('text').then((date) => {
          cy.get('td').eq(2).invoke('text').then((days) => {
            cy.get('td').eq(3).invoke('text').then((status) => {
              cy.get('td').eq(4).invoke('text').then((employee) => {
                if (
                  type.trim() === targetData.type &&
                  date.trim() === targetData.date &&
                  days.trim() === targetData.days &&
                  status.trim() === targetData.status &&
                  employee.trim() === targetData.employee
                ) {
                  // Click Approve button in the last cell (Actions)
                  cy.get('td').eq(5).contains('Approve').click();
                }
              });
            });
          });
        });
      });
    });
  });
                      cy.get('section[aria-label="Notifications alt+T"]').should('have.text','Leave request Approved successfully' );

})
it('Reject the leave request for target data', () => {
  const targetData = {
    type: 'mandatory',
    date: '2025-07-31',
    days: '1',
    status: 'Pending',
    employee: 'Admin solution',
  };

  cy.get('table tbody tr').each(($row) => {
    cy.wrap($row).within(() => {
      cy.get('td').eq(0).invoke('text').then((type) => {
        cy.get('td').eq(1).invoke('text').then((date) => {
          cy.get('td').eq(2).invoke('text').then((days) => {
            cy.get('td').eq(3).invoke('text').then((status) => {
              cy.get('td').eq(4).invoke('text').then((employee) => {
                if (
                  type.trim() === targetData.type &&
                  date.trim() === targetData.date &&
                  days.trim() === targetData.days &&
                  status.trim() === targetData.status &&
                  employee.trim() === targetData.employee
                ) {
                  // Click reject button in the last cell (Actions)
                  cy.get('td').eq(5).contains('Reject').click();

                }
              });
            });
          });
        });
      });
    });
  });
                    cy.get('section[aria-label="Notifications alt+T"]').should('have.text','Leave request Rejected successfully' );

})

})
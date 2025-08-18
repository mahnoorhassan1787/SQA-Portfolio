import { searchDocumentOnPage } from '../support/myfunctions';
//import { statuscheck } from '../support/myfunctions';



describe('View_document_spec', () => {
  
beforeEach(() =>{
  cy.login('admin@yopmail.com','Admin@123')
  cy.Branch('body > div:nth-child(2) > main:nth-child(1) > div:nth-child(1) > div:nth-child(2) > header:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(2)','karachi');
  cy.Module_Select('//span[normalize-space()="Document Management"]','a[href="/documents/view-documents"]');
    
})
it.skip('My View-Documents page load successfully (urlcheck)', () => {
    cy.url().should('include', '/documents/view-documents');
})
it.skip('verify Heading "Documents" is visible', () => {
    cy.get('h2').should('contain.text', 'Documents');
})
it.skip('verify Heading "Dashboard" on document page redirecting towards dashboard', () => {
    cy.xpath('//a[normalize-space()="Dashboard /"]').click();
})
it.skip('Search document by Name', () => {
    cy.get('input[placeholder="Search documents..."]').type('wenawa tester');
    cy.wait(2000);
            cy.get('input[placeholder="Search documents..."]').clear().type('system enable');
                cy.wait(2000);
                cy.get('input[placeholder="Search documents..."]').clear().type('hello');
                    cy.wait(2000);
})
it.skip('Search document by Category(from dropdown)', () => {
    cy.xpath('//button[@aria-haspopup="dialog"]').click();
    cy.contains('div','HR guide').scrollIntoView().should('be.visible').click();
    cy.wait(1000);
    cy.xpath('//button[@aria-haspopup="dialog"]').click();
    cy.contains('div','Leadership').scrollIntoView().should('be.visible').click();
    cy.wait(1000);
    cy.xpath('//button[@aria-haspopup="dialog"]').click();
    cy.contains('div','Team Lead').scrollIntoView().should('be.visible').click();
})
it.skip('Search document by Category(from dropdown Search option)', () => {
    cy.xpath('//button[@aria-haspopup="dialog"]').click();
    cy.get('input[placeholder="Search..."]').type('Leadership').type('{enter}');
    cy.wait(1000);
    cy.xpath('//button[@aria-haspopup="dialog"]').click();
    cy.get('input[placeholder="Search..."]').type('HR guide').type('{enter}');
    cy.wait(1000);
    cy.xpath('//button[@aria-haspopup="dialog"]').click();
    cy.get('input[placeholder="Search..."]').type('Team lead').type('{enter}');
})
it.skip('Search document by Type(from dropdown)', () => {
    cy.xpath('(//button[@role="combobox"])[3]').click();
    cy.contains('div','Public').scrollIntoView().should('be.visible').click();
    cy.wait(1000);
        cy.xpath('(//button[@role="combobox"])[3]').click();
        cy.contains('div','Private').scrollIntoView().should('be.visible').click();
        cy.wait(1000);
            cy.xpath('(//button[@role="combobox"])[3]').click();
                cy.contains('div','All').scrollIntoView().should('be.visible').click();
                cy.wait(1000);



   

})
it.skip('Search document by Combination of( Category Name type) ', () => {
     cy.get('input[placeholder="Search documents..."]').type('manual');
    cy.wait(2000);
    cy.xpath('//button[@aria-haspopup="dialog"]').click();
    cy.contains('div','HR guide').scrollIntoView().should('be.visible').click();
    cy.wait(1000);
    cy.xpath('(//button[@role="combobox"])[3]').click();
    cy.contains('div','Public').scrollIntoView().should('be.visible').click();
    cy.wait(1000);
})
it.skip('Download document by name ', () => {
    
    const Data = {
   name: 'manual',
    
  };
   cy.get('input[placeholder="Search documents..."]').type(Data.name);
    cy.wait(2000);

  cy.get('table tbody tr').each(($row) => {
    cy.wrap($row).within(() => {
      cy.get('td').eq(0).invoke('text').then((name) => {
       
              
                if (
                  name.trim() === Data.name 
                 
                  
                )
                 {
                  // Click Approve button in the last cell (Actions)             

                  cy.get('td').eq(7).xpath('//tbody//button[2]').click();
                  cy.wait(5000); 
                 

                 }
            });
        });
    });
});
it.skip('Download document by finding manually from the table ', () => {
    
    const Data = {
   name: 'system enable',
   type:'DOCX', visiblity:'PUBLIC'
    
  };
   //cy.get('input[placeholder="Search documents..."]').type(Data.name);
    cy.wait(2000);

  cy.get('table tbody tr').each(($row) => {
    cy.wrap($row).within(() => {
      cy.get('td').eq(0).invoke('text').then((name) => {
              cy.get('td').eq(2).invoke('text').then((type) => {
                              cy.get('td').eq(4).invoke('text').then((visiblity) => {


       
              
                if (
                  name.trim() === Data.name && type.trim()===Data.type && visiblity.trim()===Data.visiblity
                 
                  
                )
                 {
                  // Click Approve button in the last cell (Actions)             

                  cy.get('td').eq(7).xpath('.//button[2]').click();
                  cy.wait(5000); 
                 

                 }
            });
        });
    });
});
})


}) 

it.skip('Download document by finding manually across paginated table', () => {
  
  const Data = {
    name: 'manual',
    type: 'PDF',
    visiblity: 'PUBLIC',
  };

  function searchDocumentOnPage() {
    cy.get('table tbody tr').then(($rows) => {
      let found = false;

      // Loop through all rows
      cy.wrap($rows).each(($row, index, $rowsList) => {
        if (found) return;

        cy.wrap($row).within(() => {
          cy.get('td').eq(0).invoke('text').then((name) => {
            cy.get('td').eq(2).invoke('text').then((type) => {
              cy.get('td').eq(4).invoke('text').then((visiblity) => {
                if (
                  name.trim() === Data.name &&
                  type.trim() === Data.type &&
                  visiblity.trim() === Data.visiblity
                ) {
                  // Found document: click download
                  cy.get('td').eq(7).xpath('.//button[2]').click();
                  found = true;
                  return false; // exit loop
                }
              });
            });
          });
        });
      }).then(() => {
        if (!found) {
          // Check if the Next button is enabled
          cy.get('li[aria-label="next page button"]').should('be.visible').then($nextBtn => {
            if (!found) {
               cy.get('li[role="button"][data-slot="next"]').then($nextBtn => {
               const isDisabled = $nextBtn.attr('data-disabled') === 'true';

               if (!isDisabled) {
                  cy.wrap($nextBtn).click();
                  cy.wait(2000);
                  searchDocumentOnPage(); // Recursive
                } 
              else
                {
                 cy.log('Reached the last page — document not found.');
                }
            
           });
        
            }
        })
    }
        
});
});
  }

 // cy.visit('/documents/view-documents');
  cy.wait(2000);
  searchDocumentOnPage();
});
it.skip('View Document by searching from table and click eyebutton', () => {
  

const Data = {
    name: 'guide',
    type: 'XLSX',
    visiblity: 'PRIVATE',
  };

function searchDocumentOnPage() {
    cy.get('table tbody tr').then(($rows) => {
      let found = false;

      // Loop through all rows
      cy.wrap($rows).each(($row, index, $rowsList) => {
        if (found) return;

        cy.wrap($row).within(() => {
          cy.get('td').eq(0).invoke('text').then((name) => {
            cy.get('td').eq(2).invoke('text').then((type) => {
              cy.get('td').eq(4).invoke('text').then((visiblity) => {
                if (
                  name.trim() === Data.name &&
                  type.trim() === Data.type &&
                  visiblity.trim() === Data.visiblity
                ) {
                  // Found document: click download
                  cy.get('td').eq(7).xpath('.//button[1]').click();
                  found = true;
                  return false; // exit loop
                }
              });
            });
          });
        });
      }).then(() => {
        if (!found) {
          // Check if the Next button is enabled
          cy.get('li[aria-label="next page button"]').should('be.visible').then($nextBtn => {
            if (!found) {
               cy.get('li[role="button"][data-slot="next"]').then($nextBtn => {
               const isDisabled = $nextBtn.attr('data-disabled') === 'true';

               if (!isDisabled) {
                  cy.wrap($nextBtn).click();
                  cy.wait(2000);
                  searchDocumentOnPage(); // Recursive
                } 
              else
                {
                 cy.log('Reached the last page — document not found.');
                }
            
           });
        
            }
        })
    }
        
});
});
}//function end 

 // cy.visit('/documents/view-documents');
  cy.wait(2000);
  searchDocumentOnPage();

})
it.skip('Delete Document by searching from table and click DUSTBIN_Button', () => {
  

const Data = {
    name: 'zvdzxxz',
    type: 'PDF',
    visiblity: 'PUBLIC',
  };

function searchDocumentOnPage() {
    cy.get('table tbody tr').then(($rows) => {
      let found = false;

      // Loop through all rows
      cy.wrap($rows).each(($row, index, $rowsList) => {
        if (found) return;

        cy.wrap($row).within(() => {
          cy.get('td').eq(0).invoke('text').then((name) => {
            cy.get('td').eq(2).invoke('text').then((type) => {
              cy.get('td').eq(4).invoke('text').then((visiblity) => {
                if (
                  name.trim() === Data.name &&
                  type.trim() === Data.type &&
                  visiblity.trim() === Data.visiblity
                ) {
                  // Found document: click download
                  cy.get('td').eq(7).xpath('.//button[4]').click();
                  found = true;
                  return false; // exit loop
                }
              });
            });
          });
        });
      }).then(() => {
        if (!found) {
          // Check if the Next button is enabled
          cy.get('li[aria-label="next page button"]').should('be.visible').then($nextBtn => {
            if (!found) {
               cy.get('li[role="button"][data-slot="next"]').then($nextBtn => {
               const isDisabled = $nextBtn.attr('data-disabled') === 'true';

               if (!isDisabled) {
                  cy.wrap($nextBtn).click();
                  cy.wait(2000);
                  searchDocumentOnPage(); // Recursive
                } 
              else
                {
                 cy.log('Reached the last page — document not found.');
                }
            
           });
        
            }
        })
    }
        
});
});
}//function end 

 // cy.visit('/documents/view-documents');
  cy.wait(2000);
  searchDocumentOnPage();
  cy.xpath('//button[normalize-space()="Delete"]').click();
  cy.get('section[aria-label="Notifications alt+T"]').should('have.text','Document deleted successfully' );


})
it.skip('SEARCH Document by searching from table and click Pencil_BUTTON to navigate towards EDIT document page', () => {
  

const Data = {
    name: 'wenawa',
    type: 'DOCX',
    visiblity: 'PUBLIC',
    
  };


 searchDocumentOnPage(Data.name,Data.type,Data.visiblity,3);//1 for eyebutton ,2 for download button , 3 for edit button , 4 for Delete button 
    cy.log(Data.name);
    cy.wait(2000);
    //searchDocumentOnPage(Data.name,Data.type,Data.visiblity,3);//1 for eyebutton ,2 for download button , 3 for edit button , 4 for Delete button 
      cy.url().should('include', '/documents/edit');

  


})
it('EDIT Document by searching from table and click Pencil_BUTTON', () => {
  
 let stateValue,checkCategories;
 function statuscheck() {
  return cy.get('button[value="on"]').invoke('attr', 'data-state').then(function(state) {
      stateValue = state; // store in variable
    });
  }
const Data = {
    name: 'system enable',
    type: 'DOCX',
    visiblity: 'PUBLIC',
    
  };
const editData= {
DocumentTitle: 'wenawa 1234',
Visiblity:'PUBLIC',
Discription:'This is my document',
Replacefile:'bugreport Mahnoor 07August25.pdf',
Active:1  // 0 to deactive 1 to active 
};
const Categories = ['Policy Document',  'financial'];

 searchDocumentOnPage(Data.name,Data.type,Data.visiblity,3);//1 for eyebutton ,2 for download button , 3 for edit button , 4 for Delete button 
    cy.log(Data.name);
    cy.wait(2000);
  cy.url().then(function(currentUrl) {
  if (currentUrl.includes('/documents/edit')) {
    // do something
  

    //*************** document edit steps *************//

   /////////////////////////////////////// EDIT DOCUMENT TITLE///////////////////////////////////////////

   //cy.get('input[placeholder="Enter document title"]').type('j');
  
    ///////////////////////// Select "Public"/'Private from the visible dropdown list//////////////////////
    
   cy.get('input[placeholder="Enter document title"]')
  .clear()
  .type(editData.DocumentTitle)
  .blur();

cy.document().then(() => {
  cy.xpath('(//button[@role="combobox"])[3]')
    .should('be.visible')
    .click({ force: true });
});
  cy.get('[role="option"]').contains(editData.Visiblity).click();
   cy.get('button[role="combobox"]')
  .should('contain.text', editData.Visiblity);
           //////////////////////////////////// EDIT DOCUMENT DESCRIPTION//////////////////////////////

  cy.get('textarea[placeholder="Enter document description (optional)"]').clear().type(editData.Discription);
  cy.wait(2000);
         //////////////////////////////////// REPLACE FILE//////////////////////////////

  cy.get('input[type="file"]').click(); 
       cy.get('input[type="file"]').attachFile(editData.Replacefile);  
       //////////////////////////////////// ACTIVE DEACTIVE//////////////////////////////
          statuscheck();
          cy.then(function() {
             cy.log('First check:', stateValue);
             if(editData.Active===0 && stateValue==='checked' )
             {
              //Deative the document
              cy.get('button[value="on"]').click(); 
              cy.wait(2000);

             }
             else if(editData.Active===1 && stateValue==='unchecked' )
              {
              //Active the document
              cy.get('button[value="on"]').click(); 
              cy.wait(2000);

             }
             else if(editData.Active===1 && stateValue==='checked' )
             {
              //already Active  no action required
              cy.log('already Active')

             }
             else
             {
             // /already deactive  no action required
              cy.log('already Deactive')
             }

          });
          //////////////////////////////EDIT Categories of documnents ///////////////////////////
           function statuscheck() {
           return   cy.xpath('(//button[@role="combobox"])[3]').invoke('text').then((Categories)=> {
           checkCategories = Categories; // store in variable
           cy.log("the Visibilty is "+checkCategories);
           if(checkCategories==='Private')
           {

           }
           else
           {
            /////// Edit Categories////////////
            cy.get('div[class="flex items-center justify-between"]').click();
            cy.wait(5000);
            for (let i = 0; i < Categories.length; i++) {
            cy.contains('div' ,Categories[i]).scrollIntoView().should('be.visible').click();     
           }
          } 
           });
  }
                    
         
       

}
});


      
  



})
it.skip('testfunction ', () => {
  const Data = {
    name: 'manual',
    type: 'PDF',
    visiblity: 'PUBLIC',
  };
    searchDocumentOnPage(Data.name,Data.type,Data.visiblity,4);//1 for eyebutton ,2 for download button , 3 for edit button , 4 for Delete button 
    cy.log(Data.name);
    searchDocumentOnPage(Data.name,Data.type,Data.visiblity,4);//1 for eyebutton ,2 for download button , 3 for edit button , 4 for Delete button 

})
})

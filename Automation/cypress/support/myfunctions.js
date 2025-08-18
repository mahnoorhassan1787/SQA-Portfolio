 export function searchDocumentOnPage(name1,type2,visiblity2,btn) {
     const Data = {
    name:name1,
    type: type2,
    visiblity: visiblity2,
    button_action:btn
  };
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
                  if(Data.button_action===1)//VIEW BUTTON EYE BUTTON
                  {
                    cy.get('td').eq(7).xpath('.//button[1]').click();
                  found = true;
                  return false; // exit loop
                  }
                  else if(Data.button_action===2)//DOWNLOAD BUTTON
                  {
                    cy.get('td').eq(7).xpath('.//button[2]').click();
                  found = true;
                  return false; // exit loop
                  }
                  else if(Data.button_action===3)//EDIT BUTTON
                  {
                    cy.get('td').eq(7).xpath('.//button[3]').click();
                  found = true;
                  return false; // exit loop
                  }
                  else if(Data.button_action===4)//DELETE BUTTON
                  {
                    cy.get('td').eq(7).xpath('.//button[4]').click();
                  found = true;
                  return false; // exit loop
                  }
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
                  searchDocumentOnPage(Data.name,Data.type,Data.visiblity); // Recursive
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


 //=======================================================//

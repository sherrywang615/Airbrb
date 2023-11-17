describe('UI testing', () => {
  it('Happy path of an admin', () => {
    //Registers successfully
    cy.visit('http://localhost:3000/register');
    cy.get('#registerEmail').type('test20@unsw.com');
    cy.get('#registerName').type('test20');
    cy.get('#registerPassword').type('test123');
    cy.get('#registerConfirmPassword').type('test123');
    cy.get('button[name="register"]').click();
    cy.url().should('include', '/hosted-listing');

    //creates a  new listing successfully
    cy.get('button[name="create-new-listing"]').click();
    cy.get('#title').type('test20');
    cy.get('#formGridStreet').type('1 Test Street');
    cy.get('#formGridCity').type('Sydney');
    cy.get('#formGridState').type('NSW');
    cy.get('#formGridPostcode').type('2000');
    cy.get('#formGridCountry').type('Australia');
    cy.get('#price').type('99');
    cy.get('#propertyType').type('House');
    cy.get('#bedrooms').type('3');
    cy.get('#beds').type('3');
    cy.get('#bathrooms').type('2');
    cy.get('#amenities').type('pool, kitchen');
    cy.get('#formFile').attachFile('dog.jpeg'); 
    cy.get('.modal-footer').contains('Submit').click();
    cy.get('.card').find('.typography').first().should('contain', 'test20');

    //updates the thumbnail and title of the listing successfully
    cy.get('button[name="edit-listing"]').click();
    cy.get('#titleEdit').clear().type('Edited title');
    cy.get('#formFileEdit').attachFile('koala.jpeg'); 
    cy.get('button[name="edit-listing-submit"]').click();
    cy.get('.card').find('.typography').first().should('contain', 'Edited title');

    //Publish a listing successfully
    cy.get('button[name="publish"]').click();
    cy.findByLabelText(`Start Date 1`).click().type('11/10/2023');
    cy.findByLabelText(`End Date 1`).click().type('11/13/2023');
    cy.get('button[name="availability-submit"]').click();
    cy.visit('http://localhost:3000');
    cy.get('.card').should('exist');

    //Unpublish a listing successfully
    cy.visit('http://localhost:3000/hosted-listings');
    cy.get('button[name="unpublish"]').click();
    cy.visit('http://localhost:3000');
    cy.get('.card').should('not.exist');
    
    //logs out successfully
    cy.get('a[name="logout"]').click();
    cy.url().should('eq', 'http://localhost:3000/');

    //register a new user successfully
    cy.get('a[name="register-nav"]').click();
    cy.get('#registerEmail').type('test21@unsw.com');
    cy.get('#registerName').type('test21');
    cy.get('#registerPassword').type('test123');
    cy.get('#registerConfirmPassword').type('test123');
    cy.get('button[name="register"]').click();
    cy.url().should('include', '/hosted-listing');

    //create a new listing successfully
    cy.visit('http://localhost:3000/hosted-listings');
    cy.get('button[name="create-new-listing"]').click();
    cy.get('#title').type('test21');
    cy.get('#formGridStreet').type('2 Test Street');
    cy.get('#formGridCity').type('Melbourne');
    cy.get('#formGridState').type('VIC');
    cy.get('#formGridPostcode').type('3000');
    cy.get('#formGridCountry').type('Australia');
    cy.get('#price').type('66');
    cy.get('#propertyType').type('Apartment');
    cy.get('#bedrooms').type('2');
    cy.get('#beds').type('2');
    cy.get('#bathrooms').type('2');
    cy.get('#amenities').type('pool, kitchen');
    cy.get('#formFile').attachFile('dog.jpeg'); 
    cy.get('.modal-footer').contains('Submit').click();
    cy.get('.card').find('.typography').first().should('contain', 'test21');

    //publish a listing successfully
    cy.get('button[name="publish"]').click();
    cy.findByLabelText('Start Date 1').click().type('11/10/2023');
    cy.findByLabelText('End Date 1').click().type('11/15/2023');
    cy.get('button[name="availability-submit"]').click();

    //logs out Alice successfully
    cy.get('a[name="logout"]').click();
    cy.url().should('eq', 'http://localhost:3000/');

    //logs in as user1 successfully
    cy.get('a[name="login-nav"]').click();
    cy.get('#loginEmail').type('test20@unsw.com');
    cy.get('#loginPassword').type('test123');
    cy.get('button[name="login-button"]').click();
    cy.url().should('include', '/hosted-listing');

    //make a booking successfully
    cy.get('a[name="home"]').click();
    cy.get('.card').first().click();
    cy.get('button[name="make-booking"]').click();
    cy.findByLabelText('Start Date').click().type('11/10/2023');
    cy.findByLabelText('End Date').click().type('11/13/2023');
    cy.get('button[name="booking-submit"]').click();
    cy.contains('Booking Confirmed!').should('exist');
    cy.contains('Close').click();

    //logs out user1 successfully
    cy.get('a[name="logout"]').click();
    cy.url().should('eq', 'http://localhost:3000/');

    //logs back into the application successfully
    cy.get('a[name="login-nav"]').click();
    cy.get('#loginEmail').type('test20@unsw.com');
    cy.get('#loginPassword').type('test123');
    cy.get('button[name="login-button"]').click();
    cy.url().should('include', '/hosted-listing');
  });
});

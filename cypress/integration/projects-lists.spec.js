describe('login test', function () {
  it('login Succes', () => {
   
    cy.visit('/');
    cy.wait(300);

    //Check if error is not visible
    cy.get('[data-cy=loginerror]').should('not.be.visible');

    //Login with wrong data
    cy.get('[data-cy=emailInput]').type('pieter_cappele@staringjane.be');
    cy.get('[data-cy=passwordInput]').type('piet48LZ');
    cy.get('[data-cy=submitlogin]').click();

    //Check we are always on the home page
    cy.location('pathname').should('eq', '/home');

  });

  it('login fail -> show error', () => {
   
      cy.visit('/');
      cy.wait(300);

      //Check if error is not visible
      cy.get('[data-cy=loginerror]').should('not.be.visible');

      //Login with wrong data
      cy.get('[data-cy=emailInput]').type('pieter_cappele@staringjane.be');
      cy.get('[data-cy=passwordInput]').type('wrongpass');
      cy.get('[data-cy=submitlogin]').click();

      //Check we are always on login page
      cy.location('pathname').should('eq', '/login')

      //Check error message appeared
      cy.get('[data-cy=loginerror]').should('be.visible');
  });


});

describe('Web App test', function () {
    //Login
      beforeEach(() => {
       if( localStorage.getItem("currentUserToken") == null){
        cy.visit('/');

        cy.get('[data-cy=emailInput]').type('pieter_cappele@staringjane.be');
        cy.get('[data-cy=passwordInput]').type('piet48LZ');
        cy.get('[data-cy=submitlogin]').click();
       }

     
      })
      
    it('Try to filter a list', () => {
      cy.server();

      cy.get('[data-cy=filterBox]').click();
      cy.get('[data-cy=filterInput]').type('sh');
      cy.wait(300);

      cy.get('[data-cy=filterInput]').type('{backspace}{backspace}ja');
      cy.get('[data-cy=projectCard]').should('have.length', 1);
      cy.get('[data-cy=project-title]').should('contain', 'Java 15');
    });
  
    it('add project while showing', () => {
      cy.visit('/');
      cy.wait(300);
       
        // check  before we start
        cy.get('[data-cy=projectCard]').should('have.length', 2);

        // open new project frame
        cy.get('[data-cy=openNewProjectButton]').click();
        cy.get('[data-cy=projectNameInput').type('amazon')
        cy.get('[data-cy=workerNewProject').first().click();
        cy.get('[data-cy=newProjectButton').click();
        cy.wait(300);

        // check we have x projects 
        cy.get('[data-cy=projectCard]').should('have.length', 3);
        
        //check confirmation popup appeared
        cy.get('[data-cy=appConfirmation]').should('be.visible');
    });
    

   it('add worker to project', () => {
    cy.visit('/');
      cy.wait(300);
      //Click on the new Project
      cy.get('[data-cy=projectCard]').last().click();

      // check we have one before we start
      cy.get('[data-cy=workersOnP]').should('have.length', 2);    
      cy.get('[data-cy=addWorker]').click();

      // add worker 
      cy.get('[data-cy=workerToAdd]').first().click();

      //Check
      cy.get('[data-cy=workersOnP]').should('have.length', 3);    
  });


  it('add new Task', () => {
    cy.visit('/');
      cy.wait(300);
      cy.get('[data-cy=projectCard]').last().click();

      // check we have no tasks
      cy.get('[data-cy=task]').should('have.length', 0); 
      // Open new task frame   
      cy.get('[data-cy=addTask]').click();

      // add Task 
      cy.get('[data-cy=taskName]').type('New Task');
      cy.get('[data-cy=workerToAddToTask]').first().click();
      cy.get('[data-cy=submitTask').click();

      //Check
      cy.get('[data-cy=task]').should('have.length', 1);    
  });




  });
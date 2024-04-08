describe('Blog app', function() {
  beforeEach(function() {
    
   cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'prueba',
      username: 'prueba',
      password: 'prueba'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:5173') 
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
    cy.contains('log in to applicacion')
  })

 
  describe('When logged in', function() {
   
    it('user can login', function () {
      cy.contains('log in').click()
      cy.get('#username').type('prueba')
      cy.get('#password').type('prueba')
      cy.get('#login-button').click()
  
      cy.contains('prueba logged-in')
    }) 
  }) 

   it.only('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('prueba')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('Wrong username or password')
  }) 

  describe('When logged in', function() {
   
    it('user can login', function () {
      cy.contains('log in').click()
      cy.get('#username').type('prueba')
      cy.get('#password').type('prueba')
      cy.get('#login-button').click()

      cy.contains('prueba logged-in')
   
      /* creando nuevo blog */

     cy.contains('create new blog').click()
   cy.get('#idtitle').type('a blog created by cypres')
    cy.get('#idautor').type('cypres')
    cy.get('#idurl').type('cypres.com')

    cy.get('#btncreate').click() 
    }) 
  }) 

})

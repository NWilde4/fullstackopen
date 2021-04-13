describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Mel Brooks',
      username: 'mel_brooks',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('[data-cy=username-field]').type('mel_brooks')
      cy.get('[data-cy=password-field]').type('password')
      cy.get('[data-cy=login-button]').click()
      
      cy.contains('Mel Brooks logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('[data-cy=username-field]').type('wrong_username')
      cy.get('[data-cy=password-field]').type('password')
      cy.get('[data-cy=login-button]').click()
      
      cy.contains('wrong username or password')
      cy.get('.message').should('have.css', 'font-size', '20px')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mel_brooks', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('[data-cy=title-field]').type('This is the title')
      cy.get('[data-cy=author-field]').type('Graham Greene')
      cy.get('[data-cy=url-field]').type('www.test.com')
      cy.get('[data-cy=create-button]').click()
      cy.contains('This is the title Graham Greene')
    })

    describe('And a blog has already been created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'This is the title',
          author: 'Graham Greene',
          url: 'www.test.com'
        })
        cy.contains('view').click()
      })

      it('A blog can be liked', function() {
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('A blog can be deleted', function() {
        cy.contains('remove').click()
      })
    })


  })

})
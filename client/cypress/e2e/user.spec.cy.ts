describe('User End-to-End Tests', () => {
  it('should create a new user',
      () => {
      //@ts-ignore
        cy.request({
          method: 'POST',
          url: 'http://localhost:8080/user/login',
          body: {
            username: 'testuser3',
            password: 'testpassword',
          },
        }).then((response) => {

          // check if user created successfully
          expect(response.status).to.eq(200);
        });
      });
});
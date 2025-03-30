const { Given, When, Then } = require('cypress-cucumber-preprocessor/steps')

Given("I'm on the front page", () => {
  cy.visit('http://localhost:3000/Login')
})

When("I type the username and the password", () => {
  cy.get('input[name="emailORusername"]').type('gvnna')
  cy.get('input[name="password"]').type('123123kk')
  cy.get('button').click()
})

Then("I should see the bookworms logo", () => {
  cy.get('img[alt="WormBig"]').should('exist');
})
// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'HR Portal')
  })
  it('Submits a new request', () => {
    // Get date input, add a date and check the value
    cy.get('input[type="date"]')
      .type('2020-01-01')
      .should('have.value', '2020-01-01')
    // Get days input, add a number and check the number
    cy.get('input[type="number"]')
      .type('1')
      .should('have.value', '1')
    // Get leave type select, select an option and selected value
    cy.get('select[name="leaveType"]')
      .select('Annual Leave')
      .should('have.value', 'annual')
    // Get outcome select, select an option and selected value
    cy.get('select[name="leaveOutcome"]')
      .select('Approved')
      .should('have.value', 'approved')
    // Get form button and submit form
    cy.get('button[type="submit"]').click()
    // Check request has been submitted
    cy.get('#request-0').should('be.visible')
  })
  it('Check annual leave days have been calculated', () => {
	cy.get('.leave .leave__approved').contains('1')
	cy.get('.leave .leave__remaining').contains('24')
  })
  it('Change request days and status', () => {
    cy.get('#request-0 .request__days')
      .click()
      .clear()
      .type('2')
    cy.get('#request-0 .request__status')
      .click()
      .clear()
      .type('declined')
  })
  it('Update request status from approved to declined and 1 day to 2 days', () => {
    cy.get('#request-0 .request__update').click()
  })
  it('Delete request', () => {
    cy.get('#request-0 .request__delete').click()
  })
})



describe("test", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })
    it("Testing Yo", () => {
        expect(1 + 2).equal(3)
        expect(1 + 1).equal(2)
        expect(2 + 2).not.to.equal(5)
    })
    const textInput = () => cy.get('input[name=name]')
    const emailInput = () => cy.get('input[name=email]')
    const passwordInput = () => cy.get('input[name=password]')
    const termsInput = () => cy.get('[type="checkbox"]')
    const submitButton = () => cy.get("button")

    it("submit test", () => {
        textInput().type("Testing 123").should("have.value", "Testing 123")
        emailInput().type("test@test.com").should("have.value", "test@test.com")
        passwordInput().type("1234").should("have.value", "1234")
        termsInput().check()
        submitButton().click()
    })
    it('should check for validation', () => {
        passwordInput()
        .type('ab')
        cy.contains('password must be 3 chars or longer').should('exist')
    })
})
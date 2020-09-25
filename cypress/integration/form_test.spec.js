describe("test", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })
    it("Testing for my sanity", () => {
        expect(1 + 2).equal(3)
        expect(1 + 1).equal(2)
        expect(2 + 2).not.to.equal(5)
    })
    const textInput = () => cy.get('input[name=name]')
    const emailInput = () => cy.get('input[name=email]')
    const passwordInput = () => cy.get('input[name=password]')
    const termsInput = () => cy.get('[type="checkbox"]')
    const submitButton = () => cy.get("button")

    it('check for validation', () => {
        passwordInput()
            .type('no')
        cy.contains('password must be 3 chars or longer').should('exist')
    })

    it("submit test", () => {
        textInput().type("Nunya Bidnezz").should("have.value", "Nunya Bidnezz")
        emailInput().type("perry@platapus.com").should("have.value", "perry@platapus.com")
        passwordInput().type("secret").should("have.value", "secret")
        termsInput().check()
        submitButton().click()
    })
})
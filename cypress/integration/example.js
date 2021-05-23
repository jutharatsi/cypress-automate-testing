describe('call get web', () => {
    it('successful get web', () => {
        cy.request({
            method: 'GET',
            url: 'https://www.google.com/'
        }).then((response) => {
            cy.writeFile('cypress/fixtures/response.json', response.body)
        })
    })
})
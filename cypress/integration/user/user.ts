// <reference path="../../support/index.d.ts" />
import faker from 'faker';
import ResolvedConfigOptions = Cypress.ResolvedConfigOptions;

context('User page', () => {
    beforeEach(() => {
        const config: ResolvedConfigOptions = Cypress.config();
        cy.visit(config.baseUrl || '');
    });

    it('should signup a new user, login view the user data, update user data and delete the account', () => {
        const email: string = faker.internet.email();
        const username: string = faker.internet.userName();
        const getUser: Cypress.Chainable<JQuery<HTMLElement>> = cy.createAndOpenUser({
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: username,
            email: email,
            password: <string>Cypress.env('USER_PASSWORD'),
        });

        const findNotValidUsername: Cypress.Chainable<JQuery<HTMLElement>> = getUser
            .get('[data-testid="card.title"]')
            .contains(username)
            .get('[data-testid="input.input"]')
            .type('No valid')
            .get('[data-testid="input.button"]')
            .click()
            .get('[data-testid="card.title"]')
            .should('be.empty');

        const findValidUsername: Cypress.Chainable<JQuery<HTMLElement>> = getUser
            .get('[data-testid="input.input"]')
            .clear()
            .type(username)
            .get('[data-testid="input.button"]')
            .click()
            .get('[data-testid="card.title"]')
            .contains(username);

        const newName: string = faker.name.firstName();
        const newLastName: string = faker.name.lastName();
        const newUsername: string = faker.internet.userName();

        const editUser: Cypress.Chainable<JQuery<HTMLElement>> = getUser
            .get('[data-testid="update.user.form.username.input"]')
            .clear()
            .type(newUsername)
            .get('[data-testid="update.user.form.name.input"]')
            .clear()
            .type(newName)
            .get('[data-testid="update.user.form.lastName.input"]')
            .clear()
            .type(newLastName)
            .get('[data-testid="update.user.form.button"]')
            .click()
            .get('[data-testid="update.user.form.username.input"]')
            .should('have.value', newUsername)
            .get('[data-testid="update.user.form.name.input"]')
            .should('have.value', newName)
            .get('[data-testid="update.user.form.lastName.input"]')
            .should('have.value', newLastName);

        const deleteUser: Cypress.Chainable<JQuery<HTMLElement>> = editUser
            .get('[data-testid="user.delete.button"]')
            .click()
            .get('#signup-button')
            .contains('Sign UP');

        const stub = cy.stub();
        cy.on('window:alert', stub);

        const deletedUserLogin: Cypress.Chainable<JQuery<HTMLElement>> = cy
            .get('[data-testid="login.user.form.email.input"]')
            .type(email)
            .get('[data-testid="login.user.form.password.input"]')
            .type(<string>Cypress.env('USER_PASSWORD'))
            .get('[data-testid="login.user.button"]')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Login failed');
            });
    });

    it('should signup a new user, login, view user pagination and logout', () => {
        const email: string = faker.internet.email();
        const username: string = faker.internet.userName();

        const getUser: Cypress.Chainable<JQuery<HTMLElement>> = cy.createAndOpenUser({
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: username,
            email: email,
            password: <string>Cypress.env('USER_PASSWORD'),
        });

        const assertPaginationData = getUser
            .get('[data-testid="user.list.view.start.pagination"]')
            .contains('1')
            .get('[data-testid="user.list.view.total.pagination"]')
            .then(($totalPages) => {
                const totalPages = parseInt($totalPages.text());
                if (totalPages > 4) {
                    cy.get('[data-testid="user.list.view.last.pagination"]')
                        .contains('4')
                        .get('[data-testid="user.list.view.page.next.page"]')
                        .click()
                        .get('[data-testid="user.list.view.start.pagination"]')
                        .contains('5')
                        .get('[data-testid="user.list.view.page.previous.page"]')
                        .click()
                        .get('[data-testid="user.list.view.start.pagination"]')
                        .contains('1');
                }
            })
            .get('[data-testid="user.list.view.page.number.pagination"]')
            .contains('1')
            .get('[data-testid="user.list.view.page.total.pagination"]')
            .then(($totalPages) => {
                let currentCounter = 1;
                const totalPages = parseInt($totalPages.text());
                for (let i = 1; i <= totalPages; i++) {
                    if (currentCounter === totalPages) {
                        cy.get('[data-testid="user.list.view.page.number.pagination"]').contains(totalPages.toString());
                    } else {
                        cy.get('[data-testid="user.list.view.page.next.page"]').click();
                    }
                    currentCounter += 1;
                }
            });
    });
});

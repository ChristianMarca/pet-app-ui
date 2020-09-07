/// <reference types="cypress" />
import faker from 'faker';

context('Sign up page and login', () => {
    beforeEach(() => {
        cy.visit(Cypress.config().baseUrl);
    });

    it('should signup a new user, login view the user data, update user data and delete the account', () => {
        const email = faker.internet.email();
        const username = faker.internet.userName();
        const signup = cy
            .get('#signup-button')
            .click()
            .get('[data-testid="create.user.form.name.input"]')
            .type(faker.name.firstName())
            .get('[data-testid="create.user.form.lastName.input"]')
            .type(faker.name.lastName())
            .get('[data-testid="create.user.form.username.input"]')
            .type(username)
            .get('[data-testid="create.user.form.email.input"]')
            .type(email)
            .get('[data-testid="create.user.form.password.input"]')
            .type(Cypress.env('USER_PASSWORD'))
            .get('[data-testid="create.user.form.submit.button"]')
            .click();

        const login = signup
            .get('[data-testid="login.user.form.email.input"]')
            .type(email)
            .get('[data-testid="login.user.form.password.input"]')
            .type(Cypress.env('USER_PASSWORD'))
            .get('[data-testid="login.user.button"]')
            .click();

        const findNotValidUsername = login
            .get('[data-testid="card.title"]')
            .contains(username)
            .get('[data-testid="input.input"]')
            .type('No valid')
            .get('[data-testid="input.button"]')
            .click()
            .get('[data-testid="card.title"]')
            .should('be.empty');

        const findValidUsername = login
            .get('[data-testid="input.input"]')
            .clear()
            .type(username)
            .get('[data-testid="input.button"]')
            .click()
            .get('[data-testid="card.title"]')
            .contains(username);

        const newName = faker.name.firstName();
        const newLastName = faker.name.lastName();
        const newUsername = faker.internet.userName();

        const editUser = login
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

        const deleteUser = editUser
            .get('[data-testid="user.delete.button"]')
            .click()
            .get('#signup-button')
            .contains('Sign UP');

        const stub = cy.stub();
        cy.on('window:alert', stub);

        const deletedUserLogin = cy
            .get('[data-testid="login.user.form.email.input"]')
            .type(email)
            .get('[data-testid="login.user.form.password.input"]')
            .type(Cypress.env('USER_PASSWORD'))
            .get('[data-testid="login.user.button"]')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Login failed');
            });
    });

    it('should signup a new user, login, view user pagination and logout', () => {
        const email = faker.internet.email();
        const username = faker.internet.userName();
        const signup = cy
            .get('#signup-button')
            .click()
            .get('[data-testid="create.user.form.name.input"]')
            .type(faker.name.firstName())
            .get('[data-testid="create.user.form.lastName.input"]')
            .type(faker.name.lastName())
            .get('[data-testid="create.user.form.username.input"]')
            .type(username)
            .get('[data-testid="create.user.form.email.input"]')
            .type(email)
            .get('[data-testid="create.user.form.password.input"]')
            .type(Cypress.env('USER_PASSWORD'))
            .get('[data-testid="create.user.form.submit.button"]')
            .click();

        const login = signup
            .get('[data-testid="login.user.form.email.input"]')
            .type(email)
            .get('[data-testid="login.user.form.password.input"]')
            .type(Cypress.env('USER_PASSWORD'))
            .get('[data-testid="login.user.button"]')
            .click();

        const assertPaginationData = login
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
                        cy.get('[data-testid="user.list.view.page.number.pagination"]')
                            .contains(totalPages.toString());
                    } else {
                        cy.get('[data-testid="user.list.view.page.next.page"]').click();
                    }
                    currentCounter += 1;
                }
            });
    });
});

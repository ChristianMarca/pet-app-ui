import faker from 'faker';
import ResolvedConfigOptions = Cypress.ResolvedConfigOptions;

context('Sign up page and login', () => {
    beforeEach(() => {
        const config: ResolvedConfigOptions = Cypress.config();
        cy.visit(config.baseUrl || '');
    });

    it('should signup a new user, login and logout', () => {
        const email: string = faker.internet.email();
        const username: string = faker.internet.userName();
        cy.get('#signup-button')
            .click()
            .get('[data-testid="create.user.form.name.input"]')
            .type(<string>faker.name.firstName())
            .get('[data-testid="create.user.form.lastName.input"]')
            .type(<string>faker.name.lastName())
            .get('[data-testid="create.user.form.username.input"]')
            .type(username)
            .get('[data-testid="create.user.form.email.input"]')
            .type(email)
            .get('[data-testid="create.user.form.password.input"]')
            .type(<string>Cypress.env('USER_PASSWORD'))
            .get('[data-testid="create.user.form.submit.button"]')
            .click()
            .get('[data-testid="login.user.form.email.input"]')
            .type(email)
            .get('[data-testid="login.user.form.password.input"]')
            .type(<string>Cypress.env('USER_PASSWORD'))
            .get('[data-testid="login.user.button"]')
            .click()
            .get('[data-testid="card.title"]')
            .contains(username)
            .get('[data-testid="logout.button"]')
            .click()
            .get('#signup-button')
            .contains('Sign UP');
    });

    it('should signup a new user, login, refresh the browser hold login and logout', () => {
        const email: string = faker.internet.email();
        const username: string = faker.internet.userName();

        cy.get('#signup-button')
            .click()
            .get('[data-testid="create.user.form.name.input"]')
            .type(<string>faker.name.firstName())
            .get('[data-testid="create.user.form.lastName.input"]')
            .type(<string>faker.name.lastName())
            .get('[data-testid="create.user.form.username.input"]')
            .type(username)
            .get('[data-testid="create.user.form.email.input"]')
            .type(email)
            .get('[data-testid="create.user.form.password.input"]')
            .type(<string>Cypress.env('USER_PASSWORD'))
            .get('[data-testid="create.user.form.submit.button"]')
            .click()
            .get('[data-testid="login.user.form.email.input"]')
            .type(email)
            .get('[data-testid="login.user.form.password.input"]')
            .type(<string>Cypress.env('USER_PASSWORD'))
            .get('[data-testid="login.user.button"]')
            .click()
            .get('[data-testid="card.title"]')
            .contains(username)
            .reload()
            .get('[data-testid="card.title"]')
            .contains(username)
            .get('[data-testid="logout.button"]')
            .click()
            .get('#signup-button')
            .contains('Sign UP');
    });
});

export interface IUser {
    username: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ILogin {
    email: string;
    password: string;
}

Cypress.Commands.add(
    'signup',
    (userData: IUser): Cypress.Chainable<JQuery<HTMLElement>> => {
        const { name, lastName, username, email, password } = userData;
        return cy
            .get('#signup-button')
            .click()
            .get('[data-testid="create.user.form.name.input"]')
            .type(name)
            .get('[data-testid="create.user.form.lastName.input"]')
            .type(lastName)
            .get('[data-testid="create.user.form.username.input"]')
            .type(username)
            .get('[data-testid="create.user.form.email.input"]')
            .type(email)
            .get('[data-testid="create.user.form.password.input"]')
            .type(password)
            .get('[data-testid="create.user.form.submit.button"]')
            .click();
    },
);

Cypress.Commands.add(
    'login',
    (loginData: ILogin): Cypress.Chainable<JQuery<HTMLElement>> => {
        const { email, password } = loginData;
        return cy
            .get('[data-testid="login.user.form.email.input"]')
            .type(email)
            .get('[data-testid="login.user.form.password.input"]')
            .type(password)
            .get('[data-testid="login.user.button"]')
            .click();
    },
);

Cypress.Commands.add(
    'createAndOpenUser',
    (userData: IUser): Cypress.Chainable<JQuery<HTMLElement>> => {
        const { name, lastName, username, email, password } = userData;
        return cy
            .signup({
                name,
                lastName,
                username,
                email,
                password,
            })
            .login({
                email,
                password,
            });
    },
);

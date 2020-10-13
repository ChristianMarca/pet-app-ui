// <reference path="../../support/index.d.ts" />
import faker from 'faker';
import ResolvedConfigOptions = Cypress.ResolvedConfigOptions;

context('User page follow service', () => {
    beforeEach(() => {
        const config: ResolvedConfigOptions = Cypress.config();
        cy.visit(config.baseUrl || '');
    });

    it('should follow a user', () => {
        const email: string = faker.internet.email();
        const username: string = faker.internet.userName();

        const emailSecondUser: string = faker.internet.email();
        const usernameSecondUser: string = faker.internet.userName();

        const getUser: Cypress.Chainable<JQuery<HTMLElement>> = cy.createAndOpenUser({
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: username,
            email: email,
            password: <string>Cypress.env('USER_PASSWORD'),
        });

        const logout = getUser.get('[data-testid="logout.button"]').click();

        const createNewUser = logout.createAndOpenUser({
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: usernameSecondUser,
            email: emailSecondUser,
            password: <string>Cypress.env('USER_PASSWORD'),
        });

        createNewUser
            .get('[data-testid="user.list.view.container.pagination"')
            .get(`[data-testid="d.user.pagination.item"]`)
            .then((item: JQuery<HTMLElement>) => {
                const foundItem: any = item.toArray().find((element: any) => element.id === username);
                if (!foundItem) {
                    cy.get('[data-testid="user.list.view.total.pagination"]').then(($totalPages) => {
                        const totalPages = parseInt($totalPages.text());
                        let currentCounter = 1;
                        let forceBreak = false;
                        for (let i = 1; i <= totalPages + 1; i++) {
                            if (forceBreak) {
                                break;
                            }
                            cy.get(`[data-testid="d.user.pagination.item"]`).then((item1: JQuery<HTMLElement>) => {
                                const foundItem1: any = item1.toArray().find((element: any) => {
                                    return element.id === username;
                                });
                                if (foundItem1 && !forceBreak) {
                                    cy.get(`[data-testid="${username.concat('.button.unfollow.user')}"]`)
                                        .should('not.exist')
                                        .get(`[data-testid="${username.concat('.button.follow.user')}"]`)
                                        .click()
                                        .get(`[data-testid="${username.concat('.button.unfollow.user')}"]`)
                                        .contains('Unfollow');
                                    forceBreak = true;
                                    return;
                                } else if (currentCounter < totalPages - 1 && !forceBreak) {
                                    cy.get('[data-testid="user.list.view.page.next.page"]').click();
                                    currentCounter += 1;
                                }
                            });
                        }
                    });
                }
            });
    });

    it('should, unfollow a user', () => {
        const email: string = faker.internet.email();
        const username: string = faker.internet.userName();

        const emailSecondUser: string = faker.internet.email();
        const usernameSecondUser: string = faker.internet.userName();

        const getUser: Cypress.Chainable<JQuery<HTMLElement>> = cy.createAndOpenUser({
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: username,
            email: email,
            password: <string>Cypress.env('USER_PASSWORD'),
        });

        const logout = getUser.get('[data-testid="logout.button"]').click();

        const createNewUser = logout.createAndOpenUser({
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: usernameSecondUser,
            email: emailSecondUser,
            password: <string>Cypress.env('USER_PASSWORD'),
        });

        createNewUser
            .get('[data-testid="user.list.view.container.pagination"')
            .get(`[data-testid="d.user.pagination.item"]`)
            .then((item: JQuery<HTMLElement>) => {
                const foundItem: any = item.toArray().find((element: any) => element.id === username);
                if (!foundItem) {
                    cy.get('[data-testid="user.list.view.total.pagination"]').then(($totalPages) => {
                        const totalPages = parseInt($totalPages.text());
                        let currentCounter = 1;
                        let forceBreak = false;
                        for (let i = 1; i <= totalPages + 1; i++) {
                            if (forceBreak) break;
                            return cy
                                .get(`[data-testid="d.user.pagination.item"]`)
                                .then((item1: JQuery<HTMLElement>) => {
                                    const foundItem1: any = item1.toArray().find((element: any) => {
                                        return element.id === username;
                                    });
                                    if (foundItem1 && !forceBreak) {
                                        cy.get(`[data-testid="${username.concat('.button.unfollow.user')}"]`)
                                            .should('not.exist')
                                            .get(`[data-testid="${username.concat('.button.follow.user')}"]`)
                                            .click()
                                            .get(`[data-testid="${username.concat('.button.unfollow.user')}"]`)
                                            .click()
                                            .get(`[data-testid="${username.concat('.button.follow.user')}"]`)
                                            .contains('Follow');
                                        forceBreak = true;
                                        return;
                                    } else if (currentCounter < totalPages - 1 && !forceBreak) {
                                        cy.get('[data-testid="user.list.view.page.next.page"]').click();
                                        currentCounter += 1;
                                    }
                                });
                        }
                    });
                }
            });
    });
});

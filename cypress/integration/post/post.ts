// <reference path="../../support/index.d.ts" />
import faker from 'faker';
import ResolvedConfigOptions = Cypress.ResolvedConfigOptions;

context('Posts page', () => {
    beforeEach(() => {
        const config: ResolvedConfigOptions = Cypress.config();
        cy.visit(config.baseUrl || '');
    });

    it('should create a new post and check if the post exists', () => {
        const email: string = faker.internet.email();
        const username: string = faker.internet.userName();
        const postTitle: string = faker.random.words();
        const postBody: string = faker.lorem.paragraph();
        const getUser: Cypress.Chainable<JQuery<HTMLElement>> = cy.createAndOpenUser({
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: username,
            email: email,
            password: <string>Cypress.env('USER_PASSWORD'),
        });

        const createPost = getUser
            .get('[data-testid="route.posts.button"]')
            .click()
            .get('[data-testid="post.create.title"]')
            .type(postTitle)
            .get('[data-testid="post.create.body"]')
            .type(postBody)
            .get('[data-testid="post.create.submit.button"]')
            .click()
            .get('[data-testid="post.create.title"]')
            .should('be.empty')
            .get('[data-testid="post.create.body"]')
            .should('be.empty');
    });

    it('should show only own posts', () => {
        const email: string = faker.internet.email();
        const username: string = faker.internet.userName();
        const postTitle: string = faker.random.words();
        const postBody: string = faker.lorem.paragraph();
        const getUser: Cypress.Chainable<JQuery<HTMLElement>> = cy.createAndOpenUser({
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: username,
            email: email,
            password: <string>Cypress.env('USER_PASSWORD'),
        });

        const createPost = getUser
            .get('[data-testid="route.posts.button"]')
            .click()
            .get('[data-testid="post.create.title"]')
            .type(postTitle)
            .get('[data-testid="post.create.body"]')
            .type(postBody)
            .get('[data-testid="post.create.submit.button"]')
            .click()
            .get('[data-testid="post.create.title"]')
            .should('be.empty')
            .get('[data-testid="post.create.body"]')
            .should('be.empty');

        const getOwnPosts = createPost
            .get('[data-testid="post.own.toggle.button"]')
            .click()
            .get('[data-testid="post.editable.title"]')
            .should('have.value', postTitle)
            .get('[data-testid="post.editable.body"]')
            .should('have.value', postBody)
            .get('[data-testid="save.post.item.button"]')
            .should('be.visible')
            .get('[data-testid="delete.post.item.button"]')
            .should('be.visible');
    });

    it('should show updated a post', () => {
        const email: string = faker.internet.email();
        const username: string = faker.internet.userName();
        const postTitle: string = faker.random.words();
        const postBody: string = faker.lorem.paragraph();
        const titleUpdated: string = faker.lorem.text();
        const getUser: Cypress.Chainable<JQuery<HTMLElement>> = cy.createAndOpenUser({
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: username,
            email: email,
            password: <string>Cypress.env('USER_PASSWORD'),
        });

        const createPost = getUser
            .get('[data-testid="route.posts.button"]')
            .click()
            .get('[data-testid="post.create.title"]')
            .type(postTitle)
            .get('[data-testid="post.create.body"]')
            .type(postBody)
            .get('[data-testid="post.create.submit.button"]')
            .click()
            .get('[data-testid="post.create.title"]')
            .should('be.empty')
            .get('[data-testid="post.create.body"]')
            .should('be.empty');

        const getOwnPosts = createPost
            .get('[data-testid="post.own.toggle.button"]')
            .click()
            .get('[data-testid="post.editable.title"]')
            .should('have.value', postTitle)
            .get('[data-testid="post.editable.body"]')
            .should('have.value', postBody)
            .get('[data-testid="save.post.item.button"]')
            .should('be.visible')
            .get('[data-testid="delete.post.item.button"]')
            .should('be.visible');

        const updatePosts = getOwnPosts
            .get('[data-testid="post.editable.title"]')
            .clear()
            .type(titleUpdated)
            .get('[data-testid="save.post.item.button"]')
            .click()
            .get('[data-testid="post.editable.title"]')
            .should('have.value', titleUpdated);
    });

    it('should show delete a post', () => {
        const email: string = faker.internet.email();
        const username: string = faker.internet.userName();
        const postTitle: string = faker.random.words();
        const postBody: string = faker.lorem.paragraph();

        const getUser: Cypress.Chainable<JQuery<HTMLElement>> = cy.createAndOpenUser({
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: username,
            email: email,
            password: <string>Cypress.env('USER_PASSWORD'),
        });

        const createPost = getUser
            .get('[data-testid="route.posts.button"]')
            .click()
            .get('[data-testid="post.create.title"]')
            .type(postTitle)
            .get('[data-testid="post.create.body"]')
            .type(postBody)
            .get('[data-testid="post.create.submit.button"]')
            .click()
            .get('[data-testid="post.create.title"]')
            .should('be.empty')
            .get('[data-testid="post.create.body"]')
            .should('be.empty');

        const getOwnPosts = createPost
            .get('[data-testid="post.own.toggle.button"]')
            .click()
            .get('[data-testid="post.editable.title"]')
            .should('have.value', postTitle)
            .get('[data-testid="post.editable.body"]')
            .should('have.value', postBody)
            .get('[data-testid="save.post.item.button"]')
            .should('be.visible')
            .get('[data-testid="delete.post.item.button"]')
            .should('be.visible');

        const deletePost = getOwnPosts
            .get('[data-testid="delete.post.item.button"]')
            .click()
            .get('[data-testid="post.editable.title"]')
            .should('not.exist');
    });

    it('should show navigate in posts pages', () => {
        const email: string = faker.internet.email();
        const username: string = faker.internet.userName();
        const postTitle: string = faker.random.words();
        const postBody: string = faker.lorem.paragraph();

        const getUser: Cypress.Chainable<JQuery<HTMLElement>> = cy.createAndOpenUser({
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: username,
            email: email,
            password: <string>Cypress.env('USER_PASSWORD'),
        });

        const createPost = getUser
            .get('[data-testid="route.posts.button"]')
            .click()
            .get('[data-testid="post.create.title"]')
            .type(postTitle)
            .get('[data-testid="post.create.body"]')
            .type(postBody)
            .get('[data-testid="post.create.submit.button"]')
            .click()
            .get('[data-testid="post.create.title"]')
            .should('be.empty')
            .get('[data-testid="post.create.body"]')
            .should('be.empty');

        const assertPaginationData = getUser
            .get('[data-testid="post.list.view.start.pagination"]')
            .contains('1')
            .get('[data-testid="post.list.view.total.pagination"]')
            .then(($totalPages) => {
                const totalPages = parseInt($totalPages.text());
                if (totalPages > 4) {
                    cy.get('[data-testid="post.list.view.last.pagination"]')
                        .contains('4')
                        .get('[data-testid="post.list.view.page.next.page"]')
                        .click()
                        .get('[data-testid="post.list.view.start.pagination"]')
                        .contains('5')
                        .get('[data-testid="post.list.view.page.previous.page"]')
                        .click()
                        .get('[data-testid="post.list.view.start.pagination"]')
                        .contains('1');
                }
            })
            .get('[data-testid="post.list.view.page.number.pagination"]')
            .contains('1')
            .get('[data-testid="post.list.view.page.total.pagination"]')
            .then(($totalPages) => {
                let currentCounter = 1;
                const totalPages = parseInt($totalPages.text());
                for (let i = 1; i <= totalPages; i++) {
                    if (currentCounter === totalPages) {
                        cy.get('[data-testid="post.list.view.page.number.pagination"]').contains(totalPages.toString());
                    } else {
                        cy.get('[data-testid="post.list.view.page.next.page"]').click();
                    }
                    currentCounter += 1;
                }
            });
    });
});

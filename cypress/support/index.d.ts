// ***********************************************************
// This example support/index.d.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.d.ts using ES2015 syntax:
import './commands';
import { IUser, ILogin } from "./index";

/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        singup(userData:IUser): Chainable<Element>
        login(loginData:ILoginS): Chainable<Element>
        createAndOpenUser(userData:IUser): Chainable<Element>
    }
}

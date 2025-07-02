const element = require('../element/agoda.json');

class HomePageAgoda {
    visit() {
        // Visit the Agoda homepage
        cy.viewport(1920, 1080);
        cy.visit(Cypress.env('BASE_URL_AGODA'));
        // Wait for the page to load
        cy.wait(1000);
    }
    selectFlightTab() {
        // Click on the Flight tab
        cy.xpath(element.flightTab).click();
        cy.wait(1000);
    }
    inputFlightDetails(
        inputOrigin = Cypress.env('AGODA_FLIGHT_ORIGIN'),
        inputDestination = Cypress.env('AGODA_FLIGHT_DESTINATION')
    ) {
        cy.xpath(element.flightOriginInput).type(inputOrigin);
        cy.wait(1000);
        cy.xpath(element.flightOptions).contains('Jakarta').click();
        cy.wait(1000);
        cy.xpath(element.flightDestinationInput).type(inputDestination);
        cy.wait(1000);
        cy.xpath(element.flightOptions).contains('Singapore').click();
        cy.wait(1000);
        cy.xpath(element.datePickerNextDay).click();
        cy.wait(1000);
        cy.xpath(element.searchButton).click();
    }
}

export default new HomePageAgoda();
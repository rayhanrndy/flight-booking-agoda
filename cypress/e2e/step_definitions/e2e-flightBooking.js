const { Given, When, Then } = require('cypress-cucumber-preprocessor/steps');
const HomePageAgoda = require('../../support/page-object/homePage')
const FlightList = require('../../support/page-object/flightList')
const DataPassenger = require('../../support/page-object/dataPassenger')

Given('the user is on the Agoda homepage', () => {
    cy.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    HomePageAgoda.visit();
})
When('the user selects the Flights tab', () => {
    HomePageAgoda.selectFlightTab();
})
When('the user searches for a flight from Origin to Destination for tomorrow', () => {
    HomePageAgoda.inputFlightDetails();
})
When('the user selects the earliest flight departure by Malaysia Airlines-Batik Air Malaysia-Jetstar Asia', () => {
    FlightList.sortByDepartureTime()
})
When('the user fills in the passenger details on the Passenger Detail page', () => {
    DataPassenger.fillPassengerDetails()
})
Then('the total price and passenger name should match on the Payment page', () => {
    cy.get('@passengerFirstName').then((firstName) => {
        cy.get('@passengerLastName').then((lastName) => {
            const fullName = `${firstName} ${lastName}`;

            cy.xpath(`//div[@data-component="passenger-summary-list"]//span[@data-component="name-container-name"]`, { timeout: 60000 })
                .should('be.visible') // pastikan terlihat
                .should('exist')
                .invoke('text')
                .then((displayedName) => {
                    expect(displayedName.trim()).to.equal(fullName);
                });

        });
    });

    cy.get('@totalPrice').then((totalPrice) => {
        cy.xpath(`//dd[@data-component="mob-flight-price-total-desc"]//span`)
            .should('be.visible') // pastikan elemen terlihat
            .invoke('text')
            .then((priceText) => {
                expect(priceText.trim()).to.include(totalPrice);
            });
    });

})
Then('the departure and arrival times should match the selected flight', () => {
    cy.get('@departureTime').then((departureTime) => {
        cy.xpath(`//span[@data-component="mob-flight-segment-departure"]`)
            .first()
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.contain(departureTime);
            });
    });

    cy.get('@arrivalTime').then((arrivalTime) => {
        cy.xpath(`//span[@data-component="mob-flight-segment-arrival"]`)
            .last()
            .should('be.visible')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.contain(arrivalTime);
            });
    });

})
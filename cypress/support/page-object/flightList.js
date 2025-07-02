const element = require('../element/agoda.json');

class FlightList {
    sortByDepartureTime() {
        // Click on the sort options
        cy.xpath(element.sortByButton).click({ force: true });
        cy.wait(2000);
        cy.xpath(element.sortByOptions).contains('Departure time').click();
        cy.wait(2000);
        cy.get('body').then(($body) => {
            let dataFlight = `//div[@data-testid='flightCard-flight-detail']`
            if ($body.text().includes('Malaysia Airlines')) {
                // Malaysia Airlines ditemukan
                cy.xpath(dataFlight).contains('Malaysia Airlines').first().click();
                cy.wait(2000);
                cy.xpath(dataFlight)
                    .contains('Malaysia Airlines')
                    .first()
                    .within(() => {
                        cy.xpath(`//div[@data-testid='departure-time']//p`)
                            .first()
                            .invoke('text')
                            .then((departureTime) => {
                                cy.wrap(departureTime.trim()).as('departureTime');
                            });
                        cy.xpath(`//div[@data-testid='departure-time']//p`)
                            .last()
                            .invoke('text')
                            .then((arrivalTime) => {
                                cy.wrap(arrivalTime.trim()).as('arrivalTime');
                            });
                    })
            } else if ($body.text().includes('Batik Air (Malaysia)')) {
                // Batik Air (Malaysia) tidak ditemukan, cek Batik Air (Malaysia)
                cy.xpath(dataFlight).contains('Batik Air (Malaysia)').first().click();
                cy.wait(2000);
                cy.xpath(dataFlight)
                    .contains('Batik Air (Malaysia)')
                    .first()
                    .within(() => {
                        cy.xpath(`//div[@data-testid='departure-time']//p`)
                            .first()
                            .invoke('text')
                            .then((departureTime) => {
                                cy.wrap(departureTime.trim()).as('departureTime');
                            });
                        cy.xpath(`//div[@data-testid='departure-time']//p`)
                            .last()
                            .invoke('text')
                            .then((arrivalTime) => {
                                cy.wrap(arrivalTime.trim()).as('arrivalTime');
                            });
                    })
            } else if ($body.text().includes('Jetstar Asia')) {
                // Jika keduanya tidak ada, cek Jetstar Asia
                cy.xpath(dataFlight).contains('Jetstar Asia').first().click();
                cy.wait(2000);
                cy.xpath(dataFlight)
                    .contains('Jetstar Asia')
                    .first()
                    .within(() => {
                        cy.xpath(`//div[@data-testid='departure-time']//p`)
                            .first()
                            .invoke('text')
                            .then((departureTime) => {
                                cy.wrap(departureTime.trim()).as('departureTime');
                            });
                        cy.xpath(`//div[@data-testid='departure-time']//p`)
                            .last()
                            .invoke('text')
                            .then((arrivalTime) => {
                                cy.wrap(arrivalTime.trim()).as('arrivalTime');
                            });
                    })
            } else {
                // Semua maskapai tidak tersedia
                cy.log('Tidak ada maskapai yang tersedia dari daftar.');
            }

        })
        cy.xpath(element.selectAirline).click();
    }
}

export default new FlightList();
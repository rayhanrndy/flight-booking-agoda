const element = require('../element/agoda.json');

class DataPassanger {
    fillPassengerDetails() {
        // Fill in passenger details
        cy.xpath(element.contactFirstName).type('John');
        cy.wait(1000);
        cy.xpath(element.contactLastName).type('Doe');
        cy.wait(1000);
        cy.xpath(element.contactEmail).type('johndoe12@mail.com');
        cy.wait(1000);
        cy.xpath(element.contactPhoneNumber).type('8123456789');
        cy.wait(1000);
        cy.xpath(element.passenggerGender).first().check().click()
        cy.xpath(element.passengerFirstName)
            .should('be.visible')     // elemen terlihat
            .should('exist')
            .type('John')
            .within(() => {
                cy.xpath(`//input[@id='contact.contactFirstName']`)
                    .invoke('val').then((firstName) => {
                        cy.wrap(firstName.trim()).as('passengerFirstName');
                    })
            })
        cy.wait(1000);
        cy.xpath(element.passengerLastName)
            .should('be.visible')     // elemen terlihat
            .should('exist')
            .type('Doe')
            .within(() => {
                cy.xpath(`//input[@id='contact.contactLastName']`)
                    .invoke('val').then((lastName) => {
                        cy.wrap(lastName.trim()).as('passengerLastName');
                    })
            })
        cy.wait(1000);
        cy.xpath(element.passengerBirthDate).type('10');
        cy.wait(1000);
        cy.xpath(element.passengerBirthMonth).eq(2).click();
        cy.wait(1000);
        cy.xpath(element.passengerBirthMonthSelect).eq(1).click();
        cy.wait(1000);
        cy.xpath(element.passengerBirthYear).type('2001');
        cy.wait(1000);
        cy.xpath(element.passengerBirthMonth).eq(3).click();
        cy.wait(1000);
        cy.xpath(element.selectNationality).type('Indo');
        cy.wait(1000);
        cy.xpath(element.passengerBirthMonthSelect).contains('Indonesia').click()
        cy.wait(1000);
        cy.xpath(element.passportNumber, { timeout: 3000 }).then(($el) => {
            if ($el.length > 0) {
                cy.wrap($el).type('A1234567');
                cy.xpath(element.passengerBirthMonth).eq(4).click();
                cy.xpath(element.selectNationality).type('Indo');
                cy.xpath(element.passengerBirthMonthSelect).contains('Indonesia').click()
                cy.xpath(element.passportExpiryDate).type('12');
                cy.xpath(element.passengerBirthMonth).eq(5).click();
                cy.xpath(element.passengerBirthMonthSelect).eq(4).click();
                cy.xpath(element.passportExpiryYear).type('2026').click();
                cy.xpath(element.addOnsButton).click();
                cy.xpath(element.addOnsButton).click();
            }
            else {
                cy.log('Element not found, filling passport details');
                cy.xpath(element.addOnsButton).click();
            }
        });

        cy.wait(2000);
        cy.xpath(element.protectionYesButton).click();
        cy.wait(2000);
        cy.xpath(`//div[@data-component="mob-flight-price-breakdown-wrapper"]`)
            .within(() => {
                cy.xpath(`//dd[@data-component='mob-flight-price-total-desc']//span`)
                    .invoke('text')
                    .then((totalPrice) => {
                        cy.wrap(totalPrice.trim()).as('totalPrice');
                    });
            })

        cy.xpath(element.paymentButton).click();
        cy.wait(4000);
        cy.xpath(element.declineInsuranceButton).then(($btn) => {
            if ($btn.length > 0 && $btn.is(':visible')) {
                const buttonText = $btn.text().trim();
                if (buttonText.includes('No, thanks')) {
                    cy.wrap($btn).click({ force: true });
                    cy.log('Popup found and dismissed.');
                } else {
                    cy.log('Button is visible but text does not match "No, thanks"');
                }
            } else {
                cy.log('Popup not present, continuing...');
            }
        });

        cy.wait(5000);
        cy.xpath(`//span[@data-component="mob-flight-slice-toggle-button"]`).click();
        cy.wait(5000)
    }
}

export default new DataPassanger();
# Agoda Flight Booking E2E Automation

Automated end-to-end testing of booking a flight on Agoda using **Cypress**, **Cucumber (Gherkin)**, and **Mochawesome reports**.

This project performs:
✅ Search flight from Jakarta to Singapore using priority Malaysia Airlines/Batik Air (Malaysia)/Jetstar Asia
✅ Select the earliest flight for tomorrow  
✅ Fill passenger details form  
✅ Assert passenger data, total price, departure & arrival times on payment page

---

## 🚀 Tools & Frameworks
- [Cypress](https://www.cypress.io/) for E2E automation
- [Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) for BDD style
- [Mochawesome](https://github.com/adamgruber/mochawesome) for HTML reporting
- [Dotenv](https://www.npmjs.com/package/dotenv) for managing environment configs

---

## 🛠 Installation
Clone this repo and install dependencies:
git clone https://github.com/your-username/agoda-flight-booking.git
cd agoda-flight-booking
npm install

---

## 🧪 How to run tests
### Run tests in interactive mode
npx cypress open
### Run tests headless
npm run test:cypress
### Generate HTML report
npm run report:generate
### Open HTML report
npm run report:open

---

## Video Report
![Videos](./cypress/videos/e2e-flightBooking.feature.mp4)

✍ Author
Rayhan Rendy
QA Automation Engineer

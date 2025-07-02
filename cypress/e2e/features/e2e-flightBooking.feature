Feature: Book a flight on Agoda.com

    Scenario: Book a flight from Jakarta to Singapore with Malaysia Airlines
        Given the user is on the Agoda homepage 
        When the user selects the Flights tab
        And the user searches for a flight from Origin to Destination for tomorrow        
        And the user selects the earliest flight departure by Malaysia Airlines-Batik Air Malaysia-Jetstar Asia
        And the user fills in the passenger details on the Passenger Detail page
        Then the total price and passenger name should match on the Payment page
        And the departure and arrival times should match the selected flight
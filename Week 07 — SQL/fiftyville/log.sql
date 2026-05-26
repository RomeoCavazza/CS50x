-- Keep a log of any SQL queries you execute as you solve the mystery.
-- Step 1: Crime Scene
SELECT description
FROM crime_scene_reports
WHERE day = 28 AND month = 7 AND year = 2025 AND street = 'Humphrey Street';
-- Output: Theft of the CS50 duck took place at 10:15am at the Humphrey Street bakery. Interviews were conducted today with three witnesses who were present at the time – each of their interview transcripts mentions the bakery. Littering took place at 16:36. No known witnesses.

-- Step 2: Witnesses
SELECT name, transcript
FROM interviews
WHERE day = 28 AND month = 7 AND year = 2025 AND transcript LIKE '%bakery%';
-- Output:
--   Ruth: Sometime within ten minutes of the theft, I saw the thief get into a car in the bakery parking lot and drive away. If you have security footage from the bakery parking lot, you might want to look for cars that left the parking lot in that time frame.
--   Eugene: I don't know the thief's name, but it was someone I recognized. Earlier this morning, before I arrived at Emma's bakery, I was walking by the ATM on Leggett Street and saw the thief there withdrawing some money.
--   Raymond: As the thief was leaving the bakery, they called someone who talked to them for less than a minute. In the call, I heard the thief say that they were planning to take the earliest flight out of Fiftyville tomorrow. The thief then asked the person on the other end of the phone to purchase the flight ticket.

-- Step 3: Earliest flight out of Fiftyville
SELECT city
FROM airports
WHERE id =
(
    SELECT destination_airport_id
    FROM flights
    WHERE year = 2025 AND month = 7 AND day = 29 AND origin_airport_id =
    (
        SELECT id
        FROM airports
        WHERE city = 'Fiftyville'
    )
    ORDER BY hour, minute
    LIMIT 1
);
-- Output: New York City

-- Step 4: Suspects
SELECT name
FROM people
JOIN passengers ON people.passport_number = passengers.passport_number
WHERE flight_id =
(
    SELECT id
    FROM flights
    WHERE year = 2025 AND month = 7 AND day = 29 AND origin_airport_id =
    (
        SELECT id
        FROM airports
        WHERE city = 'Fiftyville'
    )
    ORDER BY hour, minute
    LIMIT 1
)
INTERSECT
SELECT name
FROM people
JOIN bank_accounts ON people.id = bank_accounts.person_id
JOIN atm_transactions ON bank_accounts.account_number = atm_transactions.account_number
WHERE day = 28 AND month = 7 AND year = 2025 AND atm_location = 'Leggett Street' AND transaction_type = 'withdraw'
INTERSECT
SELECT name
FROM people
JOIN bakery_security_logs ON people.license_plate = bakery_security_logs.license_plate
WHERE day = 28 AND month = 7 AND year = 2025 AND hour = 10 AND minute BETWEEN 15 AND 25 AND activity = 'exit'
INTERSECT
SELECT name
FROM people
JOIN phone_calls ON people.phone_number = phone_calls.caller
WHERE day = 28 AND month = 7 AND year = 2025 AND duration < 60;
-- Ouput: Bruce

-- Step 5: Accomplice
SELECT name
FROM people
WHERE phone_number =
(
    SELECT receiver
    FROM phone_calls
    WHERE caller =
    (
        SELECT phone_number
        FROM people
        WHERE name = 'Bruce'
    )
    AND day = 28 AND month = 7 AND year = 2025 AND duration < 60
);
-- Output: Robin

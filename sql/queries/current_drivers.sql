SELECT
    driver.permanent_number AS driver_number,
    driver.name AS driver_name,
    country.name AS country_name,
    country.alpha2_code AS country_code,
    constructor.name AS team_name,
    driver.date_of_birth AS driver_birthday
FROM season_entrant_driver
INNER JOIN driver ON season_entrant_driver.driver_id = driver.id
INNER JOIN country ON driver.nationality_country_id = country.id
INNER JOIN constructor ON season_entrant_driver.constructor_id = constructor.id
WHERE
    season_entrant_driver.year = (SELECT strftime('%Y', 'now'))
    AND season_entrant_driver.test_driver = 0

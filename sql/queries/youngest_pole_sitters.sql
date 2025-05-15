WITH pole_position AS (
    SELECT
        combined_qualifying_result.*,
        Cast(
            (Julianday(race.date) - Julianday(driver.date_of_birth)) AS Integer
        ) AS age_in_days
    FROM (
        SELECT
            sprint_qualifying_result.*,
            'Sprint' AS format
        FROM sprint_qualifying_result
        UNION
        SELECT
            *, -- noqa: RF02
            'Race' AS format
        FROM qualifying_result
    ) AS combined_qualifying_result
    INNER JOIN race ON combined_qualifying_result.race_id = race.id
    INNER JOIN driver ON combined_qualifying_result.driver_id = driver.id
    WHERE combined_qualifying_result.position_number = 1
)

SELECT
    pole_position.format,
    driver.name AS driver,
    grand_prix.name || ' ' || race.year AS gp,
    Printf(
        '%d years, %d months, %d days',
        Cast(pole_position.age_in_days / 365.25 AS Int),
        Cast((pole_position.age_in_days % 365.25) / 30.44 AS Int),
        Cast((pole_position.age_in_days % 365.25) % 30.44 AS Int)
    ) AS age
FROM pole_position
INNER JOIN race ON pole_position.race_id = race.id
INNER JOIN grand_prix ON race.grand_prix_id = grand_prix.id
INNER JOIN driver ON pole_position.driver_id = driver.id
GROUP BY driver.id
ORDER BY pole_position.age_in_days ASC
LIMIT 10

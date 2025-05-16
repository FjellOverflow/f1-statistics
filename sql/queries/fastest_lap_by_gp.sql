SELECT
    fastest_lap.lap,
    fastest_lap.time,
    grand_prix.name || ' ' || race.year AS gp,
    driver.name || ' (' || constructor.name || ')' AS driver
FROM fastest_lap
INNER JOIN race ON fastest_lap.race_id = race.id
INNER JOIN driver ON fastest_lap.driver_id = driver.id
INNER JOIN constructor ON fastest_lap.constructor_id = constructor.id
INNER JOIN grand_prix ON race.grand_prix_id = grand_prix.id
WHERE (fastest_lap.race_id, fastest_lap.time) IN (
    SELECT
        fastest_lap.race_id,
        MIN(fastest_lap.time) AS time
    FROM fastest_lap
    GROUP BY fastest_lap.race_id
)

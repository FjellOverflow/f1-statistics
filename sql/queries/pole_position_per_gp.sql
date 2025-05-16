SELECT
    grand_prix.name || ' ' || race.year AS gp,
    driver.name || ' (' || constructor.name || ')' AS pole
FROM qualifying_result
INNER JOIN race ON qualifying_result.race_id = race.id
INNER JOIN driver ON qualifying_result.driver_id = driver.id
INNER JOIN constructor ON qualifying_result.constructor_id = constructor.id
INNER JOIN grand_prix ON race.grand_prix_id = grand_prix.id
WHERE qualifying_result.position_number = 1

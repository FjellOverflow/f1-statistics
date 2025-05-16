WITH podium AS (
    SELECT
        race_result.race_id,
        race_result.position_number,
        race_result.driver_id,
        race_result.constructor_id
    FROM race_result
    WHERE race_result.position_number IN (1, 2, 3)
)

SELECT
    grand_prix.name || ' ' || race.year AS gp,
    p1_driver.name || ' (' || p1_constructor.name || ')' AS p1,
    p2_driver.name || ' (' || p2_constructor.name || ')' AS p2,
    p3_driver.name || ' (' || p3_constructor.name || ')' AS p3
FROM race_result
INNER JOIN
    podium AS p1
    ON race_result.race_id = p1.race_id AND p1.position_number = 1
INNER JOIN
    podium AS p2
    ON race_result.race_id = p2.race_id AND p2.position_number = 2
INNER JOIN
    podium AS p3
    ON race_result.race_id = p3.race_id AND p3.position_number = 3
INNER JOIN race ON race_result.race_id = race.id
INNER JOIN driver AS p1_driver ON p1.driver_id = p1_driver.id
INNER JOIN
    constructor AS p1_constructor
    ON p1.constructor_id = p1_constructor.id
INNER JOIN driver AS p2_driver ON p2.driver_id = p2_driver.id
INNER JOIN
    constructor AS p2_constructor
    ON p2.constructor_id = p2_constructor.id
INNER JOIN driver AS p3_driver ON p3.driver_id = p3_driver.id
INNER JOIN
    constructor AS p3_constructor
    ON p3.constructor_id = p3_constructor.id
INNER JOIN grand_prix ON race.grand_prix_id = grand_prix.id
GROUP BY race_result.race_id

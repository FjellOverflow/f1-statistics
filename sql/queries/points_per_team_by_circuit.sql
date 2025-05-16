WITH current_constructors AS (
    SELECT constructor.*
    FROM season_constructor
    INNER JOIN constructor ON season_constructor.constructor_id = constructor.id
    WHERE season_constructor.year = (SELECT strftime('%Y', 'now'))
)

SELECT
    circuit.name AS circuit,
    current_constructors.name AS constructor,
    sum(race_result.points) AS points
FROM race_result
INNER JOIN race ON race_result.race_id = race.id
INNER JOIN
    current_constructors
    ON race_result.constructor_id = current_constructors.id
INNER JOIN circuit ON race.circuit_id = circuit.id
GROUP BY race.circuit_id, race_result.constructor_id
ORDER BY race.circuit_id ASC, points DESC

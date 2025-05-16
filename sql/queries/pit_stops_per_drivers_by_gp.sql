WITH pit_stops_per_race AS (
    SELECT
        pit_stop.race_id,
        count(*) AS pit_stops
    FROM pit_stop
    GROUP BY pit_stop.race_id, pit_stop.driver_id
)

SELECT
    pit_stops_per_race.pit_stops AS number_of_pitstops,
    grand_prix.name || ' ' || race.year AS gp,
    count(*) AS number_of_drivers
FROM pit_stops_per_race
INNER JOIN race ON pit_stops_per_race.race_id = race.id
INNER JOIN grand_prix ON race.grand_prix_id = grand_prix.id
GROUP BY race.year, race.grand_prix_id, pit_stops_per_race.pit_stops

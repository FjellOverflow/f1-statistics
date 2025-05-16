SELECT
    grand_prix.name || ' ' || race.year AS gp,
    count(*) AS dnfs
FROM race_result
INNER JOIN race ON race_result.race_id = race.id
INNER JOIN grand_prix ON race.grand_prix_id = grand_prix.id
WHERE
    race_result.position_number IS NULL
    AND race_result.position_text = 'DNF'
GROUP BY race.id
ORDER BY race.year

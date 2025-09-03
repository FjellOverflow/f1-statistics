WITH

current_driver_race_results AS (
    SELECT
        r.year,
        rr.race_id,
        rr.position_number,
        rr.driver_id,
        rr.constructor_id
    FROM race_result AS rr
    INNER JOIN race AS r ON rr.race_id = r.id
    WHERE rr.driver_id IN (
        SELECT season_driver.driver_id
        FROM season_driver
        WHERE
            season_driver.year = strftime('%Y', 'now')
            AND season_driver.total_race_starts != 0
    )
),

intra_team_comparison AS (
    SELECT
        r1.year,
        r1.race_id,
        r1.driver_id,
        CASE
            WHEN
                r2.position_number IS NULL
                OR r1.position_number < r2.position_number
                THEN 1
            ELSE 0
        END AS won
    FROM current_driver_race_results AS r1
    INNER JOIN
        race_result AS r2
        ON
            r1.race_id = r2.race_id
            AND r1.constructor_id = r2.constructor_id
            AND r1.driver_id != r2.driver_id
),

driver_wins AS (
    SELECT
        year,
        driver_id,
        sum(won) AS wins,
        count(*) AS total
    FROM intra_team_comparison
    GROUP BY driver_id, year
)

SELECT
    driver.abbreviation AS driver,
    driver_wins.year,
    driver_wins.total,
    round(1.0 * driver_wins.wins / driver_wins.total, 2) AS win_percentage
FROM driver_wins
INNER JOIN driver ON driver_wins.driver_id = driver.id
ORDER BY driver ASC, driver_wins.year ASC

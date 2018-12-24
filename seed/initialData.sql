INSERT INTO measures (name, description, unit)
VALUES ('weight', 'Body weight measured without shoes', 'kg');

INSERT INTO measurements (measure_id, date, value)
VALUES (1, now(), 66);

INSERT INTO exercises (name, description, equipment, type, measure)
VALUES ('squat', 'How low can you go...', 'none', 'full body', 'quantity'), 
('plank', 'Hold plank position...', 'none', 'full body', 'duration'), 
('side plank', 'Alternating sides, hold side plank', 'none', 'full body', 'duration');

INSERT INTO planned_workouts (name, exercise_id)
VALUES ('Session 1', 1), ('Session 1', 2), ('Session 1', 3);

INSERT INTO completed_workouts (exercise_id)
VALUES (1), (2);

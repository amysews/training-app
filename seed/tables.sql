CREATE TABLE measurements (
    id serial PRIMARY KEY NOT NULL,
    name text NOT NULL,
    description text,
    unit text
);

CREATE TABLE measurement_data (
    id serial PRIMARY KEY NOT NULL,
    measurement_id integer REFERENCES measurements(id),
    date timestamptz DEFAULT NOW() NOT NULL,
    value integer NOT NULL
);

CREATE TABLE exercises (
    id serial PRIMARY KEY NOT NULL,
    name text NOT NULL,
    description text,
    equipment text,
    type text,
    measure text
);

CREATE TABLE planned_workouts (
    id serial PRIMARY KEY NOT NULL,
    name text,
    description text,
    target_date timestamptz,
    exercise_id integer REFERENCES exercises(id),
    repetitions integer,
    sets integer,
    weight integer,
    duration integer
);

CREATE TABLE completed_workouts (
    id serial PRIMARY KEY NOT NULL,
    date timestamptz DEFAULT NOW() NOT NULL,
    exercise_id integer REFERENCES exercises(id),
    repetitions integer,
    sets integer,
    weight integer,
    duration integer
);
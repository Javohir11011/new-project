   CREATE TABLE IF not EXISTS categries (
                id serial PRIMARY KEY,
                name VARCHAR NOT NULL,
                description varchar NOT NULL,
                tag VARCHAR NOT NULL,
                create_at timestamp DEFAULT current_timestamp,
                uppdate_at timestamp DEFAULT current_timestamp
            )
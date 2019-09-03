-- queries necessary for creating psql tables

CREATE TABLE sneakers (
  sneaker_id SERIAL PRIMARY KEY,
  sneaker_name VARCHAR,
  tts_calc INTEGER
);

CREATE TABLE sneaker_data (
  sneaker_data_id SERIAL PRIMARY KEY,
  sneaker_id SERIAL REFERENCES sneakers(sneaker_id),
  tts_data INTEGER
);
-- queries necessary for creating psql tables

CREATE TABLE sneaker_sizing (
  data_key SERIAL PRIMARY KEY,
  sneaker_name VARCHAR,
  tts_data INTEGER
);
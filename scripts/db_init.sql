--
-- postgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: mmdb; Type: DATABASE; Schema: -; Owner: mmadmin
--

\connect mmdb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: snaker_sizing; Type: TABLE; Schema: public; Owner: stockxadmin
--

CREATE TABLE sneaker_sizing (
  data_key SERIAL PRIMARY KEY,
  sneaker_name VARCHAR,
  tts_data INTEGER
);


ALTER TABLE cards OWNER TO stockxadmin;


INSERT INTO sneaker_sizing
  (sneaker_name, tts_data)
  VALUES
    ('adidas Yeezy', 1),
    ('adidas Yeezy', 2),
    ('adidas Yeezy', 2),
    ('adidas Yeezy', 3),
    ('adidas Yeezy', 2),
    ('adidas Yeezy', 3),
    ('adidas Yeezy', 2),
    ('adidas Yeezy', 2),
    ('adidas Yeezy', 3),
    ('adidas Yeezy', 4),
    ('adidas Yeezy', 2),
    ('adidas Yeezy', 5),
    ('adidas Yeezy', 2),
    ('adidas Yeezy', 3);

--
-- Name: public; Type: ACL; Schema: -; Owner: stockxadmin
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM stockxadmin;
GRANT ALL ON SCHEMA public TO stockxadmin;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- postgreSQL database dump complete
--


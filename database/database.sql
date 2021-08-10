--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clients (
    "clientId" integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


--
-- Name: clients_clientId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."clients_clientId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: clients_clientId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."clients_clientId_seq" OWNED BY public.clients."clientId";


--
-- Name: operations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.operations (
    id integer NOT NULL,
    ammount integer NOT NULL,
    operation text NOT NULL,
    date date NOT NULL,
    description text NOT NULL,
    "clientId" integer NOT NULL
);


--
-- Name: operations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.operations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: operations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.operations_id_seq OWNED BY public.operations.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "clientId" integer NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: clients clientId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients ALTER COLUMN "clientId" SET DEFAULT nextval('public."clients_clientId_seq"'::regclass);


--
-- Name: operations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.operations ALTER COLUMN id SET DEFAULT nextval('public.operations_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: operations; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: clients_clientId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."clients_clientId_seq"', 2, true);


--
-- Name: operations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.operations_id_seq', 4, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 2, true);


--
-- Name: clients clients_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pk PRIMARY KEY ("clientId");


--
-- Name: operations operations_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.operations
    ADD CONSTRAINT operations_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);


--
-- Name: operations operations_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.operations
    ADD CONSTRAINT operations_fk0 FOREIGN KEY ("clientId") REFERENCES public.clients("clientId");


--
-- Name: sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY ("clientId") REFERENCES public.clients("clientId");


--
-- PostgreSQL database dump complete
--


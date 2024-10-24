--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2024-10-24 15:36:17

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
-- TOC entry 217 (class 1259 OID 65220)
-- Name: defibrillators; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.defibrillators (
    id integer NOT NULL,
    serial_number character varying(50),
    model character varying(50) DEFAULT 'Zoll AED+'::character varying,
    publicly_accessible boolean DEFAULT false,
    connected_to_ems boolean DEFAULT false,
    owner_id integer,
    installation_date date,
    last_service_date date,
    next_service_date date,
    location_address character varying(255)
);


ALTER TABLE public.defibrillators OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 65219)
-- Name: defibrillators_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.defibrillators_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.defibrillators_id_seq OWNER TO postgres;

--
-- TOC entry 3350 (class 0 OID 0)
-- Dependencies: 216
-- Name: defibrillators_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.defibrillators_id_seq OWNED BY public.defibrillators.id;


--
-- TOC entry 219 (class 1259 OID 65235)
-- Name: electrodes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.electrodes (
    id integer NOT NULL,
    defibrillator_id integer,
    serial_number character varying(50),
    type character varying(50),
    expiration_date date
);


ALTER TABLE public.electrodes OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 65234)
-- Name: electrodes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.electrodes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.electrodes_id_seq OWNER TO postgres;

--
-- TOC entry 3351 (class 0 OID 0)
-- Dependencies: 218
-- Name: electrodes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.electrodes_id_seq OWNED BY public.electrodes.id;


--
-- TOC entry 215 (class 1259 OID 65211)
-- Name: owners; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.owners (
    id integer NOT NULL,
    name character varying(255),
    address character varying(255)
);


ALTER TABLE public.owners OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 65210)
-- Name: owners_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.owners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.owners_id_seq OWNER TO postgres;

--
-- TOC entry 3352 (class 0 OID 0)
-- Dependencies: 214
-- Name: owners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.owners_id_seq OWNED BY public.owners.id;


--
-- TOC entry 3184 (class 2604 OID 65223)
-- Name: defibrillators id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.defibrillators ALTER COLUMN id SET DEFAULT nextval('public.defibrillators_id_seq'::regclass);


--
-- TOC entry 3188 (class 2604 OID 65238)
-- Name: electrodes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.electrodes ALTER COLUMN id SET DEFAULT nextval('public.electrodes_id_seq'::regclass);


--
-- TOC entry 3183 (class 2604 OID 65214)
-- Name: owners id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.owners ALTER COLUMN id SET DEFAULT nextval('public.owners_id_seq'::regclass);


--
-- TOC entry 3342 (class 0 OID 65220)
-- Dependencies: 217
-- Data for Name: defibrillators; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.defibrillators (id, serial_number, model, publicly_accessible, connected_to_ems, owner_id, installation_date, last_service_date, next_service_date, location_address) FROM stdin;
1	X12L580716	Zoll AED 3	t	t	1	\N	2024-01-10	2025-01-10	Trg kralja Tomislava 12
2	Y13H023789	Zoll AED 3	f	f	2	\N	\N	2025-03-15	Ante Šercera 4b, Dubrovnik
3	X13K634321	Zoll AED Pro	f	f	3	\N	2024-09-15	2025-09-15	Tisno BB, Opuzen
4	X07E114767	Zoll AED+	f	f	4	\N	2024-02-02	2025-02-02	Padre Perice 6, Dubrovnik"
5	X13H620715	Zoll AED+	f	t	5	2020-03-12	2024-03-12	2025-03-12	Avenija Gojka Šuška 1
6	X20K317210	Zoll AED 3	f	t	6	2020-04-03	2024-04-03	2025-04-03	Ulica Aleksandra Hondla 2/9, Zagreb
7	X17C903307	Zoll AED 3	t	t	7	\N	2024-09-29	2025-09-29	Trg Nevenke Topalušić 1, 10000 Zagreb
8	X14E676604	Zoll AED+	f	f	8	2014-10-17	2024-10-17	2025-10-17	Vinogradska 29, Zagreb
9	X14E677441	Zoll AED 3	f	f	8	2014-10-17	2024-10-17	2025-10-17	Vinogradska 29, Zagreb
10	X16H859351	Zoll AED 3	f	t	9	\N	2024-05-10	2025-05-10	Srebrnjak 100, Zagreb, Dnevna bolnica
\.


--
-- TOC entry 3344 (class 0 OID 65235)
-- Dependencies: 219
-- Data for Name: electrodes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.electrodes (id, defibrillator_id, serial_number, type, expiration_date) FROM stdin;
1	1	X12L580716_CPRD	CPR-D	2025-12-31
2	1	X12L580716_STATPAD	Stat Padz II	2026-06-30
3	2	Y13H023789_CPRD	CPR-D	2025-12-31
4	3	X13K634321_CPRD	CPR-D	2025-12-31
5	3	X13K634321_STATPAD	Stat Padz II	2026-06-30
6	4	X07E114767_CPRD	CPR-D	2025-12-31
7	5	X13H620715_CPRD	CPR-D	2025-12-31
8	6	X20K317210_CPRD	CPR-D	2025-12-31
9	7	X17C903307_CPRD	CPR-D	2025-12-31
10	8	X14E676604_CPRD	CPR-D	2025-12-31
11	9	X14E677441_CPRD	CPR-D	2025-12-31
12	10	X16H859351_CPRD	CPR-D	2025-12-31
\.


--
-- TOC entry 3340 (class 0 OID 65211)
-- Dependencies: 215
-- Data for Name: owners; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.owners (id, name, address) FROM stdin;
1	Nastavni zavod za hitnu medicinu Grada Zagreba	Heinzelova 88, Zagreb
2	Zavod za hitnu medicinu Dubrovačko-neretvanske županije	Ante Šercera 4b, Dubrovnik
3	HGSS - Stanica Dubrovnik	Liechtensteinov put 31A, Dubrovnik
4	Poliklinika "Dr. Brajčić"	Padre Perice 6, Dubrovnik
5	Ministarstvo unutarnjih poslova RH	Ilica 335, Zagreb
6	Kardian d.o.o.	Ulica Aleksandra Hondla 2/9, Zagreb
7	Ministarstvo hrvatskih branitelja	Trg Nevenke Topalušić 1, Zagreb
8	KBC "Sestre milosrdnice"	Vinogradska 29, Zagreb
9	Dječja bolnica Srebrnjak	Srebrnjak 100, Zagreb
\.


--
-- TOC entry 3353 (class 0 OID 0)
-- Dependencies: 216
-- Name: defibrillators_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.defibrillators_id_seq', 10, true);


--
-- TOC entry 3354 (class 0 OID 0)
-- Dependencies: 218
-- Name: electrodes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.electrodes_id_seq', 12, true);


--
-- TOC entry 3355 (class 0 OID 0)
-- Dependencies: 214
-- Name: owners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.owners_id_seq', 9, true);


--
-- TOC entry 3192 (class 2606 OID 65228)
-- Name: defibrillators defibrillators_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.defibrillators
    ADD CONSTRAINT defibrillators_pkey PRIMARY KEY (id);


--
-- TOC entry 3194 (class 2606 OID 65240)
-- Name: electrodes electrodes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.electrodes
    ADD CONSTRAINT electrodes_pkey PRIMARY KEY (id);


--
-- TOC entry 3190 (class 2606 OID 65218)
-- Name: owners owners_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_pkey PRIMARY KEY (id);


--
-- TOC entry 3195 (class 2606 OID 65229)
-- Name: defibrillators defibrillators_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.defibrillators
    ADD CONSTRAINT defibrillators_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.owners(id) ON DELETE CASCADE;


--
-- TOC entry 3196 (class 2606 OID 65241)
-- Name: electrodes electrodes_defibrillator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.electrodes
    ADD CONSTRAINT electrodes_defibrillator_id_fkey FOREIGN KEY (defibrillator_id) REFERENCES public.defibrillators(id) ON DELETE CASCADE;


-- Completed on 2024-10-24 15:36:18

--
-- PostgreSQL database dump complete
--


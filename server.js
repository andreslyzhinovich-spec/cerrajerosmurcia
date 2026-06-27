/* 
  Sitio local de cerrajería urgente en Murcia
  Ejecutar:
    node server.js
  Abrir:
    http://localhost:3000
    http://localhost:3000/barrios/cerrajero-barrio-del-carmen
*/

const http = require("http");

const PORT = process.env.PORT || 3000;
const HOST = "127.0.0.1";

const BRAND = {
  name: "CERRAJEROS MURCIA 24H",
  subName: "AbreExpress",
  topLine: "Cerrajero urgente, económico y 24 horas en Murcia",
  phone: "+34865443238",
  displayPhone: "865 443 238",
  whatsapp: "34662427513",
  whatsappUrl: "https://wa.me/34662427513",
  domain: "localhost:3000",
  logoAE: "/assets/logo-transparent.png",
  logo24: "/assets/logo-transparent.png"
};

const LOCATIONS = [
  {
    group: "Barrios de Murcia capital",
    name: "Barrio del Carmen",
    slug: "/barrios/cerrajero-barrio-del-carmen",
    type: "barrio",
    locality: "Barrio del Carmen",
    anchors: ["Estación de Tren Murcia-Del Carmen", "Jardín de Floridablanca"],
    lat: "[INSERT_LATITUDE_BARRIO_DEL_CARMEN]",
    lng: "[INSERT_LONGITUDE_BARRIO_DEL_CARMEN]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "Vista Alegre",
    slug: "/barrios/cerrajero-vista-alegre",
    type: "barrio",
    locality: "Vista Alegre",
    anchors: ["Hospital General Universitario Morales Meseguer"],
    lat: "[INSERT_LATITUDE_VISTA_ALEGRE]",
    lng: "[INSERT_LONGITUDE_VISTA_ALEGRE]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "Espinardo",
    slug: "/barrios/cerrajero-espinardo",
    type: "barrio",
    locality: "Espinardo",
    anchors: ["Campus de Espinardo de la Universidad de Murcia"],
    lat: "[INSERT_LATITUDE_ESPINARDO]",
    lng: "[INSERT_LONGITUDE_ESPINARDO]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "La Flota",
    slug: "/barrios/cerrajero-la-flota",
    type: "barrio",
    locality: "La Flota",
    anchors: ["Parque de las Tres Copas"],
    lat: "[INSERT_LATITUDE_LA_FLOTA]",
    lng: "[INSERT_LONGITUDE_LA_FLOTA]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "Infante Juan Manuel",
    slug: "/barrios/cerrajero-infante-juan-manuel",
    type: "barrio",
    locality: "Infante Juan Manuel",
    anchors: ["Río Segura", "Centro Comercial Centrofama"],
    lat: "[INSERT_LATITUDE_INFANTE_JUAN_MANUEL]",
    lng: "[INSERT_LONGITUDE_INFANTE_JUAN_MANUEL]"
  },
  {
    group: "Pueblos grandes y pedanías periféricas",
    name: "El Palmar",
    slug: "/pueblos/cerrajero-el-palmar",
    type: "pedanía",
    locality: "El Palmar",
    anchors: ["Hospital Clínico Universitario Virgen de la Arrixaca"],
    lat: "[INSERT_LATITUDE_EL_PALMAR]",
    lng: "[INSERT_LONGITUDE_EL_PALMAR]"
  },
  {
    group: "Pueblos grandes y pedanías periféricas",
    name: "Molina de Segura",
    slug: "/pueblos/cerrajero-molina-de-segura",
    type: "municipio",
    locality: "Molina de Segura",
    anchors: ["Centro Comercial Vega Plaza", "Avenida de Madrid"],
    lat: "[INSERT_LATITUDE_MOLINA_DE_SEGURA]",
    lng: "[INSERT_LONGITUDE_MOLINA_DE_SEGURA]"
  },
  {
    group: "Pueblos grandes y pedanías periféricas",
    name: "Alcantarilla",
    slug: "/pueblos/cerrajero-alcantarilla",
    type: "municipio",
    locality: "Alcantarilla",
    anchors: ["Base Aérea de Alcantarilla", "Museo de la Huerta"],
    lat: "[INSERT_LATITUDE_ALCANTARILLA]",
    lng: "[INSERT_LONGITUDE_ALCANTARILLA]"
  },
  {
    group: "Pueblos grandes y pedanías periféricas",
    name: "Puente Tocinos",
    slug: "/pueblos/cerrajero-puente-tocinos",
    type: "pedanía",
    locality: "Puente Tocinos",
    anchors: ["Zonas de la huerta tradicional de Murcia"],
    lat: "[INSERT_LATITUDE_PUENTE_TOCINOS]",
    lng: "[INSERT_LONGITUDE_PUENTE_TOCINOS]"
  },
  {
    group: "Pueblos grandes y pedanías periféricas",
    name: "Cabezo de Torres",
    slug: "/pueblos/cerrajero-cabezo-de-torres",
    type: "pedanía",
    locality: "Cabezo de Torres",
    anchors: ["Centro Comercial Nueva Condomina", "CC Thader"],
    lat: "[INSERT_LATITUDE_CABEZO_DE_TORRES]",
    lng: "[INSERT_LONGITUDE_CABEZO_DE_TORRES]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "Santa Eulalia",
    slug: "/barrios/cerrajero-santa-eulalia",
    type: "barrio",
    locality: "Santa Eulalia",
    anchors: ["Plaza de Santa Eulalia", "Universidad de Murcia - La Merced"],
    context: "casco histórico, edificios antiguos, apartamentos turísticos y comercios con mucha rotación de llaves",
    lat: "[INSERT_LATITUDE_SANTA_EULALIA]",
    lng: "[INSERT_LONGITUDE_SANTA_EULALIA]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "San Lorenzo",
    slug: "/barrios/cerrajero-san-lorenzo",
    type: "barrio",
    locality: "San Lorenzo",
    anchors: ["Plaza de San Lorenzo", "calles del centro histórico"],
    context: "calles céntricas, portales antiguos, viviendas reformadas y pequeños locales con cierres de uso diario",
    lat: "[INSERT_LATITUDE_SAN_LORENZO]",
    lng: "[INSERT_LONGITUDE_SAN_LORENZO]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "San Miguel",
    slug: "/barrios/cerrajero-san-miguel",
    type: "barrio",
    locality: "San Miguel",
    anchors: ["Plaza Circular", "zona de San Miguel"],
    context: "zona muy transitada con oficinas, pisos, comunidades y accesos que necesitan respuesta ágil",
    lat: "[INSERT_LATITUDE_SAN_MIGUEL]",
    lng: "[INSERT_LONGITUDE_SAN_MIGUEL]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "San Nicol\u00e1s",
    slug: "/barrios/cerrajero-san-nicolas",
    type: "barrio",
    locality: "San Nicol\u00e1s",
    anchors: ["Plaza de San Nicolás", "entorno del Malecón"],
    context: "viviendas del centro, comunidades con cerraduras antiguas y locales próximos a zonas de paso",
    lat: "[INSERT_LATITUDE_SAN_NICOL_S]",
    lng: "[INSERT_LONGITUDE_SAN_NICOL_S]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "San Pedro",
    slug: "/barrios/cerrajero-san-pedro",
    type: "barrio",
    locality: "San Pedro",
    anchors: ["Plaza de San Pedro", "Gran Vía"],
    context: "zona céntrica con comercio, pisos y portales donde conviene abrir sin dañar acabados",
    lat: "[INSERT_LATITUDE_SAN_PEDRO]",
    lng: "[INSERT_LONGITUDE_SAN_PEDRO]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "San Juan",
    slug: "/barrios/cerrajero-san-juan",
    type: "barrio",
    locality: "San Juan",
    anchors: ["Plaza de San Juan", "zona de la Catedral"],
    context: "calles peatonales, alojamientos, viviendas y negocios que requieren intervención discreta y limpia",
    lat: "[INSERT_LATITUDE_SAN_JUAN]",
    lng: "[INSERT_LONGITUDE_SAN_JUAN]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "San Bartolom\u00e9",
    slug: "/barrios/cerrajero-san-bartolome",
    type: "barrio",
    locality: "San Bartolom\u00e9",
    anchors: ["Plaza de las Flores", "Trapería"],
    context: "centro comercial y residencial con gran variedad de puertas, cerraduras y cierres metálicos",
    lat: "[INSERT_LATITUDE_SAN_BARTOLOM]",
    lng: "[INSERT_LONGITUDE_SAN_BARTOLOM]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "Catedral",
    slug: "/barrios/cerrajero-catedral-murcia",
    type: "barrio",
    locality: "Catedral",
    anchors: ["Catedral de Murcia", "Plaza del Cardenal Belluga"],
    context: "entorno histórico con viviendas, locales, alojamientos y accesos donde se necesita cuidado técnico",
    lat: "[INSERT_LATITUDE_CATEDRAL]",
    lng: "[INSERT_LONGITUDE_CATEDRAL]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "San Andr\u00e9s",
    slug: "/barrios/cerrajero-san-andres",
    type: "barrio",
    locality: "San Andr\u00e9s",
    anchors: ["Jardín del Malecón", "Plano de San Francisco"],
    context: "zona próxima al centro con comunidades, garajes, oficinas y viviendas de distintas épocas",
    lat: "[INSERT_LATITUDE_SAN_ANDR_S]",
    lng: "[INSERT_LONGITUDE_SAN_ANDR_S]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "San Ant\u00f3n",
    slug: "/barrios/cerrajero-san-anton",
    type: "barrio",
    locality: "San Ant\u00f3n",
    anchors: ["Jardín de la Seda", "zona San Antón"],
    context: "barrio residencial junto al centro con portales, garajes y viviendas familiares",
    lat: "[INSERT_LATITUDE_SAN_ANT_N]",
    lng: "[INSERT_LONGITUDE_SAN_ANT_N]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "Santa Mar\u00eda de Gracia",
    slug: "/barrios/cerrajero-santa-maria-de-gracia",
    type: "barrio",
    locality: "Santa Mar\u00eda de Gracia",
    anchors: ["Centro de Salud Santa María de Gracia", "Avenida Miguel de Cervantes"],
    context: "barriada residencial con comunidades, bajos comerciales y accesos de mucho uso",
    lat: "[INSERT_LATITUDE_SANTA_MAR_A_DE_GRACIA]",
    lng: "[INSERT_LONGITUDE_SANTA_MAR_A_DE_GRACIA]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "El Ranero",
    slug: "/barrios/cerrajero-el-ranero",
    type: "barrio",
    locality: "El Ranero",
    anchors: ["Jardín de la Pólvora", "Avenida Reino de Murcia"],
    context: "zona residencial con urbanizaciones, garajes, trasteros y viviendas familiares",
    lat: "[INSERT_LATITUDE_EL_RANERO]",
    lng: "[INSERT_LONGITUDE_EL_RANERO]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "San Basilio",
    slug: "/barrios/cerrajero-san-basilio",
    type: "barrio",
    locality: "San Basilio",
    anchors: ["Centro Comercial Carrefour Zaraiche", "Avenida Primero de Mayo"],
    context: "barrio con viviendas, comercios y entradas de garaje que suelen necesitar ajustes y cambios de bombín",
    lat: "[INSERT_LATITUDE_SAN_BASILIO]",
    lng: "[INSERT_LONGITUDE_SAN_BASILIO]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "La Fama",
    slug: "/barrios/cerrajero-la-fama",
    type: "barrio",
    locality: "La Fama",
    anchors: ["Jardín de La Fama", "Avenida de La Fama"],
    context: "zona de paso entre el centro y barrios residenciales con pisos, oficinas y comercios",
    lat: "[INSERT_LATITUDE_LA_FAMA]",
    lng: "[INSERT_LONGITUDE_LA_FAMA]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "Vistabella",
    slug: "/barrios/cerrajero-vistabella",
    type: "barrio",
    locality: "Vistabella",
    anchors: ["Hospital Reina Sofía", "Paseo del Malecón cercano"],
    context: "barrio residencial con portales, viviendas y locales cerca de servicios sanitarios y zonas verdes",
    lat: "[INSERT_LATITUDE_VISTABELLA]",
    lng: "[INSERT_LONGITUDE_VISTABELLA]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "La Paz",
    slug: "/barrios/cerrajero-la-paz-murcia",
    type: "barrio",
    locality: "La Paz",
    anchors: ["Jardín de La Paz", "Avenida de La Paz"],
    context: "zona residencial con comunidades, puertas antiguas y necesidades habituales de reparación",
    lat: "[INSERT_LATITUDE_LA_PAZ]",
    lng: "[INSERT_LONGITUDE_LA_PAZ]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "Santiago el Mayor",
    slug: "/barrios/cerrajero-santiago-el-mayor",
    type: "barrio",
    locality: "Santiago el Mayor",
    anchors: ["Ronda Sur", "estación y vías soterradas"],
    context: "barrio del sur con viviendas, comercios, garajes y accesos que requieren atención rápida",
    lat: "[INSERT_LATITUDE_SANTIAGO_EL_MAYOR]",
    lng: "[INSERT_LONGITUDE_SANTIAGO_EL_MAYOR]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "San P\u00edo X",
    slug: "/barrios/cerrajero-san-pio-x",
    type: "barrio",
    locality: "San P\u00edo X",
    anchors: ["Río Segura", "zona sur de Murcia"],
    context: "área residencial del sur con portales de comunidad, viviendas y bajos comerciales",
    lat: "[INSERT_LATITUDE_SAN_P_O_X]",
    lng: "[INSERT_LONGITUDE_SAN_P_O_X]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "Barriomar",
    slug: "/barrios/cerrajero-barriomar",
    type: "barrio",
    locality: "Barriomar",
    anchors: ["Ronda Sur", "Parque Metropolitano Oeste"],
    context: "zona con viviendas, locales y conexiones hacia el sur donde una puerta bloqueada necesita solución rápida",
    lat: "[INSERT_LATITUDE_BARRIOMAR]",
    lng: "[INSERT_LONGITUDE_BARRIOMAR]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "Buenos Aires",
    slug: "/barrios/cerrajero-buenos-aires-murcia",
    type: "barrio",
    locality: "Buenos Aires",
    anchors: ["Barrio del Carmen", "Río Segura"],
    context: "área próxima al Carmen con pisos, portales y locales de cercanía",
    lat: "[INSERT_LATITUDE_BUENOS_AIRES]",
    lng: "[INSERT_LONGITUDE_BUENOS_AIRES]"
  },
  {
    group: "Barrios de Murcia capital",
    name: "Nuestra Se\u00f1ora de la Fuensanta",
    slug: "/barrios/cerrajero-nuestra-senora-fuensanta",
    type: "barrio",
    locality: "Nuestra Se\u00f1ora de la Fuensanta",
    anchors: ["entorno del Carmen", "zona sur del casco urbano"],
    context: "zona residencial donde predominan comunidades, viviendas de uso diario y accesos que deben quedar seguros",
    lat: "[INSERT_LATITUDE_NUESTRA_SE_ORA_DE_LA_FUENSANTA]",
    lng: "[INSERT_LONGITUDE_NUESTRA_SE_ORA_DE_LA_FUENSANTA]"
  },
  {
    group: "Zonas de Murcia capital",
    name: "Ronda Sur",
    slug: "/zonas/cerrajero-ronda-sur",
    type: "zona",
    locality: "Ronda Sur",
    anchors: ["Avenida Ronda Sur", "Santiago el Mayor"],
    context: "eje importante de entrada y salida con viviendas, garajes, negocios y comunidades",
    lat: "[INSERT_LATITUDE_RONDA_SUR]",
    lng: "[INSERT_LONGITUDE_RONDA_SUR]"
  },
  {
    group: "Zonas de Murcia capital",
    name: "Juan Carlos I",
    slug: "/zonas/cerrajero-juan-carlos-i",
    type: "zona",
    locality: "Juan Carlos I",
    anchors: ["Avenida Juan Carlos I", "zona norte de Murcia"],
    context: "avenida moderna con oficinas, viviendas, garajes y urbanizaciones",
    lat: "[INSERT_LATITUDE_JUAN_CARLOS_I]",
    lng: "[INSERT_LONGITUDE_JUAN_CARLOS_I]"
  },
  {
    group: "Zonas de Murcia capital",
    name: "Juan de Borb\u00f3n",
    slug: "/zonas/cerrajero-juan-de-borbon",
    type: "zona",
    locality: "Juan de Borb\u00f3n",
    anchors: ["Avenida Juan de Borbón", "tranvía de Murcia"],
    context: "zona de expansión con comunidades, residenciales, trasteros y accesos de garaje",
    lat: "[INSERT_LATITUDE_JUAN_DE_BORB_N]",
    lng: "[INSERT_LONGITUDE_JUAN_DE_BORB_N]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "Churra",
    slug: "/pedanias/cerrajero-churra",
    type: "pedan\u00eda",
    locality: "Churra",
    anchors: ["Nueva Condomina", "CC Thader"],
    context: "pedanía muy conectada con zonas comerciales, urbanizaciones y viviendas familiares",
    lat: "[INSERT_LATITUDE_CHURRA]",
    lng: "[INSERT_LONGITUDE_CHURRA]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "El Puntal",
    slug: "/pedanias/cerrajero-el-puntal",
    type: "pedan\u00eda",
    locality: "El Puntal",
    anchors: ["Campus de Espinardo", "Avenida Juan Carlos I"],
    context: "zona cercana al campus y a áreas residenciales con alquileres, garajes y comunidades",
    lat: "[INSERT_LATITUDE_EL_PUNTAL]",
    lng: "[INSERT_LONGITUDE_EL_PUNTAL]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "Guadalupe",
    slug: "/pedanias/cerrajero-guadalupe",
    type: "pedan\u00eda",
    locality: "Guadalupe",
    anchors: ["Universidad Católica San Antonio", "Monasterio de Los Jerónimos"],
    context: "pedanía con viviendas familiares, estudiantes, comercios y urbanizaciones",
    lat: "[INSERT_LATITUDE_GUADALUPE]",
    lng: "[INSERT_LONGITUDE_GUADALUPE]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "Zarandona",
    slug: "/pedanias/cerrajero-zarandona",
    type: "pedan\u00eda",
    locality: "Zarandona",
    anchors: ["huerta de Murcia", "accesos hacia Puente Tocinos"],
    context: "zona de huerta y viviendas con cerraduras variadas, portales pequeños y casas unifamiliares",
    lat: "[INSERT_LATITUDE_ZARANDONA]",
    lng: "[INSERT_LONGITUDE_ZARANDONA]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "Beniaj\u00e1n",
    slug: "/pedanias/cerrajero-beniajan",
    type: "pedan\u00eda",
    locality: "Beniaj\u00e1n",
    anchors: ["Monte de Beniaján", "zona sur de Murcia"],
    context: "pedanía grande con viviendas, comercios, garajes y cierres de local",
    lat: "[INSERT_LATITUDE_BENIAJ_N]",
    lng: "[INSERT_LONGITUDE_BENIAJ_N]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "Algezares",
    slug: "/pedanias/cerrajero-algezares",
    type: "pedan\u00eda",
    locality: "Algezares",
    anchors: ["Santuario de la Fuensanta", "Monte El Valle"],
    context: "zona residencial junto a la sierra con casas, chalets y puertas de seguridad",
    lat: "[INSERT_LATITUDE_ALGEZARES]",
    lng: "[INSERT_LONGITUDE_ALGEZARES]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "Santo \u00c1ngel",
    slug: "/pedanias/cerrajero-santo-angel",
    type: "pedan\u00eda",
    locality: "Santo \u00c1ngel",
    anchors: ["Monte El Valle", "La Luz"],
    context: "zona residencial con chalets, viviendas familiares, garajes y accesos exteriores",
    lat: "[INSERT_LATITUDE_SANTO_NGEL]",
    lng: "[INSERT_LONGITUDE_SANTO_NGEL]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "La Alberca",
    slug: "/pedanias/cerrajero-la-alberca",
    type: "pedan\u00eda",
    locality: "La Alberca",
    anchors: ["Monte El Valle", "centro de La Alberca"],
    context: "pedanía residencial con comunidades, casas y negocios de proximidad",
    lat: "[INSERT_LATITUDE_LA_ALBERCA]",
    lng: "[INSERT_LONGITUDE_LA_ALBERCA]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "Aljucer",
    slug: "/pedanias/cerrajero-aljucer",
    type: "pedan\u00eda",
    locality: "Aljucer",
    anchors: ["huerta sur de Murcia", "Ronda Sur"],
    context: "pedanía con viviendas, casas de huerta, locales y accesos que mezclan cierres antiguos y modernos",
    lat: "[INSERT_LATITUDE_ALJUCER]",
    lng: "[INSERT_LONGITUDE_ALJUCER]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "Los Dolores",
    slug: "/pedanias/cerrajero-los-dolores-murcia",
    type: "pedan\u00eda",
    locality: "Los Dolores",
    anchors: ["zona este de Murcia", "Beniaján cercano"],
    context: "área residencial con casas, portales, pequeños comercios y garajes",
    lat: "[INSERT_LATITUDE_LOS_DOLORES]",
    lng: "[INSERT_LONGITUDE_LOS_DOLORES]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "Los Garres",
    slug: "/pedanias/cerrajero-los-garres",
    type: "pedan\u00eda",
    locality: "Los Garres",
    anchors: ["Garres y Lages", "Monte Miravete"],
    context: "zona de casas, viviendas familiares y accesos exteriores donde conviene reforzar seguridad",
    lat: "[INSERT_LATITUDE_LOS_GARRES]",
    lng: "[INSERT_LONGITUDE_LOS_GARRES]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "San Jos\u00e9 de la Vega",
    slug: "/pedanias/cerrajero-san-jose-de-la-vega",
    type: "pedan\u00eda",
    locality: "San Jos\u00e9 de la Vega",
    anchors: ["Beniaján", "Los Garres"],
    context: "pedanía residencial con viviendas de uso familiar y cierres de garaje",
    lat: "[INSERT_LATITUDE_SAN_JOS_DE_LA_VEGA]",
    lng: "[INSERT_LONGITUDE_SAN_JOS_DE_LA_VEGA]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "Torreag\u00fcera",
    slug: "/pedanias/cerrajero-torreaguera",
    type: "pedan\u00eda",
    locality: "Torreag\u00fcera",
    anchors: ["carretera de Alicante", "huerta este"],
    context: "zona con viviendas, comercios y cierres de local que requieren asistencia flexible",
    lat: "[INSERT_LATITUDE_TORREAG_ERA]",
    lng: "[INSERT_LONGITUDE_TORREAG_ERA]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "Monteagudo",
    slug: "/pedanias/cerrajero-monteagudo",
    type: "pedan\u00eda",
    locality: "Monteagudo",
    anchors: ["Castillo de Monteagudo", "zona nordeste de Murcia"],
    context: "pedanía con viviendas, casas, comercios y accesos de exterior",
    lat: "[INSERT_LATITUDE_MONTEAGUDO]",
    lng: "[INSERT_LONGITUDE_MONTEAGUDO]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "Llano de Brujas",
    slug: "/pedanias/cerrajero-llano-de-brujas",
    type: "pedan\u00eda",
    locality: "Llano de Brujas",
    anchors: ["huerta de Murcia", "Santa Cruz"],
    context: "zona de huerta con viviendas, casas, bajos comerciales y cerraduras diversas",
    lat: "[INSERT_LATITUDE_LLANO_DE_BRUJAS]",
    lng: "[INSERT_LONGITUDE_LLANO_DE_BRUJAS]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "Alquer\u00edas",
    slug: "/pedanias/cerrajero-alquerias",
    type: "pedan\u00eda",
    locality: "Alquer\u00edas",
    anchors: ["huerta este", "El Raal"],
    context: "pedanía con viviendas familiares, locales de barrio y accesos exteriores",
    lat: "[INSERT_LATITUDE_ALQUER_AS]",
    lng: "[INSERT_LONGITUDE_ALQUER_AS]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "Santa Cruz",
    slug: "/pedanias/cerrajero-santa-cruz-murcia",
    type: "pedan\u00eda",
    locality: "Santa Cruz",
    anchors: ["huerta de Murcia", "Llano de Brujas"],
    context: "zona residencial y de huerta con portales, casas y pequeños negocios",
    lat: "[INSERT_LATITUDE_SANTA_CRUZ]",
    lng: "[INSERT_LONGITUDE_SANTA_CRUZ]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "El Esparragal",
    slug: "/pedanias/cerrajero-el-esparragal",
    type: "pedan\u00eda",
    locality: "El Esparragal",
    anchors: ["zona norte", "Cabezo de Torres"],
    context: "pedanía con viviendas, naves pequeñas, garajes y puertas de exterior",
    lat: "[INSERT_LATITUDE_EL_ESPARRAGAL]",
    lng: "[INSERT_LONGITUDE_EL_ESPARRAGAL]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "Zeneta",
    slug: "/pedanias/cerrajero-zeneta",
    type: "pedan\u00eda",
    locality: "Zeneta",
    anchors: ["huerta este", "carreteras hacia Orihuela"],
    context: "pedanía con casas, comercios de proximidad y cierres de uso diario",
    lat: "[INSERT_LATITUDE_ZENETA]",
    lng: "[INSERT_LONGITUDE_ZENETA]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "Sangonera la Verde",
    slug: "/pedanias/cerrajero-sangonera-la-verde",
    type: "pedan\u00eda",
    locality: "Sangonera la Verde",
    anchors: ["carretera de Mazarrón", "zonas residenciales"],
    context: "pedanía grande con viviendas, chalets, garajes y negocios",
    lat: "[INSERT_LATITUDE_SANGONERA_LA_VERDE]",
    lng: "[INSERT_LONGITUDE_SANGONERA_LA_VERDE]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "Sangonera la Seca",
    slug: "/pedanias/cerrajero-sangonera-la-seca",
    type: "pedan\u00eda",
    locality: "Sangonera la Seca",
    anchors: ["zona oeste de Murcia", "accesos a autovía"],
    context: "zona con viviendas, talleres, naves y accesos exteriores",
    lat: "[INSERT_LATITUDE_SANGONERA_LA_SECA]",
    lng: "[INSERT_LONGITUDE_SANGONERA_LA_SECA]"
  },
  {
    group: "Pedan\u00edas cercanas de Murcia",
    name: "El Raal",
    slug: "/pedanias/cerrajero-el-raal",
    type: "pedan\u00eda",
    locality: "El Raal",
    anchors: ["huerta este", "Alquerías"],
    context: "pedanía de huerta con viviendas familiares, cierres de patio y portales pequeños",
    lat: "[INSERT_LATITUDE_EL_RAAL]",
    lng: "[INSERT_LONGITUDE_EL_RAAL]"
  }
];


const LOCAL_SEO = {};

function seoFor(loc) {
  const place = loc.name;
  const zoneType = loc.type === "pedanía" ? "pedanía" : (loc.type === "municipio" ? "municipio" : (loc.type === "zona" ? "zona" : "barrio"));
  const anchorText = loc.anchors.join(" y ");
  const context = loc.context || `${zoneType} de Murcia con viviendas, portales, comunidades, garajes y locales que pueden necesitar una asistencia de cerrajería rápida y cuidadosa`;
  const serviceWord = loc.type === "municipio" ? "Murcia y área metropolitana" : "Murcia ciudad";
  return {
    title: `Cerrajero en ${place} 24h | AbreExpress Murcia`,
    description: `Cerrajero en ${place} 24h. Cerrajeros urgentes y económicos para apertura de puertas, cambio de cerraduras, bombines y asistencia rápida en ${serviceWord}.`,
    h1: `Cerrajero en ${place} 24H`,
    kicker: `AbreExpress · cerrajeros urgentes en ${place}`,
    intro: `Servicio de cerrajero 24h en ${place} para aperturas urgentes, cambio de bombines, cerraduras bloqueadas, llaves partidas y reparaciones rápidas. Atención cercana de AbreExpress con llamadas directas al ${BRAND.displayPhone}.`,
    h2: `Cerrajeros en ${place}: urgentes, 24h y con trabajo limpio`,
    paragraphs: [
      `${place} es ${context}. En esta zona trabajamos cada aviso de cerrajería con una revisión previa de la puerta, el marco, el bombín y el escudo para elegir una solución segura y evitar intervenciones innecesarias.`,
      `Si buscas cerrajero en ${place}, cerrajeros en ${place}, cerrajero urgente o cerrajero 24h, AbreExpress puede ayudarte con puertas cerradas de golpe, llaves olvidadas por dentro, cilindros que no giran, cerraduras multipunto y accesos de comunidad que han quedado bloqueados.`,
      `También realizamos cambio de cerraduras en ${place}, sustitución de bombines, instalación de cilindros antibumping, reparación de pestillos, ajuste de cerraderos y revisión de puertas que rozan o no encajan bien. El objetivo es que la puerta vuelva a abrir y cerrar con seguridad desde la primera visita.`,
      `Para quienes buscan cerrajeros económicos en ${place}, priorizamos reparación, ajuste o apertura técnica cuando es viable. Cuando conviene sustituir una pieza, explicamos la opción básica y la opción de seguridad para que puedas decidir sin presión.`,
      `Cubrimos avisos cerca de ${anchorText} y calles próximas, tanto de día como de noche, fines de semana y festivos. El servicio está pensado para viviendas, comunidades, pisos de alquiler, locales, garajes, trasteros y cierres comerciales.`
    ],
    cards: [
      ["Apertura de puertas", `Apertura en ${place} para llaves dentro, puertas cerradas de golpe, vueltas de llave y cerraduras bloqueadas.`],
      ["Cambio de bombines", `Sustitución de cilindros básicos, antibumping, antitaladro y sistemas compatibles con viviendas y locales de ${place}.`],
      ["Cerrajero urgente 24h", `Atención rápida en ${place} durante el día, la noche, festivos y fines de semana.`],
      ["Cerrajeros económicos", "Soluciones proporcionadas: abrir, reparar, ajustar o cambiar solo lo necesario según el estado de la puerta."]
    ],
    faq: [
      [`¿Hay cerrajero 24h en ${place}?`, `Sí. AbreExpress atiende urgencias de cerrajería en ${place} durante las 24 horas para aperturas, cerraduras bloqueadas y cambios de bombín.`],
      [`¿Trabajáis apertura de puertas en ${place}?`, `Sí. Abrimos puertas cerradas de golpe, llaves por dentro y cerraduras atascadas, eligiendo la técnica más adecuada según el tipo de puerta.`],
      [`¿Puedo llamar directamente si necesito un cerrajero urgente?`, `Sí. El teléfono visible en la cabecera es ${BRAND.displayPhone}; también puedes usar WhatsApp para enviar ubicación y fotos de la cerradura.`],
      [`¿Hacéis cambio de cerraduras y bombines?`, `Sí. Instalamos bombines y cerraduras según la necesidad real: pérdida de llaves, alquiler nuevo, avería, intento de robo o mejora de seguridad.`]
    ],
    tags: seoBoosterTags(loc)
  };
}

const css = `
:root {
  --azul: #001f54;
  --azul-oscuro: #00163d;
  --rojo: #e50914;
  --rojo-oscuro: #b80008;
  --verde: #1fb55b;
  --whatsapp: #25d366;
  --gris: #f4f7fb;
  --blanco: #ffffff;
  --texto: #0f172a;
  --muted: #475569;
  --radio: 22px;
  --max: 1180px;
  --sombra: 0 18px 40px rgba(2, 8, 23, .18);
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  color: var(--texto);
  background:
    radial-gradient(circle at 0% 0%, rgba(0,22,61,.06), transparent 22%),
    radial-gradient(circle at 100% 18%, rgba(229,9,20,.07), transparent 24%),
    var(--gris);
  line-height: 1.6;
  padding-top: 114px;
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; }
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
.header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 90;
  display: flex;
  justify-content: center;
  background: rgba(255,255,255,.98);
  border-bottom: 1px solid rgba(15,23,42,.08);
  box-shadow: 0 10px 36px rgba(15,23,42,.12);
  backdrop-filter: blur(14px);
}
.header-inner {
  width: min(100%, var(--max));
  min-height: 104px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 10px 14px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}
.brand-logo {
  width: 84px;
  height: 84px;
  flex: 0 0 84px;
  display: grid;
  place-items: center;
  border-radius: 24px;
  background: #fff;
  border: 1px solid #e2e8f0;
  padding: 8px;
  box-shadow: 0 12px 30px rgba(15,23,42,.10);
  overflow: hidden;
}
.brand-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
.brand-copy {
  display: grid;
  gap: 2px;
  min-width: 0;
}
.brand-topline {
  color: var(--rojo);
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: .08em;
  font-size: clamp(.72rem, 2vw, .82rem);
}
.brand-name {
  color: var(--azul-oscuro);
  font-weight: 1000;
  line-height: .96;
  letter-spacing: -.06em;
  font-size: clamp(1.15rem, 5vw, 2.2rem);
}
.brand-subname {
  color: #475569;
  font-weight: 800;
  font-size: clamp(.74rem, 2.2vw, .95rem);
}
.header-phone-big {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--azul-oscuro);
  font-weight: 1000;
  font-size: clamp(1.25rem, 4vw, 2.3rem);
  letter-spacing: .06em;
  white-space: nowrap;
  padding: 8px 14px;
  border-radius: 18px;
  background: #fff;
  border: 3px solid var(--rojo);
  box-shadow: 0 10px 24px rgba(0,22,61,.12);
}
.header-actions {
  display: none;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.header-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 50px;
  padding: 12px 18px;
  border-radius: 999px;
  font-weight: 950;
  letter-spacing: -.02em;
  box-shadow: 0 12px 28px rgba(15,23,42,.12);
  border: 0;
}
.header-btn svg {
  width: 21px;
  height: 21px;
  fill: currentColor;
  flex: 0 0 21px;
}
.header-btn.call {
  background: linear-gradient(180deg, #2a67ff 0%, var(--azul) 100%);
  color: #fff;
}
.header-btn.wa {
  background: linear-gradient(180deg, #46e17d 0%, var(--whatsapp) 100%);
  color: #062313;
}
.hero {
  min-height: 78svh;
  padding: 46px 16px 150px;
  display: grid;
  place-items: center;
  text-align: center;
  color: var(--azul-oscuro);
  background:
    linear-gradient(rgba(255,255,255,.92), rgba(255,255,255,.96)),
    radial-gradient(circle at 16% 18%, rgba(229,9,20,.12), transparent 26%),
    radial-gradient(circle at 86% 22%, rgba(0,22,61,.10), transparent 24%),
    #ffffff;
  position: relative;
  overflow: hidden;
}
.hero:before {
  content: "";
  position: absolute;
  width: min(92vw, 600px);
  aspect-ratio: 1;
  border: 34px solid rgba(229,9,20,.12);
  border-radius: 50%;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.hero:after {
  content: "";
  position: absolute;
  inset: auto -12% -14% -12%;
  height: 190px;
  background: #f4f7fb;
  border-top: 6px solid var(--rojo);
  transform: rotate(-3deg);
}
.hero-bg-logo {
  position: absolute;
  width: min(72vw, 430px);
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: .14;
  filter: drop-shadow(0 24px 45px rgba(0,0,0,.35));
  pointer-events: none;
}
.hero-content {
  position: relative;
  z-index: 2;
  width: min(100%, 900px);
  display: grid;
  gap: 16px;
  justify-items: center;
}
.kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 16px;
  border-radius: 999px;
  background: var(--rojo);
  color: #fff;
  border: 1px solid rgba(184,0,8,.15);
  font-weight: 950;
  font-size: .95rem;
}
.hero h1 {
  margin: 0;
  font-size: clamp(2.25rem, 9vw, 5.2rem);
  line-height: .94;
  letter-spacing: -.075em;
  text-wrap: balance;
}
.hero p {
  max-width: 790px;
  margin: 0;
  font-size: clamp(1rem, 3.9vw, 1.24rem);
  color: #10233f;
  font-weight: 750;
}
.hero-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 9px;
  margin-top: 4px;
}
.hero-pill {
  padding: 9px 13px;
  border-radius: 999px;
  background: #fff;
  color: var(--azul-oscuro);
  border: 2px solid var(--azul-oscuro);
  font-weight: 950;
  font-size: .9rem;
}
.local-hero .hero-content { margin-top: -10px; }
.actions {
  position: fixed;
  z-index: 100;
  left: 50%;
  bottom: calc(12px + env(safe-area-inset-bottom));
  transform: translateX(-50%);
  width: min(96vw, 980px);
  display: grid;
  gap: 12px;
}
.cta {
  min-height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 26px;
  font-weight: 950;
  letter-spacing: -.02em;
  box-shadow: 0 18px 42px rgba(15,23,42,.22);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  overflow: hidden;
}
.cta:before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(255,255,255,.16), transparent 40%, rgba(255,255,255,.06));
  pointer-events: none;
}
.cta svg {
  width: 28px;
  height: 28px;
  fill: currentColor;
  flex: 0 0 28px;
  position: relative;
  z-index: 1;
}
.cta-copy {
  display: grid;
  gap: 3px;
  text-align: left;
  position: relative;
  z-index: 1;
}
.cta-copy strong {
  font-size: clamp(1.08rem, 4.2vw, 1.28rem);
  line-height: 1;
}
.cta-copy small {
  font-size: .86rem;
  font-weight: 800;
  opacity: .95;
}
.cta-call {
  background: linear-gradient(180deg, #2e71ff 0%, var(--azul) 100%);
  color: #fff;
}
.cta-whatsapp {
  background: linear-gradient(180deg, #46e17d 0%, var(--whatsapp) 100%);
  color: #062313;
}
.content {
  padding: 52px 16px 188px;
}
.section {
  width: min(100%, var(--max));
  margin: 0 auto 26px;
  padding: clamp(22px, 4vw, 34px);
  background: rgba(255,255,255,.97);
  border-radius: 30px;
  box-shadow: 0 14px 38px rgba(15, 23, 42, .08);
  border: 1px solid rgba(226,232,240,.94);
}
.section h2 {
  margin: 0 0 14px;
  color: var(--azul-oscuro);
  font-size: clamp(1.45rem, 5vw, 2.15rem);
  line-height: 1.08;
  letter-spacing: -.045em;
}
.section p { margin: 0 0 15px; }
.section ul { padding-left: 18px; margin: 14px 0 0; }
.section li { margin-bottom: 10px; }
.section strong { color: var(--azul); }
.trust-grid,
.service-grid {
  display: grid;
  gap: 14px;
  margin-top: 18px;
}
.card {
  padding: 18px;
  border-radius: 22px;
  background: linear-gradient(180deg, #fff, #f8fbff);
  border: 1px solid #dbe7ff;
}
.card h3 {
  margin: 0 0 8px;
  color: var(--azul-oscuro);
  font-size: 1.08rem;
}
.card p { margin: 0; color: var(--muted); font-weight: 650; }
.keyword-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 18px;
}
.keyword-strip span {
  display: inline-flex;
  padding: 8px 11px;
  border-radius: 999px;
  background: #eef4ff;
  color: var(--azul);
  border: 1px solid #dbe7ff;
  font-weight: 850;
  font-size: .9rem;
}
.zone-grid {
  display: grid;
  gap: 10px;
  margin-top: 18px;
}
.zone-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 16px 16px;
  border-radius: 18px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: var(--azul-oscuro);
  font-weight: 900;
  transition: transform .16s ease, border-color .16s ease, box-shadow .16s ease;
}
.zone-link:hover {
  transform: translateY(-2px);
  border-color: rgba(255,43,43,.24);
  box-shadow: 0 12px 24px rgba(15,23,42,.08);
}
.zone-link span {
  color: #64748b;
  font-weight: 700;
  font-size: .92rem;
  text-align: right;
}
.table-scroll {
  width: 100%;
  overflow-x: auto;
  border-radius: 18px;
  border: 1px solid #e2e8f0;
}
table {
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
  background: white;
}
th, td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: top;
}
th {
  background: var(--azul-oscuro);
  color: white;
  font-size: .95rem;
}
tr:last-child td { border-bottom: 0; }
.notice {
  margin-top: 16px;
  padding: 16px;
  border-radius: 16px;
  background: #fff1f2;
  color: #6b0208;
  font-weight: 900;
  border: 1px solid #fecdd3;
}
.faq-item {
  padding: 18px 0;
  border-top: 1px solid #e2e8f0;
}
.faq-item:first-child { border-top: 0; padding-top: 0; }
.faq-item h3 {
  margin: 0 0 6px;
  color: var(--azul-oscuro);
  font-size: 1.08rem;
}
.footer {
  padding: 34px 16px 196px;
  background: var(--azul-oscuro);
  color: rgba(255,255,255,.84);
  text-align: center;
}
.footer strong { color: var(--blanco); }
.footer .footer-phone { color: #fff; font-size: 1.15rem; font-weight: 950; }
@media (min-width: 760px) {
  body { padding-top: 122px; }
  .header-actions { display: flex; }
  .actions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    bottom: 24px;
  }
  .service-grid,
  .trust-grid,
  .zone-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 980px) {
  .service-grid,
  .trust-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
@media (max-width: 759px) {
  body { padding-top: 150px; }
  .header-inner { min-height: 140px; flex-wrap: wrap; justify-content: center; gap: 8px 12px; }
  .brand { width: 100%; justify-content: center; }
  .brand-logo { width: 70px; height: 70px; flex-basis: 70px; }
  .brand-name { font-size: clamp(1.05rem, 6vw, 1.55rem); }
  .brand-subname { display: none; }
  .header-phone-big { width: min(100%, 360px); font-size: clamp(1.45rem, 9vw, 2.15rem); }
}
`;


function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (char) {
    return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char];
  });
}

function iconPhone() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.3.56 3.53.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.22.19 2.41.56 3.53a1 1 0 0 1-.25 1.01l-2.19 2.25z"/></svg>`;
}

function iconWhatsApp() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.8 11.8 0 0 0 12.06 0C5.53 0 .19 5.34.19 11.88c0 2.09.55 4.14 1.59 5.95L0 24l6.35-1.67a11.79 11.79 0 0 0 5.71 1.46h.01c6.53 0 11.87-5.34 11.87-11.88 0-3.17-1.23-6.14-3.42-8.43zM12.07 21.8a9.92 9.92 0 0 1-5.06-1.39l-.36-.21-3.77.99 1-3.68-.23-.38a9.9 9.9 0 0 1-1.52-5.25c0-5.48 4.46-9.94 9.95-9.94 2.66 0 5.16 1.03 7.03 2.91a9.85 9.85 0 0 1 2.9 7.03c0 5.48-4.47 9.94-9.94 9.94zm5.45-7.4c-.3-.15-1.77-.88-2.04-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.17.2-.35.23-.65.08-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.5-1.8-1.67-2.1-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.65-.93-2.27-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.12 3.24 5.14 4.54.72.31 1.29.5 1.73.64.73.23 1.4.2 1.92.12.59-.09 1.77-.72 2.02-1.42.25-.69.25-1.28.18-1.41-.08-.12-.28-.2-.58-.35z"/></svg>`;
}

function pageKeywords(loc) {
  const base = [
    'cerrajero Murcia',
    'cerrajeros Murcia',
    'cerrajero 24h Murcia',
    'cerrajero urgente Murcia',
    'cerrajeros urgentes Murcia',
    'cerrajero económico Murcia',
    'cerrajeros económicos Murcia',
    'apertura de puertas Murcia',
    'cambio de cerraduras Murcia',
    'cambio de bombines Murcia'
  ];
  if (!loc) return base.join(', ');
  const n = loc.name;
  return Array.from(new Set(base.concat([
    `cerrajero en ${n}`,
    `cerrajeros en ${n}`,
    `cerrajero ${n}`,
    `cerrajero 24h en ${n}`,
    `cerrajeros 24h en ${n}`,
    `cerrajero urgente en ${n}`,
    `cerrajeros urgentes en ${n}`,
    `cerrajero económico en ${n}`,
    `cerrajeros económicos en ${n}`,
    `apertura de puertas en ${n}`,
    `cambio de cerraduras en ${n}`,
    `cambio de bombines en ${n}`,
    `cerrajería urgente ${n}`,
    `cerrajería 24 horas ${n}`
  ]))).join(', ');
}

function seoBoosterTags(loc) {
  const n = loc.name;
  return Array.from(new Set([
    `cerrajero en ${n}`,
    `cerrajeros en ${n}`,
    `cerrajero 24h en ${n}`,
    `cerrajeros 24h en ${n}`,
    `cerrajero urgente en ${n}`,
    `cerrajeros urgentes en ${n}`,
    `cerrajero económico en ${n}`,
    `cerrajeros económicos en ${n}`,
    `apertura de puertas en ${n}`,
    `cambio de cerraduras en ${n}`,
    `cambio de bombines en ${n}`,
    `bombines antibumping ${n}`
  ]));
}

function seoBoosterCopy(loc) {
  const name = escapeHtml(loc.name);
  const anchors = escapeHtml(loc.anchors.join(', '));
  return `
    <p>Si estás buscando <strong>cerrajero en ${name}</strong>, <strong>cerrajeros en ${name}</strong>, <strong>cerrajero 24h en ${name}</strong> o <strong>cerrajero urgente en ${name}</strong>, AbreExpress trabaja con un enfoque claro: llegar rápido, revisar la incidencia y ofrecer una solución real para aperturas de puertas, bombines dañados, cerraduras atascadas y cambios de seguridad.</p>
    <p>Muchos clientes también comparan opciones de <strong>cerrajero económico en ${name}</strong> o <strong>cerrajeros económicos en ${name}</strong>. Por eso priorizamos primero la alternativa más rentable y segura: apertura sin rotura cuando es viable, reparación del resbalón o ajuste del cerradero, y cambio solo del bombín o la cerradura cuando la avería realmente lo exige.</p>
    <p>Nuestro servicio de <strong>cerrajería 24 horas en ${name}</strong> cubre viviendas, locales, comunidades, oficinas, pisos de alquiler y pequeñas urgencias comerciales. Además de atender búsquedas como <strong>apertura de puertas en ${name}</strong> o <strong>cambio de cerraduras en ${name}</strong>, nos desplazamos con rapidez por ${anchors} y zonas cercanas para que el cliente tenga una respuesta urgente, profesional y con orientación previa.</p>`;
}

function actionButtons() {
  return `
    <div class="actions" aria-label="Acciones urgentes de contacto">
      <a class="cta cta-call" href="tel:${BRAND.phone}" aria-label="Llamar ahora a AbreExpress cerrajero urgente 24 horas">
        ${iconPhone()}
        <span class="cta-copy"><strong>Llamar ahora</strong><small>${BRAND.displayPhone} · Cerrajero 24h en Murcia</small></span>
      </a>
      <a class="cta cta-whatsapp" href="${BRAND.whatsappUrl}" aria-label="Contactar por WhatsApp con AbreExpress cerrajero urgente">
        ${iconWhatsApp()}
        <span class="cta-copy"><strong>WhatsApp</strong><small>Respuesta rápida de AbreExpress</small></span>
      </a>
    </div>`;
}



function layout({ title, description, path, body, schema = "", keywords = "" }) {
  const canonical = `http://${BRAND.domain}${path}`;
  const logoForHeader = BRAND.logo24 || BRAND.logoAE || "";
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="keywords" content="${escapeHtml(keywords)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="theme-color" content="#ffffff">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_ES">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <link rel="canonical" href="${canonical}">
  <style>${css}</style>
  ${schema}
</head>
<body>
  <header class="header" aria-label="Cabecera principal">
    <div class="top-strip">
      <div class="top-strip-inner">
        <span class="top-strip-note">Urgencias 24h en Murcia · Aperturas y cerraduras</span>
        <a class="top-strip-phone" href="tel:${BRAND.phone}" aria-label="Llamar al ${BRAND.displayPhone}">${BRAND.displayPhone}</a>
      </div>
    </div>
    <div class="header-shell">
      <div class="header-inner">
        <a class="brand" href="/" aria-label="Volver al inicio de AbreExpress">
          <span class="brand-logo">
            ${logoForHeader ? `<img src="${logoForHeader}" alt="Logo de AbreExpress cerrajeros Murcia 24h">` : ""}
          </span>
          <span class="brand-copy">
            <span class="brand-topline">${BRAND.subName || 'AbreExpress'}</span>
            <span class="brand-name">${BRAND.name}</span>
            <span class="brand-subname">${BRAND.topLine}</span>
          </span>
        </a>
        <div class="header-actions" aria-label="Atajos de contacto">
          <a class="header-btn call" href="tel:${BRAND.phone}" aria-label="Llamar ahora a ${BRAND.subName || BRAND.name}">${iconPhone()}Llamar ahora</a>
          <a class="header-btn wa" href="${BRAND.whatsappUrl}" aria-label="Escribir por WhatsApp a ${BRAND.subName || BRAND.name}">${iconWhatsApp()}WhatsApp</a>
        </div>
      </div>
    </div>
  </header>
  ${body}
  ${actionButtons()}
  <footer class="footer">
    <p><strong>${BRAND.subName || 'AbreExpress'}</strong> · ${BRAND.name}</p>
    <p class="footer-phone">Teléfono central: ${BRAND.displayPhone}</p>
    <p>Servicio de cerrajería urgente, 24h, económico y transparente en Murcia, barrios, pedanías y municipios cercanos.</p>
  </footer>
</body>
</html>`;
}




function homePage() {
  const locationLinks = LOCATIONS.map(loc => `
    <a class="zone-link" href="${loc.slug}">
      ${escapeHtml(loc.name)}
      <span>${escapeHtml(loc.anchors.join(" / "))}</span>
    </a>`).join("");

  return layout({
    title: `Cerrajeros Murcia 24h urgentes y económicos | ${BRAND.subName || BRAND.name}`,
    description: "Cerrajero Murcia 24h con AbreExpress. Cerrajeros urgentes, económicos y rápidos para apertura de puertas, cambio de bombines y cerraduras en barrios y pedanías de Murcia.",
    keywords: pageKeywords(),
    path: "/",
    body: `
      <main>
        <section class="hero" aria-labelledby="hero-title">
          ${BRAND.logo24 ? `<img class="hero-bg-logo" src="${BRAND.logo24}" alt="">` : ""}
          <div class="hero-content">
            <span class="kicker">${BRAND.subName || 'AbreExpress'} · servicio urgente en Murcia</span>
            <h1 id="hero-title">Cerrajeros Murcia 24h urgentes y económicos</h1>
            <p>AbreExpress abre puertas, cambia bombines y repara cerraduras en Murcia capital, barrios, pedanías y municipios cercanos. Si necesitas un cerrajero urgente, económico y rápido, puedes llamar ahora o escribir por WhatsApp.</p>
            <div class="hero-pills" aria-label="Ventajas principales">
              <span class="hero-pill">24h / 365 días</span>
              <span class="hero-pill">Apertura sin romper</span>
              <span class="hero-pill">Orientación previa</span>
              <span class="hero-pill">Murcia y alrededores</span>
            </div>
          </div>
        </section>

        <section class="content" aria-label="Información de cerrajería urgente en Murcia">
          <article class="section">
            <h2>Cerrajero urgente 24h en Murcia con AbreExpress</h2>
            <p>Somos cerrajeros en Murcia para avisos urgentes y trabajos programados: apertura de puertas, cambio de bombines, cerraduras atascadas, llaves partidas, puertas blindadas y cierres comerciales.</p>
            <p>Trabajamos con un enfoque claro: revisar la puerta, explicar la solución y confirmar el servicio antes de empezar. Cuando la cerradura lo permite, priorizamos aperturas limpias y opciones económicas para evitar daños o cambios innecesarios.</p>
            <div class="keyword-strip">
              <span>cerrajero Murcia 24h</span>
              <span>cerrajeros en Murcia</span>
              <span>cerrajero urgente Murcia</span>
              <span>cerrajeros económicos Murcia</span>
              <span>apertura de puertas Murcia</span>
              <span>cambio de cerraduras Murcia</span>
            </div>
          </article>

          <article class="section">
            <h2>Servicios de cerrajería más solicitados</h2>
            <div class="service-grid">
              <article class="card"><h3>Apertura de puertas</h3><p>Puertas cerradas de golpe, llaves dentro, vueltas de llave y accesos bloqueados, buscando siempre la técnica menos invasiva.</p></article>
              <article class="card"><h3>Cambio de bombines</h3><p>Bombines económicos, cilindros antibumping, antitaladro y antiextracción para viviendas, pisos de alquiler y negocios.</p></article>
              <article class="card"><h3>Cerrajero urgente 24h</h3><p>Atención de día, noche, fines de semana y festivos en Murcia capital, barrios, pedanías y municipios cercanos.</p></article>
              <article class="card"><h3>Reparación de cerraduras</h3><p>Ajuste de cerraderos, manillas, pestillos, cerraduras duras, puertas que rozan y daños tras intentos de robo.</p></article>
            </div>
          </article>

          <article class="section">
            <h2>Zonas de actuación</h2>
            <p>Hemos preparado páginas locales originales para cada barrio y pedanía con información específica de servicios, urgencias y búsquedas frecuentes como cerrajero en cada zona, cerrajeros 24h, aperturas urgentes y cambios de cerradura.</p>
            <div class="zone-grid">${locationLinks}</div>
          </article>

          <article class="section">
            <h2>Por qué llamar a AbreExpress</h2>
            <div class="trust-grid">
              <article class="card"><h3>Diagnóstico claro</h3><p>Revisamos la incidencia y explicamos la solución antes de empezar.</p></article>
              <article class="card"><h3>Sin sorpresas</h3><p>Comentamos la intervención y las piezas necesarias antes de tocar la cerradura.</p></article>
              <article class="card"><h3>Opciones económicas</h3><p>Reparamos o abrimos sin sustituir cuando es una opción segura y viable.</p></article>
              <article class="card"><h3>Marca local</h3><p>AbreExpress está enfocado en Murcia, barrios cercanos y asistencia rápida de proximidad.</p></article>
            </div>
          </article>
        </section>
      </main>`
  });
}


function reassuranceSection(locationName) {
  return `
    <section class="section" aria-labelledby="trabajo-claro-${escapeHtml(locationName)}">
      <h2 id="trabajo-claro-${escapeHtml(locationName)}">Cómo trabaja AbreExpress en ${escapeHtml(locationName)}</h2>
      <p>Antes de intervenir revisamos la puerta, el bombín, el escudo, el marco y el tipo de cierre. Así podemos explicar qué ocurre y qué solución tiene más sentido para abrir, reparar o cambiar la cerradura.</p>
      <p>Siempre buscamos una actuación limpia: apertura técnica cuando es posible, reparación si la pieza sigue siendo segura y sustitución solo cuando el mecanismo está dañado, perdido, forzado o ya no protege bien el acceso.</p>
      <p class="notice">Llama al <strong>${BRAND.displayPhone}</strong> o escribe por WhatsApp. AbreExpress atiende cerrajería urgente 24h en Murcia con trato claro desde el primer contacto.</p>
    </section>`;
}


function schemaFor(loc) {
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Locksmith",
    "@id": `http://${BRAND.domain}${loc.slug}#localbusiness`,
    "name": `${BRAND.subName || 'AbreExpress'} - Cerrajeros Murcia 24H`,
    "url": `http://${BRAND.domain}${loc.slug}`,
    "image": `http://${BRAND.domain}/assets/logo-cerrajeros-24h.png`,
    "logo": `http://${BRAND.domain}/assets/logo-cerrajeros-24h.png`,
    "telephone": BRAND.phone,
    "description": `Cerrajero urgente 24h en ${loc.name}, Murcia. Cerrajeros para apertura de puertas, cambio de bombines, reparación de cerraduras y asistencia rápida junto a ${loc.anchors.join(" y ")}.`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[INSERT_STREET_ADDRESS_HERE]",
      "addressLocality": loc.locality,
      "addressRegion": "Murcia",
      "postalCode": "[INSERT_POSTAL_CODE_HERE]",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": loc.lat,
      "longitude": loc.lng
    },
    "areaServed": [
      { "@type": "Place", "name": `${loc.name}, Murcia` },
      ...loc.anchors.map(anchor => ({ "@type": "Place", "name": anchor }))
    ],
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Servicios de cerrajería en ${loc.name}`,
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": `Apertura de puertas en ${loc.name}` } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": `Cambio de bombines en ${loc.name}` } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": `Cerrajero urgente 24h en ${loc.name}` } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": `Reparación de cerraduras en ${loc.name}` } }
      ]
    }
  }, null, 2)}</script>`;
}

function barrioDelCarmenPage(loc) {
  return layout({
    title: "Cerrajero 24h en Barrio del Carmen | Llegamos en 20 Min",
    description: "¿Llaves dentro? 🔑 Cerrajeros de urgencia 24 horas en Barrio del Carmen. Aperturas económicas sin romper. ¡Llama ya!",
    path: loc.slug,
    schema: schemaFor(loc),
    body: `
      <main>
        <section class="hero local-hero" aria-labelledby="hero-title">
          ${BRAND.logo24 ? `<img class="hero-bg-logo" src="${BRAND.logo24}" alt="">` : ""}
          <div class="hero-content">
            <h1 id="hero-title">Cerrajero urgente 24h en Barrio del Carmen</h1>
            <p>Cerrajero 24h disponible ahora en Barrio del Carmen. Llegada rápida junto a la Estación de Tren Murcia-Del Carmen y el Jardín de Floridablanca.</p>
          </div>
        </section>

        <section class="content">
          <section class="section" aria-labelledby="servicios">
            <h2 id="servicios">Cerrajero urgente en Barrio del Carmen: aperturas, bombines y reparaciones</h2>
            <ul>
              <li><strong>Aperturas de puertas sin rotura:</strong> actuamos en puertas cerradas de golpe, llaves olvidadas por dentro y resbalones bloqueados. Antes de tocar la cerradura comprobamos puerta, escudo y marco para escoger la técnica menos invasiva.</li>
              <li><strong>Puertas con vuelta de llave:</strong> cuando el bombín está echado, trabajamos con ganzuado, extracción controlada o sustitución si el cilindro ya está dañado. En viviendas del Barrio del Carmen y portales próximos a la Estación de Murcia-Del Carmen es frecuente encontrar herrajes mixtos, por eso llevamos material compatible en el vehículo.</li>
              <li><strong>Blindadas y acorazadas:</strong> abrimos puertas de seguridad, cerraduras multipunto y escudos reforzados evitando taladros innecesarios. Si hace falta una intervención destructiva, se informa del trabajo antes de empezar.</li>
              <li><strong>Cambio de bombines y cerraduras:</strong> instalamos cilindros de perfil europeo, bombines antibumping, antitaladro y antiextracción, con opciones Ezcurra, Tesa, Fac, Fichet y equivalentes. También sustituimos cerraderos, manillas, escudos, pestillos y cajas de cerradura.</li>
              <li><strong>Urgencias 24 horas, 7 días:</strong> de día atendemos aperturas, cambios tras pérdida de llaves y reparaciones por intento de robo. De noche, festivos y fines de semana priorizamos incidencias reales: persona fuera de casa, puerta bloqueada, llave partida o acceso comprometido.</li>
              <li><strong>Reparación general:</strong> ajuste de puertas que rozan, bombines duros, llaves que no giran, cerraduras desalineadas y persianas metálicas de pequeño comercio.</li>
            </ul>
          </section>
          ${reassuranceSection(loc.name)}
        </section>
      </main>`
  });
}


function genericLocalPage(loc) {
  const seo = seoFor(loc);
  const anchorText = loc.anchors.join(" y ");
  const cards = seo.cards.map(card => `
    <article class="card">
      <h3>${escapeHtml(card[0])}</h3>
      <p>${escapeHtml(card[1])}</p>
    </article>`).join("");
  const paragraphs = seo.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("");
  const tags = Array.from(new Set(seo.tags.concat(seoBoosterTags(loc)))).map(tag => `<span>${escapeHtml(tag)}</span>`).join("");
  const faq = seo.faq.map(item => `
    <article class="faq-item">
      <h3>${escapeHtml(item[0])}</h3>
      <p>${escapeHtml(item[1])}</p>
    </article>`).join("");
  const nearbyLinks = LOCATIONS.filter(item => item.slug !== loc.slug).slice(0, 6).map(item => `
    <a class="zone-link" href="${item.slug}">${escapeHtml(item.name)}<span>${escapeHtml(item.group)}</span></a>`).join("");

  return layout({
    title: seo.title,
    description: seo.description,
    keywords: pageKeywords(loc),
    path: loc.slug,
    schema: schemaFor(loc),
    body: `
      <main>
        <section class="hero local-hero" aria-labelledby="hero-title">
          ${BRAND.logo24 ? `<img class="hero-bg-logo" src="${BRAND.logo24}" alt="">` : ""}
          <div class="hero-content">
            <span class="kicker">${escapeHtml(seo.kicker)}</span>
            <h1 id="hero-title">${escapeHtml(seo.h1)}</h1>
            <p>${escapeHtml(seo.intro)}</p>
            <div class="hero-pills" aria-label="Servicios rápidos en ${escapeHtml(loc.name)}">
              <span class="hero-pill">Cerrajero 24h</span>
              <span class="hero-pill">Urgente</span>
              <span class="hero-pill">Económico</span>
              <span class="hero-pill">${escapeHtml(loc.name)}</span>
            </div>
          </div>
        </section>

        <section class="content">
          <section class="section" aria-labelledby="servicios">
            <h2 id="servicios">${escapeHtml(seo.h2)}</h2>
            ${paragraphs}
            <p><strong>Zona de referencia:</strong> ${escapeHtml(anchorText)}. También podemos valorar avisos próximos dentro de Murcia y alrededores.</p>
            <div class="keyword-strip">${tags}</div>
          </section>

          <section class="section" aria-labelledby="copy-local-${escapeHtml(loc.name)}">
            <h2 id="copy-local-${escapeHtml(loc.name)}">Cerrajería local, urgente y económica en ${escapeHtml(loc.name)}</h2>
            ${seoBoosterCopy(loc)}
            <p>En ${escapeHtml(loc.name)} es habitual que los clientes busquen soluciones para llaves olvidadas, puertas que no abren, bombines que van duros, alquileres que necesitan cambio de cerradura o mejoras de seguridad tras una pérdida de llaves. Nuestro objetivo es resolver cada caso con rapidez, criterio técnico y una atención clara desde el primer contacto.</p>
            <div class="keyword-strip">${tags}</div>
          </section>

          <section class="section" aria-labelledby="servicios-${escapeHtml(loc.name)}">
            <h2 id="servicios-${escapeHtml(loc.name)}">Servicios de cerrajería en ${escapeHtml(loc.name)}</h2>
            <div class="service-grid">${cards}</div>
          </section>

          ${reassuranceSection(loc.name)}

          <section class="section" aria-labelledby="faq-${escapeHtml(loc.name)}">
            <h2 id="faq-${escapeHtml(loc.name)}">Preguntas frecuentes sobre cerrajeros en ${escapeHtml(loc.name)}</h2>
            <div class="faq-list">${faq}</div>
          </section>

          <section class="section">
            <h2>Otras zonas cercanas</h2>
            <p>También prestamos servicio urgente 24h en otros barrios, pedanías y municipios de Murcia, con búsquedas relacionadas como cerrajero en cada zona, cerrajeros urgentes, aperturas económicas y cambios de bombín.</p>
            <div class="zone-grid">${nearbyLinks}</div>
          </section>
        </section>
      </main>`
  });
}


function notFoundPage(pathname) {
  return layout({
    title: "Página no encontrada | Cerrajero urgente Murcia 24h",
    description: "Ruta no encontrada. Vuelve al inicio para contactar con AbreExpress, cerrajero urgente 24h en Murcia.",
    path: pathname,
    body: `
      <main>
        <section class="hero" aria-labelledby="hero-title">
          ${BRAND.logo24 ? `<img class="hero-bg-logo" src="${BRAND.logo24}" alt="">` : ""}
          <div class="hero-content">
            <span class="kicker">${BRAND.topLine}</span>
            <h1 id="hero-title">Página no encontrada</h1>
            <p>Vuelve al inicio o usa los botones para llamar a AbreExpress o escribir por WhatsApp.</p>
          </div>
        </section>
      </main>`
  });
}

function render(pathname) {
  if (pathname === "/" || pathname === "/index.html") return { status: 200, html: homePage() };
  const loc = LOCATIONS.find(item => item.slug === pathname);
  if (!loc) return { status: 404, html: notFoundPage(pathname) };
  return { status: 200, html: genericLocalPage(loc) };
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.replace(/\/$/, "") || "/";

  if (pathname === "/assets/logo-transparent.png") {
    const fs = require("fs");
    const assetPath = __dirname + "/assets/logo-transparent.png";
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400"
    });
    return fs.createReadStream(assetPath).pipe(res);
  }

  const page = render(pathname);
  res.writeHead(page.status, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(page.html);
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor local activo: http://${HOST}:${PORT}`);
  console.log(`Subpágina: http://${HOST}:${PORT}/barrios/cerrajero-barrio-del-carmen`);
  console.log(`Teléfono configurado: ${BRAND.phone} | WhatsApp: ${BRAND.whatsappUrl}`);
});

import type { Continent, Destination } from "@/types";

export const continents: Continent[] = ["Todos", "Asia", "América", "Europa", "África"];
export const destinations: Destination[] = [
  {
    id: "petra", name: "Petra", country: "Jordania", continent: "Asia", coordinates: "30°19′ N · 35°27′ E", category: "PIEDRA E HISTORIA", phrase: "Hay lugares que no necesitan palabras.",
    description: "Un desfiladero se abre. La piedra se vuelve fachada. Y, por un momento, el mundo parece quedarse quieto. Petra es una invitación a mirar más despacio.", days: 3, season: "Primavera y otoño", imageAlt: "El Tesoro de Petra tallado en una enorme pared de arenisca rosada, con viajeros y camellos al pie", imagePosition: "center 39%",
    route: [{ name: "El primer encuentro", description: "Recorre el Siq a pie hasta la fachada de Al-Khazneh. Dedica tiempo a observar la luz sobre la arenisca." }, { name: "Más allá de la postal", description: "Explora las tumbas reales y los caminos del interior del recinto arqueológico, adaptando el paseo a tu ritmo." }, { name: "Una última mirada", description: "Reserva una mañana tranquila para volver a los rincones que más te hayan llamado la atención." }],
  },
  {
    id: "capadocia", name: "Capadocia", country: "Turquía", continent: "Asia", coordinates: "38°38′ N · 34°49′ E", category: "OTRO TIPO DE AMANECER", phrase: "A veces, perder el suelo es encontrar el rumbo.",
    description: "Valles esculpidos por el tiempo, casas que nacen de la roca y un cielo que cambia de escala al amanecer. Aquí, la perspectiva lo es todo.", days: 4, season: "Primavera y otoño", imageAlt: "Globos aerostáticos sobre los valles y formaciones rocosas de Capadocia al amanecer", imagePosition: "center 52%",
    route: [{ name: "Despertar en Göreme", description: "Observa el amanecer desde un mirador y pasea por las calles del pueblo sin una lista de pendientes." }, { name: "Entre valles", description: "Dedica el día a los senderos del Valle Rojo y a las vistas de las formaciones volcánicas." }, { name: "Bajo la superficie", description: "Descubre la arquitectura excavada en la roca y reserva tiempo para la artesanía local." }],
  },
  {
    id: "atacama", name: "Atacama", country: "Chile", continent: "América", coordinates: "22°55′ S · 68°12′ O", category: "SILENCIO A GRAN ESCALA", phrase: "Donde parece no haber nada, pasa de todo.",
    description: "Un paisaje de otro planeta, con los pies en la Tierra. El desierto se despliega en capas de sal, roca y luz, bajo un cielo que invita a quedarse.", days: 5, season: "Todo el año, según la ruta", imageAlt: "Desierto de Atacama con llanuras ocres y montañas andinas bajo un cielo azul", imagePosition: "center 55%",
    route: [{ name: "Llegar y bajar el ritmo", description: "Conoce San Pedro y dedica el primer día a adaptarte a la altura, sin grandes esfuerzos." }, { name: "La luz del desierto", description: "Explora los paisajes cercanos y el Valle de la Luna con un guía local y tiempo para detenerte." }, { name: "El cielo, de cerca", description: "Deja espacio para una experiencia de observación del cielo, sujeta al clima y a las condiciones locales." }],
  },
  {
    id: "lofoten", name: "Lofoten", country: "Noruega", continent: "Europa", coordinates: "68°12′ N · 13°36′ E", category: "AL BORDE DEL NORTE", phrase: "El horizonte también puede ser un refugio.",
    description: "Montañas que caen al mar. Pequeñas casas rojas frente al viento. En estas islas, el paisaje marca el tiempo y el camino siempre merece una parada.", days: 6, season: "Verano para caminar", imageAlt: "Casas rojas de un pueblo pesquero en las islas Lofoten entre mar y montañas bajo un cielo nublado", imagePosition: "center 50%",
    route: [{ name: "La carretera del mar", description: "Recorre pequeños pueblos costeros y miradores sin apurar las distancias." }, { name: "Caminar hacia el horizonte", description: "Escoge un sendero acorde con tu experiencia y las condiciones del tiempo." }, { name: "Quedarse un poco más", description: "Dedica un día a las playas, la cocina local y la luz cambiante del archipiélago." }],
  },
  {
    id: "kioto", name: "Kioto", country: "Japón", continent: "Asia", coordinates: "35°00′ N · 135°46′ E", category: "LA BELLEZA DEL DETALLE", phrase: "Hay caminos que se recorren en silencio.",
    description: "Puertas que se suceden como un ritmo. Jardines que invitan a detenerse. Kioto se revela en los gestos pequeños y en las calles que no tenías anotadas.", days: 4, season: "Primavera y otoño", imageAlt: "Puertas torii rojas del santuario Fushimi Inari de Kioto que se suceden hacia el bosque", imagePosition: "center 50%",
    route: [{ name: "Antes del ruido", description: "Visita Fushimi Inari temprano y camina entre los torii respetando el carácter sagrado del lugar." }, { name: "La ciudad a pie", description: "Conecta barrios y jardines con tiempo para el té y la observación." }, { name: "Un día sin lista", description: "Vuelve a tu calle favorita y explora pequeñas tiendas, sin convertir el paseo en una carrera." }],
  },
  {
    id: "marrakech", name: "Marrakech", country: "Marruecos", continent: "África", coordinates: "31°38′ N · 7°59′ O", category: "EL PULSO DE LA MEDINA", phrase: "Deja que la ciudad te encuentre.",
    description: "Tierra roja, sombras frescas y calles que cambian de ritmo a cada esquina. Marrakech se descubre con todos los sentidos y con un poco de curiosidad.", days: 3, season: "Primavera y otoño", imageAlt: "Alminar de la mezquita Kutubiyya de Marrakech con palmeras y arquitectura de tonos tierra", imagePosition: "center 50%",
    route: [{ name: "Entrar en la medina", description: "Pasea por las calles y plazas, observando la vida local con respeto y sin prisa." }, { name: "Patios y pausas", description: "Alterna el bullicio de la ciudad con jardines y espacios de calma." }, { name: "La última vuelta", description: "Descubre oficios, sabores y pequeñas tiendas antes de despedirte de la ciudad." }],
  },
];

export const heroDestinations = destinations.slice(0, 3);
export const imageSrcset = (id: string): string => `/images/${id}-480.webp 480w, /images/${id}-960.webp 960w, /images/${id}-1920.webp 1920w`;

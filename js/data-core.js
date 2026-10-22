/* Inglés con Calma — core data: levels and UI strings.
   UI language shifts as levels advance: Level 1 = Spanish, Level 2 = mixed, Level 3 = English. */
window.DATA = {
  LEVELS: [
    {
      id: 1,
      titleEs: "Frases para todos los días",
      titleEn: "Everyday phrases",
      descEs: "Saludos, el supermercado, el doctor y el teléfono: el inglés que usarás primero.",
      descEn: "Greetings, groceries, the doctor and phone calls.",
      mode: "es"
    },
    {
      id: 2,
      titleEs: "Los sonidos del inglés",
      titleEn: "The sounds of English",
      descEs: "Los sonidos que el español no tiene: la TH, las vocales largas y cortas, la B y la V.",
      descEn: "The sounds Spanish doesn't have: TH, long and short vowels, B and V.",
      mode: "mixed"
    },
    {
      id: 3,
      titleEs: "Palabras tramposas",
      titleEn: "Tricky words",
      descEs: "Palabras que parecen español pero significan otra cosa (falsos amigos).",
      descEn: "Words that look Spanish but mean something else (false friends).",
      mode: "en"
    }
  ],
  LESSONS: [],
  UI: {
    es: {
      tagline: "Aprende inglés paso a paso, a tu ritmo — sin juegos, sin puntos, sin prisa.",
      back: "Atrás",
      level: "Nivel",
      listen: "Escuchar",
      slow: "Lento",
      completed: "Completada",
      markDone: "Terminé esta lección",
      phrasesLabel: "frases",
      howTitle: "Cómo funciona",
      how1: "① Toca «Escuchar» y oye la frase.",
      how2: "② Repite en voz alta, sin pena. Así se aprende.",
      how3: "③ Si es difícil, usa «Lento».",
      practice: "Repite cada frase en voz alta después de escucharla. Esa es la práctica.",
      listenHint: "Toca cualquier frase para escucharla.",
      addHomeTitle: "📲 Ponla en tu iPhone",
      addHome: "Abre esta página en Safari, toca Compartir (el cuadrito con la flecha) y elige «Añadir a pantalla de inicio». Quedará como una app, sin App Store.",
      footerNoAds: "Sin anuncios · Sin cuentas · Sin puntos · A tu ritmo",
      footerMade: "Hecha con cariño ♥",
      doneSummary: "Lecciones completadas"
    },
    mixed: {
      tagline: "Learn English step by step · Aprende inglés paso a paso.",
      back: "Atrás · Back",
      level: "Level · Nivel",
      listen: "Listen · Escuchar",
      slow: "Slow · Lento",
      completed: "Completed · Completada",
      markDone: "I finished this lesson · Terminé esta lección",
      phrasesLabel: "phrases · frases",
      howTitle: "How it works · Cómo funciona",
      practice: "Repeat each phrase out loud. Repite cada frase en voz alta.",
      listenHint: "Tap any phrase to hear it. Toca una frase para escucharla.",
      addHomeTitle: "📲 Add it to your iPhone · Ponla en tu iPhone",
      footerNoAds: "No ads · No accounts · Sin anuncios · Sin cuentas",
      footerMade: "Made with care · Hecha con cariño ♥",
      doneSummary: "Lessons completed · Lecciones completadas"
    },
    en: {
      tagline: "Learn English step by step, at your own pace.",
      back: "Back",
      level: "Level",
      listen: "Listen",
      slow: "Slow",
      completed: "Completed",
      markDone: "I finished this lesson",
      phrasesLabel: "phrases",
      howTitle: "How it works",
      practice: "Repeat each phrase out loud after listening. (Repite en voz alta.)",
      listenHint: "Tap any phrase to hear it. (Toca una frase para escucharla.)",
      addHomeTitle: "📲 Add it to your iPhone",
      footerNoAds: "No ads · No accounts · At your pace",
      footerMade: "Made with care ♥",
      doneSummary: "Lessons completed"
    }
  }
};

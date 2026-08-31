export type ServicioItem = {
  titulo: string;
  descripcion: string;
};

export type ServicioPilar = {
  id: string;
  numero: string;
  titulo: string;
  bajada: string;
  items: ServicioItem[];
};

export const serviciosPilares: ServicioPilar[] = [
  {
    id: "ingenieria-proyectos",
    numero: "01",
    titulo: "Ingeniería & proyectos",
    bajada:
      "Relevamiento, asesoramiento técnico, documentación BIM y fabricación a medida — todo el trabajo previo a la obra.",
    items: [
      {
        titulo: "Consultoría y soporte",
        descripcion:
          "No vendemos por vender. Acompañamos a nuestros clientes en la toma de decisiones para encontrar la solución más eficiente según las características de cada proyecto.",
      },
      {
        titulo: "Asesoramiento técnico y relevamientos",
        descripcion:
          "Realizamos visitas presenciales o videollamadas a planta y obra para diagnosticar necesidades reales y dimensionar correctamente cada sistema.",
      },
      {
        titulo: "Ingeniería de proyectos",
        descripcion:
          "Diseñamos soluciones térmicas personalizadas para hoteles, clubes, edificios de gran escala y complejos residenciales.",
      },
      {
        titulo: "Fabricación a medida",
        descripcion:
          "Desarrollamos equipos adaptados a los requerimientos técnicos específicos de cada instalación, optimizando rendimiento, eficiencia y durabilidad.",
      },
      {
        titulo: "Documentación técnica BIM",
        descripcion:
          "Generamos fichas técnicas y modelos 3D para facilitar la integración de nuestros equipos en proyectos de arquitectura e ingeniería desarrollados bajo metodología BIM.",
      },
    ],
  },
  {
    id: "instalacion-puesta-en-marcha",
    numero: "02",
    titulo: "Instalación & puesta en marcha",
    bajada:
      "Montaje supervisado y calibración de equipos para un arranque seguro desde el primer día.",
    items: [
      {
        titulo: "Instalación y puesta en marcha",
        descripcion:
          "Supervisamos y ejecutamos el montaje de los equipos para garantizar una operación segura y un funcionamiento óptimo desde el primer día.",
      },
    ],
  },
  {
    id: "soporte-postventa",
    numero: "03",
    titulo: "Soporte & postventa",
    bajada:
      "Mantenimiento preventivo, repuestos originales y guardia técnica telefónica/presencial las 24 horas.",
    items: [
      {
        titulo: "Mantenimiento preventivo y correctivo",
        descripcion:
          "Brindamos servicio técnico especializado para prolongar la vida útil de las unidades y asegurar su máximo desempeño.",
      },
      {
        titulo: "Guardia técnica",
        descripcion:
          "Ofrecemos soporte telefónico y asistencia presencial para que cada cliente cuente con respaldo cuando lo necesite.",
      },
    ],
  },
];

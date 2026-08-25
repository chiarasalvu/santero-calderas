export type ServicioDetalle = {
  id: string;
  titulo: string;
  descripcion: string;
};

export const serviciosDetalle: ServicioDetalle[] = [
  {
    id: "consultoria",
    titulo: "Consultoría y Soporte",
    descripcion:
      "No vendemos por vender. Acompañamos a nuestros clientes en la toma de decisiones para encontrar la solución más eficiente según las características de cada proyecto.",
  },
  {
    id: "asesoramiento",
    titulo: "Asesoramiento Técnico y Relevamientos",
    descripcion:
      "Realizamos visitas presenciales o videollamadas a planta y obra para diagnosticar necesidades reales y dimensionar correctamente cada sistema.",
  },
  {
    id: "ingenieria",
    titulo: "Ingeniería de Proyectos",
    descripcion:
      "Diseñamos soluciones térmicas personalizadas para hoteles, clubes, edificios de gran escala y complejos residenciales.",
  },
  {
    id: "fabricacion",
    titulo: "Fabricación a Medida",
    descripcion:
      "Desarrollamos equipos adaptados a los requerimientos técnicos específicos de cada instalación, optimizando rendimiento, eficiencia y durabilidad.",
  },
  {
    id: "instalacion",
    titulo: "Instalación y Puesta en Marcha",
    descripcion:
      "Supervisamos y ejecutamos el montaje de los equipos para garantizar una operación segura y un funcionamiento óptimo desde el primer día.",
  },
  {
    id: "mantenimiento",
    titulo: "Mantenimiento Preventivo y Correctivo",
    descripcion:
      "Brindamos servicio técnico especializado para prolongar la vida útil de las unidades y asegurar su máximo desempeño.",
  },
  {
    id: "guardia",
    titulo: "Guardia Técnica",
    descripcion:
      "Ofrecemos soporte telefónico y asistencia presencial para que cada cliente cuente con respaldo cuando lo necesite.",
  },
  {
    id: "documentacion",
    titulo: "Documentación Técnica BIM",
    descripcion:
      "Generamos fichas técnicas y modelos 3D para facilitar la integración de nuestros equipos en proyectos de arquitectura e ingeniería desarrollados bajo metodología BIM.",
  },
];

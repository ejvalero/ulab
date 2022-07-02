const data = {
  title: 'Docecia e Investigacióm',
  description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus velit mi, ullamcorper vitae imperdiet vitae, dictum sit amet ligula.
    Morbi ut nunc nec purus viverra malesuada cursus dictum tellus. Donec eu sagittis nisl. Nulla porta at leo ac pulvinar.
    Ut nisl erat, lacinia nec laoreet sit amet, finibus non nunc.`,
  labs: [
    {
      name: 'Laboratorio A',
      description: `
        El Laboratorio A, es una unidad académico administrativa adscrita a la Unidad de Laboratorios.
        Abarca todo lo relacionado con el procesamiento, análisis, ensayos, preparación y verificación de
        equipos eléctricos y mecánicos y está constituido por 10 Secciones.
      `,
      unit_id: 'lab_a'
    },
    {
      name: `Laboratorio B`,
      description: `
        Es una unidad académica administrativa adscrita a la Unidad de Laboratorios que tiene como función prestar
        apoyo y servicio en el campo de la Bioquímica, Electroquímica, Ecología, Biología Celular y de Organismos, 
        Físico-Química, Microbiología y Tecnología de Alimentos y Procesos Químicos, así como todas las áreas de la 
        Química y está constituido por 16 Secciones.
      `,
      unit_id: 'lab_b'
    },
    {
      name: `Laboratorio C`,
      description: `
        Es una dependencia adscrita a la Unidad de Laboratorios de la Universidad Simón Bolívar, cuya función principal 
        es la de prestar apoyo y servicio para la realización de trabajos experimentales de docencia, investigación y 
        desarrollo, tesis de grado y el mantenimiento de equipos en el campo de la electrónica, control e informática y 
        está constituido por 9 Secciones.
      `,
      unit_id: 'lab_c'     
    },
    {
      name: `Laboratorio D`,
      description: `
        El Laboratorio D es una dependencia académica perteneciente a la Unidad de Laboratorio, que agrupa Laboratorios de 
        Docencia para la carrera de física, y laboratorios de Investigación en las secciones de Geofísica, Física de la Materia 
        Condensada, Física de Sólidos, Biofísica, Física Nuclear, Física Óptica: Física de Plasmas y Óptica e Interferometría y 
        está constituido por 6 Secciones y 4  Grupos de Investigación.
      `,
      unit_id: 'lab_d'
    },
    {
      name: `Laboratorio E`,
      description: `
        Es una unidad académica adscrita a la Dirección de la Unidad de Laboratorios de la Universidad Simón Bolívar,
        presta servicios de apoyo técnico a la industria nacional, a través de sus diferentes secciones, en las áreas de Metalmecánica, 
        Sidero-Metalurgia, Polímeros, Materiales Cerámicos, Cementos y está constituido por 9 Secciones.
      `,
      unit_id: 'lab_e'     
    },
    {
      name: `Laboratorio F`,
      description: `
        Es una unidad académica adscrita a la Dirección de la Unidad de Laboratorios, presta servicios de apoyo a través de sus diferentes
        secciones, en las áreas de Computación, Redes, Arquitectura, Base de Datos, Gráficas y Multimedios, Sistemas de Información,
        Inteligencia Artificial y Robótica y Sistemas Paralelos y Distribuidos, entre otras áreas.
      `,
      unit_id: 'lab_f'     
    }
  ]
}


const services = [
  {
    caetgory: `Alimentos`,
    type: `Ensayo`,
    name: `Análisis 1`,
    unit: `Laboratorio A`,
    unit_id: `lab_a`
  },
  {
    caetgory: `Análisis Químico`,
    type: `Calibración`,
    name: `Análisis 2`,
    unit: `Laboratorio A`,
    unit_id: `lab_a`
  },
  {
    caetgory: `Alimentos`,
    type: `Ensayo`,
    name: `Análisis 1`,
    unit: `Laboratorio A`,
    unit_id: `lab_a`
  },
  {
    caetgory: `Ambiente`,
    type: `Desarrollo`,
    name: `Análisis 3`,
    unit: `Laboratorio A`,
    unit_id: `lab_a`
  },
]


const team = [
  {
    type: `Docente`,
    image: `https://bootstrapmade.com/demo/templates/Mentor/assets/img/trainers/trainer-1.jpg`,
    name: `Walter White`,
    job: `Derector ULAB`,
    profession: `Doctor en Física de partículas`,
    email: `hello@moto.com`,
    phone: `0058-416-606-4653`,
    unit_id: `lab_a`
  },
  {
    type: `Docente`,
    image: `https://bootstrapmade.com/demo/templates/Mentor/assets/img/trainers/trainer-2.jpg`,
    name: `Sarah Jhinson`,
    profession: `Doctor en Física de partículas`,
    job: `Web designer`,
    email: `cat@moto.com`,
    phone: `0058-416-606-4653`,
    unit_id: `lab_a`
  },
  {
    type: `Docente`,
    image: `https://bootstrapmade.com/demo/templates/Mentor/assets/img/trainers/trainer-3.jpg`,
    name: `Patick Jane`,
    job: `Coordinador de la ulab`,
    email: `dog@moto.com`,
    phone: `0058-416-606-4653`,
    unit_id: `lab_a`
  },
  {
    type: `Docente`,
    image: `https://bootstrapmade.com/demo/templates/Mentor/assets/img/trainers/trainer-3.jpg`,
    name: `William Anderson`,
    job: `Content`,
    email: `dog@moto.com`,
    phone: `0058-416-606-4653`,
    unit_id: `lab_a`
  },
]
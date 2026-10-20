// Base de datos completa con las 117 preguntas del examen de conducir de Florencio Varela
const questionsData = [
  {
    id: 1,
    category: "Normas Generales",
    type: "qa",
    question: "¿Cuándo se considera que un vehículo está detenido?",
    answer: "Se considera detención a la permanencia en un vehículo junto a la acera por un tiempo estrictamente necesario para casos de control de tránsito, ascenso y descenso de pasajeros o para carga y descarga.",
    options: [
      "A la permanencia junto a la acera por el tiempo estrictamente necesario para control de tránsito, ascenso y descenso de pasajeros o carga y descarga.",
      "Cuando el conductor apaga el motor y desciende del vehículo por más de 15 minutos.",
      "Cuando el vehículo queda estacionado en doble fila con las balizas encendidas."
    ],
    correctIndex: 0
  },
  {
    id: 2,
    category: "Señalamiento y Estacionamiento",
    type: "qa",
    question: "Según la Ley 24.449 ¿Qué indica el cordón amarillo?",
    answer: "Que está prohibido estacionar, pudiendo efectuarse la detención para ascenso y descenso de pasajeros.",
    options: [
      "Prohibido estacionar y prohibido detenerse en cualquier circunstancia.",
      "Que está prohibido estacionar, pudiendo efectuarse la detención para ascenso y descenso de pasajeros.",
      "Lugar exclusivo para estacionamiento de vehículos oficiales y ambulancias."
    ],
    correctIndex: 1
  },
  {
    id: 3,
    category: "Alcoholemia y Controles",
    type: "qa",
    question: "La negativa a realizar un test de alcoholemia ¿Constituye una falta?",
    answer: "Siempre.",
    options: [
      "Siempre.",
      "Solo si el conductor presenta signos evidentes de ebriedad.",
      "No, si el conductor alega motivos personales."
    ],
    correctIndex: 0
  },
  {
    id: 4,
    category: "Seguridad Vial",
    type: "qa",
    question: "En los vehículos que poseen cinturones de seguridad, ¿Es obligatorio usarlos?",
    answer: "Sí, todos sin excepción.",
    options: [
      "Únicamente el conductor en rutas nacionales.",
      "Sí, todos sin excepción.",
      "Solo los ocupantes de los asientos delanteros."
    ],
    correctIndex: 1
  },
  {
    id: 5,
    category: "Señalamiento y Estacionamiento",
    type: "qa",
    question: "Con carácter general, cuando nos encontramos con una señal de PROHIBIDO ESTACIONAR ¿Está permitido para subir o bajar pasajeros en el automóvil?",
    answer: "Sí.",
    options: [
      "Sí.",
      "No, está terminantemente prohibido detenerse.",
      "Solo si es un día feriado o domingo."
    ],
    correctIndex: 0
  },
  {
    id: 6,
    category: "Alcoholemia y Controles",
    type: "qa",
    question: "¿Cuál es el nivel máximo de alcoholemia admitido para conducir un automóvil particular según este reglamento?",
    answer: "0.5 gr. por litro de sangre.",
    options: [
      "0.5 gr. por litro de sangre.",
      "0.2 gr. por litro de sangre.",
      "0.0 gr. por litro de sangre en cualquier situación."
    ],
    correctIndex: 0
  },
  {
    id: 7,
    category: "Maniobras y Circulación",
    type: "qa",
    question: "Adelantarse en una curva está permitido:",
    answer: "No, está prohibido.",
    options: [
      "Sí, tocando bocina previamente.",
      "No, está prohibido.",
      "Solo si la curva tiene visibilidad superior a 50 metros."
    ],
    correctIndex: 1
  },
  {
    id: 8,
    category: "Maniobras y Circulación",
    type: "qa",
    question: "¿Cuál es la forma correcta de adelantarse a otro vehículo?",
    answer: "Por la izquierda, haciendo las señales respectivas.",
    options: [
      "Por la banquina si el carril está ocupado.",
      "Por la derecha si el vehículo de adelante circula despacio.",
      "Por la izquierda, haciendo las señales respectivas."
    ],
    correctIndex: 2
  },
  {
    id: 9,
    category: "Señalamiento y Estacionamiento",
    type: "qa",
    question: "Cuando se estaciona en proximidad de una esquina ¿Qué línea no debe superarse?",
    answer: "La línea imaginaria de prolongación de ochava.",
    options: [
      "La línea imaginaria de prolongación de ochava.",
      "La línea media de la calzada.",
      "El cordón de la vereda contraria."
    ],
    correctIndex: 0
  },
  {
    id: 10,
    category: "Seguridad Vial",
    type: "qa",
    question: "¿Qué utilidad tiene los cinturones de seguridad?",
    answer: "Evitan y/o disminuyen los daños físicos a las personas en caso de accidente.",
    options: [
      "Evitan y/o disminuyen los daños físicos a las personas en caso de accidente.",
      "Evitan multas y mejoran la estabilidad del vehículo.",
      "Solo sirven para inmovilizar al conductor en curvas cerradas."
    ],
    correctIndex: 0
  },
  {
    id: 11,
    category: "Prioridades de Paso",
    type: "qa",
    question: "Los vehículos de emergencia ¿Cuando tienen prioridad de paso?",
    answer: "Cuando están en una situación de emergencia.",
    options: [
      "Siempre, las 24 horas del día aunque circulen sin sirena.",
      "Cuando están en una situación de emergencia.",
      "Únicamente al circular por avenidas o autopistas."
    ],
    correctIndex: 1
  },
  {
    id: 12,
    category: "Prioridades de Paso",
    type: "qa",
    question: "Al efectuar un giro en una bocacalle estando en verde el semáforo, entre el conductor y el peatón ¿Quién tiene prioridad de paso?",
    answer: "El peatón.",
    options: [
      "El conductor, porque tiene luz verde.",
      "El peatón.",
      "El que llegue primero a la senda peatonal."
    ],
    correctIndex: 1
  },
  {
    id: 13,
    category: "Normativa y Documentación",
    type: "qa",
    question: "En caso de comprobar una falta, ¿Puede un agente de tránsito retener la licencia de conducir?",
    answer: "Solo en los casos que la normativa vigente así lo indique.",
    options: [
      "Sí, ante cualquier infracción leve o grave sin excepción.",
      "No, los agentes nunca tienen facultad para retener documentos.",
      "Solo en los casos que la normativa vigente así lo indique."
    ],
    correctIndex: 2
  },
  {
    id: 14,
    category: "Factores de Riesgo",
    type: "qa",
    question: "El cansancio a la hora de conducir puede verse inducido por ingerir:",
    answer: "Bebidas alcohólicas y comidas en abundancia.",
    options: [
      "Agua mineral y frutas frescas.",
      "Bebidas alcohólicas y comidas en abundancia.",
      "Infusiones calientes y caramelos."
    ],
    correctIndex: 1
  },
  {
    id: 15,
    category: "Prioridades de Paso",
    type: "qa",
    question: "¿Quién tiene prioridad en una rotonda?",
    answer: "El vehículo que se encuentra dentro de la calzada circular.",
    options: [
      "El vehículo que va a ingresar a la rotonda desde la derecha.",
      "El vehículo que se encuentra dentro de la calzada circular.",
      "El vehículo de mayor porte que circula por la vía rápida."
    ],
    correctIndex: 1
  },
  {
    id: 16,
    category: "Maniobras y Circulación",
    type: "qa",
    question: "Como norma general ¿Dónde está prohibido el sobrepaso de un vehículo?",
    answer: "Donde la delimitación de carriles es de trazo continuo y en curvas, encrucijadas, pasos nivel o puentes.",
    options: [
      "Donde la delimitación de carriles es de trazo discontinuo.",
      "Donde la delimitación de carriles es de trazo continuo y en curvas, encrucijadas, pasos nivel o puentes.",
      "En autopistas y autovías con más de tres carriles."
    ],
    correctIndex: 1
  },
  {
    id: 17,
    category: "Maniobras y Circulación",
    type: "qa",
    question: "¿Qué vehículos pueden circular por el carril señalizado como 'BUS' en el carril del METROBUS?",
    answer: "Colectivos autorizados y vehículos destinados al servicio de emergencia en cumplimiento de sus funciones.",
    options: [
      "Taxis ocupados y autos particulares en horario pico.",
      "Colectivos autorizados y vehículos destinados al servicio de emergencia en cumplimiento de sus funciones.",
      "Cualquier vehículo que necesite doblar a la derecha."
    ],
    correctIndex: 1
  },
  {
    id: 18,
    category: "Siniestros Viales",
    type: "qa",
    question: "En caso de participar en un siniestro vial, ¿qué es recomendable hacer como primer paso?",
    answer: "Detenerse inmediatamente y permanecer en el lugar del hecho.",
    options: [
      "Continuar la marcha y hacer la denuncia telefónica.",
      "Detenerse inmediatamente y permanecer en el lugar del hecho.",
      "Retirar de inmediato los vehículos para no entorpecer el tránsito."
    ],
    correctIndex: 1
  },
  {
    id: 19,
    category: "Normativa y Documentación",
    type: "qa",
    question: "¿Quién es el responsable civil por un incidente de tránsito producido por un menor de edad poseedor de una licencia de conducir?",
    answer: "El que firmó la autorización para obtener la licencia.",
    options: [
      "El menor de edad exclusivamente de forma penal.",
      "El que firmó la autorización para obtener la licencia.",
      "El municipio emisor de la licencia."
    ],
    correctIndex: 1
  },
  {
    id: 20,
    category: "Normativa y Documentación",
    type: "qa",
    question: "Al tener la licencia vencida, ¿por cuánto tiempo puede seguir conduciendo sin estar en infracción?",
    answer: "No está permitido conducir con la licencia vencida, excepto que el vencimiento fuese un día inhábil, en cuyo caso se traslada al día hábil siguiente.",
    options: [
      "Durante 30 días posteriores al vencimiento.",
      "Durante 6 meses si se inició el trámite de renovación.",
      "No está permitido conducir con la licencia vencida, excepto que el vencimiento fuese un día inhábil, en cuyo caso se traslada al día hábil siguiente."
    ],
    correctIndex: 2
  },
  {
    id: 21,
    category: "Normativa y Documentación",
    type: "qa",
    question: "La ubicación y posición de las placas de dominio del vehículo, ¿puede sufrir algún tipo de modificación?",
    answer: "No, deben estar colocadas en el lugar y de forma reglamentaria.",
    options: [
      "Sí, si es para mejorar la visibilidad o estética.",
      "No, deben estar colocadas en el lugar y de forma reglamentaria.",
      "Solo se puede modificar la placa delantera si no entra en el paragolpes."
    ],
    correctIndex: 1
  },
  {
    id: 22,
    category: "Normativa y Documentación",
    type: "qa",
    question: "¿Cuál es el objetivo de la Verificación Técnica Vehicular (VTV)?",
    answer: "Reducir la contaminación y mejorar la calidad del medio ambiente. Garantizar el cumplimiento de las normas de seguridad de los vehículos.",
    options: [
      "Reducir la contaminación y mejorar la calidad del medio ambiente. Garantizar el cumplimiento de las normas de seguridad de los vehículos.",
      "Verificar únicamente el pago de patentes e impuestos automotores.",
      "Controlar la estética y accesorios decorativos del rodado."
    ],
    correctIndex: 0
  },
  {
    id: 23,
    category: "Seguridad Vial",
    type: "qa",
    question: "Si un conductor necesita realizar una llamada de urgencia con el teléfono celular, ¿qué debe hacer para no generar una situación de riesgo en la vía pública?",
    answer: "Colocar balizas y detenerse en un lugar donde esté permitido.",
    options: [
      "Bajar la velocidad y atender rápidamente con una sola mano.",
      "Colocar balizas y detenerse en un lugar donde esté permitido.",
      "Poner el altavoz mientras continúa circulando a velocidad normal."
    ],
    correctIndex: 1
  },
  {
    id: 24,
    category: "Señalamiento y Estacionamiento",
    type: "qa",
    question: "¿Cuáles son las señales preventivas?",
    answer: "Aquellas que advierten la proximidad de una circunstancia o variación de la normalidad de la vía que puede resultar sorpresiva o peligrosa a la circulación.",
    options: [
      "Aquellas que transmiten prohibiciones y sanciones legales estrictas.",
      "Aquellas que advierten la proximidad de una circunstancia o variación de la normalidad de la vía que puede resultar sorpresiva o peligrosa a la circulación.",
      "Aquellas que informan sobre servicios turísticos y estaciones de servicio."
    ],
    correctIndex: 1
  },
  {
    id: 25,
    category: "Señalamiento y Estacionamiento",
    type: "qa",
    question: "¿Qué indican las señales reglamentarias?",
    answer: "Transmiten órdenes específicas, de cumplimiento obligatorio en el lugar para el cual están destinadas.",
    options: [
      "Transmiten órdenes específicas, de cumplimiento obligatorio en el lugar para el cual están destinadas.",
      "Recomendaciones opcionales que el conductor puede desestimar.",
      "Advertencias sobre curvas peligrosas o cruce de animales."
    ],
    correctIndex: 0
  },
  {
    id: 26,
    category: "Prioridades de Paso",
    type: "qa",
    question: "De acuerdo a la Ley N° 2148, en encrucijadas sin semáforos, ¿cuál es el orden de prioridad de paso según el tipo de arteria?",
    answer: "1° Avenida - 2° Calle - 3° Pasaje.",
    options: [
      "1° Calle - 2° Avenida - 3° Pasaje.",
      "1° Avenida - 2° Calle - 3° Pasaje.",
      "1° Pasaje - 2° Calle - 3° Avenida."
    ],
    correctIndex: 1
  },
  {
    id: 27,
    category: "Prioridades de Paso",
    type: "qa",
    question: "¿Cuándo se debe ceder el paso a los vehículos que desean incorporarse al tránsito desde el lugar donde estaban estacionados o desde un garaje?",
    answer: "Cuando el tránsito se encuentra interrumpido por cualquier razón.",
    options: [
      "Siempre, tienen prioridad sobre los que ya circulan.",
      "Nunca bajo ninguna condición.",
      "Cuando el tránsito se encuentra interrumpido por cualquier razón."
    ],
    correctIndex: 2
  },
  {
    id: 28,
    category: "Maniobras y Circulación",
    type: "qa",
    question: "En un túnel, con ambos sentidos de circulación, ¿está permitido sobrepasar a un vehículo?",
    answer: "No, ya que está prohibido por normativa.",
    options: [
      "Sí, si el de adelante va a menos de 20 km/h.",
      "No, ya que está prohibido por normativa.",
      "Solo con luces altas encendidas."
    ],
    correctIndex: 1
  },
  {
    id: 29,
    category: "Maniobras y Circulación",
    type: "qa",
    question: "¿A qué se denomina 'carril de aceleración'?",
    answer: "Es el carril de incorporación a una autopista.",
    options: [
      "El carril rápido de la izquierda en zonas urbanas.",
      "Es el carril de incorporación a una autopista.",
      "Una pista de pruebas de velocidad máxima."
    ],
    correctIndex: 1
  },
  {
    id: 30,
    category: "Velocidades y Circulación",
    type: "qa",
    question: "Circular por debajo del límite mínimo de velocidad puede causar incidentes.",
    answer: "Verdadero.",
    options: ["Verdadero.", "Falso."],
    correctIndex: 0
  },
  {
    id: 31,
    category: "Maniobras y Circulación",
    type: "qa",
    question: "Cuando un conductor realiza marcha atrás, ¿qué distancia puede recorrer?",
    answer: "El recorrido mínimo e indispensable, siempre que se trate de una maniobra de estacionamiento.",
    options: [
      "Hasta media cuadra si la calle está despejada.",
      "El recorrido mínimo e indispensable, siempre que se trate de una maniobra de estacionamiento.",
      "Cualquier distancia con balizas puestas."
    ],
    correctIndex: 1
  },
  {
    id: 32,
    category: "Factores de Riesgo",
    type: "qa",
    question: "La niebla, como factor de riesgo, produce modificaciones en…",
    answer: "El campo visual del conductor, su percepción del entorno, la capacidad lumínica del vehículo y la adherencia de las cubiertas.",
    options: [
      "El campo visual del conductor, su percepción del entorno, la capacidad lumínica del vehículo y la adherencia de las cubiertas.",
      "Únicamente el consumo de combustible del motor.",
      "El funcionamiento del velocímetro y GPS."
    ],
    correctIndex: 0
  },
  {
    id: 33,
    category: "Seguridad Vial",
    type: "qa",
    question: "Si el conductor de un vehículo circula con las balizas encendidas, toca repetidamente la bocina y el acompañante saca el brazo agitando un pañuelo. ¿Qué está indicando?",
    answer: "Que se encuentra en emergencia, transportando a una persona en grave estado de salud.",
    options: [
      "Que festeja un acontecimiento social.",
      "Que se encuentra en emergencia, transportando a una persona en grave estado de salud.",
      "Que tiene un desperfecto mecánico total de frenos."
    ],
    correctIndex: 1
  },
  {
    id: 34,
    category: "Seguridad Vial",
    type: "qa",
    question: "¿A qué se llama 'Punto Ciego'?",
    answer: "Al área de visión del entorno, a la que el conductor no tiene acceso ya sea de manera directa o porque los espejos retrovisores no la reflejan.",
    options: [
      "A conducir con las luces apagadas en la noche.",
      "Al área de visión del entorno, a la que el conductor no tiene acceso ya sea de manera directa o porque los espejos retrovisores no la reflejan.",
      "A la falta de iluminación de una esquina sin faroles."
    ],
    correctIndex: 1
  },
  {
    id: 35,
    category: "Seguridad Vial",
    type: "qa",
    question: "¿Quién es el responsable frente a la autoridad de control, si uno de los pasajeros del automóvil no lleva puesto el cinturón de seguridad?",
    answer: "El conductor.",
    options: [
      "Cada pasajero individualmente si es mayor de edad.",
      "El conductor.",
      "El titular registral del vehículo si no está presente."
    ],
    correctIndex: 1
  },
  {
    id: 36,
    category: "Seguridad Vial",
    type: "qa",
    question: "Un vehículo que no está destinado al servicio de emergencia, en caso de extrema necesidad ¿puede realizar un servicio similar al que efectúan estos últimos?",
    answer: "Sí, debiendo advertirlo encendiendo las luces, empleando la bocina de forma intermitente y agitando un paño.",
    options: [
      "No, está prohibido bajo cualquier concepto legal.",
      "Sí, debiendo advertirlo encendiendo las luces, empleando la bocina de forma intermitente y agitando un paño.",
      "Solo si va acompañado por un patrullero policial."
    ],
    correctIndex: 1
  },
  {
    id: 37,
    category: "Seguridad Vial",
    type: "qa",
    question: "En cualquier circunstancia o situación posible, durante la circulación, ¿a qué le prestaría atención Ud. a fin de aumentar su seguridad y la de otros?",
    answer: "Las condiciones en que se encuentra el automóvil, las condiciones relativas a infraestructura vial, las condiciones climáticas y el estado del conductor.",
    options: [
      "Exclusivamente a los otros vehículos que van detrás.",
      "Las condiciones en que se encuentra el automóvil, las condiciones relativas a infraestructura vial, las condiciones climáticas y el estado del conductor.",
      "Únicamente al velocímetro y tacómetro del tablero."
    ],
    correctIndex: 1
  },
  {
    id: 38,
    category: "Seguridad Vial",
    type: "qa",
    question: "Usted ha sufrido un desperfecto en su vehículo y lo ha dejado inmovilizado en la banquina. ¿Debe señalizarlo?",
    answer: "Sí, con las balizas encendidas, los triángulos de señalización de peligro y con las luces de posición.",
    options: [
      "No hace falta si es de día y la banquina es ancha.",
      "Sí, con las balizas encendidas, los triángulos de señalización de peligro y con las luces de posición.",
      "Solo si hay niebla espesa o lluvia torrencial."
    ],
    correctIndex: 1
  },
  {
    id: 39,
    category: "Factores de Riesgo",
    type: "qa",
    question: "La niebla, como factor de riesgo produce modificaciones en:",
    answer: "El campo visual del conductor y su percepción del entorno, la capacidad lumínica del vehículo como la adherencia de sus cubiertas y la respuesta del pavimento.",
    options: [
      "El campo visual del conductor y su percepción del entorno, la capacidad lumínica del vehículo como la adherencia de sus cubiertas y la respuesta del pavimento.",
      "El rendimiento térmico de los frenos únicamente.",
      "La calibración de los amortiguadores y suspensión."
    ],
    correctIndex: 0
  },
  {
    id: 40,
    category: "Prioridades de Paso",
    type: "qa",
    question: "¿Quién tiene prioridad de paso en una avenida?",
    answer: "El que circula por la avenida.",
    options: [
      "El que ingresa desde una calle a la derecha.",
      "El que circula por la avenida.",
      "Siempre el transporte público, sin importar de dónde venga."
    ],
    correctIndex: 1
  },
  {
    id: 41,
    category: "Factores de Riesgo",
    type: "qa",
    question: "Se considera a la niebla un factor de riesgo porque:",
    answer: "Reduce el alcance de la visibilidad, produce condiciones resbaladizas en la calzada e induce a calcular mal las distancias.",
    options: [
      "Descarga la batería del vehículo con mayor rapidez.",
      "Reduce el alcance de la visibilidad, produce condiciones resbaladizas en la calzada e induce a calcular mal las distancias.",
      "Obliga a circular sin luces de posición."
    ],
    correctIndex: 1
  },
  {
    id: 42,
    category: "Maniobras y Circulación",
    type: "qa",
    question: "En una autopista, ¿Está permitido remolcar con su vehículo a otro que se encuentra descompuesto?",
    answer: "No, porque está prohibido.",
    options: [
      "Sí, usando una cuerda o cadena resistente.",
      "No, porque está prohibido.",
      "Sí, siempre que no superen los 40 km/h."
    ],
    correctIndex: 1
  },
  {
    id: 43,
    category: "Velocidades y Circulación",
    type: "qa",
    question: "¿Cuál es la velocidad máxima permitida en avenidas, salvo señalación que indique lo contrario?",
    answer: "60 Km/h",
    options: [
      "40 Km/h",
      "60 Km/h",
      "80 Km/h"
    ],
    correctIndex: 1
  },
  {
    id: 44,
    category: "Seguridad Vial",
    type: "qa",
    question: "Cuando el casco del motociclista ha recibido un fuerte golpe ¿debe reemplazarlo?",
    answer: "Sí, porque queda resentido y ya no cumple eficazmente su función, aunque el daño no sea visible.",
    options: [
      "No, si no se observan rajaduras externas puede seguir usándose.",
      "Sí, porque queda resentido y ya no cumple eficazmente su función, aunque el daño no sea visible.",
      "Solo si se rompió el visor protector."
    ],
    correctIndex: 1
  },
  {
    id: 45,
    category: "Normativa y Documentación",
    type: "qa",
    question: "La ley de tránsito establece la obligatoriedad de denunciar a la brevedad cualquier cambio de los datos designados en la licencia de conducir. De no denunciarse dicho cambio, ¿al cabo de cuánto tiempo caduca la misma?",
    answer: "90 días.",
    options: [
      "30 días.",
      "60 días.",
      "90 días."
    ],
    correctIndex: 2
  },
  {
    id: 46,
    category: "Seguridad Vial",
    type: "qa",
    question: "Cuando circule de noche, por una vía urbana bien iluminada ¿qué luces debe llevar encendidas en su motocicleta?",
    answer: "La luz de posición y la baja.",
    options: [
      "La luz alta únicamente.",
      "La luz de posición y la baja.",
      "Ninguna si la iluminación pública es suficiente."
    ],
    correctIndex: 1
  },
  {
    id: 47,
    category: "Normativa y Documentación",
    type: "qa",
    question: "¿Qué seguro deben tener los ciclomotores?",
    answer: "Seguro contra terceros en las mismas condiciones que los automotores.",
    options: [
      "No es exigible ningún seguro para ciclomotores.",
      "Seguro contra terceros en las mismas condiciones que los automotores.",
      "Solamente seguro de accidentes personales del conductor."
    ],
    correctIndex: 1
  },
  {
    id: 48,
    category: "Velocidades y Circulación",
    type: "qa",
    question: "¿Cuál es la velocidad máxima para circular en zona rural?",
    answer: "110 km/h.",
    options: [
      "90 km/h.",
      "110 km/h.",
      "130 km/h."
    ],
    correctIndex: 1
  },
  {
    id: 49,
    category: "Seguridad Vial",
    type: "qa",
    question: "Todos los cristales de un vehículo deben garantizar visibilidad:",
    answer: "De dentro hacia afuera y de afuera hacia adentro (ambas direcciones).",
    options: [
      "Solo de dentro hacia afuera.",
      "De dentro hacia afuera y de afuera hacia adentro (ambas direcciones).",
      "No es relevante si el auto cuenta con espejos laterales dobles."
    ],
    correctIndex: 1
  },
  {
    id: 50,
    category: "Prioridades de Paso",
    type: "qa",
    question: "Si la luz verde del semáforo nos da paso en un cruce de calles y por la transversal aún avanza algún vehículo ¿qué debemos hacer?",
    answer: "No iniciar el cruce hasta que los demás vehículos hayan completado el suyo.",
    options: [
      "Avanzar tocando bocina ya que tenemos prioridad.",
      "No iniciar el cruce hasta que los demás vehículos hayan completado el suyo.",
      "Avanzar lentamente obligando al otro vehículo a frenar."
    ],
    correctIndex: 1
  },
  {
    id: 51,
    category: "Velocidades y Circulación",
    type: "qa",
    question: "La velocidad mínima para circular en zona urbana es:",
    answer: "20 km/h.",
    options: [
      "10 km/h.",
      "20 km/h.",
      "30 km/h."
    ],
    correctIndex: 1
  },
  {
    id: 52,
    category: "Maniobras y Circulación",
    type: "qa",
    question: "¿Cuál es el carril de aceleración de una autopista?",
    answer: "El izquierdo.",
    options: [
      "El derecho.",
      "El izquierdo.",
      "El carril central."
    ],
    correctIndex: 1
  },
  {
    id: 53,
    category: "Seguridad Vial",
    type: "qa",
    question: "La instalación del airbag en un vehículo ¿sustituye la obligación de utilizar el cinturón de seguridad?",
    answer: "No, porque actúa complementando la protección que ofrece el cinturón de seguridad.",
    options: [
      "Sí, porque ofrece protección total ante colisiones frontales.",
      "No, porque actúa complementando la protección que ofrece el cinturón de seguridad.",
      "Sí, salvo en rutas o autopistas."
    ],
    correctIndex: 1
  },
  {
    id: 54,
    category: "Normativa y Documentación",
    type: "qa",
    question: "¿Qué distintivo deben llevar colocado en la parte interior del parabrisas y luneta del vehículo, los conductores principiantes?",
    answer: "Están obligados a llevar durante un período de seis (6) meses un distintivo con la palabra principiante en color blanco sobre fondo verde.",
    options: [
      "Un adhesivo con la letra 'P' roja durante un año.",
      "Están obligados a llevar durante un período de seis (6) meses un distintivo con la palabra principiante en color blanco sobre fondo verde.",
      "Una oblea amarilla en el paragolpes durante 3 meses."
    ],
    correctIndex: 1
  },
  {
    id: 55,
    category: "Maniobras y Circulación",
    type: "qa",
    question: "Según la Ley Nº 24.449, en una autopista está prohibido:",
    answer: "Circular marcha atrás.",
    options: [
      "Circular por el carril derecho.",
      "Circular marcha atrás.",
      "Llevar pasajeros en el asiento trasero."
    ],
    correctIndex: 1
  },
  {
    id: 56,
    category: "Prioridades de Paso",
    type: "qa",
    question: "Cuando la luz naranja del semáforo peatonal se torna intermitente ¿qué conducta debe tomar el peatón que espera para cruzar?",
    answer: "No comenzar a cruzar la calzada.",
    options: [
      "Cruzar corriendo rápidamente.",
      "No comenzar a cruzar la calzada.",
      "Avanzar porque tiene derecho preferencial."
    ],
    correctIndex: 1
  },
  {
    id: 57,
    category: "Velocidades y Circulación",
    type: "qa",
    question: "¿Cuál es la velocidad precautoria que indica la ley de tránsito para cruzar un paso a nivel?",
    answer: "20km/h.",
    options: [
      "10 km/h.",
      "20 km/h.",
      "30 km/h."
    ],
    correctIndex: 1
  },
  {
    id: 58,
    category: "Prioridades de Paso",
    type: "qa",
    question: "¿Quién tiene prioridad de paso al ingresar a una autopista?",
    answer: "El que circula por ella.",
    options: [
      "El que ingresa desde el carril de aceleración.",
      "El que circula por ella.",
      "El vehículo que desarrolle mayor velocidad."
    ],
    correctIndex: 1
  },
  {
    id: 59,
    category: "Señalamiento y Estacionamiento",
    type: "qa",
    question: "¿Qué indica la señal Estrella Amarilla?",
    answer: "Indica el lugar donde una o varias personas perdieron la vida a causa de un siniestro vial.",
    options: [
      "Zona de cruce peatonal escolar.",
      "Indica el lugar donde una o varias personas perdieron la vida a causa de un siniestro vial.",
      "Proximidad de una estación de peaje o control policial."
    ],
    correctIndex: 1
  },
  {
    id: 60,
    category: "Señalamiento y Estacionamiento",
    type: "qa",
    question: "La señal Estrella amarilla advierte que en lugar ocurrió un siniestro vial que produjo una víctima fatal.",
    answer: "Verdadero",
    options: ["Verdadero", "Falso"],
    correctIndex: 0
  },
  {
    id: 61,
    category: "Siniestros Viales",
    type: "mc",
    question: "¿A qué factor se deben la mayoría de los siniestros viales?",
    options: [
      "A. Al humano",
      "B. Al vehicular",
      "C. Al ambiental"
    ],
    correctIndex: 0,
    answer: "A. Al humano"
  },
  {
    id: 62,
    category: "Maniobras y Circulación",
    type: "mc",
    question: "¿Qué son los carriles exclusivos?",
    options: [
      "A. Vías con un único sentido de circulación",
      "B. Bandas longitudinales demarcadas en la calzada, destinadas a la circulación de determinados vehículos",
      "C. Lugar donde circulan ambulancias, bomberos y/o vehículos policiales, en cumplimiento o no de sus funciones"
    ],
    correctIndex: 1,
    answer: "B. Bandas longitudinales demarcadas en la calzada, destinadas a la circulación de determinados vehículos"
  },
  {
    id: 63,
    category: "Normativa y Documentación",
    type: "mc",
    question: "El titular de una licencia de conducir debe informar todo cambio de datos consignados en la misma, en especial si se realiza cambio de domicilio. Tiene un plazo máximo de:",
    options: [
      "A. 30 días de producido el cambio",
      "B. 60 días de producido el cambio",
      "C. 90 días de producido el cambio"
    ],
    correctIndex: 2,
    answer: "C. 90 días de producido el cambio"
  },
  {
    id: 64,
    category: "Siniestros Viales",
    type: "mc",
    question: "¿A qué se denomina incidente de tránsito o incidente vial?",
    options: [
      "A. Hecho que puede ser evitado en el cual se produce daño a persona o cosa, en ocasión de circulación en la vía pública.",
      "B. Hecho impredecible e inevitable en ocasión de circulación en la vía pública.",
      "C. Hecho, evitable o no, que involucra a terceros."
    ],
    correctIndex: 0,
    answer: "A. Hecho que puede ser evitado en el cual se produce daño a persona o cosa, en ocasión de circulación en la vía pública."
  },
  {
    id: 65,
    category: "Señalamiento y Estacionamiento",
    type: "mc",
    question: "¿De qué color es la cartelería de Permitido Estacionar?",
    options: [
      "A. Azul",
      "B. Blanco",
      "C. Rojo"
    ],
    correctIndex: 0,
    answer: "A. Azul"
  },
  {
    id: 66,
    category: "Señalamiento y Estacionamiento",
    type: "mc",
    question: "¿Cuál de estas señales es reglamentaria?",
    hasSignalImages: true,
    signalA: "POLICÍA (Informativa, azul)",
    signalB: "PARE (Reglamentaria, octógono rojo)",
    signalC: "ESCOLARES (Preventiva, rombo amarillo)",
    options: [
      "A. Puesto de Policía (Azul informativa)",
      "B. PARE (Octógono rojo)",
      "C. Escolares (Rombo amarillo preventivo)"
    ],
    correctIndex: 1,
    answer: "B. PARE (Octógono rojo)"
  },
  {
    id: 67,
    category: "Prioridades de Paso",
    type: "mc",
    question: "La prioridad de paso de un vehículo se pierde:",
    options: [
      "A. Ante el paso de vehículos de mayor porte",
      "B. Ante vehículos del servicio público de urgencia, en cumplimiento de su misión.",
      "C. Nunca se pierde"
    ],
    correctIndex: 1,
    answer: "B. Ante vehículos del servicio público de urgencia, en cumplimiento de su misión."
  },
  {
    id: 68,
    category: "Normativa y Documentación",
    type: "mc",
    question: "¿Cuánto dura en su totalidad la condición de principiante?",
    options: [
      "A. 2 años, solo en el caso de los menores de 21 años de edad",
      "B. 6 meses, solo para quien la tramita por primera vez",
      "C. 1 año, independientemente de la edad"
    ],
    correctIndex: 1,
    answer: "B. 6 meses, solo para quien la tramita por primera vez"
  },
  {
    id: 69,
    category: "Normativa y Documentación",
    type: "mc",
    question: "La ubicación y posición de las placas de dominio del vehículo, ¿puede sufrir algún tipo de modificación?",
    options: [
      "A. Solo pueden, eventualmente, ampliarse para mejorar su visibilidad",
      "B. No, deben estar colocadas en el lugar y de forma reglamentaria",
      "C. Solo está prohibido modificar la placa de dominio trasera, no así la delantera"
    ],
    correctIndex: 1,
    answer: "B. No, deben estar colocadas en el lugar y de forma reglamentaria"
  },
  {
    id: 70,
    category: "Normativa y Documentación",
    type: "mc",
    question: "Si los datos de la licencia de conducir no coinciden con los datos del DNI...",
    options: [
      "A. No ocurre absolutamente nada",
      "B. La licencia está vigente de todos modos",
      "C. La licencia se encuentra caduca. Salvo que aun este vigente el plazo de gracia."
    ],
    correctIndex: 2,
    answer: "C. La licencia se encuentra caduca. Salvo que aun este vigente el plazo de gracia."
  },
  {
    id: 71,
    category: "Señalamiento y Estacionamiento",
    type: "sign",
    signShape: "diamond_yellow",
    signSymbol: "winding_road",
    question: "Determine qué indica la señal que a continuación se presenta: [Rombo amarillo con trazo negro serpenteante]",
    answer: "Camino sinuoso.",
    options: [
      "Camino sinuoso.",
      "Curva y contracurva cerrada.",
      "Calzada resbaladiza."
    ],
    correctIndex: 0
  },
  {
    id: 72,
    category: "Señalamiento y Estacionamiento",
    type: "sign",
    signShape: "circle_red_arrows",
    signSymbol: "priority_advance",
    question: "Determine qué indica la señal que a continuación se presenta: [Círculo blanco con reborde rojo, flecha negra hacia abajo y flecha roja hacia arriba]",
    answer: "Preferencia de avance.",
    options: [
      "Sentido de circulación obligatorio.",
      "Preferencia de avance.",
      "Prohibido sobrepasar."
    ],
    correctIndex: 1
  },
  {
    id: 73,
    category: "Señalamiento y Estacionamiento",
    type: "sign",
    signShape: "circle_red_arrow_down_left",
    signSymbol: "mandatory_pass",
    question: "Determine qué indica la señal que a continuación se presenta: [Círculo blanco con reborde rojo y flecha negra diagonal apuntando hacia abajo]",
    answer: "Paso obligado.",
    options: [
      "Giro obligatorio a la izquierda.",
      "Paso obligado.",
      "Curva peligrosa."
    ],
    correctIndex: 1
  },
  {
    id: 74,
    category: "Señalamiento y Estacionamiento",
    type: "sign",
    signShape: "triangle_inverted",
    signSymbol: "yield",
    question: "Determine qué indica la señal que a continuación se presenta: [Triángulo invertido blanco con reborde rojo]",
    answer: "Ceda el paso.",
    options: [
      "PARE.",
      "Ceda el paso.",
      "Atención peligro."
    ],
    correctIndex: 1
  },
  {
    id: 75,
    category: "Señalamiento y Estacionamiento",
    type: "sign",
    signShape: "diamond_blue",
    signSymbol: "exclusive_lane",
    question: "Determine qué indica la señal que a continuación se presenta: [Rombo blanco con contorno azul]",
    answer: "Carril exclusivo.",
    options: [
      "Fin de autopista.",
      "Zona de estacionamiento medido.",
      "Carril exclusivo."
    ],
    correctIndex: 2
  },
  {
    id: 76,
    category: "Factores de Riesgo",
    type: "tf",
    question: "El factor ambiental es el principal factor de riesgo ya que las colisiones, en su mayoría, se deben a las condiciones meteorológicas o del camino.",
    options: ["Verdadero.", "Falso."],
    correctIndex: 1,
    answer: "Falso."
  },
  {
    id: 77,
    category: "Normas Generales",
    type: "qa",
    question: "¿Cuáles son los dos principios básicos de todo sistema de tránsito en el mundo?",
    answer: "Fluidez y seguridad.",
    options: [
      "Rapidez y economía.",
      "Fluidez y seguridad.",
      "Control y sanción."
    ],
    correctIndex: 1
  },
  {
    id: 78,
    category: "Seguridad Vial",
    type: "qa",
    question: "¿Qué debe hacer usted si su vehículo queda inmovilizado en un túnel?",
    answer: "Apagar el motor, colocar las balizas portátiles, mantener encendidas las luces de posición e intermitentes y llamar al número de asistencia.",
    options: [
      "Dejar el motor en marcha y salir corriendo fuera del túnel.",
      "Apagar el motor, colocar las balizas portátiles, mantener encendidas las luces de posición e intermitentes y llamar al número de asistencia.",
      "Intentar empujar el coche hasta la salida a contramano."
    ],
    correctIndex: 1
  },
  {
    id: 79,
    category: "Siniestros Viales",
    type: "tf",
    question: "La persona que se da a la fuga en un siniestro vial, dejando a alguien herido, puede ser juzgada por el delito de abandono de persona.",
    options: ["Verdadero.", "Falso."],
    correctIndex: 0,
    answer: "Verdadero."
  },
  {
    id: 80,
    category: "Siniestros Viales",
    type: "qa",
    question: "En caso de participar en un siniestro vial, ¿qué es recomendable hacer como primer paso?",
    answer: "Detenerse inmediatamente y permanecer en el lugar del hecho.",
    options: [
      "Continuar y presentarse en una comisaría al día siguiente.",
      "Detenerse inmediatamente y permanecer en el lugar del hecho.",
      "Mover las partes de los vehículos para despejar la ruta."
    ],
    correctIndex: 1
  },
  {
    id: 81,
    category: "Alcoholemia y Controles",
    type: "qa",
    question: "¿Cuál es el nivel máximo de alcoholemia admitido para un conductor profesional?",
    answer: "0,0 gramos de alcohol por litro de sangre.",
    options: [
      "0,5 gramos de alcohol por litro de sangre.",
      "0,2 gramos de alcohol por litro de sangre.",
      "0,0 gramos de alcohol por litro de sangre."
    ],
    correctIndex: 2
  },
  {
    id: 82,
    category: "Factores de Riesgo",
    type: "qa",
    question: "Indique cuáles son los 5 factores que afectan las condiciones físicas al conducir:",
    answer: "Cansancio, Uso del celular, Bebidas alcohólicas, Drogas y Medicamentos.",
    options: [
      "Cansancio, Uso del celular, Bebidas alcohólicas, Drogas y Medicamentos.",
      "Presión de neumáticos, combustible, aceite, agua y frenos.",
      "Lluvia, granizo, viento, niebla y nieve."
    ],
    correctIndex: 0
  },
  {
    id: 83,
    category: "Normas Generales",
    type: "qa",
    question: "¿Cuáles son las condiciones de sujeción del volante para conducir?",
    answer: "Los automotores serán conducidos con ambas manos sobre el volante de dirección, excepto cuando sea necesario accionar otros comandos.",
    options: [
      "Se puede conducir con una sola mano si se tiene experiencia.",
      "Los automotores serán conducidos con ambas manos sobre el volante de dirección, excepto cuando sea necesario accionar otros comandos.",
      "Es indistinto siempre que el vehículo tenga dirección asistida."
    ],
    correctIndex: 1
  },
  {
    id: 84,
    category: "Señalamiento y Estacionamiento",
    type: "qa",
    question: "¿Dónde debe estacionar un camión con acoplado dentro de la ciudad?",
    answer: "En lugares especialmente habilitados para ello.",
    options: [
      "En cualquier avenida con cordón blanco.",
      "En lugares especialmente habilitados para ello.",
      "Frente al domicilio del chofer durante la noche."
    ],
    correctIndex: 1
  },
  {
    id: 85,
    category: "Maniobras y Circulación",
    type: "qa",
    question: "El ingreso hacia un garaje o estacionamiento, ¿cómo debe ser indicado por el conductor?",
    answer: "Con las luces intermitentes (balizas).",
    options: [
      "Con un toque de bocina repetido.",
      "Con las luces intermitentes (balizas).",
      "Únicamente con las luces altas encendidas."
    ],
    correctIndex: 1
  },
  {
    id: 86,
    category: "Seguridad Vial",
    type: "tf",
    question: "Por lo general, las fallas mecánicas se deben a conductas negligentes por parte de los propietarios de los vehículos, que no se ocupan de la verificación del estado de su automóvil.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 87,
    category: "Normas Generales",
    type: "tf",
    question: "Los ciclistas no están obligados a respetar todas las normas de tránsito, ya que no utilizan un vehículo que genera altas velocidades.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 1,
    answer: "B. Falso."
  },
  {
    id: 88,
    category: "Siniestros Viales",
    type: "tf",
    question: "En caso de participar de un siniestro vial en una avenida, es recomendable señalizar la zona para que no se produzcan más incidentes viales.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 89,
    category: "Siniestros Viales",
    type: "tf",
    question: "En un procedimiento judicial de un siniestro vial, al ser convocados en carácter de testigo, no es obligatorio presentarse a declarar en la Fiscalía correspondiente.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 1,
    answer: "B. Falso."
  },
  {
    id: 90,
    category: "Siniestros Viales",
    type: "tf",
    question: "La persona que se da a la fuga en un siniestro vial, dejando a alguien herido, puede ser juzgada por el delito de abandono de persona.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 91,
    category: "Normativa y Documentación",
    type: "tf",
    question: "El certificado del seguro de responsabilidad civil es obligatorio llevarlo ÚNICAMENTE cuando se conduce por vías interurbanas.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 1,
    answer: "B. Falso."
  },
  {
    id: 92,
    category: "Factores de Riesgo",
    type: "tf",
    question: "Por los efectos que provoca, el consumo de drogas ilegales no está permitido al momento de conducir; mientras que las drogas legales nunca afectan negativamente la capacidad de conducir.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 1,
    answer: "B. Falso."
  },
  {
    id: 93,
    category: "Factores de Riesgo",
    type: "tf",
    question: "Consumir cerveza influye en la conducción de un vehículo, haciendo que el conductor reduzca su capacidad de reacción y aumentando el tiempo necesario para responder ante un estímulo.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 94,
    category: "Factores de Riesgo",
    type: "tf",
    question: "El estrés no necesariamente puede alterar las capacidades para conducir de manera segura.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 1,
    answer: "B. Falso."
  },
  {
    id: 95,
    category: "Normativa y Documentación",
    type: "tf",
    question: "Los Agentes de Tránsito pueden proceder a la detención de un vehículo únicamente con la presencia de personal policial.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 1,
    answer: "B. Falso."
  },
  {
    id: 96,
    category: "Señalamiento y Estacionamiento",
    type: "tf",
    question: "Las señales transitorias señalizan la ejecución de trabajos de construcción y mantenimiento en la vía, o en zonas próximas a las mismas.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 97,
    category: "Señalamiento y Estacionamiento",
    type: "tf",
    question: "La señalización transitoria se encuentra como prioridad normativa sobre los semáforos, si es que modifica el régimen normal de uso de la vía.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 98,
    category: "Señalamiento y Estacionamiento",
    type: "tf",
    question: "Una indicación puede estar expresada con una señal vertical o con una demarcación horizontal, ya que ambas tienen el mismo significado y orden jerárquico.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 1,
    answer: "B. Falso."
  },
  {
    id: 99,
    category: "Maniobras y Circulación",
    type: "tf",
    question: "El vehículo, que circula por el carril destinado al tránsito lento, no puede abandonarlo para sobrepasar a otro vehículo que transita más lento.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 1,
    answer: "B. Falso."
  },
  {
    id: 100,
    category: "Velocidades y Circulación",
    type: "tf",
    question: "Circular a mayor velocidad de la precautoria implica que aumenten las posibilidades de que un siniestro vial sea más grave.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 101,
    category: "Normativa y Documentación",
    type: "tf",
    question: "Un vehículo con emblema internacional para personas con discapacidad puede ser remitido en algunos casos.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 102,
    category: "Señalamiento y Estacionamiento",
    type: "tf",
    question: "Encender las balizas permite detenerse en doble fila por un lapso de tiempo, entre 2 y 5 minutos.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 1,
    answer: "B. Falso."
  },
  {
    id: 103,
    category: "Seguridad Vial",
    type: "tf",
    question: "Circular con la luz alta encendida está prohibido en zonas urbanas.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 104,
    category: "Seguridad Vial",
    type: "tf",
    question: "Una conducción preventiva o anticipada prevé que todos podemos cometer errores, a pesar de conocer la normativa y la concientización gubernamental.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 105,
    category: "Seguridad Vial",
    type: "tf",
    question: "Si los espejos retrovisores de su vehículo están bien orientados, igualmente es posible que se produzcan puntos ciegos cuando observe por los mismos.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 106,
    category: "Género y Convivencia Vial",
    type: "tf",
    question: "El género es la representación que una sociedad determinada atribuye al varón y a la mujer y que no tienen que ver con características biológicas.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 107,
    category: "Género y Convivencia Vial",
    type: "tf",
    question: "La Violencia vial, a veces, es la causa de inseguridad y siniestros viales.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 108,
    category: "Género y Convivencia Vial",
    type: "tf",
    question: "Muchas veces, la diferencia o diversidad se instituye como desigualdad y esa desigualdad, en la mayoría de los ámbitos sociales se traduce en desigualdad de poder.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 109,
    category: "Género y Convivencia Vial",
    type: "tf",
    question: "En nuestro país, los varones tienen el 80% de las licencias de conducir y las mujeres el 20% restante.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 110,
    category: "Género y Convivencia Vial",
    type: "tf",
    question: "Una mujer no puede conducir un camión porque se necesitan características especiales.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 1,
    answer: "B. Falso."
  },
  {
    id: 111,
    category: "Género y Convivencia Vial",
    type: "tf",
    question: "Los estereotipos de género determinan que la mujer debe estar más abocada a tareas de cuidado de la infancia y tercera edad o enseñanza y más alejada de la conducción vehicular.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 112,
    category: "Género y Convivencia Vial",
    type: "tf",
    question: "La violencia vial y el género están íntimamente relacionadas y afectan la forma en que nos movemos.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 113,
    category: "Género y Convivencia Vial",
    type: "tf",
    question: "Los varones 'se desempeñan' o son 'naturalmente mejores' en tareas relacionadas con la conducción.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 1,
    answer: "B. Falso."
  },
  {
    id: 114,
    category: "Género y Convivencia Vial",
    type: "tf",
    question: "Según las estadísticas, las mujeres ocasionan mayores siniestros viales.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 1,
    answer: "B. Falso."
  },
  {
    id: 115,
    category: "Género y Convivencia Vial",
    type: "tf",
    question: "La falta de uso de cinturón de seguridad y el exceso de velocidad son infracciones mayormente cometidas por varones.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 116,
    category: "Género y Convivencia Vial",
    type: "tf",
    question: "El 'buen conducir' para los varones no tiene en cuenta el factor de riesgo ni tampoco el cumplimiento de las normas de tránsito.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  },
  {
    id: 117,
    category: "Género y Convivencia Vial",
    type: "tf",
    question: "La conclusión del estereotipo masculino de conducir es que el volante no es el lugar apropiado para una mujer.",
    options: ["A. Verdadero.", "B. Falso."],
    correctIndex: 0,
    answer: "A. Verdadero."
  }
];

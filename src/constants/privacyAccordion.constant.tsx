import {
  LuInfo,
  LuChartBarStacked,
  LuClipboard,
  LuShield,
  LuLock,
  LuKey,
  LuUserCheck,
  LuMail,
} from "react-icons/lu";

export const privacyOptions = [
  {
    icon: <LuInfo />,
    title: "Introduccion",
    content: `      Fecha de última actualización: [Fecha Actual]

En [Nombre de tu aplicación], respetamos tu privacidad y estamos comprometidos a proteger la información personal que compartes con nosotros. 
Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos tu información cuando utilizas nuestros servicios, incluyendo la integración con Google OAuth 2.0.`,
  },
  {
    icon: <LuChartBarStacked />,
    title: "Información que recopilamos",
    content: `      Cuando utilizas nuestro servicio, podemos recopilar los siguientes tipos de información:

Información proporcionada por el usuario: Al registrarte o iniciar sesión utilizando Google OAuth 2.0, podemos recopilar tu nombre, dirección de correo electrónico y foto de perfil según lo autorizado por tu configuración de privacidad de Google.

Información técnica: Podemos recopilar información sobre tu dispositivo, dirección IP, tipo de navegador y datos de sesión para mejorar la experiencia del usuario.
`,
  },
  {
    icon: <LuClipboard />,
    title: "Cómo utilizamos tu información",
    content: `       La información recopilada se utiliza para los siguientes propósitos:

Proporcionar acceso a nuestro servicio y funcionalidades personalizadas.

Mejorar la calidad y seguridad de nuestra plataforma.

Cumplir con los requisitos legales o regulatorios aplicables.`,
  },
  {
    icon: <LuShield />,
    title: "Compartir tu información",
    content: `        No compartimos tu información personal con terceros, salvo en las siguientes circunstancias:

Proveedores de servicios: Podemos compartir información con terceros que nos ayuden a operar nuestra plataforma, bajo estrictos acuerdos de confidencialidad.

Cumplimiento legal: Cuando sea necesario para cumplir con una obligación legal o proteger nuestros derechos.
`,
  },
  {
    icon: <LuLock />,
    title: "Seguridad de tu información",
    content: `Implementamos medidas técnicas y organizativas para proteger tu información personal contra accesos no autorizados, pérdidas o usos indebidos.`,
  },
  {
    icon: <LuKey />,
    title: "Tus derechos",
    content: `        Tienes derecho a:

Acceder a la información que hemos recopilado sobre ti.

Solicitar la corrección o eliminación de tus datos personales.

Retirar tu consentimiento para el procesamiento de tus datos en cualquier momento.
`,
  },
  {
    icon: <LuUserCheck />,
    title: "Uso de Google OAuth 2.0",
    content: `Nuestra aplicación utiliza Google OAuth 2.0 para autenticar a los usuarios de forma segura. Solo recopilamos información permitida por ti en el proceso de autorización y la utilizamos exclusivamente para los fines descritos en esta política.

Cambios en esta Política de Privacidad

Nos reservamos el derecho de actualizar esta política en cualquier momento. Te notificaremos sobre cambios significativos a través de nuestra plataforma o por correo electrónico.
`,
  },
  {
    icon: <LuMail />,
    title: "Contacto",
    content: ` Si tienes preguntas o inquietudes sobre esta Política de Privacidad, puedes contactarnos a través de:

    Correo electrónico: [Tu correo de contacto] Dirección: [Tu dirección de contacto]

    Gracias por confiar en [Nombre de tu aplicación].`,
  },
];

import { VStack, Text, List } from "@chakra-ui/react";
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

interface PrivacyOption {
  icon: JSX.Element;
  title: string;
  content: JSX.Element;
}
export const PRIVACY_OPTIONS: PrivacyOption[] = [
  {
    icon: <LuInfo />,
    title: "Introduccion",
    content: (
      <VStack alignItems={"self-start"} textAlign={"left"}>
        <Text>Fecha de última actualización: [Fecha Actual]</Text>
        <Text>
          En [Nombre de tu aplicación], respetamos tu privacidad y estamos
          comprometidos a proteger la información personal que compartes con
          nosotros. Esta Política de Privacidad describe cómo recopilamos,
          utilizamos y protegemos tu información cuando utilizas nuestros
          servicios, incluyendo la integración con Google OAuth 2.0.
        </Text>
      </VStack>
    ),
  },
  {
    icon: <LuChartBarStacked />,
    title: "Información que recopilamos",
    content: (
      <VStack alignItems={"self-start"} textAlign={"left"}>
        <Text>
          Cuando utilizas nuestro servicio, podemos recopilar los siguientes
          tipos de información:
        </Text>
        <Text>
          Información proporcionada por el usuario: Al registrarte o iniciar
          sesión utilizando Google OAuth 2.0, podemos recopilar tu nombre,
          dirección de correo electrónico y foto de perfil según lo autorizado
          por tu configuración de privacidad de Google.
        </Text>
        <Text>
          Información técnica: Podemos recopilar información sobre tu
          dispositivo, dirección IP, tipo de navegador y datos de sesión para
          mejorar la experiencia del usuario.
        </Text>
      </VStack>
    ),
  },
  {
    icon: <LuClipboard />,
    title: "Cómo utilizamos tu información",
    content: (
      <VStack alignItems={"self-start"} textAlign={"left"}>
        <Text>
          La información recopilada se utiliza para los siguientes propósitos:
        </Text>
        <List.Root>
          <List.Item>
            Proporcionar acceso a nuestro servicio y funcionalidades
            personalizadas.
          </List.Item>

          <List.Item>
            Mejorar la calidad y seguridad de nuestra plataforma.
          </List.Item>

          <List.Item>
            Cumplir con los requisitos legales o regulatorios aplicables.
          </List.Item>
        </List.Root>
      </VStack>
    ),
  },
  {
    icon: <LuShield />,
    title: "Compartir tu información",
    content: (
      <VStack alignItems={"self-start"} textAlign={"left"}>
        <Text>
          No compartimos tu información personal con terceros, salvo en las
          siguientes circunstancias:
        </Text>

        <List.Root>
          <List.Item>
            Proveedores de servicios: Podemos compartir información con terceros
            que nos ayuden a operar nuestra plataforma, bajo estrictos acuerdos
            de confidencialidad.
          </List.Item>
          <List.Item>
            Cumplimiento legal: Cuando sea necesario para cumplir con una
            obligación legal o proteger nuestros derechos.
          </List.Item>
        </List.Root>
      </VStack>
    ),
  },
  {
    icon: <LuLock />,
    title: "Seguridad de tu información",
    content: (
      <VStack alignItems={"self-start"} textAlign={"left"}>
        <Text>
          Implementamos medidas técnicas y organizativas para proteger tu
          información personal contra accesos no autorizados, pérdidas o usos
          indebidos.
        </Text>
      </VStack>
    ),
  },
  {
    icon: <LuKey />,
    title: "Tus derechos",
    content: (
      <VStack alignItems={"self-start"} textAlign={"left"}>
        <Text>Tienes derecho a:</Text>

        <List.Root>
          <List.Item>
            Acceder a la información que hemos recopilado sobre ti.
          </List.Item>
          <List.Item>
            Solicitar la corrección o eliminación de tus datos personales.
          </List.Item>
          <List.Item>
            Retirar tu consentimiento para el procesamiento de tus datos en
            cualquier momento.
          </List.Item>
        </List.Root>
      </VStack>
    ),
  },
  {
    icon: <LuUserCheck />,
    title: "Uso de Google OAuth 2.0",
    content: (
      <VStack alignItems={"self-start"} textAlign={"left"}>
        <Text>
          Nuestra aplicación utiliza Google OAuth 2.0 para autenticar a los
          usuarios de forma segura. Solo recopilamos información permitida por
          ti en el proceso de autorización y la utilizamos exclusivamente para
          los fines descritos en esta política.
        </Text>

        <Text>Cambios en esta Política de Privacidad</Text>
        <Text>
          Nos reservamos el derecho de actualizar esta política en cualquier
          momento. Te notificaremos sobre cambios significativos a través de
          nuestra plataforma o por correo electrónico.
        </Text>
      </VStack>
    ),
  },
  {
    icon: <LuMail />,
    title: "Contacto",

    content: (
      <VStack alignItems={"self-start"} textAlign={"left"}>
        <Text>
          Si tienes preguntas o inquietudes sobre esta Política de Privacidad,
          puedes contactarnos a través de:
        </Text>
        <Text>
          Correo electrónico: [Tu correo de contacto] Dirección: [Tu dirección
          de contacto]
        </Text>
        <Text>Gracias por confiar en [Nombre de tu aplicación].</Text>
      </VStack>
    ),
  },
];

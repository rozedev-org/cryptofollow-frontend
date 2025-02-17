import { IconButton } from "@chakra-ui/react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { FiHelpCircle } from "react-icons/fi";

export const GuideCurrencyButton = () => {
  const driverCurrency = driver({
    showProgress: true,
    steps: [
      {
        element: "#base",
        popover: {
          title: "Tu Tabla de Monedas",
          description:
            "En esta tabla se mostraran todas las monedas que hayas añadido anteriormente para usarlos en inversiones",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#menu-table",
        popover: {
          title: "Opciones de moneda",
          description:
            "Menú desplegable con opciones para gestionar la moneda, como ver detalles, editar o eliminar.",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#currency",
        popover: {
          title: "Nombre de la criptomoneda",
          description:
            "Muestra el nombre de la criptomoneda registrada en la plataforma.",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#reference",
        popover: {
          title: "Moneda de referencia",
          description:
            "Indica la moneda en la que se cotiza la criptomoneda, como USDT, USD, EUR, etc.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#price",
        popover: {
          title: "Precio de mercado",
          description:
            "Muestra el valor actual de la criptomoneda en la moneda de referencia.",
          side: "bottom",
          align: "start",
        },
      },
    ],
  });
  const handleGuide = () => {
    driverCurrency.drive();
  };
  return (
    <IconButton bg={"#FFFFFF"} color={"black"} onClick={handleGuide}>
      <FiHelpCircle />
    </IconButton>
  );
};

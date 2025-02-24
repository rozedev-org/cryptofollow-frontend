import { IconButton } from "@chakra-ui/react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { FiHelpCircle } from "react-icons/fi";

export const GuideInvestmentButton = () => {
  const driverInvestments = driver({
    showProgress: true,
    steps: [
      {
        element: "#base",
        popover: {
          title: "Tu Tabla de Inversiones",
          description:
            "En esta tabla se mostraran todas las inversiones que hayas añadido",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#menu-table",
        popover: {
          title: "Opciones de inversión",
          description:
            "Menú desplegable con opciones para ver detalles, editar o eliminar la inversión.",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#currency",
        popover: {
          title: "Activo de inversión",
          description:
            "Muestra el nombre y símbolo de la criptomoneda en la que se ha invertido.",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#price",
        popover: {
          title: "Precio actual",
          description: "Indica el valor actual de la criptomoneda en USDT.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#variaton",
        popover: {
          title: "Cambio porcentual",
          description:
            "Representa la variación en el precio del activo en porcentaje, indicando ganancia o pérdida.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#gain",
        popover: {
          title: "Diferencia de inversión",
          description:
            "Muestra la cantidad de ganancia o pérdida en USDT y en la criptomoneda.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#invest",
        popover: {
          title: "Capital invertido",
          description:
            "Indica la cantidad inicial de la inversión en USDT y en la criptomoneda correspondiente.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#import",
        popover: {
          title: "Valor actual",
          description:
            "Representa el valor actual de la inversión en USDT después de la variación del mercado.",
          side: "bottom",
          align: "start",
        },
      },
    ],
  });
  const handleGuide = () => {
    driverInvestments.drive();
  };
  return (
    <IconButton bg={"#FFFFFF"} color={"black"} onClick={handleGuide}>
      <FiHelpCircle />
    </IconButton>
  );
};

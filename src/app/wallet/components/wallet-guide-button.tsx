import { IconButton } from "@chakra-ui/react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { FiHelpCircle } from "react-icons/fi";

export const GuideWalletButton = () => {
  const driverWallet = driver({
    showProgress: true,
    steps: [
      {
        element: "#base",
        popover: {
          title: "Tu Tabla de activos en tu billetera",
          description:
            "En esta tabla se mostraran todas las monedas con las que has hecho minimo una inversion",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#name",
        popover: {
          title: "Activo en billetera",
          description:
            "Se muestra el nombre y símbolo de la criptomoneda que se posee en la billetera.",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#price",
        popover: {
          title: "Precio de mercado",
          description:
            "Indica el valor actual de la criptomoneda en USDT según el mercado.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#variaton",
        popover: {
          title: "Cambio de valor",
          description:
            "Representa el porcentaje de variación del precio de la criptomoneda en un periodo determinado, mostrando ganancia o pérdida.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#gain",
        popover: {
          title: "Diferencia de balance",
          description:
            "Muestra la cantidad de ganancia o pérdida en USDT y en la criptomoneda desde la inversión inicial.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#invest",
        popover: {
          title: "Total invertido",
          description:
            "Indica la cantidad total de dinero invertido en la criptomoneda, expresada en USDT y en la moneda respectiva.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#import",
        popover: {
          title: "Valor actual de la inversión",
          description:
            "Representa el valor total actual de la inversión en USDT después de las variaciones del mercado.",
          side: "bottom",
          align: "start",
        },
      },
    ],
  });
  const handleGuide = () => {
    driverWallet.drive();
  };
  return (
    <IconButton bg={"#FFFFFF"} color={"black"} onClick={handleGuide}>
      <FiHelpCircle />
    </IconButton>
  );
};

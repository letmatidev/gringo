import { useDisclosure } from "@chakra-ui/react";
import React, { useCallback } from "react";

export const useCustomAlert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alertConfig, setAlertConfig] = React.useState({
    title: "Operación exitosa",
    dialog: "Los cambios han sido guardados",
    buttonText: "Aceptar",
    colorScheme: "green",
    onClose,
    action: onClose,
  });

  // Función para mostrar la alerta
  const showAlert = useCallback(
    (config) => {
      config && setAlertConfig((prev) => ({ ...prev, ...config }));
      onOpen();
    },
    [onOpen]
  );

  return {
    showAlert,
    alertConfig,
    isOpenAlert: isOpen,
  };
};

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  InputGroup,
  Input,
  Heading,
  Box,
  InputLeftAddon,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createVidrio, updateVidrio } from "../../firebase";

const EditModal = ({ isOpen, open, item, handleSuccess }) => {
  const [editableItem, setEditableItem] = useState({ name: "", price: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (update) => {
    const handleAction = () => {
      setEditableItem({ name: "", price: 0 });
      open(false);

      update
        ? handleSuccess({
            ...item,
            label: editableItem.name,
            price: editableItem.price,
          })
        : handleSuccess();
    };

    if (item) {
      updateVidrio({
        id: item.value,
        data: editableItem,
        action: () => handleAction(true),
      });
    } else {
      createVidrio({
        data: editableItem,
        action: () => handleAction(),
      });
    }
  };

  useEffect(() => {
    setEditableItem({ name: item?.label, price: item?.price });
  }, [item]);

  return (
    <Modal isOpen={isOpen} onClose={() => open(false)}>
      <ModalOverlay />
      <ModalContent m="10">
        <ModalHeader opacity={0.85} borderBottom="1px" borderColor="#e5ebf2">
          {item ? "Edición" : "Añadir"}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody p="6">
          <Heading as="h4" fontWeight={400} size="md" opacity={0.85} mb="2">
            Tipo
          </Heading>
          <InputGroup size="md" mb="4">
            <Input
              name="name"
              onChange={handleChange}
              value={editableItem.name}
              placeholder="Nombre"
            />
          </InputGroup>

          <Heading as="h4" fontWeight={400} opacity={0.85} size="md" mb="2">
            Precio
          </Heading>
          <InputGroup size="md" mb="4">
            <InputLeftAddon bg="transparent" px="3" py="2">
              <Box h="100%">$</Box>
            </InputLeftAddon>
            <Input
              name="price"
              onChange={handleChange}
              value={editableItem.price}
              type="number"
              placeholder="Precio"
            />
          </InputGroup>
        </ModalBody>

        <ModalFooter>
          <Flex
            gap={2}
            justifyContent={!item ? "flex-end" : "unset"}
            width={"100%"}
          >
            {item && (
              <Button
                isDisabled={true}
                mr={"auto"}
                colorScheme={"red"}
                variant="outline"
                onClick={() => open(false)}
              >
                Eliminar
              </Button>
            )}

            <Button
              opacity={0.85}
              variant="outline"
              onClick={() => open(false)}
            >
              Cancelar
            </Button>
            <Button
              isDisabled={!(editableItem.name && editableItem.price)}
              colorScheme="blue"
              onClick={handleSubmit}
            >
              {item ? "Editar" : "Confirmar"}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;

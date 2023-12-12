"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";
import Select from "react-select";
import { getVidrios } from "../../firebase";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import EditModal from "./EditModal";

const FormComponent = () => {
  const [sizes, setSizes] = useState({ height: 0, width: 0 });
  const [options, setOptions] = useState();
  const [selected, setSelected] = useState();
  const [isOpen, open] = useState();

  const cleanForm = () => {
    setSizes({ height: 0, width: 0 });
    setSelected(null);
  };

  const formatOptions = (options) => {
    return options.map((opt) => ({
      value: opt.id,
      label: opt.name,
      price: opt.price,
    }));
  };

  const getSelectValue = (selectedOption) => {
    setSelected(selectedOption);
  };

  const getTotal = () => {
    if (selected?.price && sizes.height && sizes.width) {
      return (selected?.price * sizes.height * sizes.width) / 10000;
    }

    return 0;
  };

  const handleChange = (e) => {
    const newValue =
      e.target.value === "0" ? "" : e.target.value.replace(/^0+/, "");
    setSizes((prev) => ({ ...prev, [e.target.name]: newValue }));
  };

  const handleSuccess = (newData) => {
    getVidrios().then((data) => setOptions(formatOptions(data)));

    newData && setSelected(newData);
  };

  useEffect(() => {
    getVidrios().then((data) => setOptions(formatOptions(data)));
  }, []);

  return (
    <Flex
      direction="column"
      align="center"
      justify="space-between"
      py="4"
      h="90dvh"
    >
      <Flex direction="column">
        <Box className="w-full">
          <Heading
            as="h4"
            fontWeight={400}
            size="lg"
            opacity={0.85}
            mb="2"
            mt={4}
          >
            Vidrios
          </Heading>

          <Flex align="center" mb="10" gap="4">
            <Select
              instanceId={1}
              className="w-full focus:outline-none focus:border-blue-500"
              options={options}
              value={selected}
              onChange={getSelectValue}
              key="vidrios"
              borderColor="red"
              placeholder="Tipo de vidrio"
            />

            <Button
              onClick={() => open(true)}
              background={"none"}
              isDisabled={!selected}
            >
              <EditIcon fontSize={24} color={"#327fcb"} />
            </Button>

            <Button
              onClick={() => {
                open(true);
                cleanForm();
              }}
              background={"none"}
            >
              <AddIcon fontSize={24} color={"#2f865d"} />
            </Button>
          </Flex>
        </Box>

        <Flex justify="space-between" gap="6" align="center" mb="3">
          <Box>
            <Heading as="h4" fontWeight={400} size="md" opacity={0.85} mb="2">
              Alto
            </Heading>
            <InputGroup size="md" mb="4">
              <Input
                name="height"
                onChange={handleChange}
                value={sizes.height}
                type="number"
                placeholder="Alto"
              />
              <InputRightAddon bg="transparent" p="2">
                <Box h="100%">mm</Box>
              </InputRightAddon>
            </InputGroup>
          </Box>

          <Box>
            <Heading as="h4" fontWeight={400} opacity={0.85} size="md" mb="2">
              Ancho
            </Heading>
            <InputGroup size="md" mb="4">
              <Input
                name="width"
                onChange={handleChange}
                value={sizes.width}
                type="number"
                placeholder="Ancho"
              />
              <InputRightAddon bg="transparent" p="2">
                <Box h="100%">mm</Box>
              </InputRightAddon>
            </InputGroup>
          </Box>
        </Flex>

        <Box>
          <Heading as="h4" fontWeight={400} opacity={0.85} size="md" mb="2">
            Total
          </Heading>
          <InputGroup size="md" mb="4">
            <InputLeftAddon bg="transparent" px="3" py="2">
              <Box h="100%">$</Box>
            </InputLeftAddon>
            <Input
              value={getTotal()}
              readOnly={true}
              type="number"
              placeholder="Total"
            />
          </InputGroup>
        </Box>
      </Flex>

      <Flex mb={3} gap={5}>
        <Button
          isDisabled={!(sizes.height || sizes.width || selected)}
          onClick={cleanForm}
          variant="outline"
          p={6}
          w={100}
          opacity={0.85}
        >
          Limpiar
        </Button>
        <Button
          // isDisabled={!(sizes.height && sizes.width && selected)}
          isDisabled
          colorScheme="blue"
          p={6}
          w={200}
        >
          Confirmar
        </Button>
      </Flex>

      <EditModal
        isOpen={isOpen}
        open={open}
        item={selected}
        handleSuccess={handleSuccess}
      />
    </Flex>
  );
};

export default FormComponent;

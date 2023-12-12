"use client";

import { useState } from "react";
import {
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Flex
      align="center"
      height="10dvh"
      justify="space-between"
      borderBottom="1px"
      borderColor="#e5ebf2"
      position="relative"
    >
      <Heading fontWeight={400} opacity={0.85} textAlign="center" w="100%">
        El Gringo
      </Heading>

      <Menu autoSelect={false}>
        <MenuButton
          as={IconButton}
          icon={<HamburgerIcon fontSize="2rem" color={"#327fcb"} />}
          aria-label="Abrir menú"
          variant="ghost"
          colorScheme="blue"
          boxSize="3rem"
          size="lg"
          position="absolute"
          right="2"
          onClick={handleToggle}
        />
        <MenuList p="0">
          <Link href="/">
            <MenuItem py="3" opacity={0.85} borderBottom="1px" borderColor="#e5ebf2">
              Venta
            </MenuItem>
          </Link>
          <Link href="/pedidos">
            <MenuItem isDisabled py="3" borderBottom="1px" borderColor="#e5ebf2">
              Pedidos
            </MenuItem>
          </Link>
          <MenuItem isDisabled py="3">Clientes</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Header;

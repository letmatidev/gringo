import React from "react";
import { Flex, Container, Box, Heading } from "@chakra-ui/react";

const OrderView = () => {
  return (
    <Container>
      <Flex
        direction="column"
        align="center"
        justify="space-between"
        py="4"
        h="90dvh"
      >
        <Box>
          <Heading as="h4" textAlign="left" fontWeight={400} opacity={0.85} size="md" mb="2">
            Total
          </Heading>
        </Box>
      </Flex>
    </Container>
  );
};

export default OrderView;

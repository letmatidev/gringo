import React from 'react';
import { Flex, Container } from '@chakra-ui/react';
import FormComponent from './FormComponent';

const MainView = () => {
  return (
    <Container>
      <Flex align="center" justify="start">
        <FormComponent />
      </Flex>
    </Container>
  );
};

export default MainView;

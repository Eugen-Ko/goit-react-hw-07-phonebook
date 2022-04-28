import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useEditHook } from 'hooks/Hooks';
import {
  Flex,
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  Input,
  Button,
  Center,
} from '@chakra-ui/react';
import { MdContacts, MdEmail, MdPhoneInTalk } from 'react-icons/md';
import {
  useCreateContactMutation,
  useEditContactMutation,
} from 'redux/Reducers/contactsApi';
import toast from 'react-hot-toast';

export const Edit = () => {
  const filter = '';
  let navigate = useNavigate();
  const [createContact, { isLoading, isSuccess }] = useCreateContactMutation();

  console.log(isLoading, isSuccess);
  const [editContact] = useEditContactMutation();

  const { fields, contacts, params } = useEditHook();
  const { title, createdAt, id, name, email, phone } = fields;

  const valuesForFields = [
    { icon: MdContacts, name: 'name', type: 'name', field: name },
    { icon: MdEmail, name: 'email', type: 'email', field: email },
    { icon: MdPhoneInTalk, name: 'phone', type: 'text', field: phone },
  ];

  return (
    <Flex justify="center" h="100vh" p={4}>
      <Box
        p={6}
        rounded="md"
        w="sm"
        h="380px"
        border="3px"
        borderStyle="ridge"
        bg="#fffdde"
      >
        <Heading
          mb={5}
          p={2}
          w="100%"
          borderWidth="3px"
          borderRadius="lg"
          borderStyle="ridge"
          align="center"
          color="#5b0c9c"
          fontSize="20px"
          fontWeight="700"
        >
          {`${title}`}
        </Heading>
        <Formik
          initialValues={{
            name: name,
            email: email,
            phone: phone,
          }}
          validate={values => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Required';
            } else if (
              contacts.filter(
                ({ name }) =>
                  name.toLowerCase().trim() === values.name.toLowerCase().trim()
              ).length !== 0 &&
              !params.id
            ) {
              errors.name = 'This name is already in the list';
            }

            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }

            if (!values.phone) {
              errors.phone = 'Required';
            } else if (
              !/^[0-9]{1,3}-.[0-9]{1,3}-.[0-9]{1,4}$/i.test(values.phone)
            ) {
              errors.phone = 'Invalid phone number';
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            if (!params.id) {
              createContact({
                createdAt,
                id,
                ...values,
              });
              toast.success(`Contact ${values.name} was create.`);
            } else {
              editContact({ createdAt, id, ...values });
              toast.success(`Contact ${values.name} was edit.`);
            }

            navigate('/');
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <List>
                {valuesForFields.map(({ icon, name, type, field }) => {
                  console.log(name, type);
                  return (
                    <ListItem key={`${name}`}>
                      <Flex>
                        <ListIcon
                          as={icon}
                          color="green.500"
                          m="12px auto auto auto"
                        />
                        <Field
                          as={Input}
                          bg="#fffdde"
                          variant="flushed"
                          m="0 0 5px 16px"
                          p={2}
                          type={`${type}`}
                          name={`${name}`}
                          placeholder={`${field}`}
                        />
                      </Flex>
                      <Box
                        fontSize="13px"
                        align="center"
                        w="100%"
                        h={5}
                        color="red"
                        mb={3}
                      >
                        <ErrorMessage name={`${name}`} />
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
              <Center>
                <Button
                  type="submit"
                  width="100px"
                  h={6}
                  mr={4}
                  colorScheme="blue"
                  boxShadow="0px 10px 13px -7px #000000"
                  variant="solid"
                >
                  Submit
                </Button>
                <Button
                  width="100px"
                  h={6}
                  colorScheme="pink"
                  boxShadow="0px 10px 13px -7px #000000"
                  variant="solid"
                  onClick={() =>
                    filter !== '' && !filter ? navigate(-1) : navigate('/')
                  }
                >
                  Cancel
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

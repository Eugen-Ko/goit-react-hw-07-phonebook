import { useEffect, useState } from 'react';
import { useFetchContactsQuery } from 'redux/Reducers/contactsApi';
import { useParams, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

//------------------------------------------------------------------

export const useHomeHook = filter => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const { data: contacts, isFetching } = useFetchContactsQuery();
  useEffect(() => {
    filter !== ''
      ? setList(
          contacts.filter(({ name }) => name.toLowerCase().includes(filter))
        )
      : setList(contacts);
  }, [contacts, filter]);

  useEffect(() => {
    filter !== '' ? navigate(`?query=${filter}`) : navigate(`/`);
  }, [filter, navigate]);
  return { list, isFetching };
};

//-------------------------------------------------------------------

export const useEditHook = () => {
  const params = useParams();
  const { data: contacts } = useFetchContactsQuery();
  console.log(contacts);
  const fields = !params?.id
    ? {
        createdAt: new Date().toISOString(),
        id: nanoid(),
        title: `Add Contact : `,
        name: 'Sebastian Pereiro',
        email: 'vasiya@rus.net',
        phone: '000-000-0000',
      }
    : {
        title: `Edit contact: `,
        ...contacts.find(({ id }) => id === params.id),
      };
  return { fields, contacts, params };
};

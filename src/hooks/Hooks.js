import { useEffect, useState } from 'react';
import { useFetchContactsQuery } from 'redux/Reducers/contactsApi';
import { useParams, useNavigate } from 'react-router-dom';

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
  console.log(contacts);
  return { list, isFetching };
};

//-------------------------------------------------------------------

export const useEditHook = () => {
  const contacts = useFetchContactsQuery();
  const params = useParams();
  const fields = !params?.id
    ? {
        id: null,
        title: `Add Contact : `,
        name: 'Sebastian Pereiro',
        email: 'vasiya@rus.net',
        phone: '000-000-0000',
      }
    : {
        title: `Edit Contact # ${
          contacts.find(el => el.id === params.id).name
        }`,
        ...contacts.find(el => el.id === params.id),
      };
  return fields;
};

//--------------------------------------------------------------------

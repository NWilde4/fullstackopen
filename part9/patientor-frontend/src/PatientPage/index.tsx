import React from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Header, Icon, Button } from "semantic-ui-react";

import EntryDetails from './EntryDetails';
import AddEntryModal from "../AddEntryModal";
import { Patient, Entry, NewEntry } from "../types";
import { apiBaseUrl } from "../constants";

import { useStateValue, setCurrentPatient, addNewEntry } from "../state";


const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ currentPatient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries/`,
        values
      );
      dispatch(addNewEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientDataFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        if (!currentPatient || currentPatient.id !== id) {
          dispatch(setCurrentPatient(patientDataFromApi));
        }
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, []);

  if (!currentPatient) {
    return <div>loading</div>;
  }

  const getGenderIcon = () => {
    switch (currentPatient.gender) {
      case "male":
        return "mars";
      case "female":
        return "venus";
      default:
        return "genderless";
    }
  };

  return(
    <div>
      <Header as="h2">
        {currentPatient.name}
        <Icon name={getGenderIcon()}></Icon>
      </Header>
      ssn: {currentPatient.ssn}
      <br/>
      occupation: {currentPatient.occupation}
      <Header as="h3">entries</Header>
      {currentPatient.entries.map((entry: Entry) => (
        <EntryDetails entry={entry} key={entry.id}/>
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;
import React, { useState } from 'react';
import { Modal, Segment, Form } from 'semantic-ui-react';

import AddHospitalEntryForm from './AddHospitalEntryForm';
import AddHealthCheckEntryForm from './AddHealthCheckEntryForm';
import AddOccupationalHealthcareEntryForm from './AddOccupationalHealthcareEntryForm';
import { NewEntry } from "../types";
import { TypeOption } from "./FormField";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const typeOptions: TypeOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" }
];

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [currentType, setCurrentType] = useState('Hospital');
  console.log(currentType);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setCurrentType(event.target.value);
  };

  let EntryFormByType;
  if (currentType === 'Hospital') {
    EntryFormByType = <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />;
  } else if (currentType === 'OccupationalHealthcare') {
    EntryFormByType = <AddOccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />;      
  } else if (currentType === 'HealthCheck') {
    EntryFormByType = <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />;      
  }

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <Form>
          <Form.Field>
            <label>Type</label>
            <select className="ui dropdown" onChange={handleTypeChange}>
              {typeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Form.Field>
        </Form>
        {EntryFormByType}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
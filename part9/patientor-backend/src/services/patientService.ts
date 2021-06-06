import { v1 as uuid } from 'uuid';

import data from '../../data/patients';
import toNewPatient from '../utils';
import { Patient, PatientWithoutSsn, NewPatient, Entry, NewEntry } from '../types';

// Below is to make sure that the fetched data conforms
// to the type of Patient, which has e.g. enums.
// Use 'as Patient' to tell the compiler that they are the same form.
// Id and entries have to be added because toNewPatient doesn't return one.
const patientData: Patient[] = data.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  object.entries = obj.entries;
  return object;
});

const getPatients = (): Patient[] => {
  return patientData;
}

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}

const getPatientById = (id: string): Patient | undefined => {
  const patient = patientData.find(patient => patient.id === id);
  return patient;
}

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient
  }

  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  }
  patientData.forEach(patient => {
    if (patient.id === patientId) {
      patient.entries.push(newEntry);
    };
  });

  return newEntry;
};

export default {
  getPatients,
  getPatientsWithoutSsn,
  getPatientById,
  addPatient,
  addEntry
}
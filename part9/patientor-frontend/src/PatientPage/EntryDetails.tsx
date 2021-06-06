import React from 'react';
import { 
  Entry, 
  HospitalEntry, 
  OccupationalHealthcareEntry, 
  HealthCheckEntry,
  HealthCheckRating
} from "../types";
import { Segment, Header, List, Icon } from 'semantic-ui-react';
import { useStateValue } from "../state";


const getDiagnosisName = (diagnosisCode: string): string => {
  const [{ diagnoses }] = useStateValue();
  const diagnose = diagnoses.find(diagnose => diagnose.code === diagnosisCode);
  if (diagnose) {
    return diagnose.name;
  } else {
    return "";
  }
};

const getHealthCheckRatingName = (healthCheckRating: HealthCheckRating) => {
  switch (healthCheckRating) {
    case 3:
      return "Critical Risk";
    case 2:
      return "High Risk";
    case 1:
      return "Low Risk";
    case 0:
      return "Healthy";
    default:
      return "n/a";
  }
};


const HospitalEntryComponent = ({ entry }: {entry: HospitalEntry}) => {
  return (
    <Segment>
      <Header as="h3">
        {entry.date} 
        <Icon name="hospital symbol"></Icon>
      </Header>
      <p>{entry.description}</p>     
      {entry.diagnosisCodes && 
        <List>
          {entry.diagnosisCodes.map(diagnosisCode => {
            return (
              <li key={diagnosisCode}>
                Diagnosis: {diagnosisCode} - {getDiagnosisName(diagnosisCode)}
              </li>
            );
          })}
        </List>
      }
      <p>Discharge: {entry.discharge.date} {entry.discharge.criteria}</p>
    </Segment>
  );
};

const HealthCheckEntryComponent = ({ entry }: {entry: HealthCheckEntry}) => {
  return (
    <Segment>
      <Header as="h3">
        {entry.date} 
        <Icon name="doctor"></Icon>
      </Header>
      <p>{entry.description}</p>     
      {entry.diagnosisCodes && 
        <List>
          {entry.diagnosisCodes.map(diagnosisCode => {
            return (
              <li key={diagnosisCode}>
                Diagnosis: {diagnosisCode} - {getDiagnosisName(diagnosisCode)}
              </li>
            );
          })}
        </List>
      }
      <p>Health Check Rating: {getHealthCheckRatingName(entry.healthCheckRating)}</p>
    </Segment>
  );
};

const OccupationalHealthcareEntryComponent = ({ entry }: {entry: OccupationalHealthcareEntry}) => {
  return (
    <Segment>
      <Header as="h3">
        {entry.date} 
        <Icon name="book"></Icon>
      </Header>
      <p>{entry.description}</p>     
      {entry.diagnosisCodes && 
        <List>
          {entry.diagnosisCodes.map(diagnosisCode => {
            return (
              <li key={diagnosisCode}>
                Diagnosis: {diagnosisCode} - {getDiagnosisName(diagnosisCode)}
              </li>
            );
          })}
        </List>
      }
      <p>Employer: {entry.employerName}</p>
      {entry.sickLeave &&   
        <p>
          Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </p>
      }
    </Segment>
  );
};

// const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
// const EntryDetails = (props: {entry: Entry}) => {
const EntryDetails = ({ entry }: {entry: Entry}) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComponent entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryComponent entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryComponent entry={entry} />;
    default:
      return null;
  }
};

export default EntryDetails;
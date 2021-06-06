import diagnoseData from '../../data/diagnoses.json';

import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return diagnoseData;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis
}
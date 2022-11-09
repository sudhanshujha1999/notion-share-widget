import { accessLevelTypes } from "app/types/common.schema";

export const accessLevels: { [key in accessLevelTypes]: string } = { fa: 'Full access', ce: 'Can edit', cv: 'Can view', na: 'No access' }
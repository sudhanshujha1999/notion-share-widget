import { accessLevelTypes } from "./common.schema";

export interface EntityTypes {
    id: string;
    name: string;
    access: accessLevelTypes;
    members?: string[];
    img?: string;
    email?: string;
}

export interface EntityCollectionTypes {
    [id: string]: EntityTypes
}
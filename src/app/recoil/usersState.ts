import { atom } from "recoil";
import { groups, members, organization } from "app/mockData/users";
import { EntityCollectionTypes, EntityTypes } from "app/types/search.schema";

export const membersState = atom({
    key: 'membersState',
    default: members as EntityCollectionTypes,
    dangerouslyAllowMutability: true,
});

export const groupsState = atom({
    key: 'groupsState',
    default: groups as EntityCollectionTypes,
    dangerouslyAllowMutability: true,
});

export const organizationState = atom({
    key: 'organizationState',
    default: organization as EntityTypes,
    dangerouslyAllowMutability: true,
});
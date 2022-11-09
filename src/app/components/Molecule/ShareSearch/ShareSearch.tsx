import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import { EntityTypes, EntityCollectionTypes } from 'app/types/search.schema';
import { accessLevelTypes } from 'app/types/common.schema';
import { groupsState, membersState } from 'app/recoil/usersState';
import Pill from 'app/components/Atom/Pill';
import CustomMenu from 'app/components/Atom/CustomMenu';

const SearchContainer = styled(Box)`
  position: relative;
  border-radius: 8px 8px 0px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background: #f3f4f6;
`;

const InviteButton = styled(Button)`
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  text-transform: none;
  padding: 5.5px 12px;
  margin-left: 12px;
`;

const ItemContainer = styled(Box)`
  padding: 6px 4px;
  display: flex;
  flexdirection: row;
  alignitems: center;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    background: rgba(55, 53, 47, 0.08);
  }
`;

interface ShareSearchProps {
  setShowSearch: CallableFunction;
}

const ShareSearch: FC<ShareSearchProps> = ({ setShowSearch }) => {
  const [membersRecoilState, setMembersRecoilState] =
    useRecoilState(membersState);
  const [groupsRecoilState, setGroupsRecoilState] = useRecoilState(groupsState);

  const [selectedEntities, setSelectedEntities] =
    useState<EntityCollectionTypes>({});
  const [selectedAccess, setSelectedAccess] = useState<accessLevelTypes>('fa');

  const addSelectedEntity = (entity: EntityTypes) => {
    setSelectedEntities((pre) => {
      return { ...pre, [entity.id]: entity };
    });
  };

  const removeSelectedEntity = (id: string) => {
    setSelectedEntities((pre) => {
      const copy = { ...pre };
      delete copy[id];
      return copy;
    });
  };

  const handleInvite = () => {
    Object.keys(selectedEntities).map((id) => {
      if (id.startsWith('m')) {
        setMembersRecoilState((pre) => ({
          ...pre,
          [id]: { ...pre[id], access: selectedAccess },
        }));
      } else {
        setGroupsRecoilState((pre) => ({
          ...pre,
          [id]: { ...pre[id], access: selectedAccess },
        }));
      }
    });
    setShowSearch(false);
  };

  const SearchBar = () => {
    return (
      <SearchContainer>
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          gap="0.5rem"
          sx={{ flexWrap: 'wrap' }}
        >
          {Object.values(selectedEntities).map((entity) => (
            <Pill entity={entity} removePill={removeSelectedEntity} />
          ))}
          <Box
            minWidth={
              Object.keys(selectedEntities).length > 0
                ? '5rem'
                : 'max(15rem, 100%)'
            }
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <TextField
              variant="standard"
              margin="none"
              required
              fullWidth
              autoFocus
              size="small"
              // onChange={handlePhoneNumberChange}
              placeholder={
                Object.keys(selectedEntities).length > 0
                  ? 'Search'
                  : 'Search emails, names or groups'
              }
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          marginLeft="auto"
          sx={{ float: 'right' }}
        >
          <CustomMenu value={selectedAccess} setValue={setSelectedAccess} />
          <InviteButton onClick={handleInvite}>Invite</InviteButton>
        </Box>
      </SearchContainer>
    );
  };

  const renderPerson = () => {
    const membersToShow = Object.values(membersRecoilState);
    return (
      <Box display="flex" flexDirection="column" marginBottom="16px">
        <Typography
          color="primary"
          fontSize="16px"
          lineHeight="24px"
          fontWeight="500"
          marginBottom="4px"
        >
          Select a person
        </Typography>
        {membersToShow.map((member) => (
          <ItemContainer
            key={member.name + member.img}
            onClick={() => addSelectedEntity(member)}
          >
            <img
              width="24px"
              height="24px"
              style={{ borderRadius: '50%' }}
              src={member.img}
              alt="Person"
            />
            <Typography
              color="primary"
              fontSize="16px"
              lineHeight="24px"
              marginLeft="12px"
            >
              {member.name}
            </Typography>
          </ItemContainer>
        ))}
      </Box>
    );
  };

  const renderGroup = () => {
    const groupsToShow = Object.values(groupsRecoilState);

    return (
      <Box display="flex" flexDirection="column">
        <Typography
          color="primary"
          fontSize="16px"
          lineHeight="24px"
          fontWeight="500"
          marginBottom="4px"
        >
          Select a group
        </Typography>
        {groupsToShow.map((group) => (
          <ItemContainer
            key={group.id}
            onClick={() => addSelectedEntity(group)}
          >
            <Box
              width="24px"
              height="24px"
              borderRadius="6px"
              fontSize="14px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ background: '#6B7280' }}
            >
              {group.name.charAt(0).toUpperCase()}
            </Box>
            <Typography
              color="primary"
              fontSize="16px"
              lineHeight="24px"
              marginLeft="12px"
            >
              {group.name}
            </Typography>
          </ItemContainer>
        ))}
      </Box>
    );
  };

  return (
    <Box>
      {SearchBar()}
      <Box padding="16px 28px">
        {renderPerson()}
        {renderGroup()}
      </Box>
    </Box>
  );
};

export default ShareSearch;

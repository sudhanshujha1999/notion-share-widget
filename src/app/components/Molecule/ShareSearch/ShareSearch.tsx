import { Box, Button, TextField } from '@mui/material';
import { FC, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import { EntityTypes, EntityCollectionTypes } from 'app/types/search.schema';
import { accessLevelTypes } from 'app/types/common.schema';
import { groupsState, membersState } from 'app/recoil/usersState';
import Pill from 'app/components/Atom/Pill';
import CustomMenu from 'app/components/Atom/CustomMenu';
import ShowEntities from 'app/components/Atom/ShowEntities';

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

interface ShareSearchProps {
  setShowSearch: CallableFunction;
}

const ShareSearch: FC<ShareSearchProps> = ({ setShowSearch }) => {
  const [membersRecoilState, setMembersRecoilState] =
    useRecoilState(membersState);
  const [groupsRecoilState, setGroupsRecoilState] = useRecoilState(groupsState);
  const searchRef = useRef<HTMLDivElement>();

  const [filteredMembersList, setFilteredMembersList] = useState<EntityTypes[]>(
    Object.values(membersRecoilState)
  );
  const [filteredGroupsList, setFilteredGroupsList] = useState<EntityTypes[]>(
    Object.values(groupsRecoilState)
  );

  const [selectedEntities, setSelectedEntities] =
    useState<EntityCollectionTypes>({});
  const [selectedAccess, setSelectedAccess] = useState<accessLevelTypes>('fa');

  const filterData = (
    data: EntityTypes[],
    searchValue: string,
    setState: CallableFunction
  ) => {
    const filteredData = data?.filter((item) => {
      return (item.name.split(' ').join('') + item.email)
        .toLowerCase()
        .includes(searchValue.replace(/ /g, '').toLowerCase());
    });
    if (filteredData) setState(filteredData);
  };

  const handleSearchInput = (searchValue: string) => {
    if (searchValue !== '') {
      filterData(
        Object.values(membersRecoilState),
        searchValue,
        setFilteredMembersList
      );
      filterData(
        Object.values(groupsRecoilState),
        searchValue,
        setFilteredGroupsList
      );
    } else {
      setFilteredMembersList(Object.values(membersRecoilState));
      setFilteredGroupsList(Object.values(groupsRecoilState));
    }
  };

  // this is to clear the search field, add focus to it and remove the older search results
  const resetSearch = () => {
    if (searchRef.current) {
      (searchRef.current.children[0] as HTMLInputElement).value = '';
      (searchRef.current.children[0] as HTMLInputElement).focus();
      handleSearchInput('');
    }
  };

  const addSelectedEntity = (entity: EntityTypes) => {
    setSelectedEntities((pre) => {
      return { ...pre, [entity.id]: entity };
    });
    resetSearch();
  };

  const removeSelectedEntity = (id: string) => {
    setSelectedEntities((pre) => {
      const copy = { ...pre };
      delete copy[id];
      return copy;
    });
    resetSearch();
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
            <Pill
              key={entity.id}
              entity={entity}
              removePill={removeSelectedEntity}
            />
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
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder={
                Object.keys(selectedEntities).length > 0
                  ? 'Search'
                  : 'Search emails, names or groups'
              }
              InputProps={{
                disableUnderline: true,
                ref: searchRef,
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

  return (
    <Box>
      {SearchBar()}
      <Box padding="16px 28px">
        <ShowEntities
          membersToShow={filteredMembersList}
          groupsToShow={filteredGroupsList}
          addSelectedEntity={addSelectedEntity}
        />
      </Box>
    </Box>
  );
};

export default ShareSearch;

import { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

import useKeyPress from 'app/Hooks/useKeyPress';
import { EntityTypes } from 'app/types/search.schema';

const ItemContainer = styled(Box)<{ active?: Boolean }>`
  padding: 6px 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  background: ${({ active }) =>
    active ? 'rgba(55, 53, 47, 0.08)' : 'inherit'};
  :hover {
    background: rgba(55, 53, 47, 0.08);
  }
`;

interface ShowEntitiesProps {
  membersToShow: EntityTypes[];
  groupsToShow: EntityTypes[];
  addSelectedEntity: CallableFunction;
}

const ShowEntities: FC<ShowEntitiesProps> = ({
  membersToShow,
  groupsToShow,
  addSelectedEntity,
}) => {
  const downPress = useKeyPress('ArrowDown');
  const upPress = useKeyPress('ArrowUp');
  const enterPress = useKeyPress('Enter');
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState<EntityTypes | undefined>(undefined);
  const entityLength = membersToShow.length + groupsToShow.length;

  useEffect(() => {
    setCursor(0);
  }, [entityLength]);

  useEffect(() => {
    if (entityLength && downPress) {
      setCursor((prevState) =>
        prevState < entityLength - 1 ? prevState + 1 : prevState
      );
    }
  }, [entityLength, downPress]);

  useEffect(() => {
    if (entityLength && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [entityLength, upPress]);

  useEffect(() => {
    if (entityLength && enterPress) {
      console.log('adding');
      addSelectedEntity(
        cursor >= membersToShow.length
          ? groupsToShow[cursor - membersToShow.length]
          : membersToShow[cursor]
      );
    }
  }, [enterPress]);

  useEffect(() => {
    if (entityLength && hovered) {
      setCursor(
        groupsToShow.indexOf(hovered) !== -1
          ? membersToShow.length + groupsToShow.indexOf(hovered)
          : membersToShow.indexOf(hovered)
      );
    }
  }, [membersToShow, groupsToShow, entityLength, hovered]);

  const renderPerson = () => {
    if (membersToShow.length === 0) return null;
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
        {membersToShow.map((member, i) => (
          <ItemContainer
            key={i}
            active={i === cursor}
            onClick={() => addSelectedEntity(member)}
            onMouseEnter={() => setHovered(member)}
            onMouseLeave={() => setHovered(undefined)}
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
    if (groupsToShow.length === 0) return null;
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
        {groupsToShow.map((group, i) => (
          <ItemContainer
            key={i}
            active={i + membersToShow.length === cursor}
            onClick={() => addSelectedEntity(group)}
            onMouseEnter={() => setHovered(group)}
            onMouseLeave={() => setHovered(undefined)}
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
      {renderPerson()}
      {renderGroup()}
    </Box>
  );
};

export default ShowEntities;

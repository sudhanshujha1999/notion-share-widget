import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import styled from '@emotion/styled';

import CrossIcon from 'asset/cross.svg';
import { EntityTypes } from 'app/types/search.schema';

const Container = styled(Box)`
  width: fit-content;
  padding: 4px 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  background: #e5e7eb;
`;

interface PillProps {
  entity: EntityTypes;
  removePill: CallableFunction;
}

const Pill: FC<PillProps> = ({ entity, removePill }) => {
  return (
    <Container>
      <Typography
        color="primary"
        fontSize="14px"
        lineHeight="20px"
        marginRight="8px"
      >
        {entity.name}
      </Typography>
      <IconButton
        sx={{ width: '16px', height: '16px' }}
        onClick={() => removePill(entity.id)}
      >
        <img src={CrossIcon} alt="x" />
      </IconButton>
    </Container>
  );
};

export default Pill;

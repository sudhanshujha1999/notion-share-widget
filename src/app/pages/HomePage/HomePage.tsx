import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';

import ShareIcon from '../../../asset/share.svg';

const ShareButton = styled(Button)`
  padding: 8px 16px;
  color: #ffffff;
  border-radius: 4px;
  gap: 8px;
  width: fit-content;
  height: 36px;
  text-transform: none;
  margin-top: clamp(12px, 2vw, 24px);
`;

const HomePage: FC = () => {
  return (
    <Box padding="clamp(12px,7vw, 124px)" display="flex" flexDirection="column">
      <Typography color="primary" fontSize="24px">
        Click on Share button
      </Typography>
      <ShareButton color="primary" variant="outlined">
        Share
        <img src={ShareIcon} alt="share" />
      </ShareButton>
    </Box>
  );
};

export default HomePage;

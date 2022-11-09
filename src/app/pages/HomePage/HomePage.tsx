import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { FC, useState } from 'react';

import ShareIcon from '../../../asset/share.svg';
import ShareCard from '../../components/Molecule/ShareCard';

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
  const [sharing, setSharing] = useState(false);

  const drawerOutside = () => {
    if (!sharing) return null;
    return (
      <Box
        onClick={() => setSharing(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.10)',
          zIndex: 1,
        }}
      />
    );
  };

  return (
    <Box
      padding="clamp(12px,7vw, 124px)"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <Typography color="primary" fontSize="24px">
        Click on Share button
      </Typography>
      <ShareButton
        color="primary"
        variant="outlined"
        onClick={() => setSharing((pre) => !pre)}
      >
        Share
        <img src={ShareIcon} alt="share" />
      </ShareButton>
      {sharing && <ShareCard />}
      {drawerOutside()}
    </Box>
  );
};

export default HomePage;

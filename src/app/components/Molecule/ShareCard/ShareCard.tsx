import styled from '@emotion/styled';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import ShareDetails from '../ShareDetails';

import Footer from '../../Atom/Footer';
import ShareSearch from '../ShareSearch';

const Container = styled(Box)`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
    0px 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  width: 512px;
  max-width: 90%;
  margin-top: 4px;
  padding: ;
  z-index: 2;
`;

const ShareCard: FC = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <Container>
      {showSearch ? (
        <ShareSearch setShowSearch={setShowSearch} />
      ) : (
        <ShareDetails setShowSearch={setShowSearch} />
      )}
      <Footer showSearch={showSearch} setShowSearch={setShowSearch} />
    </Container>
  );
};

export default ShareCard;

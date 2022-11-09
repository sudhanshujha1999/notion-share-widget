import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';

import QuesIcon from '../../../../asset/qcircle.svg';

const InviteButton = styled(Button)`
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  text-transform: none;
  padding: 2px 12px;
  font-size: 12px;
  margin-left: 12px;
`;

interface FooterProps {
  showSearch: Boolean;
  setShowSearch: CallableFunction;
}

const Footer: FC<FooterProps> = ({ showSearch, setShowSearch }) => {
  return (
    <Box
      padding="16px 12px"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      borderTop="1px solid #E5E7EB"
      borderRadius="0px 0px 8px 8px"
      sx={{ background: '#F9FAFB' }}
    >
      <Box display="flex" flexDirection="row">
        <img src={QuesIcon} alt="Q" />
        <Typography color="primary" paddingLeft="8px">
          learn about sharing
        </Typography>
      </Box>
      {showSearch && (
        <InviteButton onClick={() => setShowSearch(false)}>Cancel</InviteButton>
      )}
    </Box>
  );
};

export default Footer;

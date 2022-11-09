import { Box, Button, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';

import Organization from '../../Atom/ShowOrganization';
import GlobeIcon from '../../../../asset/Globe.svg';
import { groupsState, membersState } from 'app/recoil/usersState';
import ShowMember from '../../Atom/ShowMember';
import ShowGroup from '../../Atom/ShowGroup';

const ShareSwitch = styled.label`
  display: inline-block;
  height: 24px;
  position: relative;
  width: 44px;
  margin-left: auto;
`;

const ShareInput = styled.input`
  display: none;
`;

const ShareSlider = styled.span<{ share: Boolean }>`
background-color: ${({ share }) => (share ? 'rgb(35, 131, 226)' : '#E5E7EB')};
bottom: 0;
cursor: pointer;
left: 0;
position: absolute;
right: 0;
top: 0;
transition: .4s;
border-radius: 34px;
&:before {
  background-color: #fff;
  bottom: 2px;
  content: "";
  height: 20px;
  left: 2px;
  position: absolute;
  transition: .4s;
  width: 20px;
  border-radius: 50%;
  transform: ${({ share }) => (share ? 'translateX(20px)' : '')};
},
`;

const InviteButton = styled(Button)`
  background-color: #f9fafb;
  border-radius: 0px;
  position: absolute;
  top: 3px;
  bottom: 3px;
  right: 3px;
  border-left: 1px solid #d1d5db;
  border-radius: 0px 6px 6px 0px;
  text-transform: none;
  padding: 4px 15px;
`;

interface ShareDetailsProps {
  setShowSearch: CallableFunction;
}

const ShareDetails: FC<ShareDetailsProps> = ({ setShowSearch }) => {
  const [shareToWeb, setShareToWeb] = useState(false);
  const membersRecoilState = useRecoilValue(membersState);
  const groupsRecoilState = useRecoilValue(groupsState);

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const SearchBar = () => {
    return (
      <Box position="relative" borderRadius="6px">
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          onClick={handleSearchClick}
        />
        <InviteButton onClick={handleSearchClick}>Invite</InviteButton>
      </Box>
    );
  };

  const renderMembers = () => {
    const membersToShow = Object.values(membersRecoilState).filter(
      (mem) => mem.access !== 'na'
    );
    return (
      <Box>
        {membersToShow.map((member) => (
          <ShowMember id={member.id} key={member.id} />
        ))}
      </Box>
    );
  };

  const renderGroups = () => {
    const groupsToShow = Object.values(groupsRecoilState).filter(
      (group) => group.access !== 'na'
    );
    return (
      <Box>
        {groupsToShow.map((group) => (
          <ShowGroup id={group.id} key={group.id} />
        ))}
      </Box>
    );
  };

  return (
    <Box>
      <Box
        padding="18px 12px 18px 20px"
        borderBottom="1px solid #E5E7EB"
        display="flex"
        flexDirection="row"
        alignItems="center"
        width="100%"
      >
        <img src={GlobeIcon} alt="Globe" width="40px" height="40px" />
        <Box display="flex" flexDirection="column" marginLeft="16px">
          <Typography color="#111827" fontSize="16px" lineHeight="24px">
            Share to Web
          </Typography>
          <Typography color="#6B7280" fontSize="14px" lineHeight="20px">
            Publish and share link with anyone
          </Typography>
        </Box>
        <ShareSwitch htmlFor="muteInput">
          <ShareInput
            type="checkbox"
            checked={shareToWeb}
            id="muteInput"
            onChange={() => setShareToWeb((pre) => !pre)}
          />
          <ShareSlider share={shareToWeb}></ShareSlider>
        </ShareSwitch>
      </Box>
      <Box padding="18px 20px">
        {SearchBar()}
        <Organization />
        {renderGroups()}
        {renderMembers()}
      </Box>
    </Box>
  );
};

export default ShareDetails;

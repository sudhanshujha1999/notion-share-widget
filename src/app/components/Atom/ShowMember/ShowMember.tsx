import { Box, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { membersState } from 'app/recoil/usersState';
import CustomMenu from '../CustomMenu';
import { accessLevelTypes } from 'app/types/common.schema';

interface ShowMemberProps {
  id: string;
}

const ShowMember: FC<ShowMemberProps> = ({ id }) => {
  const [membersRecoilState, setMembersRecoilState] =
    useRecoilState(membersState);
  const member = membersRecoilState[id];
  const [selectedAccess, setSelectedAccess] = useState<accessLevelTypes>(
    member.access
  );

  useEffect(() => {
    setMembersRecoilState((pre) => ({
      ...pre,
      [id]: { ...pre[id], access: selectedAccess },
    }));
  }, [selectedAccess, id, setMembersRecoilState]);

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      marginTop="16px"
    >
      <img
        width="40px"
        height="40px"
        src={member.img}
        alt="org"
        style={{ borderRadius: '50%' }}
      />
      <Box display="flex" flexDirection="column" marginLeft="8px">
        <Typography color="#111827" fontSize="16px" lineHeight="24px">
          {member.name}
        </Typography>
        <Typography color="#6B7280" fontSize="14px" lineHeight="20px">
          {member.email}
        </Typography>
      </Box>
      <CustomMenu value={selectedAccess} setValue={setSelectedAccess} />
    </Box>
  );
};

export default ShowMember;

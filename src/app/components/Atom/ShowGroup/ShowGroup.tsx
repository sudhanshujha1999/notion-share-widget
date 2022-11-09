import { Box, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { groupsState } from 'app/recoil/usersState';
import CustomMenu from '../CustomMenu';
import { accessLevelTypes } from 'app/types/common.schema';

interface ShowGroupProps {
  id: string;
}

const ShowGroup: FC<ShowGroupProps> = ({ id }) => {
  const [groupsRecoilState, setGroupsRecoilState] = useRecoilState(groupsState);
  const group = groupsRecoilState[id];
  const [selectedAccess, setSelectedAccess] = useState<accessLevelTypes>(
    group.access
  );

  useEffect(() => {
    setGroupsRecoilState((pre) => ({
      ...pre,
      [id]: { ...pre[id], access: selectedAccess },
    }));
  }, [selectedAccess]);

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      marginTop="16px"
    >
      <Box
        width="40px"
        height="40px"
        borderRadius="8px"
        fontSize="20px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ background: '#6B7280' }}
      >
        {group.name.charAt(0).toUpperCase()}
      </Box>
      <Box display="flex" flexDirection="column" marginLeft="8px">
        <Typography color="#111827" fontSize="16px" lineHeight="24px">
          {group.name}
        </Typography>
        <Typography color="#6B7280" fontSize="14px" lineHeight="20px">
          {group.members?.length} workspace members
        </Typography>
      </Box>
      <CustomMenu value={selectedAccess} setValue={setSelectedAccess} />
    </Box>
  );
};

export default ShowGroup;

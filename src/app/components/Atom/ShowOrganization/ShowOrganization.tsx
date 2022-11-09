import { Box, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { organizationState } from 'app/recoil/usersState';
import CustomMenu from '../CustomMenu';
import { accessLevelTypes } from 'app/types/common.schema';

const ShowOrganization: FC = () => {
  const [orgRecoilState, setOrgRecoilState] = useRecoilState(organizationState);
  const [selectedAccess, setSelectedAccess] = useState<accessLevelTypes>(
    orgRecoilState.access
  );

  useEffect(() => {
    setOrgRecoilState((pre) => ({
      ...pre,
      access: selectedAccess,
    }));
  }, [selectedAccess]);

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      marginTop="16px"
    >
      <img src={orgRecoilState.img} alt="org" style={{ borderRadius: '50%' }} />
      <Box display="flex" flexDirection="column" marginLeft="8px">
        <Typography color="#111827" fontSize="16px" lineHeight="24px">
          Everyone at {orgRecoilState.name}
        </Typography>
        <Typography color="#6B7280" fontSize="14px" lineHeight="20px">
          {orgRecoilState.members?.length} workspace members
        </Typography>
      </Box>
      <CustomMenu value={selectedAccess} setValue={setSelectedAccess} />
    </Box>
  );
};

export default ShowOrganization;

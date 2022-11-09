import { FC, MouseEvent, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Typography } from '@mui/material';

import DownIcon from '../../../../asset/down.svg';
import { accessLevels } from '../../../mockData/accessLevels';
import { accessLevelTypes } from 'app/types/common.schema';

const MenuButton = styled(Box)`
  padding: 4px 8px;
  display: flex;
  flex-direction: row;
  width: fit-content;
  cursor: pointer;
  :hover {
    background: #e5e7eb;
  }
`;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    background: '#fff',
    boxShadow:
      'rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      color: '#111827',
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

interface CustomMenuProps {
  value: accessLevelTypes;
  setValue: CallableFunction;
}

const CustomMenu: FC<CustomMenuProps> = ({ value, setValue }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (access: accessLevelTypes) => {
    setValue(access);
    setAnchorEl(null);
  };

  return (
    <Box marginLeft="auto">
      <MenuButton onClick={handleClick}>
        <Typography
          width="max-content"
          color="#6b7280"
          fontSize="12px"
          lineHeight="16px"
          fontWeight="400"
          display="inline"
        >
          {accessLevels[value]}
        </Typography>
        <img src={DownIcon} alt=">" style={{ marginLeft: '4px' }} />
      </MenuButton>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {Object.keys(accessLevels).map((access) => (
          <MenuItem
            onClick={() => handleSelect(access as accessLevelTypes)}
            disableRipple
            sx={{ color: access === 'na' ? '#DC2626 !important' : '#111827' }}
          >
            {accessLevels[access as accessLevelTypes]}
          </MenuItem>
        ))}
      </StyledMenu>
    </Box>
  );
};

export default CustomMenu;

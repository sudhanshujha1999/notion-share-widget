import { FC } from 'react';
import { CircularProgress } from '@mui/material';

interface props {
  color?:
    | 'info'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'success'
    | 'warning'
    | 'inherit';
  type?: 'fullPage' | 'fullWidth' | 'inline';
}

const Loader: FC<props> = ({ color, type = 'fullPage' }) => {
  return (
    <div
      style={
        (type === 'fullWidth' && {
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }) ||
        (type === 'fullPage' && {
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }) ||
        {}
      }
    >
      <CircularProgress color={color || 'info'} />
    </div>
  );
};

export default Loader;

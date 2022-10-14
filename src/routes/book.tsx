import React, { ReactElement } from 'react';

import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export interface bookProps {
  id: number;
  name: string;
  title: string;
  to: string;
  icon: ReactElement;
}

export const book = [
  {
    id: 1,
    name: 'legalEntities',
    title: 'Юр.лица',
    to: '/',
    icon: <PlaylistAddCheckIcon />,
  },
  {
    id: 2,
    name: 'tests',
    title: 'Тесты',
    to: '/tests',
    icon: <GroupOutlinedIcon />,
  },
  {
    id: 3,
    name: 'problems',
    title: 'Проблемы',
    to: '/problems',
    icon: <AccountCircleOutlinedIcon />,
  },
];

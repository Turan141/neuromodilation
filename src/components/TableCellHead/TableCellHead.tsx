import React, { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLegalEntities } from '@bus/legalEntities/selector';

import { TableCell, TableSortLabel, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface TableCellHearProps {
  title: string;
  accessor: string;
  action: any;
}

const TableCellHead: FC<TableCellHearProps> = ({ title, accessor, action }) => {
  const dispatch = useDispatch();
  const { filter } = useSelector(getLegalEntities);

  const active = useMemo(() => {
    return (
      filter.sortString === accessor || filter.sortString === `${accessor}Desc`
    );
  }, [accessor, filter.sortString]);

  const direction = useMemo(() => {
    return filter.sortString === accessor ? 'asc' : 'desc';
  }, [accessor, filter.sortString]);

  const onClick = useCallback(() => {
    dispatch(
      action({
        sortString:
          filter.sortString === accessor ? `${accessor}Desc` : accessor,
      }),
    );
  }, [action, filter.sortString]);

  return (
    <TableCell align="left">
      <TableSortLabel
        active={active}
        direction={direction}
        onClick={onClick}
        IconComponent={ArrowDropDownIcon}
      >
        <Typography variant={'subtitle2'}>{title}</Typography>
      </TableSortLabel>
    </TableCell>
  );
};

export default TableCellHead;

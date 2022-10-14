import React, { useEffect, useState } from 'react';
import { useModal } from 'react-modal-hook';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import LegalEntitiesModal from './LegalEntitiesModal/LegalEntitiesModal';
import { getLegalEntities } from './../../bus/legalEntities/selector';
import styles from './LegalEntities.module.scss';
import { legalEntitiesActions } from '@bus/legalEntities/actions';
import TableCellHead from '@components/TableCellHead';
import LegalEntitiesDeleteModal from './DeleteModal/LegalEntitiesDeleteModal';
import { singleLegalEntitieType } from '../../interfaces/LegalEntities';
import moment from 'moment';

const LegalEntities = () => {
  const dispatch = useDispatch();
  const [rowId, setRowId] = useState<number>(0);
  const { page, legalEntities } = useSelector(getLegalEntities);

  useEffect(() => {
    dispatch(legalEntitiesActions.getLegalEntitiesAsync({}));
  }, []);

  const [showModal, hideModal] = useModal(() => (
    <LegalEntitiesModal open={true} handleClose={hideModal} />
  ));

  const [showDeleteModal, hideDeleteModal] = useModal(() => (
    <LegalEntitiesDeleteModal open={true} handleClose={hideDeleteModal} />
  ));

  const openModalDetail = (id: number, openModalFunc: () => void) => {
    dispatch(
      legalEntitiesActions.getSingleLegalEntitieAsync({
        id,
      }),
    );
    openModalFunc();
  };

  return (
    <Box
      sx={{
        width: '96%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        sx={{
          marginBottom: '54px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant={'h2'}>Юр.лица</Typography>
        <Button onClick={showModal} sx={{ height: '42px' }} variant="contained">
          ДОБАВИТЬ ЮР.ЛИЦО
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
        <TableContainer className={styles.table}>
          <Table stickyHeader aria-label="sticky table" sx={{ zIndex: 1 }}>
            <TableHead>
              <TableRow>
                <TableCellHead
                  title={'ID клиента'}
                  accessor={'id'}
                  action={legalEntitiesActions.getLegalEntitiesAsync}
                />
                <TableCellHead
                  title={'Наименование юр.лица'}
                  accessor={'name'}
                  action={legalEntitiesActions.getLegalEntitiesAsync}
                />
                <TableCellHead
                  title={'Дата начала договора'}
                  accessor={'contractStartedDate'}
                  action={legalEntitiesActions.getLegalEntitiesAsync}
                />
                <TableCellHead
                  title={'Дата окончания договора'}
                  accessor={'contractEndDate'}
                  action={legalEntitiesActions.getLegalEntitiesAsync}
                />
                <TableCellHead
                  title={'Кол-во сотрудников'}
                  accessor={'employeesCount'}
                  action={legalEntitiesActions.getLegalEntitiesAsync}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {legalEntities?.map((row: singleLegalEntitieType) => (
                <TableRow
                  className={styles.row}
                  hover
                  key={row.id}
                  onMouseOver={() => {
                    setRowId(row.id);
                  }}
                  onMouseOut={() => {
                    setRowId(0);
                  }}
                >
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">
                    {moment(row.contractStartedDate, 'YYYY-MM-DD').format(
                      'DD.MM.YYYY',
                    )}
                  </TableCell>
                  <TableCell align="left">
                    {moment(row.contractEndDate, 'YYYY-MM-DD').format(
                      'DD.MM.YYYY',
                    )}
                  </TableCell>
                  <TableCell align="left">{row.employeesCount}</TableCell>
                  {row.id === rowId && (
                    <Box component={'td'} className={styles.actions}>
                      <IconButton
                        onClick={() => openModalDetail(row.id, showModal)}
                      >
                        <ModeEditOutlineOutlinedIcon color={'primary'} />
                      </IconButton>
                      <IconButton
                        onClick={() => openModalDetail(row.id, showDeleteModal)}
                      >
                        <DeleteOutlinedIcon color={'disabled'} />
                      </IconButton>
                    </Box>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className={styles.pagination}>
          <TablePagination
            component={'span'}
            className={styles.pagination}
            labelRowsPerPage={'Строк на странице'}
            count={page.total}
            page={page.current}
            onPageChange={(event, newPage) => {
              dispatch(
                legalEntitiesActions.getLegalEntitiesAsync({
                  current: newPage,
                }),
              );
            }}
            rowsPerPage={page.count}
            onRowsPerPageChange={(event) => {
              dispatch(
                legalEntitiesActions.getLegalEntitiesAsync({
                  count: event.target.value,
                }),
              );
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LegalEntities;

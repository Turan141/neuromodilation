import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from 'react-modal-hook';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, IconButton, Typography } from '@mui/material';
import TableCellHead from '@components/TableCellHead';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import { testsActions } from '@bus/tests/actions';
import { getTests } from '@bus/tests/selector';

import CreateTestModal from './CreateTestModal/CreteTestModal';
import LegalEntitiesDeleteModal from '@pages/LegalEntities/DeleteModal/LegalEntitiesDeleteModal';
import styles from './Tests.module.scss';
import DeleteTestModal from './DeleteModal/DeleteTestModal';

interface Data {
  id: number;
  name: string;
  description: string;
}

export default function Testing() {
  const dispatch = useDispatch();
  const { page, tests } = useSelector(getTests);
  const [rowId, setRowId] = useState<number>(0);

  const [showModal, hideModal] = useModal(() => (
    <CreateTestModal open={true} handleClose={hideModal} />
  ));

  const [showDeleteModal, hideDeleteModal] = useModal(() => (
    <DeleteTestModal open={true} handleClose={hideDeleteModal} />
  ));

  const openModalDetail = (singleTest: Data, openModalFunc: () => void) => {
    dispatch(
      testsActions.getSingleTestAsync({
        singleTest,
      }),
    );
    setTimeout(() => {
      openModalFunc();
    }, 200);
  };

  useEffect(() => {
    dispatch(testsActions.getTestsAsync({}));
  }, []);

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
        <Typography variant={'h2'}>Тесты</Typography>{' '}
        <Button onClick={showModal} sx={{ height: '42px' }} variant="contained">
          СОЗДАТЬ ТЕСТ
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
        <TableContainer className={styles.table}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCellHead
                  action={testsActions.getTestsAsync}
                  title={'Название теста'}
                  accessor={'title'}
                />
                <TableCellHead
                  action={testsActions.getTestsAsync}
                  title={'Описание'}
                  accessor={'description'}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {tests?.map((row: Data) => (
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
                  <TableCell align="left" width={'20%'}>
                    {row.name}
                  </TableCell>
                  <TableCell align="left">
                    <Box sx={{ width: '90%' }}>{row.description} </Box>
                  </TableCell>

                  {row.id === rowId && (
                    <Box component={'td'} className={styles.actions}>
                      <IconButton
                        onClick={() => openModalDetail(row, showModal)}
                      >
                        <ModeEditOutlineOutlinedIcon color={'primary'} />
                      </IconButton>
                      <IconButton
                        onClick={() => openModalDetail(row, showDeleteModal)}
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
              dispatch(testsActions.getTestsAsync({ current: newPage }));
            }}
            rowsPerPage={page.count}
            onRowsPerPageChange={(event) => {
              dispatch(
                testsActions.getTestsAsync({
                  count: event.target.value,
                }),
              );
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

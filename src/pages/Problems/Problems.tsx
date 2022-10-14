import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from 'react-modal-hook';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import styles from './Problems.module.scss';
import StepOne from './CreateProblemModal/StepOne';
import TableCellHead from '@components/TableCellHead';
import { problemsActions } from '@bus/problems/actions';
import { getProblems } from './../../bus/problems/selector';
import DeleteProblemModal from './DeleteModal/DeleteProblemModal';
import { deleteFile, getAllFiles } from '@api/Files';

interface Column {
  id: 'name' | 'description';
  label: string;
  width?: string;
  align?: 'right';
  format?: (value: number) => string;
}

interface Data {
  id: number;
  name: string;
  description: string;
}

export default function Problems() {
  const dispatch = useDispatch();
  const { page, problems } = useSelector(getProblems);
  const [rowId, setRowId] = useState<number>(0);

  const [showDeleteModal, hideDeleteModal] = useModal(() => (
    <DeleteProblemModal open={true} handleClose={hideDeleteModal} />
  ));

  const [showModal, hideModal] = useModal(() => (
    <StepOne open={true} handleClose={hideModal} />
  ));

  const openModalDetail = (id: number, openModalFunc: () => void) => {
    dispatch(
      problemsActions.getSingleProblemAsync({
        id,
      }),
    );
    setTimeout(() => {
      openModalFunc();
    }, 200);
  };

  useEffect(() => {
    dispatch(problemsActions.getProblemsAsync({}));
  }, []);

  // const getFiles = async () => {
  //   const response = await getAllFiles();

  //   const videos = response?.data?.result.filter((item: any) =>
  //     item.fileName.endsWith('mp4'),
  //   );

  //   for (const key of videos) {
  //     deleteFile(key.id);
  //   }

  //   console.log(videos);
  // };

  // useEffect(() => {
  //   getFiles();
  // }, []);

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
        <Typography variant={'h2'}>Проблемы</Typography>{' '}
        <Button onClick={showModal} sx={{ height: '42px' }} variant="contained">
          Добавить проблему
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
        <TableContainer className={styles.table}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCellHead
                  action={problemsActions.getProblemsAsync}
                  title={'Название проблемы'}
                  accessor={'title'}
                />
                <TableCellHead
                  action={problemsActions.getProblemsAsync}
                  title={'Описание'}
                  accessor={'description'}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {problems?.map((row: Data) => (
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
              dispatch(problemsActions.getProblemsAsync({ current: newPage }));
            }}
            rowsPerPage={page.count}
            onRowsPerPageChange={(event) => {
              dispatch(
                problemsActions.getProblemsAsync({
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

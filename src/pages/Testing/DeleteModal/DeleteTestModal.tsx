import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { Stack } from '@mui/material';
import styles from './DeleteTestModal.module.scss';

import { testsActions } from '@bus/tests/actions';
import { getTests } from '@bus/tests/selector';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const DeleteTestModal: React.FC<ModalProps> = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { singleTest, isLoadingSingleTest } = useSelector(getTests);

  const style = {
    position: 'absolute' as 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 552,
    height: 262,
    bgcolor: 'white',
    borderRadius: '4px',
    boxShadow: 24,
    padding: '32px 56px',
  };

  useEffect(() => {
    return () => {
      dispatch(testsActions.getSingleTestSuccess(null));
    };
  }, []);

  const deleteTest = (id: number | undefined) => {
    dispatch(testsActions.deleteSingleTestAsync({ id }));
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ textAlign: 'center' }} variant="h4">
            Удаление теста
          </Typography>
          <Typography
            sx={{ textAlign: 'center', fontSize: '16px' }}
            variant="h5"
          >
            {singleTest &&
              `Вы действительно хотите удалить тест ${singleTest?.name} ?`}
          </Typography>
          <Stack justifyContent="flex-end" spacing={3} direction="row">
            <Button
              sx={{ width: '170px' }}
              className={styles.cancelButton}
              variant="text"
              size={'large'}
              onClick={handleClose}
            >
              Отменить
            </Button>
            <Button
              sx={{ width: '170px' }}
              type={'submit'}
              variant="contained"
              size={'large'}
              onClick={() => deleteTest(singleTest?.id)}
            >
              Удалить
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteTestModal;

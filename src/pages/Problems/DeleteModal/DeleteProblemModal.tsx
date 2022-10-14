import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { Stack } from '@mui/material';
import styles from './DeleteProblemModal.module.scss';

import { testsActions } from '@bus/tests/actions';
import { getTests } from '@bus/tests/selector';
import { getProblems } from '@bus/problems/selector';
import { problemsActions } from '@bus/problems/actions';
import Loader from '@components/Loader';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const DeleteProblemModal: React.FC<ModalProps> = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { singleProblem, isLoadingSingleProblem } = useSelector(getProblems);

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
      dispatch(problemsActions.getSingleProblemSuccess(null));
    };
  }, []);

  const deleteTest = (id: number | undefined) => {
    dispatch(problemsActions.deletetSingleProblemAsync(id));
    handleClose();
  };

  return (
    <div>
      {!isLoadingSingleProblem ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography sx={{ textAlign: 'center' }} variant="h4">
              Удаление проблемы
            </Typography>
            <Typography
              sx={{ textAlign: 'center', fontSize: '16px' }}
              variant="h5"
            >
              {singleProblem &&
                `Вы действительно хотите удалить проблему ${singleProblem?.name} ?`}
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
                onClick={() => deleteTest(singleProblem?.id)}
              >
                Удалить
              </Button>
            </Stack>
          </Box>
        </Modal>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DeleteProblemModal;

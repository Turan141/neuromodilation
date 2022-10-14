import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormContext, useFieldArray, useForm } from 'react-hook-form';

import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './CreateProblem.module.scss';
import Loader from '@components/Loader';
import { useModal } from 'react-modal-hook';
import CreateProblem from './CreateProblem';
import { getProblems } from '@bus/problems/selector';
import { problemsActions } from '@bus/problems/actions';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const StepOne: React.FC<ModalProps> = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { isLoadingSingleProblem, singleProblem } = useSelector(getProblems);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const style = {
    // display: 'flex',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 839,
    height: 653,
    bgcolor: 'white',
    borderRadius: '4px',
    boxShadow: 24,
    padding: '32px 56px',
  };

  useEffect(() => {
    if (singleProblem?.id) {
      setValue('name', singleProblem.name);
      setValue('description', singleProblem.description);
      setValue('recommendation', singleProblem.recommendation);
    }
  }, [singleProblem]);

  const closeModal = () => {
    reset();
    handleClose();
    dispatch(problemsActions.getSingleProblemSuccess(null));
  };

  const [showModal, hideModal] = useModal(() => (
    <CreateProblem open={true} handleClose={hideModal} />
  ));

  const createProblem = handleSubmit((data) => {
    if (singleProblem) {
      dispatch(
        problemsActions.editProblemAsync({
          id: singleProblem.id,
          ...data,
        }),
      );
    } else dispatch(problemsActions.addProblemAsync(data));
    closeModal();
  });

  return !isLoadingSingleProblem ? (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          <Typography sx={{ textAlign: 'center' }} variant="h4">
            {singleProblem ? 'Редактирование проблемы' : 'Создание проблемы'}
          </Typography>
          <form className={styles.container} onSubmit={createProblem}>
            <Box>
              <TextField
                InputProps={{
                  startAdornment: isLoadingSingleProblem && (
                    <InputAdornment position="start">
                      <CircularProgress color="inherit" size={20} />
                    </InputAdornment>
                  ),
                }}
                {...register('name', { required: true })}
                className={styles.input}
                fullWidth
                label={'Название проблемы'}
                error={errors && errors.name}
              />
              <TextField
                InputProps={{
                  startAdornment: isLoadingSingleProblem && (
                    <InputAdornment position="start">
                      <CircularProgress color="inherit" size={20} />
                    </InputAdornment>
                  ),
                }}
                {...register('description', { required: true })}
                className={styles.description}
                fullWidth
                multiline
                maxRows={4}
                label={'Описание'}
                error={errors && errors.description}
              />
              <TextField
                InputProps={{
                  startAdornment: isLoadingSingleProblem && (
                    <InputAdornment position="start">
                      <CircularProgress color="inherit" size={20} />
                    </InputAdornment>
                  ),
                }}
                {...register('recommendation', { required: true })}
                className={styles.description}
                fullWidth
                multiline
                maxRows={4}
                label={'Рекомендации'}
                error={errors && errors.description}
              />
              <Button
                disabled={singleProblem ? false : true}
                onClick={showModal}
                sx={{ marginTop: '16px' }}
                className={styles.cancelButton}
                variant="text"
                size={'small'}
              >
                + Добавить проработку
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={closeModal} sx={{ mr: 1, color: 'white' }}>
                Отменить
              </Button>
              <Button type="submit" sx={{ mr: 1, color: 'white' }}>
                Сохранить
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  ) : (
    <Loader />
  );
};

export default StepOne;

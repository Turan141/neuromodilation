import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormContext, useFieldArray } from 'react-hook-form';

import { getTests } from '@bus/tests/selector';

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './CreateTest.module.scss';
import Loader from '@components/Loader';
import { testsActions } from '@bus/tests/actions';

const StepThree = () => {
  const dispatch = useDispatch();
  const { results, singleTest, isLoadingGetResults } = useSelector(getTests);
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'results',
    control,
  });

  useEffect(() => {
    dispatch(testsActions.getResultsAsync(singleTest?.id));
  }, []);

  useEffect(() => {
    if (results) {
      setValue('results', results);
    }
  }, [results]);

  return !isLoadingGetResults ? (
    <Box sx={{ marginTop: '40px', overflow: 'auto' }}>
      {fields?.map((field, index) => {
        return (
          <>
            <Box
              key={field.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TextField
                {...register(`results[${index}].id`)}
                sx={{ display: 'none' }}
              />
              <TextField
                {...register(`results[${index}].questionGroupName`, {
                  required: true,
                })}
                className={styles.input}
                sx={{ width: '45%' }}
                label={'Связь с группой вопросов'}
                error={
                  errors &&
                  errors.results &&
                  errors.results[index] &&
                  !!errors?.results[index].comment
                }
              />
              <TextField
                {...register(`results[${index}].thresholdScore`, {
                  required: true,
                })}
                className={styles.input}
                multiline
                sx={{ width: '45%' }}
                label={'Кол-во баллов'}
                error={
                  errors &&
                  errors.results &&
                  errors.results[index] &&
                  !!errors?.results[index].thresholdScore
                }
              />
            </Box>
            <TextField
              {...register(`results[${index}].comment`, { required: true })}
              className={styles.description}
              fullWidth
              multiline
              maxRows={4}
              label={'Комментарий'}
              error={
                errors &&
                errors.results &&
                errors.results[index] &&
                !!errors?.results[index].comment
              }
            />
          </>
        );
      })}
      {/* <Button
        sx={{ marginTop: '16px' }}
        className={styles.cancelButton}
        variant="text"
        size={'small'}
        onClick={() =>
          append({
            name: '',
            description: '',
          })
        }
      >
        + Добавить субтест
      </Button> */}
    </Box>
  ) : (
    <Loader />
  );
};

export default StepThree;

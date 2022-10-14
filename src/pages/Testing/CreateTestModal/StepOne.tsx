import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
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

const StepOne = () => {
  const { singleTest, isLoadingSingleTest } = useSelector(getTests);
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'subtests',
    control,
  });

  useEffect(() => {
    if (singleTest?.id) {
      setValue('name', singleTest.name);
      setValue('description', singleTest.description);
      setValue('subtests', singleTest.subtests);
    }
  }, [singleTest]);

  return !isLoadingSingleTest ? (
    <Box sx={{ marginTop: '40px', overflow: 'auto' }}>
      <TextField
        {...register('name', { required: true })}
        className={styles.input}
        fullWidth
        label={'Название теста'}
        error={errors && errors.name}
      />
      <TextField
        {...register('description', { required: true })}
        className={styles.description}
        fullWidth
        multiline
        maxRows={4}
        label={'Описание'}
        error={errors && errors.description}
      />
      {fields?.map((field, index) => {
        return (
          <React.Fragment key={field.id}>
            <TextField
              {...register(`subtests.${index}.name`, {
                required: true,
                minLength: 5,
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => remove(index)}
                      aria-label="delete"
                      size="medium"
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              className={styles.input}
              fullWidth
              label={`Название субтеста ${index + 1}`}
              error={
                errors &&
                errors.subtests &&
                errors.subtests[index] &&
                !!errors?.subtests[index]?.name
              }
            />
            <TextField
              {...register(`subtests.${index}.description`, {
                required: true,
                minLength: 5,
              })}
              className={styles.description}
              fullWidth
              label={`Описание ${index + 1}`}
              multiline
              maxRows={4}
              error={
                errors &&
                errors.subtests &&
                errors.subtests[index] &&
                !!errors?.subtests[index]?.description
              }
            />
          </React.Fragment>
        );
      })}
      <Button
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
      </Button>
    </Box>
  ) : (
    <Loader />
  );
};

export default StepOne;

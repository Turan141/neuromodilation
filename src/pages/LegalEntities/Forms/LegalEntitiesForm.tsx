import React, { FC, useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Stack,
  Switch,
  TextField,
} from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import styles from './Forms.module.scss';
import { legalEntitiesActions } from '@bus/legalEntities/actions';
import { useDispatch } from 'react-redux';
import { singleLegalEntitieType } from 'src/interfaces/LegalEntities';
import moment from 'moment';

interface Props {
  close: () => void;
  singleLegalEntitie?: singleLegalEntitieType | null;
  loading?: boolean;
}

const LegalEntitiesForm: React.FC<Props & any> = ({
  close,
  singleLegalEntitie,
  loading,
}) => {
  const dispatch = useDispatch();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<singleLegalEntitieType & any>({
    defaultValues: {
      name: '',
      iin: null,
      contractNumber: null,
      employeesCount: null,
      contractStartedDate: null,
      contractEndDate: null,
      status: false,
    },
  });
  const formValues = getValues();
  useEffect(() => {
    if (singleLegalEntitie) {
      for (const key in formValues) {
        if (key === 'status' && singleLegalEntitie.status) {
          setValue(key, true);
        } else if (key === 'contractStartedDate' || key === 'contractEndDate') {
          const formattedDate = moment(
            singleLegalEntitie[key],
            'YYYY-MM-DD',
          ).format('YYYY-MM-DD');
          setValue(key, formattedDate);
        } else setValue(key, singleLegalEntitie[key]);
      }
    }
  }, [singleLegalEntitie]);

  useEffect(() => {
    return () => {
      reset(),
        dispatch(legalEntitiesActions.getSingleLegalEntitieSuccess(null));
    };
  }, []);

  const startDate = useWatch({ control, name: 'contractStartedDate' });
  const endDate = useWatch({ control, name: 'contractEndDate' });

  const createLegalEntitie = handleSubmit((data) => {
    singleLegalEntitie
      ? dispatch(
          legalEntitiesActions.editLegalEntitieAsync({
            id: singleLegalEntitie.id,
            name: data.name,
            iin: data.iin,
            employeesCount: data.employeesCount,
            contractNumber: data.contractNumber,
            status: data.status ? 1 : 0,
            contractStartedDate: data.contractStartedDate,
            contractEndDate: data.contractEndDate,
          }),
        )
      : dispatch(
          legalEntitiesActions.createLegalEntitieAsync({
            name: data.name,
            iin: data.iin,
            employeesCount: data.employeesCount,
            contractNumber: data.contractNumber,
            status: 0,
            contractStartedDate: data.contractStartedDate,
            contractEndDate: data.contractEndDate,
          }),
        );
    close();
  });

  return (
    <form className={styles.form} onSubmit={createLegalEntitie}>
      <TextField
        InputProps={{
          startAdornment: loading && (
            <InputAdornment position="start">
              <CircularProgress color="inherit" size={20} />
            </InputAdornment>
          ),
        }}
        {...register('name', { required: true })}
        className={styles.input}
        fullWidth
        placeholder="Название"
        error={!!errors.name}
      />
      <TextField
        InputProps={{
          startAdornment: loading && (
            <InputAdornment position="start">
              <CircularProgress color="inherit" size={20} />
            </InputAdornment>
          ),
        }}
        type="number"
        className={styles.input}
        fullWidth
        placeholder="ИНН"
        {...register('iin', { required: true, valueAsNumber: true })}
        error={!!errors.iin}
      />
      <Box>
        <TextField
          InputProps={{
            startAdornment: loading && (
              <InputAdornment position="start">
                <CircularProgress color="inherit" size={20} />
              </InputAdornment>
            ),
          }}
          sx={{ width: '245px' }}
          {...register('contractNumber', {
            required: true,
            valueAsNumber: true,
          })}
          type="number"
          className={styles.input}
          fullWidth
          placeholder="Номер договора"
          error={!!errors.contractNumber}
        />
        <TextField
          InputProps={{
            startAdornment: loading && (
              <InputAdornment position="start">
                <CircularProgress color="inherit" size={20} />
              </InputAdornment>
            ),
          }}
          {...register('employeesCount', {
            required: true,
            valueAsNumber: true,
          })}
          sx={{ width: '245px', marginLeft: '16px' }}
          // type="number"
          className={styles.input}
          fullWidth
          placeholder="Количество сотрудников"
          error={!!errors.employeesCount}
        />{' '}
        <Box sx={{ display: 'flex' }}>
          <Controller
            control={control}
            name="contractStartedDate"
            rules={{ required: true }}
            render={({ field: { onChange, value } }: any) => (
              <FormControl sx={{ width: '100%' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    {...register('contractStartedDate')}
                    maxDate={endDate}
                    value={value}
                    onChange={onChange}
                    label="Дата начала договора"
                    renderInput={(params: any) => (
                      <TextField
                        sx={{ width: '245px' }}
                        fullWidth
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="contractEndDate"
            rules={{ required: true }}
            render={({ field: { onChange, value } }: any) => (
              <FormControl sx={{ width: '100%' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    minDate={startDate}
                    {...register('contractEndDate')}
                    value={value}
                    onChange={onChange}
                    label="Дата окончания договора"
                    renderInput={(params: any) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            )}
          />
        </Box>
        {singleLegalEntitie && (
          <FormControlLabel
            control={
              <Switch
                defaultChecked={singleLegalEntitie.status ? true : false}
                {...register('status')}
                name="status"
              />
            }
            label="Заблокировать юр.лицо"
          />
        )}
      </Box>
      <Stack
        sx={{ marginTop: '30px' }}
        justifyContent="flex-end"
        spacing={3}
        direction="row"
      >
        <Button
          sx={{ width: '170px' }}
          className={styles.cancelButton}
          variant="text"
          size={'large'}
          onClick={close}
        >
          Отменить
        </Button>
        <Button
          sx={{ width: '170px' }}
          type={'submit'}
          variant="contained"
          size={'large'}
        >
          {singleLegalEntitie ? 'Редактировать' : 'Создать'}
        </Button>
      </Stack>
    </form>
  );
};

export default LegalEntitiesForm;

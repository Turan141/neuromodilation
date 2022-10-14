import React, { ReactNode, useEffect, useState } from 'react';

import Box from '@mui/material/Box';

import {
  Button,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';

import { useFormContext, useFieldArray } from 'react-hook-form';
import styles from './CreateTest.module.scss';
import { getTests } from '@bus/tests/selector';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { testsActions } from '@bus/tests/actions';
import { addFile, deleteFile } from '@api/Files';
import Loader from '@components/Loader';

const StepTwo: React.FC = () => {
  const dispatch = useDispatch();
  const {
    singleTest,
    subtests,
    questionGroups,
    questions,
    question,
    isLoadingGetQuestion,
    isLoadingEditQuestion,
    isLoadingCreateQuestion,
  } = useSelector(getTests);
  const {
    register,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants`,
  });

  useEffect(() => {
    dispatch(testsActions.getQuestionGroupsAsync(null));
    dispatch(testsActions.getQuestionsAsync(singleTest?.id));
  }, []);

  useEffect(() => {
    if (question?.id) {
      setValue('questionId', question?.id);
    }
    if (question?.subtestId) {
      setValue('subtestId', question?.subtestId);
    }
    if (question?.questionGroupId) {
      setValue('questionGroupId', question?.questionGroupId);
    }
    if (question?.text) {
      setValue('questionText', question?.text);
    }
    if (question?.variants) {
      setValue('variants', question?.variants);
    }
  }, [question]);

  const formValues = getValues();

  const getFile = async (file: any, id: number) => {
    const fileId = watch(`variants[${id}].fileMetadataId`);
    if (fileId) {
      await deleteFile(fileId);
    }

    const formData = new FormData();
    formData.append('file', file);
    const { data } = await addFile(formData);
    setValue(`variants[${id}].fileMetadataId`, data.id);
    setValue(`variants[${id}].fileURL`, data.url);
  };

  const deleteFileinVariant = async (fileId: string, variantId: number) => {
    await deleteFile(fileId);
    setValue(`variants[${variantId}].fileMetadataId`, null);
    setValue(`variants[${variantId}].fileURL`, null);
  };

  const fileText = (id: number) => {
    const file = watch(`variants[${id}].fileURL`);
    const fileId = watch(`variants[${id}].fileMetadataId`);

    if (file) {
      return (
        <Box sx={{ position: 'relative' }}>
          <IconButton
            sx={{ width: '20px', height: '20px' }}
            onClick={() => deleteFileinVariant(fileId, id)}
            className={styles.deleteFileVariant}
          >
            <CloseIcon sx={{ width: '15px', height: '15px' }} />
          </IconButton>
          <img width={104} height={70} src={file} />
        </Box>
      );
    }
  };

  const styleSelect = {
    width: '99%',
    marginBottom: '10px',
    marginTop: question?.fileMetadataId ? '20px' : '10px',
  };

  const containerStyle = {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  };

  const getWidth = (id: number) => {
    const file = watch(`variants[${id}].fileURL`);
    if (file) {
      return {
        width: '30%',
      };
    } else return { width: '55%' };
  };

  // const getText = async (itemQuestion: any) => {
  //   const { data } = await getQuestionsInSubtest(itemQuestion.subtestId);

  //   setQuestionsInSubtest(data);
  // };

  // const getQuestions = (itemQuestion: any, index: number): any => {
  //   getText(itemQuestion);

  //   return `Вопрос №${index + 1} ${questionsInSubtest?.map(
  //     (subtestQuestion: any, idx: number) =>
  //       `(Вопрос № ${idx + 1} в субтесте ${subtestQuestion.subtestName})`,
  //   )}`;
  // };

  return (
    <Box sx={{ marginTop: '40px', overflow: 'auto' }}>
      <Box className={styles.structure}>
        {questions.map((item: any, index: number) => {
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor:
                  item.id === question?.id ? '#3a80fc' : 'transparent',
                paddingLeft: '10px',
                paddingRight: '10px',
                paddingTop: '10px',
                paddingBottom: '10px',
                marginRight: '10px',
              }}
            >
              <Typography
                style={{
                  cursor: 'pointer',
                  color: item.id === question?.id ? 'white' : 'black',
                }}
                onClick={() => {
                  dispatch(testsActions.getQuestionAsync(item.id));
                  dispatch(testsActions.getQuestionGroupsAsync(null));
                }}
              >
                {item?.subtestName
                  ? `Вопрос №${index + 1}, (Субтест: ${item.subtestName})`
                  : `Вопрос №${index + 1}`}
              </Typography>

              <Box>
                <IconButton
                  onClick={() =>
                    dispatch(testsActions.deleteQuestionAsync(item.id))
                  }
                  aria-label="delete"
                  size="medium"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Box>

      {!isLoadingGetQuestion &&
      !isLoadingCreateQuestion &&
      !isLoadingEditQuestion ? (
        <>
          {subtests.length ? (
            <FormControl sx={styleSelect}>
              <InputLabel id="subtests">Субтест</InputLabel>
              <Select
                {...register('subtestId')}
                labelId="subtests"
                label="Субтест"
                sx={{ width: '99%' }}
                defaultValue={question?.subtestId || formValues.subtestId}
              >
                {subtests.map((item: any) => {
                  return <MenuItem value={item.id}>{item.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          ) : null}

          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <Box sx={containerStyle}>
              {question?.fileMetadataId && (
                <Box sx={{ position: 'relative' }}>
                  <IconButton
                    onClick={() =>
                      dispatch(
                        testsActions.deleteFileAsync(question?.fileMetadataId),
                      )
                    }
                    className={styles.deleteFile}
                  >
                    <CloseIcon />
                  </IconButton>
                  <img width={198} height={182} src={question?.fileURL} />
                </Box>
              )}
              <TextField
                {...register(`questionText`, {
                  required: question?.fileMetadataId ? false : true,
                })}
                sx={
                  question?.fileMetadataId ? { width: '60%' } : { width: '90%' }
                }
                defaultValue={question?.text}
                multiline
                maxRows={4}
                label={`Текст вопроса`}
                error={errors && errors.questionText}
              />
              <label htmlFor="questionFile">
                <input
                  onChange={(data) => {
                    if (question?.fileMetadataId) {
                      dispatch(
                        testsActions.deleteFileAsync(question?.fileMetadataId),
                      );
                    }
                    dispatch(
                      testsActions.addFileAsync(data?.target?.files?.[0]),
                    );
                  }}
                  style={{ display: 'none' }}
                  id="questionFile"
                  name="questionFile"
                  type="file"
                />
                <Fab
                  sx={{ marginRight: '10px' }}
                  color="primary"
                  size="small"
                  component="span"
                  aria-label="add"
                >
                  <AttachFileIcon />
                </Fab>
              </label>
              <FormControl sx={styleSelect}>
                <InputLabel id="questionGroupId">
                  Связь с группой вопросов
                </InputLabel>
                <Select
                  {...register('questionGroupId', {
                    required: true,
                  })}
                  labelId="questionGroupId"
                  label="Связь с группой вопросов"
                  defaultValue={
                    question?.questionGroupId || formValues.questionGroupId
                  }
                  error={errors && errors.questionGroupId}
                >
                  {questionGroups.map((item: any) => {
                    return (
                      <MenuItem
                        onClick={() =>
                          append({
                            score: '',
                            text: '',
                            fileMetadataId: '',
                          })
                        }
                        value={item.id}
                      >
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {fields.map((field, index) => (
            <Box
              key={field.id}
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              <Box sx={containerStyle}>
                {fileText(index)}
                <TextField
                  {...register(`variants[${index}].text`)}
                  multiline
                  maxRows={4}
                  sx={() => getWidth(index)}
                  className={styles.input}
                  label={`Вариант ответа № ${index + 1}`}
                  error={
                    errors &&
                    errors.variants &&
                    errors.variants[index] &&
                    !!errors?.variants[index]?.text
                  }
                />
                <Box>
                  <label htmlFor={`variantFile${index}`}>
                    <input
                      onChange={(data) =>
                        getFile(data?.target?.files?.[0], index)
                      }
                      style={{ display: 'none' }}
                      id={`variantFile${index}`}
                      name={`variantFile${index}`}
                      type="file"
                    />
                    <Fab
                      color="primary"
                      size="small"
                      component="span"
                      aria-label="add"
                    >
                      <AttachFileIcon />
                    </Fab>
                  </label>
                </Box>
                <Box>
                  <TextField
                    {...register(`variants[${index}].score`, {
                      required: true,
                    })}
                    className={styles.input}
                    label={`Кол-во баллов`}
                    error={
                      errors &&
                      errors.variants &&
                      errors.variants[index] &&
                      !!errors?.variants[index]?.score
                    }
                  />
                </Box>
              </Box>

              <TextField
                {...register(`variants[${index}].fileMetadataId`)}
                sx={{ display: 'none' }}
              />
              <Box>
                <IconButton
                  onClick={() => remove(index)}
                  aria-label="delete"
                  size="medium"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Box>
            </Box>
          ))}

          <Button
            sx={{ marginTop: '16px' }}
            className={styles.cancelButton}
            variant="text"
            size={'small'}
            onClick={() =>
              append({
                score: '',
                text: '',
                fileMetadataId: '',
              })
            }
          >
            + Добавить вариант ответа
          </Button>
        </>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default StepTwo;

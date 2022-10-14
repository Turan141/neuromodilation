import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import { useDraggable } from 'react-use-draggable-scroll';

import styles from './CreateProblem.module.scss';

import Box from '@mui/material/Box';

import {
  useFormContext,
  useFieldArray,
  Controller,
  useWatch,
  useForm,
} from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { getProblems } from '@bus/problems/selector';

import { problemsActions } from '@bus/problems/actions';
import Loader from '@components/Loader';

const Tree: React.FC = () => {
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  const dispatch = useDispatch();
  const { videos, singleProblem, processing, isLoadingProcessing } =
    useSelector(getProblems);
  const {
    control,
    register,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    dispatch(problemsActions.getProcessingAsync(singleProblem?.id));
  }, []);

  useEffect(() => {
    if (processing) {
      setValue('title', processing.title);
      setValue('question', processing.question);
      setValue('fileMetadataId', processing.fileMetadataId);
      setValue('processingNodes', processing.processingNodes);
    }
  }, [processing]);

  const addChild = () => {
    setValue('processingNodes', [
      {
        title: '',
        question: '',
        processingType: 1,
        fileMetadataId: '',
        processingNodes: [],
      },
      {
        title: '',
        question: '',
        processingType: 2,
        fileMetadataId: '',
        processingNodes: [],
      },
    ]);
  };

  const addChildOfChild = (parentIndex: string) => {
    const processingNodes = [
      {
        title: '',
        question: '',
        processingType: 1,
        fileMetadataId: '',
        processingNodes: [],
      },
      {
        title: '',
        question: '',
        processingType: 2,
        fileMetadataId: '',
        processingNodes: [],
      },
    ];
    const processingChildNodes = watch(`${parentIndex}`);

    setValue(parentIndex, processingChildNodes?.length ? [] : processingNodes);
  };

  const styleSelect = {
    width: '550px',
    marginBottom: '10px',
    marginTop: '10px',
  };
  const rootProcessingNodes: any = watch('processingNodes');

  const ViewProcessing = ({ child, parentIndex }: any) => {
    const rootProcessingNodes: any = watch(`${parentIndex}.processingNodes`);

    return (
      <>
        <Box
          sx={{
            position: 'relative',
            marginTop: '5px',
            paddingLeft: '89px',
            borderLeft: '1px solid #C2D1D9',
          }}
        >
          <Typography
            sx={{
              display: 'flex',
              position: 'absolute',
              top: '6px',
              color: '#C2D1D9',
              left: '1px',
            }}
          >
            —— &nbsp;
            <Typography sx={{ color: '#424B5A' }}>
              {child.processingType === 1 ? 'Да' : 'Нет'}
            </Typography>
          </Typography>
          <Box
            sx={{
              width: '1187px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <TextField
              {...register(`${parentIndex}.title`, {
                required: true,
              })}
              className={styles.inputTree}
              // sx={{ width: '45%' }}
              sx={{ width: '550px' }}
              label={'Название видео'}
            />
            <FormControl sx={styleSelect}>
              <InputLabel>Выбор видео</InputLabel>
              <Select
                defaultValue={child.fileMetadataId}
                sx={{
                  width: '550px',
                }}
                {...register(`${parentIndex}.fileMetadataId`, {
                  required: true,
                })}
                label="Выбор видео"
              >
                {videos.map((item: any) => {
                  return <MenuItem value={item.id}>{item.fileName}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              width: '1187px',
              marginRight: '10px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <TextField
              {...register(`${parentIndex}.question`, {
                required: true,
              })}
              sx={{ width: '550px' }}
              className={styles.inputTree}
              label={`Вопрос по дальнейшей проработке`}
            />
            <Box
              sx={{
                marginRight: '10px',
                display: 'flex',
                alignItems: 'center',
                width: '550px',
              }}
            >
              <Button
                sx={{ color: 'white' }}
                onClick={() =>
                  addChildOfChild(`${parentIndex}.processingNodes`)
                }
              >
                {rootProcessingNodes?.length
                  ? 'Удалить варианты ответов'
                  : 'Добавить варианты ответов'}
              </Button>
            </Box>
          </Box>
          {rootProcessingNodes?.map((item: any, idx: number) => (
            //@ts-ignore
            <ViewProcessing
              parentIndex={`${parentIndex}.processingNodes[${idx}]`}
              index={idx}
              key={idx}
              child={item}
            />
          ))}
        </Box>
      </>
    );
  };

  return (
    <Box
      {...events}
      ref={ref}
      sx={{ marginTop: '-3px', overflowX: 'hidden', overflowY: 'hidden' }}
    >
      {!isLoadingProcessing ? (
        <div>
          <Button
            sx={{ color: 'white' }}
            onClick={() => console.log(getValues())}
          >
            State
          </Button>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginRight: '10px',
            }}
          >
            <TextField
              {...register(`title`, {
                required: true,
              })}
              className={styles.inputTree}
              sx={{ width: '550px' }}
              error={!!errors?.title}
              label={'Название видео № 1'}
            />
            <FormControl sx={styleSelect}>
              <InputLabel>Выбор видео</InputLabel>
              <Select
                {...register(`fileMetadataId`, {
                  required: true,
                })}
                label="Выбор видео"
                defaultValue={processing?.fileMetadataId}
                error={!!errors?.fileMetadataId}
              >
                {videos.map((item: any) => {
                  return <MenuItem value={item.id}>{item.fileName}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              marginRight: '10px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <TextField
              {...register(`question`, {
                required: true,
              })}
              fullWidth
              error={!!errors?.question}
              className={styles.inputTree}
              label={`Вопрос по дальнейшей проработке`}
            />
            <Box
              sx={{
                marginRight: '10px',
                display: rootProcessingNodes?.length ? 'none' : 'flex',
                alignItems: 'center',
                width: '550px',
              }}
            >
              <Button sx={{ color: 'white' }} onClick={addChild}>
                Добавить варианты ответа
              </Button>
            </Box>
          </Box>
          {rootProcessingNodes?.map((item: any, idx: number) => (
            //@ts-ignore
            <ViewProcessing
              child={item}
              parentIndex={`processingNodes[${idx}]`}
            />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default Tree;

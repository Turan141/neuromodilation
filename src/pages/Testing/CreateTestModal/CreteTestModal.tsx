import React, { useCallback, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Step, StepLabel, Stepper, TextField } from '@mui/material';

import { StepIconProps } from '@mui/material/StepIcon';

import CreateIcon from '@mui/icons-material/Create';

import {
  useFieldArray,
  useForm,
  useWatch,
  FormProvider,
} from 'react-hook-form';
import styles from './CreateTest.module.scss';
import StepTwo from './StepTwo';
import StepOne from './StepOne';
import { testsActions } from '@bus/tests/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getTests } from '@bus/tests/selector';
import StepThree from './StepThree';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const style = {
  // display: 'flex',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 839,
  height: 753,
  bgcolor: 'white',
  borderRadius: '4px',
  boxShadow: 24,
  padding: '32px 56px',
};

const CreateTestModal: React.FC<ModalProps> = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { singleTest, question } = useSelector(getTests);
  const [activeStep, setActiveStep] = useState(0);
  const [statusCreate, setStatusCreate] = useState(true);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [disabledButton, setDisabledButton] = useState(true);

  const methods = useForm();
  const {
    handleSubmit,
    reset,
    control,
    resetField,
    getValues,
    formState: { errors },
  } = methods;

  const steps = ['Тест', 'Вопросы и ответы', 'Результаты'];

  const totalSteps = () => {
    return steps.length;
  };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStep = (step: number) => () => {
    if (disabledButton === false) {
      setActiveStep(step);
    }
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  const handleReset = () => {
    reset();
    setActiveStep(0);
    setCompleted({});
  };
  const closeModal = () => {
    reset();
    handleClose();
    dispatch(testsActions.getSingleTestSuccess(null));
    dispatch(testsActions.setSubtestsSuccess([]));
    dispatch(testsActions.getQuestionGroupsSuccess([]));
    dispatch(testsActions.getQuestionsSuccess([]));
    dispatch(testsActions.getQuestionSuccess(null));
  };

  const name = useWatch({ control, name: 'name' });
  const description = useWatch({ control, name: 'description' });

  useEffect(() => {
    if (name?.length && description?.length) {
      setDisabledButton(false);
    } else setDisabledButton(true);
  }, [name, description]);

  const ColorLibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(57,128,253) 0%, rgb(57,128,253) 50%, rgb(57,128,253) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(57,128,253) 0%, rgb(57,128,253) 50%, rgb(57,128,253) 100%)',
    }),
  }));

  function ColorLibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement | number } = {
      1: completed ? <CreateIcon /> : 1,
      2: completed ? <CreateIcon /> : 2,
      3: completed ? <CreateIcon /> : 3,
    };

    return (
      <ColorLibStepIconRoot
        sx={{ fontSize: '21px' }}
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorLibStepIconRoot>
    );
  }

  const customReset = (formData: any) => {
    dispatch(testsActions.getQuestionGroupsSuccess([]));

    reset({
      ...formData,
      variants: [],
      questionGroupId: '',
      questionText: '',
      questionId: null,
    });
    dispatch(testsActions.getQuestionGroupsAsync(null));
  };
  useEffect(() => {
    if (singleTest) {
      setStatusCreate(false);
    }
  }, [singleTest]);

  const createTest = handleSubmit((data) => {
    if (activeStep === 2) {
      dispatch(
        testsActions.setResultsAsync({
          testId: singleTest?.id,
          results: data.results,
        }),
      );
    } else if (activeStep === 1) {
      if (data.questionId) {
        dispatch(
          testsActions.editQuestionAsync({
            id: data.questionId,
            variants: data.variants,
            questionGroupId: data.questionGroupId,
            fileMetadataId: question?.fileMetadataId || null,
            subtestId: data.subtestId || null,
            testId: singleTest?.id,
            text: data.questionText,
          }),
        );
        setTimeout(() => {
          dispatch(testsActions.getQuestionsAsync(singleTest?.id));
        }, 1000);
        customReset(data);
      } else {
        dispatch(
          testsActions.addQuestionAsync({
            variants: data.variants,
            questionGroupId: data.questionGroupId,
            fileMetadataId: question?.fileMetadataId || null,
            subtestId: data.subtestId || null,
            testId: singleTest?.id,
            text: data.questionText,
          }),
        );
        setTimeout(() => {
          dispatch(testsActions.getQuestionsAsync(singleTest?.id));
        }, 1000);
        customReset(data);
      }
      dispatch(testsActions.getQuestionSuccess(null));
    } else if (!activeStep && singleTest) {
      dispatch(
        testsActions.editSingleTestAsync({ id: singleTest.id, ...data }),
      );
    } else if (!activeStep && !singleTest) {
      dispatch(testsActions.createTestAsync(data));
      setStatusCreate(false);
    }
  });

  const handleNext = async (toFinish?: boolean) => {
    if (!toFinish) {
      await createTest();
      if (Object.keys(errors).length === 0) {
        const newActiveStep =
          isLastStep() && !allStepsCompleted()
            ? steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
      }
    } else if (Object.keys(errors).length === 0) {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          <Typography sx={{ textAlign: 'center' }} variant="h4">
            {singleTest ? 'Редактирование теста' : 'Создание теста'}
          </Typography>

          <Box
            sx={{
              width: '100%',
              marginTop: '40px',
            }}
          >
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepLabel
                    StepIconComponent={ColorLibStepIcon}
                    color="inherit"
                    onClick={handleStep(index)}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <>
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Все этапы создания теста выполнены!
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button sx={{ color: 'white' }} onClick={handleReset}>
                      Начать заново
                    </Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <FormProvider {...methods}>
                    <form className={styles.container} onSubmit={createTest}>
                      {activeStep === 0 && <StepOne />}
                      {activeStep === 1 && <StepTwo />}
                      {activeStep === 2 && <StepThree />}

                      <Box
                        sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}
                      >
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1, color: 'white' }}
                        >
                          Назад
                        </Button>
                        <Button
                          color="inherit"
                          onClick={closeModal}
                          sx={{ mr: 1, color: 'white' }}
                        >
                          {activeStep === 1 ? 'Завершить ' : 'ЗАКРЫТЬ'}
                        </Button>

                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep === 1 ? (
                          <>
                            <Button
                              type="submit"
                              disabled={disabledButton}
                              sx={{ mr: 1, color: 'white' }}
                            >
                              {question?.variants
                                ? 'Редактировать вопрос'
                                : 'Создать вопрос'}
                            </Button>
                            <Button
                              onClick={() => handleNext(true)}
                              sx={{ mr: 1, color: 'white' }}
                            >
                              Далее
                            </Button>
                          </>
                        ) : (
                          <Button
                            type="submit"
                            disabled={disabledButton}
                            sx={{ mr: 1, color: 'white' }}
                          >
                            Сохранить
                          </Button>
                        )}
                        {activeStep === 0 ? (
                          <Button
                            disabled={statusCreate}
                            onClick={() => handleNext(false)}
                            sx={{ mr: 1, color: 'white' }}
                          >
                            Далее
                          </Button>
                        ) : null}
                      </Box>
                    </form>
                  </FormProvider>
                </React.Fragment>
              )}
            </>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateTestModal;

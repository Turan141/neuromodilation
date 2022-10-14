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
import styles from './CreateProblem.module.scss';
import StepTwo from './StepTwo';
import StepOne from './StepOne';
import { testsActions } from '@bus/tests/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getTests } from '@bus/tests/selector';
import { getProblems } from '@bus/problems/selector';
import { problemsActions } from '@bus/problems/actions';
import Tree from './Tree';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const CreateProblem: React.FC<ModalProps> = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { singleProblem, videos, isLoadingSingleProblemVideos, processing } =
    useSelector(getProblems);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [disabledButton, setDisabledButton] = useState(false);

  const style = {
    // display: 'flex',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: activeStep === 1 ? 1400 : 839,
    height: activeStep === 1 ? 900 : 742,
    bgcolor: 'white',
    borderRadius: '4px',
    boxShadow: 24,
    padding: '32px 56px',
  };

  const methods = useForm();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const steps = ['Загрузка видео', 'Дерево проработки'];

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

  const closeModal = () => {
    reset();
    handleClose();
    dispatch(problemsActions.getProcessingSuccess(null));
  };

  // useEffect(() => {
  //   if (!files) {
  //     setDisabledButton(true);
  //   } else if (isLoadingSingleProblemVideos) {
  //     setDisabledButton(true);
  //   } else if (files && singleProblem) {
  //     setDisabledButton(true);
  //   } else if (singleProblem) {
  //     setDisabledButton(false);
  //   } else setDisabledButton(true);
  // }, [singleProblem, isLoadingSingleProblemVideos]);

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
    reset({
      ...formData,
    });
  };

  const createProblem = handleSubmit((data) => {
    if (activeStep === 1) {
      if (processing) {
        dispatch(
          problemsActions.editProcessingAsync({
            questionGroupId: singleProblem?.id,
            processingNode: {
              title: data.title,
              question: data.question,
              processingType: 0,
              fileMetadataId: data.fileMetadataId,
              processingNodes: data.processingNodes,
            },
          }),
        );
      } else
        dispatch(
          problemsActions.addProcessingAsync({
            questionGroupId: singleProblem?.id,
            processingNode: {
              title: data.title,
              question: data.question,
              processingType: 0,
              fileMetadataId: data.fileMetadataId,
              processingNodes: data.processingNodes,
            },
          }),
        );
    } else
      dispatch(
        problemsActions.getSingleProblemVideosAsync({
          id: singleProblem?.id,
        }),
      );
    customReset(data);
  });

  const handleNext = async () => {
    if (Object.keys(errors).length === 0) {
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
            Добавление проработки
          </Typography>

          <Box
            sx={{
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
              <React.Fragment>
                <FormProvider {...methods}>
                  <form
                    style={{
                      height: activeStep === 1 ? 690 : 550,
                    }}
                    className={styles.container}
                    onSubmit={createProblem}
                  >
                    {activeStep === 0 && (
                      <StepTwo setDisabledButton={setDisabledButton} />
                    )}
                    {activeStep === 1 && <Tree />}

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
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
                      <Button
                        type="submit"
                        disabled={disabledButton}
                        sx={{ mr: 1, color: 'white' }}
                      >
                        Сохранить
                      </Button>
                      {activeStep === 0 ? (
                        <Button
                          disabled={videos?.length ? false : true}
                          onClick={handleNext}
                          sx={{ mr: 1, color: 'white' }}
                        >
                          Далее
                        </Button>
                      ) : null}
                    </Box>
                  </form>
                </FormProvider>
              </React.Fragment>
            </>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateProblem;

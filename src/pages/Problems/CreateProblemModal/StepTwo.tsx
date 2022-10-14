import React, { useEffect } from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

import Box from '@mui/material/Box';

import { useFormContext, useFieldArray } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';

import { getProblems } from '@bus/problems/selector';
import Loader from '@components/Loader';
import { problemsActions } from '@bus/problems/actions';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { testsActions } from '@bus/tests/actions';
import { deleteFile } from '@api/Files';

const StepTwo: React.FC<any> = ({ setDisabledButton }: any) => {
  const dispatch = useDispatch();

  const { videos, isLoadingSingleProblemVideos, singleProblem } =
    useSelector(getProblems);
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleDeleteFile = async (fileId: string) => {
    await deleteFile(fileId);
    dispatch(
      problemsActions.getSingleProblemVideosAsync({
        id: singleProblem?.id,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      problemsActions.getSingleProblemVideosAsync({
        id: singleProblem?.id,
      }),
    );
  }, []);

  const getUploadParams: any = async (fileWithMeta: any) => {
    const token = localStorage.getItem('@admin_ACCESS_TOKEN');

    const body = new FormData();
    body.append('files', fileWithMeta.file);
    body.append('QuestionGroupId', singleProblem?.id);

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${process.env.API_URL}/v1/Files/batch`,
      body,
    };
  };

  const handleChangeStatus = (
    { meta, file, files }: any,
    status: any,
    allFiles: any,
  ) => {
    const videos = watch('files');
    for (const key of allFiles) {
      if (key.meta.status === 'uploading') {
        setDisabledButton(true);
      } else if (key.meta.status === 'done') {
        setDisabledButton(false);
      }
    }
  };

  return (
    <Box sx={{ marginTop: '-3px', overflow: 'auto' }}>
      {!isLoadingSingleProblemVideos ? (
        <>
          <Box>
            {videos?.map((video: any) => (
              <Box
                sx={{
                  marginTop: '5px',
                  border: '1px dashed #3980FD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'transparent',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  marginRight: '10px',
                }}
              >
                <video
                  style={{
                    objectFit: 'fill',
                  }}
                  controls={true}
                  width={200}
                  height={200}
                  src={video.url}
                />

                <Typography
                  sx={{
                    cursor: 'pointer',
                    color: 'black',
                  }}
                >
                  {video?.fileName}
                </Typography>

                <Box>
                  <IconButton
                    onClick={() => handleDeleteFile(video.id)}
                    aria-label="delete"
                    size="medium"
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
          <Dropzone
            inputWithFilesContent="Добавить файлы"
            onChangeStatus={handleChangeStatus}
            getUploadParams={getUploadParams}
            inputContent="Нажмите, чтобы выбрать файлы или перетащите их сюда"
            styles={{
              dropzone: {
                marginTop: videos && '10px',
                minHeight: '456px',
                overflow: 'hidden',
              },
              inputLabelWithFiles: {
                marginBottom: '10px',
              },
            }}
            accept="image/*,audio/*,video/*"
          />
        </>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default StepTwo;

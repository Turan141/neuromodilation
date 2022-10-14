import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { getLegalEntities } from '@bus/legalEntities/selector';
import { Stack } from '@mui/material';
import styles from './LegalEntitiesDeleteModal.module.scss';
import { legalEntitiesActions } from '@bus/legalEntities/actions';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const LegalEntitiesDeleteModal: React.FC<ModalProps> = ({
  open,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const { singleLegalEntitie, isLoadingSingleLegalEntitie } =
    useSelector(getLegalEntities);

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
      dispatch(legalEntitiesActions.getSingleLegalEntitieSuccess(null));
    };
  }, []);

  const deleteLegalEntities = (id: number | undefined) => {
    dispatch(legalEntitiesActions.deleteLegalEntitieAsync({ id }));
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ textAlign: 'center' }} variant="h4">
            Удаление юр.лица
          </Typography>
          <Typography
            sx={{ textAlign: 'center', fontSize: '16px' }}
            variant="h5"
          >
            {singleLegalEntitie &&
              `Вы действительно хотите удалить юр.лицо ${singleLegalEntitie?.name} ?`}
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
              onClick={() => deleteLegalEntities(singleLegalEntitie?.id)}
            >
              Удалить
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default LegalEntitiesDeleteModal;

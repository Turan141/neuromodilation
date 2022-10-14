import * as React from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import LegalEntitiesForm from '../Forms/LegalEntitiesForm';
import { getLegalEntities } from '@bus/legalEntities/selector';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const LegalEntitiesModal: React.FC<ModalProps> = ({ open, handleClose }) => {
  const { singleLegalEntitie, isLoadingSingleLegalEntitie } =
    useSelector(getLegalEntities);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 618,
    height: isLoadingSingleLegalEntitie ? 600 : 470,
    bgcolor: 'white',
    borderRadius: '4px',
    boxShadow: 24,
    padding: '32px 56px',
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
            {singleLegalEntitie ? 'Редактирование юр.лица' : 'Создание юр.лица'}
          </Typography>
          <LegalEntitiesForm
            singleLegalEntitie={singleLegalEntitie}
            loading={isLoadingSingleLegalEntitie}
            close={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default LegalEntitiesModal;

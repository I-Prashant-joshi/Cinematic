import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs:400,
    lg:900
  },
  height:{
    xs:200,
    lg:500
  },
  bgcolor: 'background.paper',
  boxShadow: 24,

};

export default function PopUp({open,handleClose,data}) {
console.log("key",data);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <iframe width="100%" height="100%"
src={`https://www.youtube.com/embed/${data}?autoplay=1&mute=1`}>
</iframe>
        </Box>
      </Modal>
    </div>
  );
}
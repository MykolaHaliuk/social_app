import React, { useState } from 'react';
import { Avatar, Box, Fab, IconButton, Modal, Stack, styled, TextField, Tooltip, Typography } from "@mui/material";
import { Add as AddIcon, EmojiEmotions } from "@mui/icons-material";
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const UserBlock = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "10px",
})
const Add = () => {

  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip onClick={() => setOpen(true)} title="Delete" sx={{position: "fixed", bottom: 20, left: {xs: "calc(50% - 25px)", md: 30}}}>
        <Fab>
          <AddIcon />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={280} bgcolor="white" p={3} borderRadius={5}>
          <Typography variant={"h6"} color={"gray"} textAlign={"center"}>Створити новий допис</Typography>
          <UserBlock>
            <Avatar/>
            <Typography fontWeight={500} variant={"span"}>Джо Байден</Typography>
          </UserBlock>
          <TextField
            sx={{width: "100%"}}
            id="outlined-multiline-static"
            multiline
            rows={4}
            placeholder="Що ви думаєте?"
          />
          <Stack direction={"row"} gap={1} mt={"10px"}>
            <EmojiEmotions />
          </Stack>
        </Box>
      </StyledModal>
    </>
  );
};

export default Add;

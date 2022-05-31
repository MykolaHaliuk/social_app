import React from 'react';
import { Avatar, AvatarGroup, Box, Divider, ImageList, ImageListItem, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

const Rightbar = () => {
  return (
    <Box flex={2} p={2} sx={{display: {xs: "none", sm: "block"}}}>
      <Box position="fixed" width={300}>
        <Typography variant="h6" fontWeight={100}>Онлайн друзі</Typography>
        <AvatarGroup total={8}>
          <Avatar alt="Remy Sharp" src="" />
          <Avatar alt="Travis Howard" src="" />
          <Avatar alt="Agnes Walker" src="" />
          <Avatar alt="Trevor Henderson" src="" />
        </AvatarGroup>
        <Typography variant="h6" fontWeight={100} mt={5}>Останні фото</Typography>
        <ImageList cols={3} gap={5} rowHeight={100}>
            <ImageListItem key={1}>
              <img
                src={"https://i.pinimg.com/474x/db/63/c3/db63c314b52e062746d85de587d82bc2.jpg"}

                loading="lazy"
              />
            </ImageListItem>
          <ImageListItem key={2}>
            <img
              src={"https://i.pinimg.com/474x/db/63/c3/db63c314b52e062746d85de587d82bc2.jpg"}

              loading="lazy"
            />
          </ImageListItem>
          <ImageListItem key={3}>
            <img
              src={"https://i.pinimg.com/474x/db/63/c3/db63c314b52e062746d85de587d82bc2.jpg"}

              loading="lazy"
            />
          </ImageListItem>
          <ImageListItem key={4}>
            <img
              src={"https://i.pinimg.com/474x/db/63/c3/db63c314b52e062746d85de587d82bc2.jpg"}

              loading="lazy"
            />
          </ImageListItem>
        </ImageList>
        <Typography variant="h6" fontWeight={100} mt={5}>Останні розмови</Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="https://i.pinimg.com/474x/db/63/c3/db63c314b52e062746d85de587d82bc2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Brunch this weekend?"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" — I'll be in your neighborhood doing errands this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Box>

    </Box>
  );
};

export default Rightbar;

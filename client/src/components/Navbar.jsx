import React, { useState } from 'react';
import { AppBar, Avatar, Badge, Box, Menu, MenuItem, styled, Toolbar, Typography } from "@mui/material";
import { Facebook, Mail, Notifications } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/use-auth-context";
import { observer } from "mobx-react-lite";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
})

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%"
}));

const Icons = styled(Box)(({ theme}) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  }
}));

const UserBox = styled(Box)(({ theme}) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  }
}));

const Navbar = () => {
  const history = useHistory();
  const { authStore } = useAuthContext();
  const [open, setOpen] = useState(false);
  console.log("=>(Nav123123123123123e", ...authStore.user);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{display: {xs:"none", sm:"block"}}}>
          єДрузі
        </Typography>
        <Facebook sx={{display: {xs:"block", sm:"none"}}}/>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail onClick={() => history.push("/messenger")}/>
          </Badge>
          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
          <Avatar onClick={e=>setOpen(true)} sx={{width: 30, height: 30}} src="https://play-lh.googleusercontent.com/ZyWNGIfzUyoajtFcD7NhMksHEZh37f-MkHVGr5Yfefa-IX7yj9SMfI82Z7a2wpdKCA=s360-rw"/>
        </Icons>
        <UserBox onClick={e=>setOpen(true)}>
          <Avatar sx={{width: 30, height: 30}}  src="https://play-lh.googleusercontent.com/ZyWNGIfzUyoajtFcD7NhMksHEZh37f-MkHVGr5Yfefa-IX7yj9SMfI82Z7a2wpdKCA=s360-rw"/>
          <Typography variant="span">John</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={e => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}

      >
        <MenuItem onClick={() => {}}>Profile</MenuItem>
        <MenuItem onClick={() => {}}>My account</MenuItem>
        <MenuItem onClick={() => {}}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default observer(Navbar);

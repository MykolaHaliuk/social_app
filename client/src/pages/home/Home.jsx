import { Grid } from "@mui/material";
//import { makeStyles } from '@mui/styles';
import { makeStyles } from '@mui/styles';
import Add from "../../components/Add";
import Feed from "../../components/Feed";
import SideBar from "../../components/Sidebar";
import Navbar from "../../components/Navbar"
import RightBar from "../../components/Rigthbar";

// const useStyles = makeStyles((theme) => ({
//   right: {
//     [theme.breakpoints.down("sm")]: {
//       display: "none",
//     },
//   },
// }));

const Home = () => {
  // const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <SideBar />
        </Grid>
        <Grid item sm={7} xs={10}>
          <Feed />
        </Grid>
        <Grid item sm={3}>
          <RightBar />
        </Grid>
      </Grid>
      <Add />
    </div>
  );
};

export default Home;
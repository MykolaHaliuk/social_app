import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/use-auth-context";
import { useForm } from "react-hook-form";

export function Login() {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email є обов`язковим")
      .email("Email не валідний"),
    password: Yup.string()
      .required("Пароль є обов`язковим is required")
      .min(6, "Пароль має містити не менше 6 символів")
      .max(40, "Пароль не повинен перевищувати 40 символів"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { authStore } = useAuthContext();
  const history = useHistory();

  const onSubmit = async (data) => {
    await authStore.login(data).catch(() => {
      setError("password", {
        type: "server",
        message: "Пароль або пошта не правильні!",
      });
    });
  };

  return (
    <Grid
      bgcolor="#f0f2f5"
      container
      minHeight="100vh"
      minWidth="100vh"
      spacing={1}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid item xs={4}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "10px 15px",
            borderRadius: 5,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: "50px",
              fontWeight: 800,
              color: "#1775ee",
              marginBottom: "10px",
            }}
          >
            Social
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: "24px",
            }}
          >
            Спілкуйтеся з друзями та навколишнім світом на Social...
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Grid
          container
          spacing={1}
          bgcolor="white"
          sx={{
            padding: "15px 15px",
            borderRadius: 5,
          }}
        >
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              margin="dense"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Пароль"
              type="password"
              fullWidth
              {...register("password")}
              sx={{ marginTop: 3 }}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={12}>
            {authStore.isLoading ? (
              <CircularProgress fullWidth color="white" size="20px" />
            ) : (
              <Button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ padding: 1, marginTop: 2, borderRadius: 2 }}
              >
                Увійти
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ textAlign: "center", color: "#1565c0", marginTop: "10px" }}
            >
              Забули пароль?
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            {authStore.isLoading ? (
              <CircularProgress color="white" size="20px" />
            ) : (
              <Button
                onClick={() => history.push("/")}
                variant="contained"
                color="success"
                variant="contained"
                color="success"
                sx={{
                  padding: "10px 15px",
                  borderRadius: 2,
                  width: "60%",
                }}
              >
                Створити новий акаунт
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default Login;

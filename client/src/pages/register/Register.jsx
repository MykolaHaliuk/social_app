import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useAuthContext } from "../../context/use-auth-context";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

export const Register = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Ім’я користувача обов’язкове")
      .min(6, "Ім’я користувача має містити не менше 6 символів")
      .max(20, "Ім'я користувача не повинно перевищувати 20 символів"),
    email: Yup.string()
      .required("Електронна адреса обов’язкова")
      .email("Електронна адреса недійсна"),
    password: Yup.string()
      .required("Потрібен пароль")
      .min(6, "Пароль має містити не менше 6 символів")
      .max(40, "Пароль не повинен перевищувати 40 символів"),
    confirmPassword: Yup.string()
      .required("Необхідно підтвердити пароль")
      .oneOf([Yup.ref("password"), null], "Паролі не збігається"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    delete data.confirmPassword;
    await authStore.registration(data);
  };
  const { authStore } = useAuthContext();
  const history = useHistory();

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
        <Box
          bgcolor="white"
          sx={{
            padding: "15px 15px",
            borderRadius: 5,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                required
                id="username"
                name="username"
                label="Ім'я користувача"
                fullWidth
                margin="dense"
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            </Grid>
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
                required
                id="password"
                name="password"
                label="Пароль"
                type="password"
                fullWidth
                margin="dense"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Підтвердьте пароль"
                type="password"
                fullWidth
                margin="dense"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ padding: 2, borderRadius: 2 }}
                onClick={handleSubmit(onSubmit)}
              >
                Зареєструватися
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                onClick={() => history.push("/login")}
                variant="contained"
                color="success"
                sx={{
                  padding: "10px 15px",
                  borderRadius: 2,
                  width: "60%",
                }}
              >
                Увійдіть в обліковий запис
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default observer(Register);

import { Button, Row } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues } from "react-hook-form";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     userId: "A-00001",
  //     password: "123456",
  //   },
  // });
  const [login] = useLoginMutation();

  const defaultValues = {
    //admin
    userId: "A-0001",
    // password: "123456",

    //student
    // userId: "2024010001",
    // password: "111222",
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      console.log(res);

      dispatch(setUser({ user: user, token: res.data.accessToken }));

      toast.success("logged in", { id: toastId, duration: 2000 });
      if (res.data.needsPasswordChange) {
        navigate(`/change-password`);
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
    console.log(data);
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="userId" label="Id" />
        <PHInput type="text" name="password" label="Password" />

        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;

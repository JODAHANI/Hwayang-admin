import { auth } from "../../_actions/user_actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStateType } from "../../constants/types";
import Header from "../layout/Header/Header";
const Auth: Function = (
  HigherOrderComponent: any,
  option: null | boolean
): Function => {
  function AuthenticationCheck(props: any): JSX.Element {
    let user = useSelector((state: ReduxStateType) => state.user);
    const dispatch: any = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((res) => {
        if (!res.payload.isAuth) {
          if (option) {
            props.history.push("/");
          }
        } else {
          if (option === false) {
            props.history.push("/");
          }
        }
      });
    }, [dispatch, props.history]);

    return <HigherOrderComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
};

export default Auth;

import { fetchWithoutToken, fetchWithToken } from "./../helper/Fetcher";
import types from "./../types/types";
import Swal from "sweetalert2";

export const startLogin = (email, password) => async (dispatch) => {
  const resp = await fetchWithoutToken("auth", { email, password }, "POST");
  const body = await resp.json();
  if (!body.ok) {
    Swal.fire("Error", body.msg, "error");
    dispatch(checkingFinish());
    return;
  }
  dispatchLogin(body, dispatch);
};

export const startLogout = () => (dispatch) => {
  localStorage.clear();
  dispatch(logout(types));
};

const logout = () => ({ type: types.authLogout });

export const startChecking = () => async (dispatch) => {
  const resp = await fetchWithToken("auth/renew");
  const body = await resp.json();
  if (!body.ok) {
    Swal.fire("Error", body.msg, "error");
    dispatch(checkingFinish());
    return;
  }
  dispatchLogin(body, dispatch);
};

export const startUserRegister =
  (email, name, password) => async (dispatch) => {
    const resp = await fetchWithoutToken(
      "auth/new",
      { email, name, password },
      "POST"
    );
    const body = await resp.json();
    if (!body.ok) {
      Swal.fire("Error", body.msg, "error");
      dispatch(checkingFinish());
      return;
    }
    dispatchLogin(body, dispatch);
  };

const dispatchLogin = (body, dispatch) => {
  localStorage.setItem("token", body.token);
  localStorage.setItem("token-init-date", new Date().getTime());
  dispatch(login({ uid: body.uid, name: body.name }));
};

const login = (user) => ({ type: types.authLogin, payload: user });
const checkingFinish = () => ({ type: types.authCheckingFinish });

import { proxy, useSnapshot } from "valtio";

export const state = proxy({ islogged: false, user: null });

export const isLoggedIn = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const snap = useSnapshot(state);
  if (localStorage.getItem("islogged")) {
    state.islogged = true;
    state.user = localStorage.getItem("user");
    return snap;
  } else {
    state.islogged = false;
    state.user = null;
    return snap;
  }
};

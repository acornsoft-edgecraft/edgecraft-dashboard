import { defaultUserInfo, MessageTypes } from "~/models";

export function useUserService(options: any = {}) {
  const { API, UI, Util } = useAppHelper();
  const url = "api/v1/users";

  const getUsers = () => {
    const users = ref([] as any);
    const isFetch = ref(false);

    const fetch = () => {
      isFetch.value = true;
      API.get("", url)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Users", res.message);
          } else {
            res.data.forEach((item) => {
              users.value.push(item);
            });
          }
          isFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Users", err);
          isFetch.value = false;
        });
    };

    return { users, isFetch, fetch };
  };

  const getUser = () => {
    const user = ref(Util.clone(defaultUserInfo));
    const isFetch = ref(false);

    const fetch = async (id) => {
      isFetch.value = true;
      let rtn = false;
      const res = await API.get("", `${url}/${id}`);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "Fetch Users", res.message);
      } else {
        user.value = res.data;
        rtn = true;
      }
      isFetch.value = false;
      return rtn;
    };

    return { user, isFetch, fetch };
  };

  const insertUser = () => {
    const isInsFetch = ref(false);

    const insFetch = async (params) => {
      isInsFetch.value = true;
      let rtn = false;
      const res = await API.post("", url, params);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "Fetch User", res.message);
      } else {
        rtn = true;
      }
      isInsFetch.value = false;
      return rtn;
    };

    return { isInsFetch, insFetch };
  };

  const updateUser = () => {
    const isUpFetch = ref(false);

    const upFetch = async (id, params) => {
      isUpFetch.value = true;
      let rtn = false;
      const res = await API.put("", `${url}/${id}`, params);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "Fetch User", res.message);
      } else {
        rtn = true;
      }
      isUpFetch.value = false;
      return rtn;
    };

    return { isUpFetch, upFetch };
  };

  const deleteUser = () => {
    const isDelFetch = ref(false);

    const delFetch = async (id) => {
      isDelFetch.value = true;
      let rtn = false;
      const res = await API.delete("", `${url}/${id}`);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "Fetch User", res.message);
      } else {
        rtn = true;
      }
      isDelFetch.value = false;
      return rtn;
    };

    return { isDelFetch, delFetch };
  };

  return {
    getUsers,
    getUser,
    insertUser,
    updateUser,
    deleteUser,
  };
}

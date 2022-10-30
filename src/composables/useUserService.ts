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

    const fetch = (id) => {
      if (id == 0) return;

      isFetch.value = true;
      API.get("", `${url}/${id}`)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Users", res.message);
          } else {
            user.value = res.data;
          }
          isFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Users", err);
          isFetch.value = false;
        });
    };

    return { user, isFetch, fetch };
  };

  const insertUser = () => {
    const isInsFetch = ref(false);

    const insFetch = (params) => {
      isInsFetch.value = true;
      API.post("", url, params)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch User", res.message);
          }
          isInsFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch User", err);
          isInsFetch.value = false;
        });
    };

    return { isInsFetch, insFetch };
  };

  const updateUser = () => {
    const isUpFetch = ref(false);

    const upFetch = (id, params) => {
      isUpFetch.value = true;
      API.put("", `${url}/${id}`, params)
        .then((res) => {
          console.log(res);
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch User", res.message);
          } else {
            console.log(res.data);
          }
          isUpFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch User", err);
          isUpFetch.value = false;
        });
    };

    return { isUpFetch, upFetch };
  };

  const deleteUser = () => {
    const isDelFetch = ref(false);

    const delFetch = (id) => {
      isDelFetch.value = true;
      API.delete("", `${url}/${id}`)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch User", res.message);
          }
          isDelFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch User", err);
          isDelFetch.value = false;
        });
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

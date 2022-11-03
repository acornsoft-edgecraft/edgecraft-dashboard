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
            UI.showToastMessage(MessageTypes.ERROR, "사용자 목록", res.message);
          } else {
            res.data.forEach((item) => {
              users.value.push(item);
            });
          }
          isFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "사용자 목록", err);
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
      const res = await API.get("", `${url}/${id}`);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "사용자 정보", res.message);
        isFetch.value = false;
        return false;
      } else {
        user.value = res.data;
        isFetch.value = false;
        return true;
      }
    };

    return { user, isFetch, fetch };
  };

  const insertUser = () => {
    const isInsFetch = ref(false);

    const insFetch = async (params) => {
      isInsFetch.value = true;
      const res = await API.post("", url, params);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "사용자 등록", res.message);
        isInsFetch.value = false;
        return false;
      } else {
        isInsFetch.value = false;
        return true;
      }
    };

    return { isInsFetch, insFetch };
  };

  const updateUser = () => {
    const isUpFetch = ref(false);

    const upFetch = async (id, params) => {
      isUpFetch.value = true;
      const res = await API.put("", `${url}/${id}`, params);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "사용자 수정", res.message);
        isUpFetch.value = false;
        return false;
      } else {
        isUpFetch.value = false;
        return true;
      }
    };

    return { isUpFetch, upFetch };
  };

  const deleteUser = () => {
    const isDelFetch = ref(false);

    const delFetch = async (id) => {
      isDelFetch.value = true;
      const res = await API.delete("", `${url}/${id}`);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "사용자 삭제", res.message);
        isDelFetch.value = false;
        return false;
      } else {
        isDelFetch.value = false;
        return true;
      }
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

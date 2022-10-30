import { MessageTypes } from "../models";
// TEST DATA
import result from "~/pages/samples/cis.reuslt.json";

export function useSecurityService(options: any = {}) {
  const { API, UI, Util } = useAppHelper();
  const url = "api/v1/securities";

  const getSecurites = () => {
    const securites = ref([] as any);
    const isFetch = ref(false);

    const fetch = () => {
      isFetch.value = true;
      API.get("", url)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Securites", res.message);
          } else {
            res.data.forEach((item) => {
              item.executed = new Date(item.executed);
              securites.value.push(item);
            });
          }
          isFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Secritesu", err);
          isFetch.value = false;
        });
    };

    return { securites, isFetch, fetch };
  };

  const getSecurity = () => {
    const security = ref({} as any);
    const isFetch = ref(false);

    const fetch = (id) => {
      isFetch.value = true;
      API.get("", `${url}/${id}`)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Security", res.message);
          } else {
            security.value = res.data;
          }

          security.value.items = result;
          isFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Security", err);
          isFetch.value = false;
        });
    };

    return { security, isFetch, fetch };
  };

  return {
    getSecurites,
    getSecurity,
  };
}

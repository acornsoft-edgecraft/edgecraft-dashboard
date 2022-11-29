import { required, integer, between, helpers } from "@vuelidate/validators";
import { labelInfo, defaultLabelInfo, NodeTypes } from "~/models";

export const oddErrMsg = "The Node-Count of the MasetSet must be odd";
export const checkOdd = (value) => value % 2 === 1;

export const defaultNodeCountValidation = (type: NodeTypes) => {
  return {
    required,
    integer,
    between: between(1, 100),
    checkCnt: type === NodeTypes.Master ? helpers.withMessage(oddErrMsg, checkOdd) : "",
  };
};

export interface nodesetInfo {
  name: String;
  node_count: Number;
  flavor: String;
  labels: Array<labelInfo>;
}

export const defaultNodesetInfo: nodesetInfo = {
  name: "",
  node_count: 3,
  flavor: "",
  labels: [defaultLabelInfo],
};

export const defaultNodesetInfoValidation = (type: NodeTypes) => {
  return {
    name: { required },
    node_count: defaultNodeCountValidation(type),
    flavor: { required },
    labels: [],
  };
};

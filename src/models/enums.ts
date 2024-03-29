export enum StateKeys {
  CONTEXT = "_CONTEXT_",
  CLUSTER = "_CLUSTER_",
  NAMESPACE = "_NAMESPACE_",
  AUTH = "_AUTH_",
  USER = "_USER_",
  MESSAGE = "_MESSAGE_",
  SEARCH_CLOUD = "_SEARCH_CLOUD_",
  SEARCH_CLOUD_SC = "_SEARCH_CLOUD_SC_",
  SEARCH_CLUSTER = "_SEARCH_CLUSTER_",
  SEARCH_CLUSTER_BC = "_SEARCH_CLUSTER_BC_",
  SEARCH_CLUSTER_SC = "_SEARCH_CLUSTER_SC_",
  SEARCH_IMAGE = "_SEARCH_IMAGE_",
  SEARCH_USER = "_SEARCH_USER_",
}

export enum MessageTypes {
  SUCCESS = "success",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

export enum StoreTypes {
  LOCAL = "local",
  SESSION = "session",
}

export enum ResMessages {
  SUCCEED = "정상 처리되었습니다.",
}

// export enum BackgroundColors {
//     WARN = '--yellow-300',
//     SUCCESS = '--green-300',
//     INFO = '--teal-300',
//     DISABLED = '--bluegray-300',
//     PRIMARY = '--primary-color',
// }

// export enum TextColors {
//     BLACK = '#000000',
//     WHITE = '#FFFFFF',
//     DISABLED = 'darkgray'
// }

export const ChartDataColors = ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#3B3EAC", "#0099C6", "#DD4477", "#66AA00", "#B82E2E", "#316395", "#994499", "#22AA99", "#AAAA11", "#6633CC", "#E67300", "#8B0707", "#329262", "#5574A6", "#3B3EAC"];

export enum ChartColors {
  CPU = "rgba(119,149,233,0.5)",
  MEMORY = "rgba(179,145,208,0.5)",
  REQUEST = "rgba(108,117,125,0.2)",
  LIMIT = "rgba(220,20,60,0.2)",
  BACKGROUND = "#fff",
  BORDER = "#999",
}

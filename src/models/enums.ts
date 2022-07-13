// TODO: 서버 코드 관리와 연계
export enum CloudTypes {
    Baremetal = 1,
    Openstack = 2,
}
export const CloudTypesMap = (addAll: boolean = false) => {
    if (addAll) {
        return [{ name: 'All', value: '' }, ...useAppHelper().UI.getEnumMap(CloudTypes, false)]
    } else {
        return useAppHelper().UI.getEnumMap(CloudTypes, false)
    }
}

// TODO: 서버 코드 관리와 연계
export enum CloudStatus {
    Saved = 1,        // 임시저장
    Registered = 2,   // 등록완료
    Installing = 3,   // 설치중
    Installed = 4,    // 설치완료
    Deleting = 5,     // 삭제중
    Deleted = 6       // 삭제완료
}
export const CloudStatusMap = (addAll: boolean = false) => {
    if (addAll) {
        return [{ name: 'All', value: '' }, ...useAppHelper().UI.getEnumMap(CloudStatus, false)]
    } else {
        return useAppHelper().UI.getEnumMap(CloudStatus, false)
    }
}

export enum StateKeys {
    CONTEXT = "_CONTEXT_",
    CLUSTER = "_CLUSTER_",
    NAMESPACE = "_NAMESPACE_",
    AUTHTYPE = "_AUTH_TYPE_",
    USER = "_USER_",
    MESSAGE = "_MESSAGE_"
}

export enum MessageTypes {
    SUCCESS = 'success',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}

export enum StoreTypes {
    LOCAL = 'local',
    SESSION = 'session'
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

export const ChartDataColors = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
    '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'
]

export enum ChartColors {
    CPU = "rgba(119,149,233,0.5)",
    MEMORY = "rgba(179,145,208,0.5)",
    REQUEST = "rgba(108,117,125,0.2)",
    LIMIT = "rgba(220,20,60,0.2)",
    BACKGROUND = "#fff",
    BORDER = "#999"
}
import { MessageTypes } from "../models"

const currentCloud = ref("")

export function useCloudService(options: any = {}) {
    const { API, UI } = useAppHelper()

    const getClouds = () => {
        const url = "api/v1/clouds"
        const clouds = ref([])
        const isFetch = ref(false)

        const fetch = () => {
            isFetch.value = true
            API.get("", url).then(res => {
                if (res.isError) {
                    UI.showToastMessage(MessageTypes.ERROR, "Fetch Clouds", res.message)
                } else {
                    res.data.forEach(item => {
                        clouds.value.push(item)
                    })
                }
                isFetch.value = false
            }).catch(err => {
                UI.showToastMessage(MessageTypes.ERROR, "Fetch Clouds", err)
                isFetch.value = false
            })
        }

        return { clouds, isFetch, fetch }
    }

    const fetch = () => {

    }

    return {
        currentCloud,

        getClouds
    }
}
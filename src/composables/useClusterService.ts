const currentCluster = ref("")

export function useClusterService(options: any = {}) {

    return {
        currentCluster
    }
}
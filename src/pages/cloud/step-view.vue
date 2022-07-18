<template>
    <div class="page-wrapper">
        <section class="page-header">
            <K3PageTitle />
        </section>
        <section class="page-content">
            <!-- <K3StepView :steps="steps" /> -->
            <K3Stepper :steps="steps"
                       @completed-step="completedStep"
                       @active-step="activeStep"
                       @stepper-finished="finished"
                       :top-buttons="true" />
        </section>
    </div>
</template>

<script setup lang="ts">
import CloudInfo from '~/partialViews/cloud-info.vue'
import ClusterInfo from '~/partialViews/cluster-info.vue'
import NodeInfo from '~/partialViews/node-info.vue'
import EtcdStorageInfo from '~/partialViews/etcd-storage-info.vue'
import OpenstackInfo from '~/partialViews/openstack-info.vue'

definePageMeta({ layout: 'default', title: 'Cloud Registration', public: true })

const steps = [
    { icon: 'fas fa-cloud', name: 'cloud', title: 'CLOUD 정보', subTitle: 'Cloud 구성 정보를 설정합니다', component: CloudInfo, completed: false },
    { icon: 'fas fa-circle-nodes', name: 'cluster', title: 'CLUSTER 정보', subTitle: 'Cluster 구성 정보를 설정합니다', component: ClusterInfo, completed: false },
    { icon: 'fas fa-server', name: 'node', title: 'NODE 정보', subTitle: 'Node 구성 정보를 설정합니다', component: NodeInfo, completed: false },
    { icon: 'fas fa-database', name: 'etcdstorage', title: 'ETCD/STORAGE 정보', subTitle: 'ETCD 및 Storage 구성 정보를 설정합니다', component: EtcdStorageInfo, completed: false },
    { icon: 'fas fa-cubes-stacked', name: 'openstack', title: 'OPENSTACK 정보', subTitle: 'Openstack 구성 정보를 설정합니다', component: OpenstackInfo, completed: false },
]
// const props = defineProps({}),
// const emits = defineEmits(['eventname']),

const completedStep = (payload) => {
    steps.forEach(s => s.completed = s.name === payload.name)
}
const activeStep = (payload) => {
    steps.forEach(s => {
        if (s.name === payload.name) {
            if (s.completed) s.completed = false;
        }
    })
}
const finished = (payload) => {
    alert('finished')
}
</script>

<style scoped lang="scss">
.page-content {
    margin-top: 0.5rem;
}
</style>
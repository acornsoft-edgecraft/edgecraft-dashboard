<template>
  <div class="partial-container m-0 p-0">
    <div calss="p-card">
      <h5 class="form-title">등록 정보 확인</h5>
      <div class="field grid">
        <div class="field col-12">
          <K3Accordion :multiple="true" :activeIndex="[0, 1, 2, 3, 4]">
            <K3AccordionTab header="Cloud 정보">
              <K3FormContainer>
                <K3FormRow>
                  <K3FormColumn label="Cloud 명">{{ modelValue.cloud.name }}</K3FormColumn>
                </K3FormRow>
                <K3FormRow>
                  <K3FormColumn label="Cloud 유형">{{ CloudTypes[modelValue.cloud.type] }}</K3FormColumn>
                </K3FormRow>
                <K3FormRow>
                  <K3FormColumn label="Cloud 설명">{{ modelValue.cloud.desc }}</K3FormColumn>
                </K3FormRow>
              </K3FormContainer>
            </K3AccordionTab>
            <K3AccordionTab header="Cluster 정보">
              <K3FormContainer>
                <template #header>Kubernetes 설치 정보</template>
                <K3FormRow>
                  <K3FormColumn label="Version">{{ K8sVersions[modelValue.cluster.k8s.version] }}</K3FormColumn>
                </K3FormRow>
                <K3FormRow>
                  <K3FormColumn label="POD CIDR">{{ modelValue.cluster.k8s.pod_cidr }}</K3FormColumn>
                </K3FormRow>
                <K3FormRow>
                  <K3FormColumn label="Service CIDR">{{ modelValue.cluster.k8s.svc_cidr }}</K3FormColumn>
                </K3FormRow>
              </K3FormContainer>
              <K3FormContainer>
                <template #header>Baremetal 설치 정보</template>
                <K3FormRow>
                  <K3FormColumn label="BMC Credential">
                    <K3FormContainer class="no-style w-full">
                      <K3FormRow direction="vertical">
                        <K3FormColumn label="Secret Name">{{ modelValue.cluster.baremetal.secret_name }}</K3FormColumn>
                        <K3FormColumn label="User Name">{{ modelValue.cluster.baremetal.user_name }}</K3FormColumn>
                        <K3FormColumn label="Password">{{ modelValue.cluster.baremetal.password }}</K3FormColumn>
                      </K3FormRow>
                    </K3FormContainer>
                  </K3FormColumn>
                  <K3FormColumn label="Image URL">{{ modelValue.cluster.baremetal.image_url }}</K3FormColumn>
                  <K3FormColumn label="Image Checksum">{{ modelValue.cluster.baremetal.image_checksum }}</K3FormColumn>
                  <K3FormColumn label="Image Checksum Type">{{ ImageChecksumTypes[modelValue.cluster.baremetal.image_checksum_type] }}</K3FormColumn>
                  <K3FormColumn label="Image Format">{{ ImageFormats[modelValue.cluster.baremetal.image_format] }}</K3FormColumn>
                  <K3FormColumn label="Control Plane Kubeadm Extra Config">
                    <K3FormContainer class="no-style w-full">
                      <K3FormRow direction="vertical">
                        <K3FormColumn label="Pre Kubeadm Commands">{{ modelValue.cluster.baremetal.cp_kubeadm_extra_config.pre_kubeadm_commands }}</K3FormColumn>
                        <K3FormColumn label="Post Kubeadm Commands">{{ modelValue.cluster.baremetal.cp_kubeadm_extra_config.post_kubeadm_commands }}</K3FormColumn>
                        <K3FormColumn label="files">{{ modelValue.cluster.baremetal.cp_kubeadm_extra_config.files }}</K3FormColumn>
                        <K3FormColumn label="users">{{ modelValue.cluster.baremetal.cp_kubeadm_extra_config.users }}</K3FormColumn>
                        <K3FormColumn label="ntp">{{ modelValue.cluster.baremetal.cp_kubeadm_extra_config.ntp }}</K3FormColumn>
                        <K3FormColumn label="format">{{ modelValue.cluster.baremetal.cp_kubeadm_extra_config.format }}</K3FormColumn>
                      </K3FormRow>
                    </K3FormContainer>
                  </K3FormColumn>
                  <K3FormColumn label="Workers Kubeadm Extra Config">
                    <K3FormContainer class="no-style w-full">
                      <K3FormRow direction="vertical">
                        <K3FormColumn label="Pre Kubeadm Commands">{{ modelValue.cluster.baremetal.worker_kubeadm_extra_config.pre_kubeadm_commands }}</K3FormColumn>
                        <K3FormColumn label="Post Kubeadm Commands">{{ modelValue.cluster.baremetal.worker_kubeadm_extra_config.post_kubeadm_commands }}</K3FormColumn>
                        <K3FormColumn label="files">{{ modelValue.cluster.baremetal.worker_kubeadm_extra_config.files }}</K3FormColumn>
                        <K3FormColumn label="users">{{ modelValue.cluster.baremetal.worker_kubeadm_extra_config.users }}</K3FormColumn>
                        <K3FormColumn label="ntp">{{ modelValue.cluster.baremetal.worker_kubeadm_extra_config.ntp }}</K3FormColumn>
                        <K3FormColumn label="format">{{ modelValue.cluster.baremetal.worker_kubeadm_extra_config.format }}</K3FormColumn>
                      </K3FormRow>
                    </K3FormContainer>
                  </K3FormColumn>
                </K3FormRow>
              </K3FormContainer>
            </K3AccordionTab>
            <K3AccordionTab header="Node 정보">
              <K3FormContainer>
                <K3FormRow>
                  <K3FormColumn label="Use LoadBalancer">{{ modelValue.nodes.use_loadbalancer }}</K3FormColumn>
                </K3FormRow>
                <K3FormRow v-if="modelValue.nodes.use_loadbalancer">
                  <K3FormColumn label="Load Balancer IP" :size="6">{{ modelValue.nodes.loadbalancer_address }}</K3FormColumn>
                  <K3FormColumn label="Load Balancer Port" :size="6">{{ modelValue.nodes.loadbalancer_port }}</K3FormColumn>
                </K3FormRow>
              </K3FormContainer>
              <K3FormContainer>
                <K3Fieldset legend="Master Nodes">
                  <template v-for="(node, index) in modelValue.nodes.master_nodes" :key="index">
                    <K3Divider type="dashed" v-if="index > 0" />
                    <K3Divider align="left">Baremetal Host</K3Divider>
                    <K3FormRow>
                      <K3FormColumn label="Host Name" :size="6">{{ node.baremetal.host_name }}</K3FormColumn>
                      <K3FormColumn label="BMC Address" :size="6">{{ node.baremetal.bmc_address }}</K3FormColumn>
                    </K3FormRow>
                    <K3FormRow>
                      <K3FormColumn label="Boot MAC Address" :size="6">{{ node.baremetal.boot_mac_address }}</K3FormColumn>
                      <K3FormColumn label="Boot Mode" :size="6">{{ node.baremetal.boot_mode }}</K3FormColumn>
                    </K3FormRow>
                    <K3FormRow>
                      <K3FormColumn label="Online (power)" :size="6">{{ node.baremetal.online_power }}</K3FormColumn>
                      <K3FormColumn label="Externally Provisioning" :size="6">{{ node.baremetal.external_provisioning }}</K3FormColumn>
                    </K3FormRow>
                    <K3Divider align="left">Node</K3Divider>
                    <K3FormRow>
                      <K3FormColumn label="Node Name" :size="6">{{ node.node.node_name }}</K3FormColumn>
                      <K3FormColumn label="IP Address" :size="6">{{ node.node.ip_address }}</K3FormColumn>
                    </K3FormRow>
                    <K3FormRow>
                      <K3FormColumn lable="Labels">{{ node.node.labels }}</K3FormColumn>
                    </K3FormRow>
                  </template>
                </K3Fieldset>
              </K3FormContainer>
              <K3FormContainer>
                <K3Fieldset legend="Worker Nodes">
                  <template v-for="(node, index) in modelValue.nodes.worker_nodes" :key="index">
                    <K3Divider type="dashed" v-if="index > 0" />
                    <K3Divider align="left">Baremetal Host</K3Divider>
                    <K3FormRow>
                      <K3FormColumn label="Host Name" :size="6">{{ node.baremetal.host_name }}</K3FormColumn>
                      <K3FormColumn label="BMC Address" :size="6">{{ node.baremetal.bmc_address }}</K3FormColumn>
                    </K3FormRow>
                    <K3FormRow>
                      <K3FormColumn label="Boot MAC Address" :size="6">{{ node.baremetal.boot_mac_address }}</K3FormColumn>
                      <K3FormColumn label="Boot Mode" :size="6">{{ node.baremetal.boot_mode }}</K3FormColumn>
                    </K3FormRow>
                    <K3FormRow>
                      <K3FormColumn label="Online (power)" :size="6">{{ node.baremetal.online_power }}</K3FormColumn>
                      <K3FormColumn label="Externally Provisioning" :size="6">{{ node.baremetal.external_provisioning }}</K3FormColumn>
                    </K3FormRow>
                    <K3Divider align="left">Node</K3Divider>
                    <K3FormRow>
                      <K3FormColumn label="Node Name" :size="6">{{ node.node.node_name }}</K3FormColumn>
                      <K3FormColumn label="IP Address" :size="6">{{ node.node.ip_address }}</K3FormColumn>
                    </K3FormRow>
                    <K3FormRow>
                      <K3FormColumn lable="Labels">{{ node.node.labels }}</K3FormColumn>
                    </K3FormRow>
                  </template>
                </K3Fieldset>
              </K3FormContainer>
            </K3AccordionTab>
            <K3AccordionTab header="ETCD/Storage 정보">
              {{ modelValue.etcd_storage }}
              <K3FormContainer>
                <template #header>ETCD 설정</template>
                <K3FormRow>
                  <K3FormColumn label="External ETCD">{{ modelValue.etcd_storage.etcd.use_external_etcd }}</K3FormColumn>
                </K3FormRow>
                <K3FormRow v-if="modelValue.etcd_storage.etcd.use_external_etcd">
                  <K3FormColumn label="Endpoints">{{ modelValue.etcd_storage.etcd.endpoints }}</K3FormColumn>
                  <K3FormColumn label="CA File">{{ modelValue.etcd_storage.etcd.ca_file }}</K3FormColumn>
                  <K3FormColumn label="CERT File">{{ modelValue.etcd_storage.etcd.cert_file }}</K3FormColumn>
                  <K3FormColumn label="KEY File">{{ modelValue.etcd_storage.etcd.key_file }}</K3FormColumn>
                </K3FormRow>
              </K3FormContainer>
              <K3FormContainer>
                <template #header>STORAGE Class 설정</template>
                <K3FormRow>
                  <K3FormColumn label="Use Ceph">{{ modelValue.etcd_storage.storage_class.use_ceph }}</K3FormColumn>
                </K3FormRow>
                <K3FormRow v-if="modelValue.etcd_storage.storage_class.use_ceph">
                  <K3FormColumn label="Label 1">{{ modelValue.etcd_storage.storage_class.label1 }}</K3FormColumn>
                  <K3FormColumn label="Label 2">{{ modelValue.etcd_storage.storage_class.label2 }}</K3FormColumn>
                  <K3FormColumn label="Label 3">{{ modelValue.etcd_storage.storage_class.label3 }}</K3FormColumn>
                </K3FormRow>
              </K3FormContainer>
            </K3AccordionTab>
            <K3AccordionTab header="OpenStack 정보">
              {{ modelValue.openstack }}
            </K3AccordionTab>
          </K3Accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CloudTypes, K8sVersions, ImageChecksumTypes, ImageFormats } from "~/models";

definePageMeta({ layout: "default", title: "Node Label", public: true });

onActivated(() => {});

onMounted(() => {});

const modelValue = {
  cloud: {
    id: 1,
    name: "fff",
    type: 1,
    desc: "",
  },
  cluster: {
    k8s: {
      version: 1,
      pod_cidr: "10.244.0.0/16",
      svc_cidr: "10.244.0.0/1",
    },
    baremetal: {
      secret_name: "secret1",
      user_name: "asdf",
      password: "asdf",
      image_url: "http://192.168.0.1/ubuntu.qcow2",
      image_checksum: "http://192.168.0.1/ubuntu.qcow2.md5sum",
      image_checksum_type: 0,
      image_format: 1,
      cp_kubeadm_extra_config: {
        pre_kubeadm_commands: "",
        post_kubeadm_commands: "",
        files: "",
        users: "",
        ntp: "",
        format: "",
      },
      worker_kubeadm_extra_config: {
        pre_kubeadm_commands: "",
        post_kubeadm_commands: "",
        files: "",
        users: "",
        ntp: "",
        format: "",
      },
    },
  },
  nodes: {
    use_loadbalancer: false,
    loadbalancer_address: "",
    loadbalancer_port: "",
    master_nodes: [
      {
        baremetal: {
          host_name: "sadf",
          bmc_address: "sadf",
          boot_mac_address: "00:b2:8c:ee:22:98",
          boot_mode: 0,
          online_power: false,
          external_provisioning: false,
        },
        node: {
          node_name: "sadf",
          ip_address: "safd",
          labels: [
            {
              key: "aaaa",
              value: "bbbb",
            },
          ],
        },
      },
    ],
    worker_nodes: [
      {
        baremetal: {
          host_name: "sadf",
          bmc_address: "sadf",
          boot_mac_address: "00:b2:8c:ee:22:98",
          boot_mode: 0,
          online_power: false,
          external_provisioning: false,
        },
        node: {
          node_name: "sadf",
          ip_address: "safd",
          labels: [
            {
              key: "aaaa",
              value: "bbbb",
            },
          ],
        },
      },
      {
        baremetal: {
          host_name: "asdfasfsafs",
          bmc_address: "sadf",
          boot_mac_address: "00:b2:8c:ee:22:98",
          boot_mode: 0,
          online_power: false,
          external_provisioning: false,
        },
        node: {
          node_name: "sadsadfasdfsafasf",
          ip_address: "safd",
          labels: [
            {
              key: "aaaa",
              value: "bbbb",
            },
          ],
        },
      },
    ],
  },
  etcd_storage: {
    etcd: {
      use_external_etcd: false,
      endpoints: [
        {
          ip_address: "",
          port: "",
        },
      ],
      ca_file: "",
      cert_file: "",
      key_file: "",
    },
    storage_class: {
      use_ceph: false,
      label1: "",
      label2: "",
      label3: "",
    },
  },
  openstack: {},
};
</script>

<style scoped lang="scss"></style>

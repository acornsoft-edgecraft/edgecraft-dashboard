<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <K3FormContainer>
        <K3FormRow>
          <K3FormColumn label="Image Name" label-align="right">
            <K3FormInputField v-model="v$.name" field-name="Image Name" class="w-full" />
          </K3FormColumn>
        </K3FormRow>
        <K3FormRow>
          <K3FormColumn label="Image Type" label-align="right">
            <K3FormDropdownField v-model="v$.type" :options="ImageTypesMap()" :option-label="'name'" :option-value="'value'" field-name="Image Type" class="w-6" />
          </K3FormColumn>
        </K3FormRow>
        <K3FormRow>
          <K3FormColumn label="Image File" label-align="right">
            <div class="flex flex-column w-full">
              <div class="flex align-items-center w-full" v-if="imageId > 0">
                <span class="image-field">{{ v$.file.$model }}</span>
                <K3Button label="변경" class="p-button-outlined" @click="onChangeImage" />
                <K3Button label="취소" class="p-button-outlined p-button-secondary" @click="cancelChangeImage" v-if="editImage" />
              </div>
              <div class="flex flex-column align-items-center w-full" v-if="imageId == 0 || editImage">
                <div class="flex align-items-start w-full">
                  <K3FileUpload name="file[]" accept="image/*" :max-file-size="1000000000" :file-limit="1" @select="selectFile">
                    <template #empty>
                      <p>Drag and drop files to here to upload.</p>
                    </template>
                  </K3FileUpload>
                </div>
                <div class="flex align-items-start w-full">
                  <div class="error-field basic label pointing error" v-if="v$.file.$invalid">Image File is required</div>
                </div>
              </div>
            </div>
          </K3FormColumn>
        </K3FormRow>
        <K3FormRow>
          <K3FormColumn label="Image Format" label-align="right">
            <K3FormDropdownField v-model="v$.format" :options="ImageFormatsMap()" :option-label="'name'" :option-value="'value'" field-name="Image Format" class="w-6" />
          </K3FormColumn>
        </K3FormRow>
        <K3FormRow>
          <K3FormColumn label="OS" label-align="right">
            <K3FormDropdownField v-model="v$.os" :options="ImageOsTypesMap()" :option-label="'name'" :option-value="'value'" fiend-name="OS" class="w-6" />
          </K3FormColumn>
        </K3FormRow>
        <K3FormRow>
          <K3FormColumn label="Desc" label-align="right">
            <K3FormTextareaField v-model="v$.desc" field-name="Image Desc" rows="4" class="w-full" />
          </K3FormColumn>
        </K3FormRow>
      </K3FormContainer>

      <div class="flex button-wrapper">
        <div class="flex-grow-1 flex-shrink-1 flex align-items-start justify-content-start">
          <K3Button label="삭제" icon="pi pi-trash" class="p-button-danger" @click="onDelete" v-if="imageId > 0" />
        </div>
        <div class="flex-grow-1 flex-shrink-1 flex align-items-end justify-content-end">
          <NuxtLink to="/management/image"><K3Button label="취소" icon="pi pi-times" class="p-button-secondary" /></NuxtLink>
          <K3Button label="등록" icon="pi pi-check" @click="onSubmit" />
        </div>
      </div>
      <K3Overlay :active="isFetch || isInsFetch || isUpFetch || isDelFetch" loader="bars" background-color="#830205" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ImageTypesMap, ImageFormatsMap, ImageOsTypesMap, defaultImageInfoValidation, MessageTypes } from "~/models";

const { image, isFetch, fetch } = useImageService().getImage();
const { isInsFetch, insFetch } = useImageService().insertImage();
const { isUpFetch, upFetch } = useImageService().updateImage();
const { isDelFetch, delFetch } = useImageService().deleteImage();

const route = useRoute();
const imageId = route.params.id || 0;
const { UI, Routing } = useAppHelper();
const editImage = ref(false);

definePageMeta({ layout: "default", title: "Image Management", public: true });
// const props = defineProps({}),
// const emits = defineEmits(['eventname']),
const v$ = UI.getValidate(defaultImageInfoValidation, image);

const selectFile = (event) => {
  const file = event.files[0];
  image.value.file = file.objectURL;
  image.value.size = file.size;
};

const onSubmit = () => {
  v$.value.$touch();
  if (v$.value.$invalid) return;

  // // TODO: call api
  if (imageId > 0) {
    upFetch(imageId, image.value);
  } else {
    insFetch(image.value);
  }
  Routing.moveTo("/management/image");
};

const onDelete = () => {
  UI.showConfirm(
    MessageTypes.ERROR,
    "이미지 삭제",
    "이미지를 삭제하시겠습니까?",
    () => {
      // TODO: call api
      delFetch(imageId);
      Routing.moveTo("/management/image");
    },
    () => {}
  );
};

const onChangeImage = () => {
  editImage.value = true;
};
const cancelChangeImage = () => {
  editImage.value = false;
};

onMounted(() => {
  fetch(imageId);
});
</script>

<style scoped lang="scss">
.form-container {
  margin-top: 1rem;

  .p-button {
    margin-left: 0.5rem;
  }
}

.button-wrapper {
  margin-top: 1rem;
  .p-button {
    width: 7rem;
    margin-left: 0.5em;
  }
}
.p-fileupload {
  width: 100%;
}
</style>

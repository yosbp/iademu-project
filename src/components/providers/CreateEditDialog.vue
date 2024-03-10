<script lang="ts" setup>
import { computed, ref } from "vue";
import { X } from "lucide-vue-next";
import useProviderStore from "@/store/providerStore";
import { useRouter } from "vue-router";
import { toastNotification } from "@/app/utils";

interface Emits {
  (e: "update:isModalVisible", value: Boolean): void;
  (e: "getDirectors"): void;
}
interface Props {
  isModalVisible: Boolean;
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<Emits>();
const providerStore = useProviderStore();
const router = useRouter();

const showModal = computed({
  get() {
    return props.isModalVisible;
  },
  set(newVal: Boolean) {
    emit("update:isModalVisible", newVal);
  },
});

const form = ref({
  name: { value: "", isValid: false },
  address: { value: "", isValid: false },
  rif: { value: "", isValid: false },
  phone: { value: "", isValid: false },
});
const isSubmitted = ref(false);

const isValidForm = computed(() => {
  const { name, address, rif, phone } = form.value;
  return name.isValid && address.isValid && rif.isValid && phone.isValid;
});

const handleSubmit = async () => {
  isSubmitted.value = true;
  if (isValidForm.value) {
    try {
      const { name, address, rif, phone } = form.value;
      const data = {
        name: name.value,
        address: address.value,
        rif: rif.value,
        phone: phone.value,
      };
      await providerStore.createProvider(data).then(() => {
        toastNotification("Proveedor creado con éxito", "success");
        emit("update:isModalVisible", false);
      });
    } catch (error) {
      toastNotification("Error al crear el proveedor", "error");
    }
  }
};
</script>
<template>
  <TModal v-model="showModal">
    <template #content>
      <div
        class="flex items-center justify-between p-4 border-b dark:border-zink-300/20"
      >
        <h5 class="text-16">{{ $t("add-provider") }}</h5>
        <button
          class="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
          @click="showModal = false"
        >
          <X class="size-5" />
        </button>
      </div>
      <simplebar
        class="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto"
      >
        <TValidationInputField
          v-model="form.name"
          :label="$t('name')"
          :rules="['required']"
          :submit="isSubmitted"
          :placeholder="$t('enter-name')"
        />
        <TValidationInputField
          v-model="form.rif"
          :label="$t('rif')"
          :rules="['required']"
          :submit="isSubmitted"
          :placeholder="$t('enter-rif')"
        />
        <TValidationInputField
          v-model="form.address"
          :label="$t('address')"
          :rules="['required']"
          :submit="isSubmitted"
          :placeholder="$t('enter-address')"
        />
        <TValidationInputField
          v-model="form.phone"
          type="number"
          :label="$t('phone')"
          :rules="['required']"
          :submit="isSubmitted"
          :placeholder="$t('enter-phone')"
        />
        <div class="flex justify-end gap-2 mt-4">
          <TButton
            type="reset"
            color="red"
            variant="ghost"
            @click="showModal = false"
          >
            Cancel
          </TButton>
          <TButton type="submit" @click="handleSubmit"> Add User </TButton>
        </div>
      </simplebar>
    </template>
  </TModal>
</template>

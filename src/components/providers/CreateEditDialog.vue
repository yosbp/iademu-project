<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import { X } from "lucide-vue-next";
import useProviderStore from "@/store/providerStore";
import { toastNotification } from "@/app/utils";
import { Provider } from "@/types/Provider";

interface Emits {
  (e: "update:isModalVisible", value: Boolean): void;
  (e: "getProviders"): void;
}
interface Props {
  isModalVisible: Boolean;
  provider?: Provider;
}

const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<Emits>();
const providerStore = useProviderStore();

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
  address: { value: props.provider?.address ?? "", isValid: false },
  rif: { value: props.provider?.rif ?? "", isValid: false },
  phone: { value: props.provider?.phone ?? "", isValid: false },
});
const isSubmitted = ref(false);

const isValidForm = computed(() => {
  const { name, address, rif, phone } = form.value;
  return name.isValid && address.isValid && rif.isValid && phone.isValid;
});

watchEffect(() => {
  if (props.provider) {
    const { name, address, rif, phone } = props.provider;
    form.value = {
      name: { value: name, isValid: true },
      address: { value: address, isValid: true },
      rif: { value: rif, isValid: true },
      phone: { value: phone, isValid: true },
    };
  } else {
    form.value = {
      name: { value: "", isValid: false },
      address: { value: "", isValid: false },
      rif: { value: "", isValid: false },
      phone: { value: "", isValid: false },
    };
  }
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
      if (props.provider) {
        await providerStore.updateProvider(props.provider.id, data).then(() => {
          toastNotification("Proveedor actualizado con éxito", "success");
          emit("update:isModalVisible", false);
          emit("getProviders");
        });
      } else {
        await providerStore.createProvider(data).then(() => {
          toastNotification("Proveedor creado con éxito", "success");
          emit("update:isModalVisible", false);
          emit("getProviders");
        });
      }
    } catch (error) {
      toastNotification("Error al guardar el proveedor", "error");
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
        <h5 class="text-16">
          {{ props.provider ? $t("edit-provider") : $t("add-provider") }}
        </h5>
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
            {{ $t("cancel") }}
          </TButton>
          <TButton type="submit" @click="handleSubmit">
            {{ props.provider ? $t("update") : $t("add") }}
          </TButton>
        </div>
      </simplebar>
    </template>
  </TModal>
</template>

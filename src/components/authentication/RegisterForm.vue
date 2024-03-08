<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { UserRegister } from "@/types/User";
import { useAuthStore } from "@/store/authStore";

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  name: { value: "", isValid: false },
  lastname: { value: "", isValid: false },
  email: { value: "", isValid: false },
  username: { value: "", isValid: false },
  password: { value: "", isValid: false },
});

const isSubmitted = ref(false);
const isSucceed = ref(false);
const errorMsg = ref("");

const isValidForm = computed(() => {
  const { username, password, email } = form.value;
  return username.isValid && password.isValid && email.isValid;
});

const onRegister = async () => {
  isSubmitted.value = true;
  errorMsg.value = "";
  if (isValidForm.value) {
    try {
      const { password, username, email, name, lastname } = form.value;
      const payload: UserRegister = {
        password: password.value,
        username: username.value,
        email: email.value,
        name: name.value,
        lastname: lastname.value,
      };
      const data = await authStore.register(payload);
      if (data) {
        isSucceed.value = true;
        setTimeout(() => {
          router.push({ path: "/" });
        }, 2000);
      }
    } catch (error: any) {
      errorMsg.value = error.message;
    }
  }
};
</script>
<template>
  <div class="text-center">
    <h4 class="mb-1 text-custom-500 dark:text-custom-500">
      {{ $t("create-your-account") }}
    </h4>
    <p class="text-slate-500 dark:text-zink-200 text-wrap">
      {{ $t("complete-the-form") }}
    </p>
  </div>

  <div class="mt-10">
    <div
      v-show="isSucceed"
      class="px-4 py-3 mb-3 text-sm text-green-500 border border-green-200 rounded-md bg-green-50 dark:bg-green-400/20 dark:border-green-500/50"
    >
      {{ $t("you-have-signed-up") }} <b>{{ $t("successfully") }}</b
      >.
    </div>
    <div
      v-show="errorMsg"
      class="px-4 py-3 mb-3 text-sm text-red-500 border border-red-200 rounded-md bg-red-50 dark:bg-red-400/20 dark:border-red-500/50"
    >
      {{ errorMsg }}
    </div>
    <div>
      <div class="flex gap-3 w-full">
        <TValidationInputField
          v-model="form.name"
          :label="$t('name')"
          :rules="['required']"
          :submit="isSubmitted"
          :placeholder="$t('enter-name')"
        />
        <TValidationInputField
          v-model="form.lastname"
          :label="$t('lastname')"
          :rules="['required']"
          :submit="isSubmitted"
          :placeholder="$t('enter-lastname')"
        />
      </div>
      <TValidationInputField
        v-model="form.email"
        :label="$t('email')"
        :rules="['required', 'email']"
        :submit="isSubmitted"
        :placeholder="$t('enter-email')"
      />
      <TValidationInputField
        v-model="form.username"
        :label="$t('username')"
        :rules="['required']"
        :submit="isSubmitted"
        :placeholder="$t('enter-username')"
      />

      <TValidationInputField
        v-model="form.password"
        :label="$t('password')"
        type="password"
        :rules="['required']"
        :submit="isSubmitted"
        :placeholder="$t('enter-password')"
      />
    </div>

    <div class="mt-10">
      <TButton class="w-full" @click="onRegister">
        {{ authStore.loading ? `${$t("loading")}...` : $t("sign-up") }}
      </TButton>
    </div>

    <div class="mt-10 text-center">
      <p class="mb-0 text-slate-500 dark:text-zink-200 text-wrap">
        {{ $t("already-have-an-account") }}
        <router-link
          to="/login"
          class="font-semibold underline transition-all duration-150 ease-linear text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500"
        >
          {{ $t("sign-in") }}
        </router-link>
      </p>
    </div>
  </div>
</template>

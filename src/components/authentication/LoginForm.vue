<script lang="ts" setup>
import { computed, ref } from "vue";
import { UserLogin } from "@/types/User";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  username: { value: "admin", isValid: true },
  password: { value: "123456", isValid: true },
});

const isSubmitted = ref(false);
const isSucceed = ref(false);
const errorMsg = ref("");

const isValidForm = computed(() => {
  const { username, password } = form.value;
  return username.isValid && password.isValid;
});

const onSignIn = async () => {
  isSubmitted.value = true;
  errorMsg.value = "";
  if (isValidForm.value) {
    try {
      const { password, username } = form.value;
      const payload: UserLogin = {
        password: password.value,
        username: username.value,
      };

      const data = await authStore.login(payload);
      if (data) {
        isSucceed.value = true;
        setTimeout(() => {
          router.push({ path: "/" });
        }, 2000);
      }
    } catch (error: any) {
      errorMsg.value = error;
    }
  }
};
</script>
<template>
  <div class="text-center">
    <h4 class="mb-1 text-custom-500 dark:text-custom-500">
      {{ $t("welcome-back") }} !
    </h4>
    <p class="text-slate-500 dark:text-zink-200">
      {{ $t("login-to-continue") }}
    </p>
  </div>

  <div class="mt-10">
    <div
      v-show="isSucceed"
      class="text-wrap px-4 py-3 mb-3 text-sm text-green-500 border border-green-200 rounded-md bg-green-50 dark:bg-green-400/20 dark:border-green-500/50"
    >
      {{ $t("you-have-signed-in") }} <b>{{ $t("successfully") }}</b
      >.
    </div>
    <TAlert v-show="errorMsg" color="red" bordered class="mb-3">
      {{ errorMsg }}
    </TAlert>
    <div>
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
      <TButton class="w-full" @click="onSignIn">
        {{ authStore.loading ? `${$t("loading")}...` : $t("sign-in") }}
      </TButton>
    </div>

    <div class="mt-10 text-center">
      <p class="mb-0 text-slate-500 dark:text-zink-200">
        {{ $t("dont-have-an-account") }} ?
        <router-link
          to="/register"
          class="font-semibold underline transition-all duration-150 ease-linear text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500"
        >
          {{ $t("sign-up") }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { userDummyImg } from '@/assets/images/users/utils';
  import { useAuthStore } from '@/store/authStore';
  import { LogOut } from 'lucide-vue-next';
  import { useRouter } from 'vue-router';

  const authStore = useAuthStore();
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!user) {
    router.push('/login');
  }
  const onSignOut = () => {
    authStore.logout();
    router.push('/login');
  };
</script>
<template>
  <TMenu>
    <div class="relative flex items-center dropdown h-header">
      <button
        type="button"
        class="inline-block p-0 transition-all duration-200 ease-linear bg-topbar rounded-full text-topbar-item dropdown-toggle btn hover:bg-topbar-item-bg-hover hover:text-topbar-item-hover group-data-[topbar=dark]:text-topbar-item-dark group-data-[topbar=dark]:bg-topbar-dark group-data-[topbar=dark]:hover:bg-topbar-item-bg-hover-dark group-data-[topbar=dark]:hover:text-topbar-item-hover-dark group-data-[topbar=brand]:bg-topbar-brand group-data-[topbar=brand]:hover:bg-topbar-item-bg-hover-brand group-data-[topbar=brand]:hover:text-topbar-item-hover-brand group-data-[topbar=dark]:dark:bg-zink-700 group-data-[topbar=dark]:dark:hover:bg-zink-600 group-data-[topbar=brand]:text-topbar-item-brand group-data-[topbar=dark]:dark:hover:text-zink-50 group-data-[topbar=dark]:dark:text-zink-200"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
      >
        <div class="bg-pink-100 rounded-full">
          <img :src="userDummyImg" alt="" class="size-[37.5px] rounded-full" />
        </div>
      </button>
    </div>
    <template #content>
      <div class="min-w-[14rem] p-4">
        <h6 class="mb-2 text-sm font-normal text-slate-500 dark:text-zink-300">
          {{ $t('welcome') }}
        </h6>
        <a href="#!" class="flex gap-3 mb-3">
          <div class="relative inline-block shrink-0">
            <div class="rounded bg-slate-100 dark:bg-zink-500">
              <img :src="userDummyImg" alt="" class="size-12 rounded" />
            </div>
            <span class="-top-1 ltr:-right-1 rtl:-left-1 absolute w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full dark:border-zink-600"></span>
          </div>
          <div>
            <h6 class="mb-1 text-15">{{ `${user.name} ${user.lastname}` }}</h6>
            <p class="text-slate-500 dark:text-zink-300">{{ user.username }}</p>
          </div>
        </a>
        <ul>
          <!--           <li>
            <a
              class="block ltr:pr-4 rtl:pl-4 py-1.5 text-base font-medium transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:text-custom-500 focus:text-custom-500 dark:text-zink-200 dark:hover:text-custom-500 dark:focus:text-custom-500"
              href="#!"
            >
              <User2 class="inline-block size-4 ltr:mr-2 rtl:ml-2" />
              <router-link to="/pages/settings">Profile</router-link>
            </a>
          </li> -->
          <li class="pt-2 mt-2 border-t border-slate-200 dark:border-zink-500">
            <a
              @click="onSignOut"
              class="block ltr:pr-4 rtl:pl-4 py-1.5 text-base font-medium transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:text-custom-500 focus:text-custom-500 dark:text-zink-200 dark:hover:text-custom-500 dark:focus:text-custom-500"
              href="#!"
            >
              <LogOut class="inline-block size-4 ltr:mr-2 rtl:ml-2" />{{ $t('sign-out') }}
            </a>
          </li>
        </ul>
      </div>
    </template>
  </TMenu>
</template>

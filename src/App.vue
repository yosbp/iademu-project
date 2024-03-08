<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useLayoutStore } from '@/store/layout';
  import { setAttribute } from '@/app/utils';

  const layoutStore = useLayoutStore();

  onMounted(() => {
    setAttribute('data-mode', layoutStore.mode);
    setAttribute('data-topbar', layoutStore.topBarColor);
    setAttribute('data-sidebar', layoutStore.sideBarColor);
    setAttribute('data-layout', layoutStore.layoutType);
    setAttribute('data-skin', layoutStore.skinLayout);
    setAttribute('dir', layoutStore.dir);
    setAttribute('data-content', layoutStore.layoutWidth);
    setAttribute('data-sidebar-size', layoutStore.sideBarSize);
    setAttribute('data-navbar', layoutStore.navType);
  });
</script>

<template>
  <component v-if="$route.meta.layout" :is="$route.meta.layout">
    <router-view />
  </component>
  <router-view v-else />
</template>

<script lang="ts" setup>
import useDashboardStore from '@/store/dashboardStore';
import { onBeforeMount, ref } from 'vue';

const dashboardStore = useDashboardStore();
const dashboardData = ref()

onBeforeMount(() => {
  dashboardStore.getDashboardData().then((res) => {
    console.log(res);
    dashboardData.value = res;
  })
});
</script>

<template>
  <div class="mx-auto grid grid-cols-12 md:w-[90%] justify-center gap-x-5">
    <div class="col-span-12">
      <h5 class="mb-10 text-2xl text-center">Bienvenido al Panel de Gestion de Ordenes del IADEMU</h5>
    </div>
    <TCard class="col-span-12" no-body v-if="dashboardData">
      <div class="p-4">
        <div class="grid grid-cols-2">
          <div
            class="px-4 text-center ltr:border-r rtl:border-l border-slate-200 dark:border-zink-500 ltr:last:border-r-0 rtl:last:border-l-0"
          >
            <h6 class="mb-1 font-bold">
              <TCountTo :endVal="dashboardData.providers" />
            </h6>
            <p class="text-slate-500 dark:text-zink-200">{{ $t('providers') }}</p>
          </div>
          <div
            class="px-4 text-center ltr:border-r rtl:border-l border-slate-200 dark:border-zink-500 ltr:last:border-r-0 rtl:last:border-l-0"
          >
            <h6 class="mb-1 font-bold">
              <TCountTo :endVal="dashboardData.orders" />
            </h6>
            <p class="text-slate-500 dark:text-zink-200">{{$t('orders')}}</p>
          </div>
<!--           <div
            class="px-4 text-center ltr:border-r rtl:border-l border-slate-200 dark:border-zink-500 ltr:last:border-r-0 rtl:last:border-l-0"
          >
            <h6 class="mb-1 font-bold">
              <TCountTo :endVal="50" />
            </h6>
            <p class="text-slate-500 dark:text-zink-200">Late</p>
          </div> -->
        </div>
      </div>
    </TCard>
  </div>
</template>

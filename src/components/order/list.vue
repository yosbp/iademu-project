<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";
import {
  Search,
  CalendarClock,
  Save,
  Eye,
} from "lucide-vue-next";
import useorderStore from "@/store/orderStore";
import { Order } from "@/types/Order";
import { watch } from "vue";

const orderStore = useorderStore();
const orders = ref([] as Order[]);
const search = ref("");

const onSearch = (value: string) => {
  if (value.length > 2 && orderStore.orders) {
    const data = orderStore.orders.filter((item: any) => {
      return item.provider.name.toLowerCase().includes(value.toLowerCase());
    });
    orders.value = data;
  } else {
    orders.value = orderStore.orders ? orderStore.orders : [];
  }
};

watch(search, () => {
  onSearch(search.value);
});

watchEffect(() => {
  orders.value = orderStore.orders ? orderStore.orders : [];
});

onMounted(() => {
  orderStore.getOrders();
});
</script>

<template>
  <router-link to="/order/add-new">
    <TButton>
      <Save class="inline-block size-4 ltr:mr-1 rtl:ml-1" /><span
        class="align-middle"
        >{{ $t("new-order") }}</span
      >
    </TButton>
  </router-link>

  <div class="grid grid-cols-1 gap-x-5 xl:grid-cols-12 mt-4">
    <div class="col-span-12">
      <div
        class="sticky print:hidden top-[calc(theme('spacing.header')_+_theme('spacing.5'))]"
      >
        <TCard class="text-16" no-body>
          <div class="card-body">
            <h6 class="mb-4 text-16">{{ $t("order-list") }}</h6>
            <div class="flex items-center gap-2">
              <div class="relative grow">
                <TInputField
                  :placeholder="$t('search-for-provider')"
                  v-model="search"
                  inputClass="ltr:pl-8 rtl:pr-8"
                  hideDetails
                >
                  <template #prefix>
                    <Search class="size-4" />
                  </template>
                </TInputField>
              </div>
            </div>
          </div>

          <simplebar class="simplebar-scrollable-y" v-if="orders.length > 0">
            <div
              v-for="item in orders"
              :key="item.id"
              class="block transition-all duration-150 ease-linear border-t card-body border-slate-200 hover:bg-slate-50 [&.active]:bg-slate-100 dark:border-zink-500 dark:hover:bg-zink-600 dark:[&.active]:bg-zink-600"
            >
              <div class="ltr:float-right rtl:float-left">
                <router-link :to="`/order/view/${item.id}`">
                  <TButton class="px-2.5 me-4" variant="soft" color="sky">
                    <Eye class="size-4" />
                  </TButton>
                </router-link>
              </div>
              <h6>{{ item.id }}</h6>
              <div class="flex">
                <div class="grow">
                  <h6 class="mt-3 mb-1 text-16">{{ item.provider.name }}</h6>
                  <p class="text-slate-500 dark:text-zink-200">
                    {{ item.total }} Bs.
                  </p>
                </div>
                <p
                  class="self-end mb-0 text-slate-500 dark:text-zink-200 shrink-0"
                >
                  <CalendarClock
                    class="inline-block size-4 ltr:mr-1 rtl:ml-1"
                  />
                  <span class="align-middle">{{
                    new Date(item.created_at).toLocaleDateString()
                  }}</span>
                </p>
              </div>
            </div>
          </simplebar>

          <div class="card-body" v-else>
            <p class="text-center text-2xl font-bold">
              {{ $t("no-orders-fund") }}
            </p>
          </div>
        </TCard>
      </div>
    </div>
  </div>
</template>

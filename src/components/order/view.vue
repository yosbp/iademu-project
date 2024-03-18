<script lang="ts" setup>
import { useI18n, type I18n } from "vue-i18n";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { FileEdit, MoreHorizontal } from "lucide-vue-next";
import useOrderStore from "@/store/orderStore";
import useExcelStore from "@/store/excelStore";
import { Order } from "@/types/Order";
import useWordStore from "@/store/wordStore";

const { t } = useI18n<I18n>();
const table_dataHeader = [
  { title: "#", value: "id" },
  { title: t("item-name"), value: "item_name" },
  { title: t("price-per-unit"), value: "item_amount" },
  { title: t("quantity"), value: "item_quantity" },
  { title: t("total"), value: "total_amount" },
];
const route = useRoute();
const orderStore = useOrderStore();
const order = ref<Order>();
const excelStore = useExcelStore();
const wordStore = useWordStore();

const tableAction = [
  { value: "paymentOrder", icon: FileEdit, title: "Crear Orden de Pago" },
  { value: "buyOrder", icon: FileEdit, title: "Crear Orden de Compra" },
  {
    value: "GoodsAndServices",
    icon: FileEdit,
    title: "Crear Bienes y Servicios Recibidos",
  },
  { value: "approveMemorandum", icon: FileEdit, title: "Aprobar Memorandum" },
];

const onSelect = (data: any) => {
  if (data.value === "paymentOrder") {
    if (order.value) {
      excelStore.getPaymentOrder(order.value.id);
    }
  } else if (data.value == "buyOrder") {
    if (order.value) {
      excelStore.getBuyOrder(order.value.id);
    }
  } else if (data.value == "GoodsAndServices") {
    if (order.value) {
      wordStore.getGoodsAndServices(order.value.id);
    }
  } else if (data.value == "approveMemorandum") {
    if (order.value) {
      wordStore.getApproveMemorandum(order.value.id);
    }
  } else if (data.title == "Delete") {
    console.log("delete");
  }
};

onBeforeMount(() => {
  orderStore.getOrder(route.params.id as string).then((res) => {
    order.value = res;
  });
});
</script>

<template>
  <div class="w-full flex" v-if="orderStore.loading">
    <div
      class="inline-flex size-12 rounded-full opacity-75 animate-ping bg-custom-500 mx-auto"
    />
  </div>

  <div
    class="group-data-[sidebar-size=sm]:min-h-sm group-data-[sidebar-size=sm]:relative"
    v-if="!orderStore.loading && order"
  >
    <div class="relative min-h-screen group-data-[sidebar-size=sm]:min-h-sm">
      <div
        class="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto"
      >
        <div class="grid grid-cols-1 gap-x-5 xl:grid-cols-12">
          <div class="xl:col-span-12">
            <div class="card print:shadow-none print:border-none">
              <div class="card-body print:hidden">
                <div class="flex flex-col gap-5 md:items-center md:flex-row">
                  <div class="grow">
                    <h6 class="mb-1 text-16">
                      {{
                        `${$t("payment-order")} # ${
                          order.payment_order.payment_number
                        }`
                      }}
                    </h6>
                  </div>

                  <div class="flex items-center gap-2 shrink-0">
                    <TList :items="tableAction" @onSelect="onSelect">
                      <template #title>
                        <TButton
                          icon
                          class="p-0 !w-[30px] !h-[30px]"
                          color="slate"
                          variant="soft"
                        >
                          <MoreHorizontal class="size-3" />
                        </TButton>
                      </template>
                      <template #default="{ data }">
                        <span class="flex gap-1 items-center">
                          <component
                            :is="data.icon"
                            class="inline-block size-3 ltr:mr-1 rtl:ml-1"
                          />
                          <span class="align-middle">{{ data.title }}</span>
                        </span>
                      </template>
                    </TList>
                  </div>
                </div>
              </div>

              <div class="card-body !pt-0">
                <div
                  class="p-5 border rounded-md md:p-8 border-slate-200 dark:border-zink-500 print:p-0"
                >
                  <div class="grid grid-cols-1 gap-5 xl:grid-cols-12">
                    <div
                      class="text-center xl:col-span-12 max-w-72 place-items-center mx-auto"
                    >
                      <div
                        class="flex items-center justify-center mx-auto rounded-md bg-transparent"
                      >
                        <img
                          src="@/assets/images/iademu.webp"
                          alt=""
                          class="h-24"
                        />
                      </div>
                      <h5 class="mt-4 mb-1">
                        Instituto Autónomo de Desarrollo Endógeno del Municipio
                        Urdaneta
                      </h5>
                      <p class="text-slate-500 dark:text-zink-200">
                        Coordinación de Compras
                      </p>
                      <p
                        class="text-slate-500 dark:text-zink-200 font-extrabold"
                      >
                        RIF: G-20004487-0
                      </p>
                    </div>
                  </div>

                  <div
                    class="flex justify-around mt-6 text-center divide-y md:divide-y-0 md:divide-x rtl:divide-x-reverse divide-dashed divide-slate-200 dark:divide-zink-500"
                  >
                    <div class="p-3">
                      <h6 class="mb-1">
                        {{ order.payment_order.payment_number }}
                      </h6>
                      <p class="text-slate-500 dark:text-zink-200">
                        {{ $t("order-number") }}
                      </p>
                    </div>
                    <div class="p-3">
                      <h6 class="mb-1">
                        {{ new Date(order.created_at).toLocaleDateString() }}
                      </h6>
                      <p class="text-slate-500 dark:text-zink-200">
                        {{ $t("created-at") }}
                      </p>
                    </div>
                    <div class="p-3">
                      <h6 class="mb-1">{{ order.total }} Bs.</h6>
                      <p class="text-slate-500 dark:text-zink-200">
                        {{ $t("total-amount") }}
                      </p>
                    </div>
                  </div>

                  <div class="my-6">
                    <p
                      class="mb-2 text-sm uppercase text-slate-500 dark:text-zink-200"
                    >
                      {{ $t("provider") }}
                    </p>
                    <h6 class="mb-1 text-15">{{ order.provider.name }}</h6>
                    <p class="mb-1 text-slate-500 dark:text-zink-200">
                      {{ order.provider.address }}
                    </p>
                    <p class="mb-1 text-slate-500 dark:text-zink-200">
                      {{ order.provider.phone }}
                    </p>
                    <p class="mb-1 text-slate-500 dark:text-zink-200">
                      {{ order.provider.rif }}
                    </p>
                  </div>

                  <TBasicTable
                    :headerItems="table_dataHeader"
                    :items="order.order_items"
                    tdClass="px-3.5 py-2.5 border-b border-slate-200 dark:border-zink-500"
                    thClass="px-3.5 py-2.5 font-semibold text-slate-500 dark:text-zink-200 border-b border-slate-200 dark:border-zink-500"
                  >
                    <template #item_name="{ value }">
                      <h6 class="mb-1">{{ value.item_name }}</h6>
                    </template>

                    <template #item_amount="{ value }">
                      <h6 class="mb-1">{{ `${value.item_amount} Bs.` }}</h6>
                    </template>

                    <template #total_amount="{ value }">
                      <h6 class="mb-1">{{ `${value.total_amount} Bs.` }}</h6>
                    </template>
                  </TBasicTable>

                  <table class="w-full">
                    <tbody class="before:block before:h-3">
                      <tr>
                        <td colspan="3" style="width: 500px"></td>
                        <td
                          class="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:border-zink-500 dark:text-zink-200"
                        >
                          {{ $t("subtotal") }}
                        </td>
                        <th
                          class="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:border-zink-500 dark:text-zink-200"
                        >
                          {{ order.subtotal }} Bs.
                        </th>
                      </tr>
                      <tr>
                        <td colspan="3" style="width: 500px"></td>
                        <td
                          class="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:border-zink-500 dark:text-zink-200"
                        >
                          {{ $t("tax") }} (16%)
                        </td>
                        <th
                          class="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:border-zink-500 dark:text-zink-200"
                        >
                          {{ order.tax }} Bs.
                        </th>
                      </tr>
                      <tr>
                        <td colspan="3" style="width: 500px"></td>
                        <td
                          class="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:border-zink-500 dark:text-zink-200"
                        >
                          {{ $t("exempt") }}
                        </td>
                        <th
                          class="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:border-zink-500 dark:text-zink-200"
                        >
                          {{ order.exempt }} Bs.
                        </th>
                      </tr>
                      <tr>
                        <td colspan="3" style="width: 500px"></td>
                        <td
                          class="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:border-zink-500 dark:text-zink-200"
                        >
                          {{ $t("total-amount") }} Bs.
                        </td>
                        <th
                          class="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:border-zink-500 dark:text-zink-200"
                        >
                          {{ order.total }} Bs.
                        </th>
                      </tr>
                    </tbody>
                  </table>

                  <div class="my-5">
                    <p
                      class="mb-2 text-sm uppercase text-slate-500 dark:text-zink-200 font-extrabold"
                    >
                      {{ $t("payment-description") }}
                    </p>
                    <p class="mb-1 text-slate-500 dark:text-zink-200">
                      {{ order.payment_order.description }}
                    </p>
                  </div>

                  <div class="my-5">
                    <p
                      class="mb-2 text-sm uppercase text-slate-500 dark:text-zink-200 font-extrabold"
                    >
                      {{ $t("payment-details") }}
                    </p>
                    <p class="mb-1 text-slate-500 dark:text-zink-200">
                      {{ $t("payment-method") }} :
                      {{ order.payment_order.payment_method }}
                    </p>
                    <p class="mb-1 text-slate-500 dark:text-zink-200">
                      {{ $t("bank") }}: {{ order.payment_order.bank }}
                    </p>
                    <p class="mb-1 text-slate-500 dark:text-zink-200">
                      {{ $t("reference") }}:
                      {{ order.payment_order.payment_reference }}
                    </p>
                    <p class="mb-0 text-slate-500 dark:text-zink-200">
                      {{ $t("account-number") }}:
                      {{ order.payment_order.account_number }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

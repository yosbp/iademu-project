<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { Save, Trash2, Plus } from "lucide-vue-next";
import useProviderStore from "@/store/providerStore";
import Multiselect from "@vueform/multiselect";
import { toastNotification } from "@/app/utils";
import useOrderStore from "@/store/orderStore";
import { banks, paymentTypes } from "./utils";
import { useRouter } from "vue-router";

const router = useRouter();
const providerStore = useProviderStore();
const orderStore = useOrderStore();
const provider = ref();
const mappedProviders = computed(() => {
  return providerStore.providers.map((provider: any) => {
    return {
      value: provider.id,
      label: provider.name,
    };
  });
});
const items = ref<any>([]);
const preparedData = {
  name: "",
  price: 0,
  total: 0,
  quantity: 0,
};
const paymentForm = ref({
  payment_method: "",
  payment_reference: "",
  bank: "",
  account_number: "",
});
const subtotal = computed(() => {
  return items.value.reduce((acc: any, item: any) => {
    return acc + item.price * item.quantity;
  }, 0);
});

const preparedItems = computed(() => {
  return items.value.map((item: any) => {
    return {
      item_name: item.name,
      item_amount: item.price,
      item_quantity: item.quantity,
      total_amount: item.quantity * item.price,
    };
  });
});

const amounts = ref({
  tax: 0,
  exempt: 0,
});

const totalAmount = computed(() => {
  return subtotal.value + amounts.value.tax + amounts.value.exempt;
});

const addItem = () => {
  items.value.push({ ...preparedData });
};

const deleteItem = (index: number) => {
  items.value.splice(index, 1);
};

const handleSubmit = async () => {
  const { payment_method, payment_reference, bank, account_number } =
    paymentForm.value;
  const items = preparedItems.value;
  const { tax, exempt } = amounts.value;
  const data = {
    provider_id: provider.value,
    payment_method: payment_method,
    payment_reference: payment_reference,
    bank: bank,
    account_number: account_number,
    tax: tax,
    exempt: exempt,
    items: items,
  };
  try {
    await orderStore.createOrder(data).then(() => {
      toastNotification("Factura creada con éxito", "success");
      router.push("/orders");
    });
  } catch (error) {
    toastNotification("Error al crear la Factura", "error");
  }
};

onMounted(() => {
  providerStore.getProviders();
  addItem();
});
</script>

<template>
  <div
    class="group-data-[sidebar-size=sm]:min-h-sm group-data-[sidebar-size=sm]:relative"
  >
    <div class="relative min-h-screen group-data-[sidebar-size=sm]:min-h-sm">
      <div
        class="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto"
      >
        <TCard>
          <!-- Provider -->
          <h6 class="mb-4 text-gray-800 underline text-16 dark:text-zink-50">
            Proveedor:
          </h6>

          <div class="mb-5">
            <label class="inline-block mb-2 text-base font-medium"
              >Proveedor</label
            >
            <div class="multiselect-wrapper">
              <Multiselect
                :loading="providerStore.loading"
                :disabled="provider ? true : false"
                v-model="provider"
                :options="mappedProviders"
              />
            </div>
          </div>
          <form v-if="provider" action="#!">
            <!-- Payment Order -->
            <h6 class="my-5 text-gray-800 underline text-16 dark:text-zink-50">
              Orden de Pago:
            </h6>
            <div class="grid grid-cols-1 gap-5 xl:grid-cols-12">
              <div class="xl:col-span-3">
                <label class="inline-block mb-2 text-base font-medium"
                  >Tipo de Pago</label
                >
                <TMultiSelect
                  v-model="paymentForm.payment_method"
                  placeholder="Select Method"
                  :options="paymentTypes"
                  required
                />
              </div>

              <div class="xl:col-span-3">
                <TInputField
                  v-model="paymentForm.payment_reference"
                  label="Referencia"
                  type="number"
                  placeholder="Ingrese el número de referencia"
                  hide-details
                />
              </div>

              <div class="xl:col-span-3">
                <TInputField
                  v-model="paymentForm.account_number"
                  label="Cuenta"
                  placeholder="Ingrese el número de cuenta"
                  hide-details
                />
              </div>

              <div class="xl:col-span-3">
                <label class="inline-block mb-2 text-base font-medium"
                  >Banco</label
                >
                <TMultiSelect
                  v-model="paymentForm.bank"
                  placeholder="Select Method"
                  :options="banks"
                  required
                />
              </div>
            </div>

            <!-- Products Info -->
            <h6 class="my-5 underline text-16">Products Info:</h6>

            <div class="overflow-x-auto">
              <table class="w-full whitespace-nowrap">
                <thead>
                  <tr>
                    <th
                      class="px-3.5 py-2.5 font-medium text-sm text-slate-500 uppercase border border-slate-200 dark:text-zink-200 dark:border-zink-500 min-w-[400px]"
                      colspan="3"
                    >
                      Nombre del Producto
                    </th>
                    <th
                      class="px-3.5 py-2.5 font-medium text-sm text-slate-500 uppercase border border-slate-200 dark:text-zink-200 dark:border-zink-500"
                    >
                      Cantidad
                    </th>
                    <th
                      class="px-3.5 py-2.5 font-medium text-sm text-slate-500 uppercase border border-slate-200 dark:text-zink-200 dark:border-zink-500"
                    >
                      Precio
                    </th>
                    <th
                      class="px-3.5 py-2.5 font-medium text-sm text-slate-500 uppercase border border-slate-200 dark:text-zink-200 dark:border-zink-500 w-44"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody
                  v-for="(item, index) in items"
                  :key="index"
                  class="before:block before:h-3 item-list"
                >
                  <tr class="item">
                    <td
                      class="border border-slate-200 dark:border-zink-500 min-w-[400px]"
                      colspan="3"
                    >
                      <TInputField
                        v-model="item.name"
                        :placeholder="$t('item-name')"
                        required
                        hide-details
                        :border="false"
                      />
                    </td>
                    <td
                      class="w-40 border border-slate-200 dark:border-zink-500"
                    >
                      <div class="flex justify-center text-center my-3">
                        <TInputField
                          class="w-[100px] mx-auto"
                          type="number"
                          step="0.25"
                          v-model="item.quantity"
                          placeholder="$00.00"
                          required
                          hide-details
                        />
                      </div>
                    </td>
                    <td
                      class="w-40 border border-slate-200 dark:border-zink-500"
                    >
                      <TInputField
                        class="w-[100px] mx-auto"
                        type="number"
                        step="0.01"
                        v-model="item.price"
                        placeholder="$00.00"
                        required
                        hide-details
                      />
                    </td>
                    <td class="border border-slate-200 dark:border-zink-500">
                      <p
                        class="text-md ms-4 text-slate-500 dark:text-zink-200 text-center"
                      >
                        {{ item.quantity * item.price }} Bs.
                      </p>
                    </td>
                  </tr>
                  <TButton
                    variant="soft"
                    color="red"
                    classes="px-2 py-1.5 text-xs mt-2"
                    @click="deleteItem(index)"
                  >
                    <Trash2 class="inline-block size-3 mr-1 align-middle" />
                    {{ $t("delete") }}
                  </TButton>
                </tbody>

                <tbody class="before:block before:h-4" id="orderTable">
                  <tr>
                    <td colspan="6">
                      <a href="javascript:void(0)" id="addBtn">
                        <TButton variant="dashed" @click="addItem">
                          <Plus
                            class="inline-block size-3 mr-1 align-middle"
                          /><span class="align-middle ms-1">{{
                            $t("add-item")
                          }}</span>
                        </TButton>
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tbody class="before:block before:h-3" id="totalAmount">
                  <tr>
                    <td colspan="4"></td>
                    <td
                      class="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:text-zink-200 dark:border-zink-500"
                    >
                      {{ $t("subtotal") }}
                    </td>
                    <td
                      class="font-medium border-b border-slate-200 dark:border-zink-500"
                    >
                      <p class="text-md ms-2 text-slate-500 dark:text-zink-200">
                        {{ subtotal }} Bs.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4"></td>
                    <td
                      class="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:text-zink-200 dark:border-zink-500"
                    >
                      {{ $t("tax") }} (16%)
                    </td>
                    <td
                      class="font-medium border-b border-slate-200 dark:border-zink-500"
                    >
                      <TInputField
                        class="w-[100px]"
                        type="number"
                        step="0.01"
                        v-model="amounts.tax"
                        placeholder="$00.00"
                        required
                        hide-details
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4"></td>
                    <td
                      class="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:text-zink-200 dark:border-zink-500"
                    >
                      {{ $t("exempt") }}
                    </td>
                    <td
                      class="font-medium border-b border-slate-200 dark:border-zink-500 text-slate-500"
                    >
                      <TInputField
                        class="w-[100px]"
                        type="number"
                        step="0.01"
                        v-model="amounts.exempt"
                        placeholder="$00.00"
                        required
                        hide-details
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4"></td>
                    <td
                      class="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:text-zink-200 dark:border-zink-500"
                    >
                      {{ $t("total-amount") }}
                    </td>
                    <td
                      class="font-medium border-b border-slate-200 dark:border-zink-500"
                    >
                      <p class="text-md ms-2 text-slate-500 dark:text-zink-200">
                        {{ totalAmount }} Bs.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex justify-end gap-2 mt-5">
              <TButton color="white" @click="handleSubmit">
                <Save class="inline-block size-4 mr-1" />
                <span class="align-middle ms-1">{{ $t("save") }}</span>
              </TButton>
            </div>
          </form>
        </TCard>
      </div>
    </div>
  </div>
</template>

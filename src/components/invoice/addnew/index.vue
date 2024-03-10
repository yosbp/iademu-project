<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watchEffect, computed } from "vue";
import { Save, RefreshCcw, Download, Trash2, Plus } from "lucide-vue-next";
import Choices from "choices.js";
import useProviderStore from "@/store/providerStore";
import Multiselect from "@vueform/multiselect";

const providerStore = useProviderStore();
const provider = ref();
const mappedProviders = computed({
  get: () => {
    return providerStore.providers.map((provider: any) => {
      return {
        value: provider.id,
        label: provider.name,
      };
    });
  },
  set: (value) => {
    return value;
  },
});
const items = ref<any>([]);
const preparedData = {
  name: "",
  value: 0,
  price: 0,
  discount: "",
  text: "",
  total: "",
  discountInput: "",
  description: "",
  quantity: 0,
};

const paymentTypes = [
  { value: "Transferencia", label: "Transferencia" },
  { value: "Efectivo", label: "Efectivo" },
  { value: "Cheque", label: "Cheque" },
];

const banks = [
  { value: "Venezuela", label: "Venezuela" },
  { value: "Banesco", label: "Banesco" },
  { value: "Mercantil", label: "Mercantil" },
  { value: "Provincial", label: "Provincial" },
  { value: "Bicentenario", label: "Bicentenario" },
  { value: "Banco de Venezuela", label: "Banco de Venezuela" },
  { value: "Banco del Tesoro", label: "Banco del Tesoro" },
  { value: "Banco Activo", label: "Banco Activo" },
  { value: "Banco Plaza", label: "Banco Plaza" },
  { value: "Banco Caroní", label: "Banco Caroní" },
  { value: "Banco Exterior", label: "Banco Exterior" },
  { value: "Banco Fondo Común", label: "Banco Fondo Común" },
  { value: "Banco Bicentenario", label: "Banco Bicentenario" },
  { value: "Banco de Comercio Exterior", label: "Banco de Comercio Exterior" },
  { value: "Banco del Caribe", label: "Banco del Caribe" },
  { value: "Banco del Sur", label: "Banco del Sur" },
  { value: "Banco Sofitasa", label: "Banco Sofitasa" },
  {
    value: "Banco Occidental de Descuento",
    label: "Banco Occidental de Descuento",
  },
  { value: "Banco Nacional de Crédito", label: "Banco Nacional de Crédito" },
  {
    value: "Banco Industrial de Venezuela",
    label: "Banco Industrial de Venezuela",
  },
  {
    value: "Banco Agrícola de Venezuela",
    label: "Banco Agrícola de Venezuela",
  },
  {
    value: "Banco de la Fuerza Armada Nacional Bolivariana",
    label: "Banco de la Fuerza Armada Nacional Bolivariana",
  },
  { value: "Banco del Pueblo Soberano", label: "Banco del Pueblo Soberano" },
];

const paymentForm = ref({
  payment_type: "",
  reference: "",
  bank: "",
  account: "",
  order_date: "",
  order_number: "",
});

for (let index = 0; index < 1; index++) {
  items.value.push({ ...preparedData });
}

const addItem = () => {
  items.value.push({ ...preparedData });
};

const deleteItem = (index: number) => {
  items.value.splice(index, 1);
};

watchEffect(() => {});

onMounted(() => {
  providerStore.getProviders();
});
</script>

<template>
  <pre>{{ items }}</pre>
  <div
    class="group-data-[sidebar-size=sm]:min-h-sm group-data-[sidebar-size=sm]:relative"
  >
    <div class="relative min-h-screen group-data-[sidebar-size=sm]:min-h-sm">
      <div
        class="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto"
      >
        <div class="grid items-center grid-cols-1 gap-5 mb-5 xl:grid-cols-12">
          <div>
            <h5 class="text-16">New Invoice</h5>
          </div>
        </div>

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
                  v-model="paymentForm.payment_type"
                  placeholder="Select Method"
                  :options="paymentTypes"
                  required
                />
              </div>

              <div class="xl:col-span-3">
                <TInputField
                  v-model="paymentForm.reference"
                  label="Referencia"
                  type="number"
                  placeholder="Ingrese el número de referencia"
                  hide-details
                />
              </div>

              <div class="xl:col-span-3">
                <TInputField
                  v-model="paymentForm.account"
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

            <!-- Buy Order -->
            <!--             <h6 class="my-5 text-gray-800 underline text-16 dark:text-zink-50">
              Orden de Compra:
            </h6>
            <div class="grid grid-cols-1 gap-5 xl:grid-cols-12">
              <div class="xl:col-span-3">
                <label class="inline-block mb-2 text-base font-medium"
                  >Tipo de Pago</label
                >
                <TMultiSelect
                  v-model="paymentForm.payment_type"
                  placeholder="Select Method"
                  :options="paymentTypes"
                  required
                />
              </div>

              <div class="xl:col-span-3">
                <TInputField
                  v-model="paymentForm.reference"
                  label="Referencia"
                  type="number"
                  placeholder="Ingrese el número de referencia"
                  hide-details
                />
              </div>

              <div class="xl:col-span-3">
                <TInputField
                  v-model="paymentForm.account"
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

            <h6 class="my-5 underline text-16">Shipping Info:</h6>

            <div class="grid grid-cols-1 gap-5 xl:grid-cols-12 changeAddress">
              <div class="xl:col-span-3">
                <TInputField
                  label="Full Name"
                  placeholder="Full Name"
                  required
                  hide-details
                />
              </div>
              <div class="xl:col-span-3">
                <TInputField
                  label="Phone No."
                  placeholder="(00) 1234 567 8956"
                  required
                  hide-details
                />
              </div>
              <div class="xl:col-span-3">
                <TInputField
                  label="Alternative No."
                  placeholder="(00) 1234 567 8956"
                  required
                  hide-details
                />
              </div>
              <div class="xl:col-span-3">
                <TInputField
                  label="TAX No."
                  placeholder="12-34567974"
                  required
                  hide-details
                />
              </div>
              <div class="xl:col-span-12">
                <TTextarea
                  label="Address"
                  placeholder="Address"
                  :rows="3"
                ></TTextarea>
              </div>
            </div>

            <div class="flex items-center mt-5">
              <TSwitch id="customSoftSwitch" variant="soft" />
              <label
                for="customSoftSwitch"
                class="inline-block text-base font-medium"
                >Will your Shipping & Billing address same?</label
              >
            </div>

            <h6 class="my-5 underline text-16">Billing Info:</h6>
            <div class="grid grid-cols-1 gap-5 xl:grid-cols-12">
              <div class="xl:col-span-3">
                <TInputField
                  label="Full Name"
                  placeholder="Full Name"
                  required
                  hide-details
                />
              </div>
              <div class="xl:col-span-3">
                <TInputField
                  label="Phone No."
                  placeholder="(00) 1234 567 8956"
                  required
                  hide-details
                />
              </div>
              <div class="xl:col-span-3">
                <TInputField
                  label="Alternative No."
                  placeholder="(00) 1234 567 8956"
                  required
                  hide-details
                />
              </div>
              <div class="xl:col-span-3">
                <TInputField
                  label="TAX No."
                  placeholder="12-34567974"
                  required
                  hide-details
                />
              </div>
              <div class="xl:col-span-12">
                <TTextarea
                  label="Address"
                  placeholder="Address"
                  id="addressBillingInput"
                  :rows="3"
                >
                </TTextarea>
              </div>
            </div> -->

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
                        placeholder="Item Name"
                        required
                        hide-details
                        :border="false"
                      />
                    </td>
                    <td
                      class="w-40 border border-slate-200 dark:border-zink-500"
                    >
                      <div class="flex justify-center text-center input-step my-3">
                        <TNumberInputSpinner
                          group
                          color="custom"
                          v-model="item.quantity"
                          @onAdd="item.quantity++"
                          @onReduce="item.quantity--"
                        />
                      </div>
                    </td>
                    <td
                      class="w-40 border border-slate-200 dark:border-zink-500"
                    >
                      <TInputField
                        :border="false"
                        type="number"
                        step="0.01"
                        v-model="item.price"
                        placeholder="$00.00"
                        required
                        hide-details
                      />
                    </td>
                    <td class="border border-slate-200 dark:border-zink-500">
                      <div>
                        <TInputField
                          :border="false"
                          v-model="item.total"
                          placeholder="$00.00"
                          readonly
                          hide-details
                        />
                      </div>
                    </td>
                  </tr>
                  <TButton
                        variant="soft"
                        color="red"
                        classes="px-2 py-1.5 text-xs mt-2"
                        @click="deleteItem(index)"
                      >
                        <Trash2 class="inline-block size-3 mr-1 align-middle" />
                        Delete
                      </TButton>
                </tbody>

                <tbody class="before:block before:h-4" id="invoiceTable">
                  <tr>
                    <td colspan="6">
                      <a href="javascript:void(0)" id="addBtn">
                        <TButton variant="dashed" @click="addItem">
                          <Plus
                            class="inline-block size-3 mr-1 align-middle"
                          /><span class="align-middle ms-1">Add Item</span>
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
                      Sub Total
                    </td>
                    <td
                      class="font-medium border-b border-slate-200 dark:border-zink-500"
                    >
                      <input
                        type="text"
                        id="subTotale"
                        class="px-3.5 py-2.5 border-none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 cart-subtotal"
                        placeholder="$00.00"
                        readonly
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4"></td>
                    <td
                      class="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:text-zink-200 dark:border-zink-500"
                    >
                      Estimated Tax (18%)
                    </td>
                    <td
                      class="font-medium border-b border-slate-200 dark:border-zink-500"
                    >
                      <input
                        type="text"
                        id="estimatedTax"
                        class="px-3.5 py-2.5 border-none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 cart-tax"
                        placeholder="$00.00"
                        readonly
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4"></td>
                    <td
                      class="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:text-zink-200 dark:border-zink-500"
                    >
                      Item Discounts
                    </td>
                    <td
                      class="font-medium border-b border-slate-200 dark:border-zink-500 text-slate-500"
                    >
                      <input
                        type="text"
                        id="itemDiscounts"
                        class="px-3.5 py-2.5 border-none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 cart-discount"
                        placeholder="-$00.00"
                        readonly
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4"></td>
                    <td
                      class="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:text-zink-200 dark:border-zink-500"
                    >
                      Shipping Charge
                    </td>
                    <td
                      class="font-medium border-b border-slate-200 dark:border-zink-500"
                    >
                      <input
                        type="text"
                        id="shippingCharge"
                        class="px-3.5 py-2.5 border-none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 cart-shipping"
                        placeholder="$00.00"
                        readonly
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4"></td>
                    <td
                      class="border-b border-slate-200 px-3.5 py-2.5 text-slate-500 dark:text-zink-200 dark:border-zink-500"
                    >
                      Total Amount
                    </td>
                    <td
                      class="font-medium border-b border-slate-200 dark:border-zink-500"
                    >
                      <input
                        type="text"
                        id="totalAmount"
                        class="px-3.5 py-2.5 border-none form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 cart-total"
                        placeholder="$00.00"
                        readonly
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex justify-end gap-2 mt-5">
              <TButton variant="ghost" color="light">
                <RefreshCcw class="inline-block size-4 mr-1" />
                <span class="align-middle ms-1">Reset</span>
              </TButton>

              <TButton color="white">
                <Save class="inline-block size-4 mr-1" />
                <span class="align-middle ms-1">Save</span>
              </TButton>

              <TButton color="green">
                <Download class="inline-block size-4 mr-1" /><span
                  class="align-middle ms-1"
                  >Download</span
                >
              </TButton>
            </div>
          </form>
        </TCard>
      </div>
    </div>
  </div>
</template>

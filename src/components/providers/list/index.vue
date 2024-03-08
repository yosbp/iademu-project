<script lang="ts" setup>
import { Plus, Search } from "lucide-vue-next";
import DeleteDialog from "@/app/common/DeleteDialog.vue";
import CreateEditDialog from "@/components/providers/CreateEditDialog.vue";
import { ref } from "vue";

const deleteDialog = ref(false);
const createEditDialog = ref(false);

import Vue3Datatable from "@bhplugin/vue3-datatable";

const cols =
  ref([
    { field: "id", title: "ID" },
    { field: "name", title: "Name" },
    { field: "description", title: "description" },
    { field: "unit_number", title: "unit", sort: false },
    { field: "action", title: "Action", sort: false },
  ]) || [];

const rows = ref([
  {
    id: "1",
    name: "Andrew Test",
    description: "Test",
    unit_number: "1",
  },
  {
    id: "2",
    name: "Andrew Test",
    description: "Test",
    unit_number: "1",
  },
]);

const search = ref("");
</script>

<template>
  <div class="grid grid-cols-1 gap-x-5 xl:grid-cols-12">
    <div class="xl:col-span-12">
      <div class="card">
        <div class="card-body">
          <div class="flex items-center">
            <h6 class="text-15 grow text-2xl">{{ $t("providers") }}</h6>
            <div class="shrink-0">
              <TButton @click="createEditDialog = true">
                <Plus class="inline-block size-4 me-1" />
                Add User
              </TButton>
            </div>
          </div>
        </div>

        <TCard>
          <div
            class="grid grid-cols-1 gap-4 mb-5 lg:grid-cols-2 xl:grid-cols-12"
          >
            <div class="xl:col-span-3">
              <div class="relative">
                <input
                  type="text"
                  class="ltr:pl-8 rtl:pr-8 search form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                  :placeholder="$t('search')"
                  autocomplete="off"
                  v-model="search"
                />
                <Search
                  class="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200 fill-slate-100 dark:fill-zink-600"
                />
              </div>
            </div>
          </div>
          <div class="datatable">
            <vue3-datatable
              :rows="rows"
              :columns="cols"
              :totalRows="rows?.length"
              :noDataContent="'No se encontraron datos'"
              :sortable="true"
              sortColumn="firstName"
              paginationInfo="Mostrando {0} a {1} de {2} entradas"
              skin="whitespace-nowrap bh-table-hover"
              firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
              lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
              previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
              nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
            >
            </vue3-datatable>
          </div>
        </TCard>
      </div>
    </div>
  </div>

  <DeleteDialog v-model="deleteDialog" />
  <CreateEditDialog v-model="createEditDialog" />
</template>

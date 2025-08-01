<script setup>
defineOptions({
  name: 'EmpleadosPage'
})

import { ref, onMounted } from 'vue';
import {
  getEmpleados,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado as eliminarEmpleadoApi
} from 'src/services/empleadosApi';

const empleados = ref([]);
const loading = ref(false);
const abrirModal = ref(false);
const isEditar = ref(false);
const form = ref({ id: null, nombre: '', email: '', puesto: '', salario: 0 });

const columns = [
  { name: 'nombre', label: 'Nombre', field: 'nombre' },
  { name: 'email', label: 'Email', field: 'email' },
  { name: 'puesto', label: 'Puesto', field: 'puesto' },
  { name: 'salario', label: 'Salario', field: 'salario', align: 'right', format: val => `$${val.toFixed(2)}` },
  { name: 'actions', label: 'Acciones', field: 'actions', sortable: false }
];

const cargarEmpleados = async () => {
  loading.value = true;
  try {
    const res = await getEmpleados();
    empleados.value = res.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const editarEmpleado = (empleado) => {
  form.value = { ...empleado };
  isEditar.value = true;
  abrirModal.value = true;
};

const guardarEmpleado = async () => {
  try {
    if (isEditar.value) {
      await actualizarEmpleado(form.value.id, form.value);
    } else {
      await crearEmpleado(form.value);
    }
    abrirModal.value = false;
    cargarEmpleados();
    cancelar();
  } catch (error) {
    console.error(error);
  }
};

const eliminarEmpleado = async (id) => {
  if (confirm('¿Seguro que deseas eliminar este empleado?')) {
    try {
      await eliminarEmpleadoApi(id);
      cargarEmpleados();
    } catch (error) {
      console.error(error);
    }
  }
};

const cancelar = () => {
  abrirModal.value = false;
  form.value = { id: null, nombre: '', email: '', puesto: '', salario: 0 };
  isEditar.value = false;
};

onMounted(() => {
  cargarEmpleados();
});
</script>

<template>
  <q-page padding>
    <q-btn label="Nuevo Empleado" color="primary" @click="abrirModal = true" />

    <q-table
      :rows="empleados"
      :columns="columns"
      row-key="id"
      :loading="loading"
      flat
    >
      <template v-slot:body-cell-actions="props">
        <q-btn dense flat icon="edit" color="primary" @click="editarEmpleado(props.row)" />
        <q-btn dense flat icon="delete" color="negative" @click="eliminarEmpleado(props.row.id)" />
      </template>
    </q-table>

    <q-dialog v-model="abrirModal">
      <q-card style="min-width: 350px;">
        <q-card-section>
          <div class="text-h6">{{ isEditar ? 'Editar Empleado' : 'Nuevo Empleado' }}</div>
          <q-form @submit.prevent="guardarEmpleado">
            <q-input filled v-model="form.nombre" label="Nombre" required />
            <q-input filled v-model="form.email" label="Email" type="email" />
            <q-input filled v-model="form.puesto" label="Puesto" />
            <q-input filled v-model.number="form.salario" label="Salario" type="number" min="0" step="0.01" />
            <div class="q-mt-md">
              <q-btn label="Guardar" type="submit" color="primary" />
              <q-btn label="Cancelar" flat @click="cancelar" class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

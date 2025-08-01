import axios from 'axios';

const API_URL = 'http://localhost:5000/api/empleados'; // Ajusta según tu URL real

export async function getEmpleados() {
  try {
    const response = await axios.get(API_URL);
    console.log('GET /api/empleados response:', response.data);  // Log de respuesta
    return response;
  } catch (error) {
    console.error('Error en getEmpleados:', error);
    throw error;
  }
}

export async function crearEmpleado(empleado) {
  try {
    const response = await axios.post(API_URL, {
      nombre: empleado.nombre,
      email: empleado.email,
      puesto: empleado.puesto,
      salario: parseFloat(empleado.salario)
    });
    return response.data;
  } catch (error) {
    console.error('Error en crearEmpleado: ', error);
    throw error;
  }
}
export async function actualizarEmpleado(id, empleado) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, empleado);
    console.log(`PUT /api/empleados/${id} response:`, response.data);
    return response;
  } catch (error) {
    console.error('Error en actualizarEmpleado:', error);
    throw error;
  }
}

export async function eliminarEmpleado(id) {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log(`DELETE /api/empleados/${id} response:`, response.data);
    return response;
  } catch (error) {
    console.error('Error en eliminarEmpleado:', error);
    throw error;
  }
}

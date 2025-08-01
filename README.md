# 🧑‍💼 Módulo de Gestión de Empleados - Quasar + .NET + MySQL

Este proyecto implementa un sistema CRUD para empleados usando:

- **Frontend:** Quasar Framework (Vue.js)
- **Backend:** ASP.NET Core Web API
- **Base de datos:** MySQL

## 📦 Requisitos

- Node.js 18+ y pnpm
- .NET 7 o superior
- MySQL
- Docker (opcional para despliegue)

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/gladoncio/quasar-crud-api-net.git
cd quasar-crud-api-net
```

### 2. Backend (.NET)

#### Configurar conexión a base de datos

Edita el archivo `appsettings.json` en la carpeta `backend/`:

```json
{
  "ConnectionStrings": {
    "MySqlConnection": "server=localhost;user=root;password=tu_clave;database=empleados_db"
  }
}
```

#### Ejecutar migraciones y levantar el API

```bash
cd backend
dotnet ef database update
dotnet run
```

Por defecto, el backend se expone en `http://localhost:5000`.

---

### 3. Frontend (Quasar)

#### Instalar dependencias y levantar servidor

```bash
cd frontend-quasar
pnpm install
pnpm dev
```

El frontend se expone en `http://localhost:9001`.

---

## 🌐 API Endpoints

- `GET    /api/empleados` – Listar empleados
- `GET    /api/empleados/{id}` – Obtener detalle
- `POST   /api/empleados` – Crear nuevo empleado
- `PUT    /api/empleados/{id}` – Editar empleado
- `DELETE /api/empleados/{id}` – Eliminar empleado

---

## 🔧 Configuración CORS

El backend ya incluye soporte CORS para permitir solicitudes desde el frontend:

```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

app.UseCors();


```
### . Ejecuta el siguiente comando para levantar los contenedores en la /:

```
docker-compose up --build
```

### . Crear la base de datos manualmente

Accede a Adminer en tu navegador:
```
http://localhost:8070/
```


Conéctate con los datos que configuraste en `.env`, por ejemplo:

- **Servidor**: `mysql`
- **Usuario**: `registro`
- **Contraseña**: `registropass`
- **Base de datos**: `registrodb`

Una vez dentro, ejecuta esta consulta SQL para crear la tabla:

```sql
CREATE TABLE empleados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  puesto VARCHAR(255) NOT NULL,
  salario DECIMAL(15,2) NOT NULL
);

```

---

## 📝 Notas

- No se incluyeron validaciones para simplificar el desarrollo.
- Puedes modificar el modelo `Empleado` en el backend si deseas más campos.
- El diseño es básico, pero puedes personalizarlo fácilmente con Quasar.

---




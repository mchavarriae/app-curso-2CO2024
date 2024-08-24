// Configuración para la base de datos principal (con el token secreto)
export const MONGODB_URI = "mongodb+srv://mchavarriae175:ACRumTZAopBBWd9m@cluster0.pcut5ti.mongodb.net/mern-tasks?retryWrites=true&w=majority&appName=Cluster0";
export const TOKEN_SECRET = "cualquiercosa";  // Este token es solo para la base de datos principal

// Configuración para la base de datos de subtareas (sin token secreto)
export const MONGODB_URI_SUBTASKS = 
  process.env.MONGODB_URI ||
  "mongodb+srv://aavilesg331:iu33RjizDEoJb9Vr@cluster0.hbys035.mongodb.net/proyectoFinalDB?retryWrites=true&w=majority&appName=Cluster0";
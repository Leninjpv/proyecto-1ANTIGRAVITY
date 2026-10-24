# ⚡ FluxNode — Landing Page de Automatización de Flujos de Trabajo (Estilo n8n)

Una landing page interactiva, moderna y de alto impacto para una plataforma de automatización de código abierto similar a **n8n**, orientada a ingenieros, desarrolladores y equipos técnicos.

---

## 🚀 Características Principales

1. **Lienzo Interactivo de Automatización en Vivo (Canvas Showcase)**:
   - Nodos arrastrables (*drag and drop*) sobre una cuadrícula con estética técnica oscura.
   - Conexiones con curvas de Bézier dinámicas en SVG que se recalculan al mover los nodos.
   - **Simulación de Ejecución Paso a Paso ("Ejecutar Flujo")**:
     - Visualización del flujo: Trigger Webhook ➔ Agente IA (Claude 3.5 / Ollama) ➔ Router de Decisión ➔ Acciones (PostgreSQL & Slack).
     - Pulsos de luz y partículas animadas recorriendo las conexiones.
     - Cambios de estado en los nodos (Pendiente, En Ejecución, Éxito con latencia medida e.g. `12ms`, `284ms`).
     - Consola de logs en vivo (*Event Stream*) desplegable con formato JSON.
   - **Inspector Lateral de Nodos**:
     - Al hacer clic en cualquier nodo se abre un panel lateral con parámetros, credenciales y esquema JSON de entrada/salida.
   - **Selector de Plantillas Dinámicas**:
     - *Clasificación de Leads con IA & Sincronización CRM*
     - *Autopilot de Incidentes DevOps & Sanación Automática con Ollama*

2. **Comparativa Directa Transparente**:
   - Tabla comparativa detallada entre **FluxNode**, **n8n**, **Zapier** y **Make (Integromat)** en dimensiones clave: autoalojamiento, privacidad, costo por ejecución, soporte de agentes de IA, código JS/Python y licencias.

3. **6 Pilares de Arquitectura y Potencia**:
   - Lienzo visual con depuración en vivo.
   - Orquestación de Agentes de IA y pipelines RAG (LangChain, Ollama, OpenAI, Anthropic).
   - Código nativo en JavaScript (Node.js) y Python sin restricciones.
   - Despliegue en 1 comando (Docker, Compose, Helm).
   - Resiliencia, reintentos exponenciales y sub-workflows.
   - Gobernanza Enterprise (SSO SAML, RBAC, auditoría y cifrado AES-256).

4. **Terminal / Playground de Despliegue Rápido**:
   - Pestañas interactivas para comandos `Docker Run`, `Docker Compose`, `Kubernetes Helm` y `NPM CLI`.
   - Botón de copiado al portapapeles con feedback visual y sistema de notificaciones *Toast*.

5. **Calculadora Interactiva de Ahorro / ROI**:
   - Control deslizante interactivo por volumen de tareas (de 5,000 a 300,000+ ejecuciones/mes).
   - Cálculo en tiempo real del gasto estimado en Zapier vs Make vs FluxNode Cloud vs FluxNode Self-Hosted ($0) y cálculo del ahorro anual.

6. **Directorio de 500+ Integraciones**:
   - Buscador en tiempo real con filtrado instantáneo por texto y categorías (IA & Modelos, Bases de Datos, Comunicaciones, DevOps).

7. **Planes de Precios Flexibles**:
   - Selector interactivo Mensual / Anual (con 20% de descuento).
   - Niveles: Comunidad Self-Hosted ($0 para siempre), Cloud Pro y Enterprise Dedicado.

8. **Acordeón de Preguntas Frecuentes (FAQ)** y formulario de suscripción/despliegue rápido.

---

## 📂 Estructura del Proyecto

```
c:\Users\lenin\OneDrive\Desktop\ANTIGRAVITY\
├── index.html              # Landing page completa, moderna y responsive
├── assets/
│   ├── css/
│   │   └── custom.css      # Estilos personalizados, gradientes, animaciones y canvas
│   └── js/
│       ├── canvas.js       # Motor del lienzo interactivo (arrastre, SVG, simulación)
│       └── main.js         # Lógica UI (calculadora ROI, búsqueda, tabs CLI, toast)
└── README.md               # Documentación del proyecto
```

---

## 🌐 Cómo Abrir y Ver la Landing Page

No requiere instalación ni dependencias adicionales de Node.js o Python.

1. Abre el explorador de archivos en la carpeta:
   `c:\Users\lenin\OneDrive\Desktop\ANTIGRAVITY`
2. Haz doble clic en [`index.html`](file:///c:/Users/lenin/OneDrive/Desktop/ANTIGRAVITY/index.html) para abrirla directamente en cualquier navegador web moderno (Google Chrome, Microsoft Edge, Firefox, Brave, Safari).

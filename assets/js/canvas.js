/**
 * DATA CENTER LIRAY CLARO - Motor de Lienzo Interactivo
 * Plataforma de Automatización de Flujos & Orquestación de Agentes de IA
 * Branding: Rojo Claro (#DA291C) y Blanco (#FFFFFF)
 */

(function () {
  // Available Workflow Presets
  const WORKFLOW_PRESETS = {
    'lead-scoring': {
      title: '⚡ DATA CENTER LIRAY CLARO — Telemetría de Servidores & Alerta IA',
      description: 'Supervisa eventos de infraestructura crítica en Data Center Liray, procesa métricas con IA y notifica en tiempo real.',
      nodes: [
        {
          id: 'node-webhook',
          title: 'Sensor Liray IoT',
          type: 'trigger',
          badge: 'TELEMETRÍA TIER IV',
          icon: '🏢',
          color: '#DA291C',
          bgBadge: 'bg-red-500/20 text-white border-red-500/40',
          x: 40,
          y: 140,
          input: null,
          config: {
            source: 'Data Center Liray (Colina, Chile)',
            facility: 'Sala de Servidores B - Rack 42',
            protocol: 'MQTT / HTTPS Telemetry',
            samplingRate: '10ms ultra-low latency'
          },
          mockOutput: {
            facility: 'Data Center Liray CLARO',
            zone: 'Cluster Tier IV - Misión Crítica',
            timestamp: new Date().toISOString(),
            metrics: {
              pue: 1.18,
              ambient_temp: '20.4°C',
              power_redundancy: '100% Dual UPS Activo',
              fiber_link: 'Anillo de Fibra Óptica Claro 400 Gbps OK'
            }
          }
        },
        {
          id: 'node-ai',
          title: 'Agente IA Liray',
          type: 'ai-agent',
          badge: 'ANÁLISIS PREDICTIVO',
          icon: '🧠',
          color: '#DA291C',
          bgBadge: 'bg-red-500/20 text-white border-red-500/40',
          x: 320,
          y: 140,
          config: {
            model: 'Claro-Enterprise-LLM (Claude / Llama 3 On-Premise)',
            temperature: 0.1,
            role: 'Diagnóstico predictivo de cargas térmicas y saturación de enlaces',
            security: 'Datos 100% locales en Data Center Liray sin fugas externas'
          },
          mockOutput: {
            health_index: '99.99%',
            anomaly_detected: false,
            predicted_trend: 'Consumo óptimo. Rendimiento de red en rango nominal.',
            recommendation: 'Mantener balanceo de carga automático en anillo Claro.'
          }
        },
        {
          id: 'node-router',
          title: 'Router de Tráfico',
          type: 'router',
          badge: 'SLA >= 99.99% ?',
          icon: '🔀',
          color: '#FFFFFF',
          bgBadge: 'bg-white/10 text-white border-white/30',
          x: 600,
          y: 140,
          config: {
            condition: 'telemetry.sla_status == "HEALTHY"',
            true_target: ['node-crm', 'node-slack'],
            false_target: ['node-dr-failover']
          },
          mockOutput: {
            evaluation: true,
            status: 'OPERATIVO_EXCELENTE',
            route_selected: 'Ruta Primaria Fibra Liray'
          }
        },
        {
          id: 'node-crm',
          title: 'Base de Datos Central',
          type: 'action',
          badge: 'REGISTRO AUDITABLE',
          icon: '🗄️',
          color: '#DA291C',
          bgBadge: 'bg-red-500/20 text-white border-red-500/40',
          x: 880,
          y: 60,
          config: {
            datacenter: 'DATA CENTER LIRAY CLARO',
            storage: 'PostgreSQL Enterprise / NVMe SAN Array',
            compliance: 'ISO 27001 & Tier IV Certified'
          },
          mockOutput: {
            status: 'COMMITTED',
            audit_id: 'LIRAY-TX-883921',
            replication_delay: '0.2ms'
          }
        },
        {
          id: 'node-slack',
          title: 'NOC / Alerta Claro',
          type: 'action',
          badge: 'NOC CLARO 24/7',
          icon: '🚨',
          color: '#DA291C',
          bgBadge: 'bg-red-500/20 text-white border-red-500/40',
          x: 880,
          y: 220,
          config: {
            team: 'Centro de Operaciones de Red (NOC) Claro Chile',
            priority: 'INFO / TELEMETRÍA VERIFICADA',
            channel: '#noc-liray-mission-critical'
          },
          mockOutput: {
            sent: true,
            operator_notified: 'NOC Liray Nivel 3',
            message: '✅ DATA CENTER LIRAY CLARO: Nodo verificado y sincronizado con éxito.'
          }
        }
      ],
      connections: [
        { from: 'node-webhook', to: 'node-ai' },
        { from: 'node-ai', to: 'node-router' },
        { from: 'node-router', to: 'node-crm' },
        { from: 'node-router', to: 'node-slack' }
      ]
    },
    'devops-autopilot': {
      title: '🚨 DATA CENTER LIRAY CLARO — Autopilot de Sanación y Failover',
      description: 'Orquestación de contingencia, conmutación por error en milisegundos y balanceo de enlaces de alta capacidad.',
      nodes: [
        {
          id: 'node-webhook',
          title: 'Monitor Enlace Claro',
          type: 'trigger',
          badge: 'BGP / FIBRA 100G',
          icon: '🌐',
          color: '#DA291C',
          bgBadge: 'bg-red-500/20 text-white border-red-500/40',
          x: 40,
          y: 140,
          config: { link: 'Backbone Liray - Santiago Centro', threshold: 'Jitter < 1ms' },
          mockOutput: { status: 'OPTIMAL', latency: '0.8ms', packets_dropped: 0 }
        },
        {
          id: 'node-ai',
          title: 'IA de Red Claro',
          type: 'ai-agent',
          badge: 'RUTEADOR AUTÓNOMO',
          icon: '🤖',
          color: '#DA291C',
          bgBadge: 'bg-red-500/20 text-white border-red-500/40',
          x: 320,
          y: 140,
          config: { algorithm: 'Predictive Bandwidth Shaper', target: 'Zero Congestion' },
          mockOutput: { decision: 'Ruta balanceada en doble anillo redundante' }
        },
        {
          id: 'node-router',
          title: 'Políticas de Seguridad',
          type: 'router',
          badge: 'FIREWALL LIRAY',
          icon: '🛡️',
          color: '#FFFFFF',
          bgBadge: 'bg-white/10 text-white border-white/30',
          x: 600,
          y: 140,
          config: { ruleset: 'DDoS Shield Claro Enterprise & WAF' },
          mockOutput: { attack_vector_mitigated: true, rule_action: 'ALLOW_SECURE' }
        },
        {
          id: 'node-crm',
          title: 'Orquestador Cloud',
          type: 'action',
          badge: 'K8S CLARO CLOUD',
          icon: '☸️',
          color: '#DA291C',
          bgBadge: 'bg-red-500/20 text-white border-red-500/40',
          x: 880,
          y: 60,
          config: { cluster: 'k8s-liray-production', scale: 'Auto-scaling pod group' },
          mockOutput: { replicas: 12, health: '100% Ready' }
        },
        {
          id: 'node-slack',
          title: 'Reporte Ejecutivo',
          type: 'action',
          badge: 'SLA 99.999%',
          icon: '📱',
          color: '#DA291C',
          bgBadge: 'bg-red-500/20 text-white border-red-500/40',
          x: 880,
          y: 220,
          config: { recipient: 'Dirección de Operaciones Tecnológicas Claro' },
          mockOutput: { sms_alert_sent: true, report: 'Disponibilidad total garantizada' }
        }
      ],
      connections: [
        { from: 'node-webhook', to: 'node-ai' },
        { from: 'node-ai', to: 'node-router' },
        { from: 'node-router', to: 'node-crm' },
        { from: 'node-router', to: 'node-slack' }
      ]
    }
  };

  let currentPresetKey = 'lead-scoring';
  let currentPreset = WORKFLOW_PRESETS[currentPresetKey];
  let isExecuting = false;
  let activeNodeId = null;

  // DOM Elements
  const canvasWrapper = document.getElementById('canvas-wrapper');
  const nodesLayer = document.getElementById('canvas-nodes-layer');
  const svgConnections = document.getElementById('canvas-connections-svg');
  const btnRunWorkflow = document.getElementById('btn-run-workflow');
  const executionBadge = document.getElementById('execution-status-badge');
  const executionTimeText = document.getElementById('execution-time-text');
  const executionConsole = document.getElementById('execution-console');
  const executionLogOutput = document.getElementById('execution-log-output');
  const nodeInspectorDrawer = document.getElementById('node-inspector-drawer');
  const inspectorTitle = document.getElementById('inspector-node-title');
  const inspectorType = document.getElementById('inspector-node-type');
  const inspectorConfig = document.getElementById('inspector-node-config');
  const inspectorOutput = document.getElementById('inspector-node-output');

  // Initialize Canvas
  function initCanvas() {
    renderNodes();
    drawConnections();
    setupCanvasEvents();
    setupPresetButtons();
    setupResizeObserver();
  }

  // Render HTML Nodes
  function renderNodes() {
    if (!nodesLayer) return;
    nodesLayer.innerHTML = '';

    currentPreset.nodes.forEach((node) => {
      const nodeEl = document.createElement('div');
      nodeEl.id = node.id;
      nodeEl.className = 'workflow-node rounded-xl p-3.5 w-60 border bg-[#10131d]/95 shadow-xl backdrop-blur-md cursor-grab active:cursor-grabbing hover:border-red-500/60 transition-all select-none';
      nodeEl.style.left = `${node.x}px`;
      nodeEl.style.top = `${node.y}px`;
      nodeEl.style.borderColor = 'rgba(255, 255, 255, 0.15)';

      nodeEl.innerHTML = `
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 rounded-lg flex items-center justify-center text-lg bg-red-600/20 border border-red-500/40 shadow-inner">
              ${node.icon}
            </span>
            <div>
              <h4 class="text-xs font-bold text-white leading-tight font-heading">${node.title}</h4>
              <span class="text-[10px] text-red-200 font-mono tracking-wide">${node.type.toUpperCase()}</span>
            </div>
          </div>
          <span class="node-status-indicator w-2.5 h-2.5 rounded-full bg-slate-600 transition-colors duration-300"></span>
        </div>
        
        <div class="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
          <span class="px-2 py-0.5 rounded-full border text-[10px] font-mono truncate max-w-[150px] font-semibold ${node.bgBadge}">
            ${node.badge}
          </span>
          <span class="node-exec-time text-[10px] text-white/80 font-mono">Listo</span>
        </div>

        <!-- Connection Ports con Rojo Claro y Blanco -->
        ${node.type !== 'trigger' ? '<div class="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-white shadow flex items-center justify-center pointer-events-none"><div class="w-1.5 h-1.5 rounded-full bg-white"></div></div>' : ''}
        <div class="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-red-500 shadow flex items-center justify-center pointer-events-none"><div class="w-1.5 h-1.5 rounded-full bg-red-500"></div></div>
      `;

      // Node Dragging logic
      makeDraggable(nodeEl, node);

      // Node Click Inspector
      nodeEl.addEventListener('click', () => {
        if (!nodeEl.dataset.isDragging) {
          openNodeInspector(node.id);
        }
      });

      nodesLayer.appendChild(nodeEl);
    });
  }

  // Draw SVG Bezier Curves con gradiente Rojo Claro y Blanco
  function drawConnections() {
    if (!svgConnections || !canvasWrapper) return;

    const defs = svgConnections.querySelector('defs');
    svgConnections.innerHTML = '';
    if (defs) {
      svgConnections.appendChild(defs);
    } else {
      const newDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      newDefs.innerHTML = `
        <linearGradient id="claro-red-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#E60000" />
          <stop offset="50%" stop-color="#DA291C" />
          <stop offset="100%" stop-color="#FFFFFF" />
        </linearGradient>
        <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      `;
      svgConnections.appendChild(newDefs);
    }

    currentPreset.connections.forEach((conn) => {
      const fromEl = document.getElementById(conn.from);
      const toEl = document.getElementById(conn.to);
      if (!fromEl || !toEl) return;

      const fromX = fromEl.offsetLeft + fromEl.offsetWidth;
      const fromY = fromEl.offsetTop + fromEl.offsetHeight / 2;
      const toX = toEl.offsetLeft;
      const toY = toEl.offsetTop + toEl.offsetHeight / 2;

      const deltaX = Math.abs(toX - fromX) * 0.55;
      const cp1X = fromX + deltaX;
      const cp1Y = fromY;
      const cp2X = toX - deltaX;
      const cp2Y = toY;

      const d = `M ${fromX} ${fromY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${toX} ${toY}`;

      // Background path
      const pathBg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathBg.setAttribute('d', d);
      pathBg.setAttribute('class', 'connection-path-bg');
      svgConnections.appendChild(pathBg);

      // Main active/interactive path
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('id', `conn-${conn.from}-${conn.to}`);
      path.setAttribute('class', 'connection-path');
      svgConnections.appendChild(path);
    });
  }

  // Draggable logic for nodes
  function makeDraggable(element, nodeData) {
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    let hasMoved = false;

    element.addEventListener('mousedown', onMouseDown);
    element.addEventListener('touchstart', onTouchStart, { passive: false });

    function onMouseDown(e) {
      if (e.target.closest('button')) return;
      e.preventDefault();
      startX = e.clientX;
      startY = e.clientY;
      initialLeft = element.offsetLeft;
      initialTop = element.offsetTop;
      hasMoved = false;
      element.dataset.isDragging = 'false';

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(e) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMoved = true;
        element.dataset.isDragging = 'true';
      }

      if (hasMoved) {
        const newLeft = Math.max(10, initialLeft + dx);
        const newTop = Math.max(10, initialTop + dy);
        element.style.left = `${newLeft}px`;
        element.style.top = `${newTop}px`;
        nodeData.x = newLeft;
        nodeData.y = newTop;
        drawConnections();
      }
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      setTimeout(() => {
        element.dataset.isDragging = 'false';
      }, 50);
    }

    function onTouchStart(e) {
      if (e.touches.length > 1) return;
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      initialLeft = element.offsetLeft;
      initialTop = element.offsetTop;
      hasMoved = false;

      function onTouchMove(ev) {
        if (ev.touches.length > 1) return;
        const t = ev.touches[0];
        const dx = t.clientX - startX;
        const dy = t.clientY - startY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          hasMoved = true;
          ev.preventDefault();
          const newLeft = Math.max(10, initialLeft + dx);
          const newTop = Math.max(10, initialTop + dy);
          element.style.left = `${newLeft}px`;
          element.style.top = `${newTop}px`;
          nodeData.x = newLeft;
          nodeData.y = newTop;
          drawConnections();
        }
      }

      function onTouchEnd() {
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
      }

      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('touchend', onTouchEnd);
    }
  }

  // Simulation
  async function runWorkflowSimulation() {
    if (isExecuting) return;
    isExecuting = true;

    resetExecutionVisuals();

    if (btnRunWorkflow) {
      btnRunWorkflow.disabled = true;
      btnRunWorkflow.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-white font-bold">Procesando...</span>
      `;
    }

    if (executionBadge) {
      executionBadge.className = 'px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-red-600/20 text-white border border-red-500/50 flex items-center gap-1.5';
      executionBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span> Ejecutando en DATA CENTER LIRAY CLARO';
    }

    if (executionConsole) {
      executionConsole.classList.remove('hidden');
    }

    logConsoleMessage('🔴 DATA CENTER LIRAY CLARO — Iniciando orquestación de flujo de misión crítica...', 'info');

    const totalStartTime = performance.now();

    try {
      // Step 1: Telemetría
      await executeNodeStep('node-webhook', '8ms', '📥 Telemetría recibida en Data Center Liray. Fibra óptica Claro operativa al 100%.');
      await animatePulseBetween('node-webhook', 'node-ai');

      // Step 2: Agente IA
      await executeNodeStep('node-ai', '192ms', '🧠 Agente IA Claro: Diagnóstico predictivo completado. Rendimiento de cluster Tier IV: 99.999%.');
      await animatePulseBetween('node-ai', 'node-router');

      // Step 3: Router
      await executeNodeStep('node-router', '4ms', '🔀 Router de Tráfico: SLA óptimo validado -> Enrutamiento por anillo redundante.');

      // Step 4: Parallel actions
      const animCrm = animatePulseBetween('node-router', 'node-crm');
      const animSlack = animatePulseBetween('node-router', 'node-slack');
      await Promise.all([animCrm, animSlack]);

      await Promise.all([
        executeNodeStep('node-crm', '28ms', '🗄️ Base Central: Transacción confirmada en array NVMe con cifrado AES-256.'),
        executeNodeStep('node-slack', '22ms', '🚨 NOC Claro: Estado verde confirmado en pantalla de control 24/7.')
      ]);

      const totalElapsed = Math.round(performance.now() - totalStartTime);
      logConsoleMessage(`🎉 DATA CENTER LIRAY CLARO: Flujo ejecutado con éxito en ${totalElapsed}ms. 0 incidencias.`, 'success');

      if (executionBadge) {
        executionBadge.className = 'px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-red-600 text-white border border-red-400 flex items-center gap-1.5 shadow-md shadow-red-600/30';
        executionBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-white"></span> Operación Exitosa (Tier IV)';
      }

      if (executionTimeText) {
        executionTimeText.textContent = `Última telemetría: hace segundos • ${totalElapsed}ms`;
      }

      if (window.FluxToast) {
        window.FluxToast.show('DATA CENTER LIRAY CLARO: Flujo completado en ' + totalElapsed + 'ms', 'success');
      }

    } catch (err) {
      logConsoleMessage('❌ Error en ejecución: ' + err.message, 'error');
    } finally {
      isExecuting = false;
      if (btnRunWorkflow) {
        btnRunWorkflow.disabled = false;
        btnRunWorkflow.innerHTML = `
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
          </svg>
          <span class="text-white font-bold">Ejecutar Flujo</span>
        `;
      }
    }
  }

  function executeNodeStep(nodeId, execTime, logMessage) {
    return new Promise((resolve) => {
      const nodeEl = document.getElementById(nodeId);
      if (!nodeEl) return resolve();

      nodeEl.classList.remove('success');
      nodeEl.classList.add('executing');
      const indicator = nodeEl.querySelector('.node-status-indicator');
      const timeSpan = nodeEl.querySelector('.node-exec-time');
      if (indicator) indicator.className = 'node-status-indicator w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping';
      if (timeSpan) timeSpan.textContent = 'Procesando...';

      setTimeout(() => {
        nodeEl.classList.remove('executing');
        nodeEl.classList.add('success');
        if (indicator) indicator.className = 'node-status-indicator w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_#DA291C]';
        if (timeSpan) {
          timeSpan.textContent = `✓ ${execTime}`;
          timeSpan.className = 'node-exec-time text-[10px] text-white font-mono font-bold';
        }
        logConsoleMessage(logMessage, 'info');
        resolve();
      }, 350);
    });
  }

  function animatePulseBetween(fromId, toId) {
    return new Promise((resolve) => {
      const pathEl = document.getElementById(`conn-${fromId}-${toId}`);
      if (!pathEl || !svgConnections) return resolve();

      pathEl.classList.add('active');

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', '6');
      circle.setAttribute('class', 'pulse-circle');
      svgConnections.appendChild(circle);

      const pathLength = pathEl.getTotalLength();
      const duration = 360;
      let startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const point = pathEl.getPointAtLength(progress * pathLength);
        circle.setAttribute('cx', point.x);
        circle.setAttribute('cy', point.y);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          svgConnections.removeChild(circle);
          setTimeout(() => pathEl.classList.remove('active'), 250);
          resolve();
        }
      }

      requestAnimationFrame(step);
    });
  }

  function resetExecutionVisuals() {
    currentPreset.nodes.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) {
        el.classList.remove('executing', 'success', 'selected');
        const indicator = el.querySelector('.node-status-indicator');
        const timeSpan = el.querySelector('.node-exec-time');
        if (indicator) indicator.className = 'node-status-indicator w-2.5 h-2.5 rounded-full bg-slate-600';
        if (timeSpan) {
          timeSpan.textContent = 'Listo';
          timeSpan.className = 'node-exec-time text-[10px] text-slate-400 font-mono';
        }
      }
    });

    if (executionLogOutput) {
      executionLogOutput.innerHTML = '';
    }
  }

  function logConsoleMessage(msg, type = 'info') {
    if (!executionLogOutput) return;
    const time = new Date().toLocaleTimeString('es-ES', { hour12: false });
    const line = document.createElement('div');
    line.className = 'flex items-start gap-2 py-0.5 text-xs font-mono';

    let colorClass = 'text-white';
    if (type === 'success') colorClass = 'text-white font-bold bg-red-600/30 px-1 rounded';
    if (type === 'error') colorClass = 'text-red-400 font-bold';

    line.innerHTML = `
      <span class="text-red-400 shrink-0 font-bold">[${time}]</span>
      <span class="${colorClass}">${msg}</span>
    `;

    executionLogOutput.appendChild(line);
    executionLogOutput.scrollTop = executionLogOutput.scrollHeight;
  }

  // Node Inspector Drawer
  function openNodeInspector(nodeId) {
    const node = currentPreset.nodes.find((n) => n.id === nodeId);
    if (!node || !nodeInspectorDrawer) return;

    activeNodeId = nodeId;

    currentPreset.nodes.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) el.classList.toggle('selected', n.id === nodeId);
    });

    if (inspectorTitle) inspectorTitle.textContent = `${node.icon} ${node.title}`;
    if (inspectorType) inspectorType.textContent = node.type.toUpperCase();

    if (inspectorConfig) {
      inspectorConfig.textContent = JSON.stringify(node.config, null, 2);
    }

    if (inspectorOutput) {
      inspectorOutput.textContent = JSON.stringify(node.mockOutput, null, 2);
    }

    nodeInspectorDrawer.classList.remove('translate-x-full');
  }

  function closeNodeInspector() {
    if (nodeInspectorDrawer) {
      nodeInspectorDrawer.classList.add('translate-x-full');
    }
    if (activeNodeId) {
      const el = document.getElementById(activeNodeId);
      if (el) el.classList.remove('selected');
      activeNodeId = null;
    }
  }

  // Setup Event Handlers
  function setupCanvasEvents() {
    if (btnRunWorkflow) {
      btnRunWorkflow.addEventListener('click', runWorkflowSimulation);
    }

    const btnCloseInspector = document.getElementById('btn-close-inspector');
    if (btnCloseInspector) {
      btnCloseInspector.addEventListener('click', closeNodeInspector);
    }

    const btnClearConsole = document.getElementById('btn-clear-console');
    if (btnClearConsole && executionLogOutput) {
      btnClearConsole.addEventListener('click', () => {
        executionLogOutput.innerHTML = '';
      });
    }

    const btnToggleConsole = document.getElementById('btn-toggle-console');
    if (btnToggleConsole && executionConsole) {
      btnToggleConsole.addEventListener('click', () => {
        executionConsole.classList.toggle('hidden');
      });
    }
  }

  // Setup Presets Buttons
  function setupPresetButtons() {
    const presetButtons = document.querySelectorAll('[data-workflow-preset]');
    presetButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const key = btn.getAttribute('data-workflow-preset');
        if (WORKFLOW_PRESETS[key]) {
          currentPresetKey = key;
          currentPreset = WORKFLOW_PRESETS[key];
          
          presetButtons.forEach(b => {
            b.classList.remove('bg-red-600', 'border-red-500', 'text-white', 'shadow-red-600/40');
            b.classList.add('bg-slate-900', 'border-slate-800', 'text-slate-300');
          });
          btn.classList.add('bg-red-600', 'border-red-500', 'text-white', 'shadow-md', 'shadow-red-600/40');
          btn.classList.remove('bg-slate-900', 'border-slate-800', 'text-slate-300');

          const headerTitle = document.getElementById('canvas-workflow-name');
          if (headerTitle) {
            headerTitle.textContent = currentPreset.title;
          }

          closeNodeInspector();
          renderNodes();
          drawConnections();
          resetExecutionVisuals();

          if (window.FluxToast) {
            window.FluxToast.show(`Plantilla cargada: ${currentPreset.title}`, 'info');
          }
        }
      });
    });
  }

  function setupResizeObserver() {
    window.addEventListener('resize', () => {
      drawConnections();
    });
  }

  window.FluxCanvas = {
    init: initCanvas,
    run: runWorkflowSimulation,
    inspect: openNodeInspector,
    loadPreset: function (presetKey) {
      if (WORKFLOW_PRESETS[presetKey]) {
        currentPresetKey = presetKey;
        currentPreset = WORKFLOW_PRESETS[presetKey];
        const headerTitle = document.getElementById('canvas-workflow-name');
        if (headerTitle) headerTitle.textContent = currentPreset.title;
        renderNodes();
        drawConnections();
        resetExecutionVisuals();
        const el = document.getElementById('interactive-canvas-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCanvas);
  } else {
    initCanvas();
  }
})();

/**
 * FluxNode Interactive Canvas Engine
 * Handles workflow graph rendering, drag & drop, bezier connections,
 * step-by-step execution simulation, and node inspector details.
 */

(function () {
  // Available Workflow Presets
  const WORKFLOW_PRESETS = {
    'lead-scoring': {
      title: '⚡ Clasificación de Leads con IA & Sincronización CRM',
      description: 'Captura webhooks de leads, evalúa intención de compra con Claude 3.5, enruta y notifica a Slack.',
      nodes: [
        {
          id: 'node-webhook',
          title: 'Webhook Lead',
          type: 'trigger',
          badge: 'POST /v1/incoming-lead',
          icon: '⚡',
          color: '#10b981',
          bgBadge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          x: 40,
          y: 140,
          input: null,
          config: {
            method: 'POST',
            path: '/v1/incoming-lead',
            auth: 'Bearer Token (Header)',
            rateLimit: '100 req/min'
          },
          mockOutput: {
            event: 'lead_captured',
            timestamp: new Date().toISOString(),
            data: {
              name: 'Elena Rostova',
              email: 'elena@enterprise-tech.io',
              company_size: '250-500',
              budget: '$45,000/yr',
              message: 'Necesitamos reemplazar Zapier por temas de privacidad de datos y soberanía en AWS.'
            }
          }
        },
        {
          id: 'node-ai',
          title: 'Agente Claude 3.5',
          type: 'ai-agent',
          badge: 'LLM Scoring & Intent',
          icon: '🧠',
          color: '#8b5cf6',
          bgBadge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
          x: 320,
          y: 140,
          config: {
            model: 'claude-3-5-sonnet-20241022',
            temperature: 0.2,
            system_prompt: 'Eres un analista de ventas B2B. Evalúa el fit, calcula un score de 1 a 100 y extrae puntos de dolor clave.',
            output_format: 'JSON Schema'
          },
          mockOutput: {
            score: 94,
            tier: 'Tier 1 Enterprise',
            urgency: 'Alta',
            recommended_plan: 'Enterprise Dedicated',
            summary: 'Cliente calificado con alto presupuesto buscando migración desde Zapier por privacidad.'
          }
        },
        {
          id: 'node-router',
          title: 'Router Condicional',
          type: 'router',
          badge: 'Score >= 80 ?',
          icon: '🔀',
          color: '#f59e0b',
          bgBadge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          x: 600,
          y: 140,
          config: {
            condition: 'payload.score >= 80',
            true_target: ['node-crm', 'node-slack'],
            false_target: ['node-email']
          },
          mockOutput: {
            evaluation: true,
            matched_branch: 'High_Value_Path',
            route_selected: 'Enterprise Priority Queue'
          }
        },
        {
          id: 'node-crm',
          title: 'PostgreSQL / Hubspot',
          type: 'action',
          badge: 'INSERT into leads',
          icon: '🗄️',
          color: '#06b6d4',
          bgBadge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          x: 880,
          y: 60,
          config: {
            table: 'enterprise_deals',
            action: 'upsert',
            fields: ['company_size', 'score', 'assigned_rep']
          },
          mockOutput: {
            status: 'success',
            row_id: 'deal_9941a8',
            assigned_rep: 'Carlos Mendez (VP Sales)',
            pipeline_stage: 'Demo Programada'
          }
        },
        {
          id: 'node-slack',
          title: 'Alerta Slack VIP',
          type: 'action',
          badge: '#enterprise-deals',
          icon: '💬',
          color: '#f43f5e',
          bgBadge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          x: 880,
          y: 220,
          config: {
            channel: '#enterprise-deals',
            bot_name: 'FluxNode Sales Bot',
            priority: 'urgent',
            mention: '@sales-leadership'
          },
          mockOutput: {
            delivered: true,
            ts: '1729731200.012400',
            channel_id: 'C06E39Z1A',
            message: '🚀 ¡Nuevo Lead Calificado Tier 1! Elena de enterprise-tech.io (Score: 94)'
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
      title: '🚨 Autopilot de Incidentes DevOps & Sanación Automática',
      description: 'Recibe alertas de Prometheus, consulta métricas con Ollama local, reinicia pods y reporta a Telegram.',
      nodes: [
        {
          id: 'node-webhook',
          title: 'Alerta Prometheus',
          type: 'trigger',
          badge: 'High Memory Alert (K8s)',
          icon: '🔥',
          color: '#ef4444',
          bgBadge: 'bg-red-500/10 text-red-400 border-red-500/30',
          x: 40,
          y: 140,
          config: { alert: 'KubePodCrashLooping', namespace: 'production-api' },
          mockOutput: { pod: 'auth-service-7f89b', memory_usage: '98.4%', restarts: 6 }
        },
        {
          id: 'node-ai',
          title: 'Agente Ollama (Llama 3)',
          type: 'ai-agent',
          badge: 'Diagnóstico Cero-Fuga',
          icon: '🦙',
          color: '#8b5cf6',
          bgBadge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
          x: 320,
          y: 140,
          config: { model: 'llama3:70b-instruct', endpoint: 'http://localhost:11434' },
          mockOutput: { diagnosis: 'Memory leak detectado en pool de conexiones Redis', action_suggested: 'drain_and_restart' }
        },
        {
          id: 'node-router',
          title: 'Validador de Política',
          type: 'router',
          badge: 'Auto-restart permitido?',
          icon: '🛡️',
          color: '#f59e0b',
          bgBadge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          x: 600,
          y: 140,
          config: { policy: 'prod_auto_remediation_whitelist' },
          mockOutput: { approved: true, audit_hash: 'sha256:7bc03' }
        },
        {
          id: 'node-crm',
          title: 'Kubernetes CLI',
          type: 'action',
          badge: 'kubectl rollout restart',
          icon: '☸️',
          color: '#06b6d4',
          bgBadge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          x: 880,
          y: 60,
          config: { command: 'rollout restart deployment/auth-service' },
          mockOutput: { rollout_status: 'completed successfully in 18s' }
        },
        {
          id: 'node-slack',
          title: 'Telegram DevOps',
          type: 'action',
          badge: 'Canal @SRE_Ops',
          icon: '✈️',
          color: '#38bdf8',
          bgBadge: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
          x: 880,
          y: 220,
          config: { chat_id: '-10048928', parse_mode: 'HTML' },
          mockOutput: { sent: true, text: '✅ Incidente mitigado automáticamente por FluxNode' }
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
      nodeEl.className = 'workflow-node rounded-xl p-3.5 w-60 border bg-slate-900/90 shadow-xl backdrop-blur-md cursor-grab active:cursor-grabbing hover:border-indigo-500/50 transition-all select-none';
      nodeEl.style.left = `${node.x}px`;
      nodeEl.style.top = `${node.y}px`;
      nodeEl.style.borderColor = 'rgba(255, 255, 255, 0.12)';

      nodeEl.innerHTML = `
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 rounded-lg flex items-center justify-center text-lg bg-slate-800/80 border border-slate-700/60 shadow-inner">
              ${node.icon}
            </span>
            <div>
              <h4 class="text-xs font-semibold text-white leading-tight">${node.title}</h4>
              <span class="text-[10px] text-slate-400 font-mono tracking-wide">${node.type.toUpperCase()}</span>
            </div>
          </div>
          <span class="node-status-indicator w-2.5 h-2.5 rounded-full bg-slate-600 transition-colors duration-300"></span>
        </div>
        
        <div class="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
          <span class="px-2 py-0.5 rounded-full border text-[10px] font-mono truncate max-w-[150px] ${node.bgBadge}">
            ${node.badge}
          </span>
          <span class="node-exec-time text-[10px] text-slate-400 font-mono">Listo</span>
        </div>

        <!-- Connection Ports -->
        ${node.type !== 'trigger' ? '<div class="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-800 border-2 border-indigo-400 shadow flex items-center justify-center pointer-events-none"><div class="w-1.5 h-1.5 rounded-full bg-indigo-400"></div></div>' : ''}
        <div class="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-800 border-2 border-cyan-400 shadow flex items-center justify-center pointer-events-none"><div class="w-1.5 h-1.5 rounded-full bg-cyan-400"></div></div>
      `;

      // Node Dragging logic
      makeDraggable(nodeEl, node);

      // Node Click Inspector
      nodeEl.addEventListener('click', (e) => {
        // Only inspect if not actively dragged
        if (!nodeEl.dataset.isDragging) {
          openNodeInspector(node.id);
        }
      });

      nodesLayer.appendChild(nodeEl);
    });
  }

  // Draw SVG Bezier Curves
  function drawConnections() {
    if (!svgConnections || !canvasWrapper) return;

    // Clear existing paths (keep defs)
    const defs = svgConnections.querySelector('defs');
    svgConnections.innerHTML = '';
    if (defs) {
      svgConnections.appendChild(defs);
    } else {
      const newDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      newDefs.innerHTML = `
        <linearGradient id="active-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="50%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#10b981" />
        </linearGradient>
        <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      `;
      svgConnections.appendChild(newDefs);
    }

    currentPreset.connections.forEach((conn, index) => {
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

      // Background path (dim guide)
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

  // Workflow Execution Simulation
  async function runWorkflowSimulation() {
    if (isExecuting) return;
    isExecuting = true;

    // Reset nodes & UI
    resetExecutionVisuals();

    if (btnRunWorkflow) {
      btnRunWorkflow.disabled = true;
      btnRunWorkflow.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Ejecutando...</span>
      `;
    }

    if (executionBadge) {
      executionBadge.className = 'px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5';
      executionBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span> Procesando Flujo';
    }

    if (executionConsole) {
      executionConsole.classList.remove('hidden');
    }

    logConsoleMessage('⚙️ Iniciando ejecución del grafo de automatización en entorno seguro...', 'info');

    const totalStartTime = performance.now();

    try {
      // Step 1: Webhook Trigger
      await executeNodeStep('node-webhook', '12ms', '📥 Webhook recibido con payload verificado (Firma HMAC SHA256 OK)');
      await animatePulseBetween('node-webhook', 'node-ai');

      // Step 2: AI Processing
      await executeNodeStep('node-ai', '284ms', '🧠 Claude 3.5 Sonnet: Evaluando lead... Score asignado: 94/100 (Tier 1 Enterprise)');
      await animatePulseBetween('node-ai', 'node-router');

      // Step 3: Router Evaluation
      await executeNodeStep('node-router', '6ms', '🔀 Condición cumplida: Score (94) >= 80 -> Ramificación Alta Prioridad activada');

      // Step 4: Parallel actions
      const animCrm = animatePulseBetween('node-router', 'node-crm');
      const animSlack = animatePulseBetween('node-router', 'node-slack');
      await Promise.all([animCrm, animSlack]);

      await Promise.all([
        executeNodeStep('node-crm', '42ms', '🗄️ PostgreSQL: Lead insertado con ID #deal_9941a8 en pipeline Enterprise'),
        executeNodeStep('node-slack', '35ms', '💬 Slack: Alerta enviada a #enterprise-deals con mención ejecutiva')
      ]);

      const totalElapsed = Math.round(performance.now() - totalStartTime);
      logConsoleMessage(`🎉 Flujo ejecutado con éxito en ${totalElapsed}ms. 0 errores detectados.`, 'success');

      if (executionBadge) {
        executionBadge.className = 'px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5';
        executionBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Éxito (200 OK)';
      }

      if (executionTimeText) {
        executionTimeText.textContent = `Última ejecución: hace segundos • ${totalElapsed}ms`;
      }

      // Notify user via toast
      if (window.FluxToast) {
        window.FluxToast.show('Flujo completado exitosamente en ' + totalElapsed + 'ms', 'success');
      }

    } catch (err) {
      logConsoleMessage('❌ Error en ejecución: ' + err.message, 'error');
    } finally {
      isExecuting = false;
      if (btnRunWorkflow) {
        btnRunWorkflow.disabled = false;
        btnRunWorkflow.innerHTML = `
          <svg class="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
          </svg>
          <span>Ejecutar Flujo</span>
        `;
      }
    }
  }

  function executeNodeStep(nodeId, execTime, logMessage) {
    return new Promise((resolve) => {
      const nodeEl = document.getElementById(nodeId);
      if (!nodeEl) return resolve();

      // Set executing state
      nodeEl.classList.remove('success');
      nodeEl.classList.add('executing');
      const indicator = nodeEl.querySelector('.node-status-indicator');
      const timeSpan = nodeEl.querySelector('.node-exec-time');
      if (indicator) indicator.className = 'node-status-indicator w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping';
      if (timeSpan) timeSpan.textContent = 'Procesando...';

      setTimeout(() => {
        // Set success state
        nodeEl.classList.remove('executing');
        nodeEl.classList.add('success');
        if (indicator) indicator.className = 'node-status-indicator w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]';
        if (timeSpan) {
          timeSpan.textContent = `✓ ${execTime}`;
          timeSpan.className = 'node-exec-time text-[10px] text-emerald-400 font-mono font-medium';
        }
        logConsoleMessage(logMessage, 'info');
        resolve();
      }, 400);
    });
  }

  function animatePulseBetween(fromId, toId) {
    return new Promise((resolve) => {
      const pathEl = document.getElementById(`conn-${fromId}-${toId}`);
      if (!pathEl || !svgConnections) return resolve();

      pathEl.classList.add('active');

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', '5');
      circle.setAttribute('class', 'pulse-circle');
      svgConnections.appendChild(circle);

      const pathLength = pathEl.getTotalLength();
      const duration = 380;
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

    let colorClass = 'text-slate-300';
    if (type === 'success') colorClass = 'text-emerald-400 font-semibold';
    if (type === 'error') colorClass = 'text-red-400 font-semibold';

    line.innerHTML = `
      <span class="text-slate-500 shrink-0">[${time}]</span>
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

    // Highlight selected node
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

  // Setup Presets Dropdown/Buttons
  function setupPresetButtons() {
    const presetButtons = document.querySelectorAll('[data-workflow-preset]');
    presetButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const key = btn.getAttribute('data-workflow-preset');
        if (WORKFLOW_PRESETS[key]) {
          currentPresetKey = key;
          currentPreset = WORKFLOW_PRESETS[key];
          
          presetButtons.forEach(b => b.classList.remove('bg-indigo-600/30', 'border-indigo-500', 'text-white'));
          btn.classList.add('bg-indigo-600/30', 'border-indigo-500', 'text-white');

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

  // Resize listener
  function setupResizeObserver() {
    window.addEventListener('resize', () => {
      drawConnections();
    });
  }

  // Expose API
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
        // Scroll smoothly to canvas
        const el = document.getElementById('interactive-canvas-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCanvas);
  } else {
    initCanvas();
  }
})();

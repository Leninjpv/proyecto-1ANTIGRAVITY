/**
 * DATA CENTER LIRAY CLARO - Scripts Principales de Interacción
 * Branding: Rojo Claro (#DA291C) y Blanco (#FFFFFF)
 */

// Toast Notification System
window.FluxToast = {
  show: function (message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md text-sm font-medium';

    let icon = '🔴';
    let borderClass = 'bg-[#121520]/95 border-red-500/50 text-white shadow-red-600/30';

    if (type === 'success') {
      icon = '✅';
      borderClass = 'bg-[#121520]/95 border-red-500 text-white shadow-red-600/40';
    } else if (type === 'error') {
      icon = '❌';
      borderClass = 'bg-[#121520]/95 border-red-700 text-white';
    } else if (type === 'copy') {
      icon = '📋';
      borderClass = 'bg-[#121520]/95 border-white/60 text-white shadow-white/10';
    }

    toast.className += ` ${borderClass}`;
    toast.innerHTML = `
      <span class="text-base">${icon}</span>
      <span class="font-bold text-white">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('btn-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 2. Terminal CLI Tabs & Clipboard Copy
  const terminalTabs = document.querySelectorAll('[data-cli-tab]');
  const terminalCodes = {
    docker: `docker run -d \\
  --name data-center-liray-claro \\
  -p 5678:5678 \\
  -v liray_storage:/data/claro-liray \\
  -e CLARO_DC_LOCATION="LIRAY_COLINA_TIER_IV" \\
  -e CLARO_ENCRYPTION_KEY="claro-enterprise-aes-256-key" \\
  claro/data-center-liray-claro:latest`,
    compose: `version: '3.8'
services:
  data-center-liray-claro:
    image: claro/data-center-liray-claro:latest
    restart: always
    ports:
      - "5678:5678"
    environment:
      - CLARO_ZONE=LIRAY_TIER_IV
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=liray-db-cluster
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=claro_workflows
    volumes:
      - liray_san_storage:/data/claro-liray
volumes:
  liray_san_storage:`,
    k8s: `# Despliegue en Kubernetes Data Center Liray Claro
helm repo add claro https://charts.claro.com.pe/datacenter
helm repo update
helm install claro-workflow claro/data-center-liray-claro \\
  --namespace claro-mission-critical --create-namespace \\
  --set datacenter.zone=LirayTierIV \\
  --set highAvailability.enabled=true \\
  --set ingress.tlsSecret=claro-wildcard-cert`,
    npm: `# Instalar CLI de DATA CENTER LIRAY CLARO
npm install -g @claro/data-center-liray-claro-cli

# Inicializar agente en nodo local
claro-dc start --datacenter liray`
  };

  const cliCodeDisplay = document.getElementById('cli-code-display');
  const btnCopyCli = document.getElementById('btn-copy-cli');

  terminalTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabKey = tab.getAttribute('data-cli-tab');
      terminalTabs.forEach((t) => {
        t.classList.remove('bg-red-600', 'text-white', 'border-red-500');
        t.classList.add('text-slate-400');
      });
      tab.classList.add('bg-red-600', 'text-white', 'border-red-500');

      if (cliCodeDisplay && terminalCodes[tabKey]) {
        cliCodeDisplay.textContent = terminalCodes[tabKey];
      }
    });
  });

  if (btnCopyCli && cliCodeDisplay) {
    btnCopyCli.addEventListener('click', () => {
      navigator.clipboard.writeText(cliCodeDisplay.textContent.trim()).then(() => {
        window.FluxToast.show('Comando copiado al portapapeles', 'copy');
        const originalHTML = btnCopyCli.innerHTML;
        btnCopyCli.innerHTML = `
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          <span class="text-xs text-white font-bold">Copiado</span>
        `;
        setTimeout(() => {
          btnCopyCli.innerHTML = originalHTML;
        }, 2000);
      });
    });
  }

  // 3. Interactive ROI / Savings Calculator
  const executionsSlider = document.getElementById('slider-executions');
  const executionsValueText = document.getElementById('text-executions-value');
  const zapierCostText = document.getElementById('cost-zapier');
  const makeCostText = document.getElementById('cost-make');
  const fluxCostText = document.getElementById('cost-flux');
  const fluxSelfHostedCostText = document.getElementById('cost-flux-self');
  const totalAnnualSavingsText = document.getElementById('text-annual-savings');

  function calculateSavings(executions) {
    const zapierPerMonth = Math.round((executions / 1000) * 12 + (executions > 50000 ? 50 : 20));
    const makePerMonth = Math.round((executions / 1000) * 4.5 + 10);
    let claroCloud = 20;
    if (executions > 100000) claroCloud = 59;
    else if (executions > 30000) claroCloud = 39;
    else claroCloud = 20;

    if (zapierCostText) zapierCostText.textContent = `$${zapierPerMonth.toLocaleString()}`;
    if (makeCostText) makeCostText.textContent = `$${makePerMonth.toLocaleString()}`;
    if (fluxCostText) fluxCostText.textContent = `$${claroCloud.toLocaleString()}`;
    if (fluxSelfHostedCostText) fluxSelfHostedCostText.textContent = `$0`;

    const annualSavings = (zapierPerMonth - claroCloud) * 12;
    if (totalAnnualSavingsText) {
      totalAnnualSavingsText.textContent = `$${Math.max(120, annualSavings).toLocaleString()} / año`;
    }
  }

  if (executionsSlider && executionsValueText) {
    executionsSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      executionsValueText.textContent = val.toLocaleString() + ' ejecuciones';
      calculateSavings(val);
    });
    calculateSavings(parseInt(executionsSlider.value, 10));
  }

  // 4. Integrations Live Search & Filter
  const integrationSearch = document.getElementById('integration-search-input');
  const integrationCards = document.querySelectorAll('.integration-card');
  const integrationFilterPills = document.querySelectorAll('[data-integration-category]');

  function filterIntegrations() {
    const query = integrationSearch ? integrationSearch.value.toLowerCase().trim() : '';
    const activeCategoryBtn = document.querySelector('[data-integration-category].active');
    const activeCategory = activeCategoryBtn ? activeCategoryBtn.getAttribute('data-integration-category') : 'all';

    let countVisible = 0;
    integrationCards.forEach((card) => {
      const title = card.getAttribute('data-name')?.toLowerCase() || '';
      const tags = card.getAttribute('data-tags')?.toLowerCase() || '';
      const category = card.getAttribute('data-category') || '';

      const matchesSearch = title.includes(query) || tags.includes(query);
      const matchesCategory = activeCategory === 'all' || category === activeCategory;

      if (matchesSearch && matchesCategory) {
        card.style.display = 'flex';
        countVisible++;
      } else {
        card.style.display = 'none';
      }
    });

    const noResults = document.getElementById('integration-no-results');
    if (noResults) {
      noResults.classList.toggle('hidden', countVisible > 0);
    }
  }

  if (integrationSearch) {
    integrationSearch.addEventListener('input', filterIntegrations);
  }

  integrationFilterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      integrationFilterPills.forEach((p) => {
        p.classList.remove('active', 'bg-red-600', 'text-white', 'border-red-500');
        p.classList.add('bg-slate-800/80', 'text-slate-300');
      });
      pill.classList.add('active', 'bg-red-600', 'text-white', 'border-red-500');
      pill.classList.remove('bg-slate-800/80', 'text-slate-300');
      filterIntegrations();
    });
  });

  // 5. Template Filter & Quick Load
  const templateFilterBtns = document.querySelectorAll('[data-template-filter]');
  const templateCards = document.querySelectorAll('.template-card');

  templateFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-template-filter');
      templateFilterBtns.forEach((b) => {
        b.classList.remove('bg-red-600', 'text-white');
        b.classList.add('bg-slate-800/80', 'text-slate-300');
      });
      btn.classList.add('bg-red-600', 'text-white');
      btn.classList.remove('bg-slate-800/80', 'text-slate-300');

      templateCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const loadInCanvasBtns = document.querySelectorAll('[data-load-template]');
  loadInCanvasBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-load-template');
      if (window.FluxCanvas && window.FluxCanvas.loadPreset) {
        window.FluxCanvas.loadPreset(preset);
        window.FluxToast.show('Flujo cargado en DATA CENTER LIRAY CLARO', 'success');
      }
    });
  });

  // 6. Pricing Toggle (Monthly vs Annual)
  const pricingToggle = document.getElementById('pricing-toggle');
  const priceValues = document.querySelectorAll('.price-val');
  const pricePeriods = document.querySelectorAll('.price-period');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', (e) => {
      const isAnnual = e.target.checked;
      priceValues.forEach((val) => {
        const monthly = val.getAttribute('data-monthly');
        const annual = val.getAttribute('data-annual');
        val.textContent = isAnnual ? `$${annual}` : `$${monthly}`;
      });
      pricePeriods.forEach((period) => {
        period.textContent = isAnnual ? '/mes (facturado anual)' : '/mes';
      });
    });
  }

  // 7. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const header = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (header && answer) {
      header.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');

        faqItems.forEach((other) => {
          const otherAns = other.querySelector('.faq-answer');
          const otherIcon = other.querySelector('.faq-icon');
          if (otherAns) otherAns.classList.add('hidden');
          if (otherIcon) otherIcon.classList.remove('rotate-180');
        });

        if (!isOpen) {
          answer.classList.remove('hidden');
          if (icon) icon.classList.add('rotate-180');
        }
      });
    }
  });

  // 8. Deploy Form
  const quickDeployForm = document.getElementById('quick-deploy-form');
  if (quickDeployForm) {
    quickDeployForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = quickDeployForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        window.FluxToast.show('¡Listo! Guía de Data Center Liray enviada a ' + emailInput.value, 'success');
        emailInput.value = '';
      }
    });
  }

  // 9. Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
          }
        }
      }
    });
  });
});

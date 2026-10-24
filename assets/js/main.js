/**
 * FluxNode Main Interaction Scripts
 * Handles UI interactions, Toast notifications, CLI tabs,
 * ROI calculator, Integrations filtering, Pricing toggles, and FAQ accordion.
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

    let icon = 'ℹ️';
    let borderClass = 'bg-slate-900/95 border-slate-700 text-white';

    if (type === 'success') {
      icon = '✅';
      borderClass = 'bg-slate-900/95 border-emerald-500/50 text-emerald-300';
    } else if (type === 'error') {
      icon = '❌';
      borderClass = 'bg-slate-900/95 border-red-500/50 text-red-300';
    } else if (type === 'copy') {
      icon = '📋';
      borderClass = 'bg-slate-900/95 border-indigo-500/50 text-indigo-300';
    }

    toast.className += ` ${borderClass}`;
    toast.innerHTML = `
      <span class="text-base">${icon}</span>
      <span>${message}</span>
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
  // ==========================================
  // 1. Mobile Menu Toggle
  // ==========================================
  const mobileMenuBtn = document.getElementById('btn-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // ==========================================
  // 2. Terminal CLI Tabs & Clipboard Copy
  // ==========================================
  const terminalTabs = document.querySelectorAll('[data-cli-tab]');
  const terminalCodes = {
    docker: `docker run -d \\
  --name fluxnode \\
  -p 5678:5678 \\
  -v fluxnode_data:/home/node/.fluxnode \\
  -e FLUX_ENCRYPTION_KEY="auto-generated-key-928" \\
  fluxnode/fluxnode:latest`,
    compose: `version: '3.8'
services:
  fluxnode:
    image: fluxnode/fluxnode:latest
    restart: always
    ports:
      - "5678:5678"
    environment:
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=fluxnode
    volumes:
      - fluxnode_storage:/home/node/.fluxnode
volumes:
  fluxnode_storage:`,
    k8s: `# Helm deployment in 1 command
helm repo add fluxnode https://charts.fluxnode.io
helm repo update
helm install fluxnode fluxnode/fluxnode \\
  --namespace fluxnode-system --create-namespace \\
  --set persistence.size=20Gi \\
  --set ingress.enabled=true`,
    npm: `# Instalar FluxNode CLI globalmente
npm install -g @fluxnode/cli

# Iniciar servidor local
fluxnode start --tunnel`
  };

  const cliCodeDisplay = document.getElementById('cli-code-display');
  const btnCopyCli = document.getElementById('btn-copy-cli');

  terminalTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabKey = tab.getAttribute('data-cli-tab');
      terminalTabs.forEach((t) => {
        t.classList.remove('bg-slate-800', 'text-white', 'border-indigo-500');
        t.classList.add('text-slate-400');
      });
      tab.classList.add('bg-slate-800', 'text-white', 'border-indigo-500');

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
          <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          <span class="text-xs text-emerald-400 font-medium">Copiado</span>
        `;
        setTimeout(() => {
          btnCopyCli.innerHTML = originalHTML;
        }, 2000);
      });
    });
  }

  // ==========================================
  // 3. Interactive ROI / Savings Calculator
  // ==========================================
  const executionsSlider = document.getElementById('slider-executions');
  const executionsValueText = document.getElementById('text-executions-value');
  const zapierCostText = document.getElementById('cost-zapier');
  const makeCostText = document.getElementById('cost-make');
  const fluxCostText = document.getElementById('cost-flux');
  const fluxSelfHostedCostText = document.getElementById('cost-flux-self');
  const totalAnnualSavingsText = document.getElementById('text-annual-savings');

  function calculateSavings(executions) {
    // Formulas approximating standard SaaS pricing tiers
    // Zapier: ~ $0.005 - $0.012 per task at scale
    const zapierPerMonth = Math.round((executions / 1000) * 12 + (executions > 50000 ? 50 : 20));
    // Make: ~ $0.002 - $0.004 per op
    const makePerMonth = Math.round((executions / 1000) * 4.5 + 10);
    // FluxNode Cloud: flat fair tiers
    let fluxCloud = 20;
    if (executions > 100000) fluxCloud = 69;
    else if (executions > 30000) fluxCloud = 45;
    else fluxCloud = 20;

    const selfHosted = 0; // 100% free

    if (zapierCostText) zapierCostText.textContent = `$${zapierPerMonth.toLocaleString()}`;
    if (makeCostText) makeCostText.textContent = `$${makePerMonth.toLocaleString()}`;
    if (fluxCostText) fluxCostText.textContent = `$${fluxCloud.toLocaleString()}`;
    if (fluxSelfHostedCostText) fluxSelfHostedCostText.textContent = `$0`;

    // Annual savings compared to Zapier
    const annualSavings = (zapierPerMonth - fluxCloud) * 12;
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
    // Init with default
    calculateSavings(parseInt(executionsSlider.value, 10));
  }

  // ==========================================
  // 4. Integrations Live Search & Filter
  // ==========================================
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
        p.classList.remove('active', 'bg-indigo-600', 'text-white');
        p.classList.add('bg-slate-800/80', 'text-slate-400');
      });
      pill.classList.add('active', 'bg-indigo-600', 'text-white');
      pill.classList.remove('bg-slate-800/80', 'text-slate-400');
      filterIntegrations();
    });
  });

  // ==========================================
  // 5. Template Filter & Quick Load
  // ==========================================
  const templateFilterBtns = document.querySelectorAll('[data-template-filter]');
  const templateCards = document.querySelectorAll('.template-card');

  templateFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-template-filter');
      templateFilterBtns.forEach((b) => {
        b.classList.remove('bg-indigo-600', 'text-white');
        b.classList.add('bg-slate-800/80', 'text-slate-400');
      });
      btn.classList.add('bg-indigo-600', 'text-white');
      btn.classList.remove('bg-slate-800/80', 'text-slate-400');

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

  // Load Template directly into canvas button
  const loadInCanvasBtns = document.querySelectorAll('[data-load-template]');
  loadInCanvasBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-load-template');
      if (window.FluxCanvas && window.FluxCanvas.loadPreset) {
        window.FluxCanvas.loadPreset(preset);
        window.FluxToast.show('Flujo cargado en el lienzo interactivo', 'success');
      }
    });
  });

  // ==========================================
  // 6. Pricing Toggle (Monthly vs Annual)
  // ==========================================
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

  // ==========================================
  // 7. FAQ Accordion
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const header = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (header && answer) {
      header.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');

        // Close all others
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

  // ==========================================
  // 8. Newsletter / Docker CTA Form
  // ==========================================
  const quickDeployForm = document.getElementById('quick-deploy-form');
  if (quickDeployForm) {
    quickDeployForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = quickDeployForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        window.FluxToast.show('¡Listo! Te enviamos tu token y la guía Docker a ' + emailInput.value, 'success');
        emailInput.value = '';
      }
    });
  }

  // ==========================================
  // 9. Smooth Scroll for Anchor Links
  // ==========================================
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

/**
 * Interactive Featured Work Workflow Simulator
 * Simulates an enterprise DevOps CI/CD and AI verification pipeline.
 */
document.addEventListener('DOMContentLoaded', () => {
  const steps = [
    {
      id: 'validate',
      name: 'Validate',
      summary: 'Deterministic syntax, linting and policy rules run on Terraform IaC and Helm manifests.',
      score: '16 of 16 checks passed: 100%',
      rows: [
        { svc: 'svc-auth-api', status: 'PASSED', target: 'prod-us-east', metric: 'v2.4.1 · Signed' },
        { svc: 'svc-ingress', status: 'PASSED', target: 'prod-eu-west', metric: 'TLS 1.3 · Strict' },
        { svc: 'svc-worker-k8s', status: 'PASSED', target: 'staging-asia', metric: 'HPA 3-15 Pods' },
        { svc: 'svc-telemetry', status: 'PASSED', target: 'prod-us-east', metric: 'Prometheus OTLP' },
        { svc: 'svc-ai-agent', status: 'PASSED', target: 'gpu-cluster-1', metric: 'vLLM · CUDA 12' }
      ]
    },
    {
      id: 'build',
      name: 'Build',
      summary: 'Multi-stage Docker builds with Trivy vulnerability scanning and zero CVE tolerance.',
      score: '5 container images built and signed via Cosign: 100%',
      rows: [
        { svc: 'svc-auth-api', status: 'OPTIMIZED', target: 'ghcr.io/auth', metric: '42 MB · Scratch' },
        { svc: 'svc-ingress', status: 'OPTIMIZED', target: 'ghcr.io/ingress', metric: '28 MB · Alpine' },
        { svc: 'svc-worker-k8s', status: 'OPTIMIZED', target: 'ghcr.io/worker', metric: '64 MB · Distroless' },
        { svc: 'svc-telemetry', status: 'OPTIMIZED', target: 'ghcr.io/telemetry', metric: '35 MB · Go 1.23' },
        { svc: 'svc-ai-agent', status: 'OPTIMIZED', target: 'ghcr.io/ai-agent', metric: '2.1 GB · PyTorch' }
      ]
    },
    {
      id: 'assist',
      name: 'Assist',
      hasLimeDot: true,
      summary: 'AI Security Copilot detects misconfigured IAM roles and suggests least-privilege policies.',
      score: 'AI resolved 3 open security warnings with engineer review approval: 100%',
      rows: [
        { svc: 'svc-auth-api', status: 'RESOLVED', target: 'IAM Least-Priv', metric: 'Scope: ReadOnly' },
        { svc: 'svc-ingress', status: 'RESOLVED', target: 'WAF RateLimit', metric: 'Rate: 100 req/s' },
        { svc: 'svc-worker-k8s', status: 'RESOLVED', target: 'PodSecurity', metric: 'Drop: ALL CAPS' },
        { svc: 'svc-telemetry', status: 'VERIFIED', target: 'TLS Encryption', metric: 'mTLS Enabled' },
        { svc: 'svc-ai-agent', status: 'VERIFIED', target: 'Token Guardrail', metric: 'Prompt Injection Shield' }
      ]
    },
    {
      id: 'deploy',
      name: 'Deploy',
      summary: 'Automated ArgoCD canary deployment with synthetic traffic validation and 0ms downtime.',
      score: 'ArgoCD sync successful across 3 global regions: 100%',
      rows: [
        { svc: 'svc-auth-api', status: 'HEALTHY', target: 'prod-us-east', metric: '42/42 Pods Live' },
        { svc: 'svc-ingress', status: 'HEALTHY', target: 'prod-eu-west', metric: '18/18 Pods Live' },
        { svc: 'svc-worker-k8s', status: 'HEALTHY', target: 'staging-asia', metric: '15/15 Pods Live' },
        { svc: 'svc-telemetry', status: 'HEALTHY', target: 'prod-us-east', metric: '0 Dropped Spans' },
        { svc: 'svc-ai-agent', status: 'HEALTHY', target: 'gpu-cluster-1', metric: 'Latency: 18ms' }
      ]
    }
  ];

  let currentStepIdx = 0;
  let aiAssistanceEnabled = true;

  const tabButtons = document.querySelectorAll('.sim-tab');
  const toggleBtn = document.getElementById('ai-assist-toggle');
  const toggleStatus = document.getElementById('ai-assist-status');
  const tbody = document.getElementById('sim-table-body');
  const feedbackEl = document.getElementById('sim-feedback-text');
  const nextBtn = document.getElementById('sim-next-step-btn');

  function renderStep(idx) {
    currentStepIdx = idx;
    const step = steps[currentStepIdx];

    // Update tab classes
    tabButtons.forEach((btn, i) => {
      if (i === currentStepIdx) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Update table rows
    if (tbody) {
      tbody.innerHTML = '';
      step.rows.forEach((row) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><span style="font-weight: 700;">${row.svc}</span></td>
          <td><span class="status-badge-pass">● ${row.status}</span></td>
          <td><span style="color: rgb(var(--muted));">${row.target}</span></td>
          <td><span>${row.metric}</span></td>
        `;
        tbody.appendChild(tr);
      });
    }

    // Update feedback
    if (feedbackEl) {
      feedbackEl.innerHTML = `<span class="label" style="margin-right: 0.5rem; color: rgb(var(--muted));">Deterministic</span>${step.summary} <strong>${step.score}</strong>`;
    }

    // Update next button label
    if (nextBtn) {
      const nextIdx = (currentStepIdx + 1) % steps.length;
      nextBtn.textContent = `Next: ${steps[nextIdx].name} →`;
    }
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.step, 10);
      renderStep(idx);
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const nextIdx = (currentStepIdx + 1) % steps.length;
      renderStep(nextIdx);
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      aiAssistanceEnabled = !aiAssistanceEnabled;
      if (aiAssistanceEnabled) {
        toggleBtn.classList.remove('off');
        if (toggleStatus) toggleStatus.textContent = 'On';
      } else {
        toggleBtn.classList.add('off');
        if (toggleStatus) toggleStatus.textContent = 'Off';
      }
    });
  }

  // Initial render
  renderStep(0);
});

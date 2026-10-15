/**
 * Interactive Career & Education Gantt Path Timeline
 * Handles timeline bar clicks, step navigation, and active role updates.
 */
document.addEventListener('DOMContentLoaded', () => {
  const timelineEvents = [
    {
      type: 'Study',
      period: '2011 → May 2015',
      title: 'Bachelor of Computer Science (Hons), Systems & Networking',
      organization: 'Universiti Tenaga Nasional',
      desc: 'Foundational computer systems, networking architecture, relational database management, and distributed systems.',
      link: 'about.html#education'
    },
    {
      type: 'Work',
      period: 'Jun 2015 → Nov 2019',
      title: 'IT Consultant',
      organization: 'JMR Consulting Sdn Bhd',
      desc: '4+ years of technical consulting across client database systems, SQL query optimization, 99.9% uptime infrastructure maintenance, and cloud migrations.',
      link: 'experience.html#jmr'
    },
    {
      type: 'Work',
      period: 'Dec 2019 → Jul 2021',
      title: 'Software Engineer',
      organization: 'Academy of Family Physicians of Malaysia',
      desc: 'Developed and launched AIMS online membership and course application platform, automated payment processing, and integrated e-learning modules.',
      link: 'experience.html#afpm'
    },
    {
      type: 'Work',
      period: 'Aug 2021 → Jul 2022',
      title: 'Analyst Programmer',
      organization: 'Credit Guarantee Corporation Malaysia Berhad',
      desc: 'Delivered BIMS loan application workflows in ReactJS, resolved financial defects via PostgreSQL & Oracle SQL, and supported nationwide GFOS guarantee systems.',
      link: 'experience.html#cgc'
    },
    {
      type: 'Work',
      period: 'Aug 2022 → Present',
      title: 'Senior Data Engineer',
      organization: 'PETRONAS',
      desc: 'Architecting Databricks/Delta Lake pipelines, PySpark ML data preparation, RASTER autonomous data enrichment with Schlumberger, and Snowflake cloud warehousing.',
      link: 'experience.html#petronas',
      isCurrent: true
    }
  ];

  let currentIndex = 4; // Default to latest current role (PETRONAS)
  const bars = document.querySelectorAll('.timeline-bar');
  const typeEl = document.getElementById('path-meta-type');
  const titleEl = document.getElementById('path-role-title');
  const orgEl = document.getElementById('path-role-org');
  const linkEl = document.getElementById('path-role-link');
  const counterEl = document.getElementById('path-counter');
  const prevBtn = document.getElementById('path-prev-btn');
  const nextBtn = document.getElementById('path-next-btn');

  function renderEvent(index) {
    if (index < 0 || index >= timelineEvents.length) return;
    currentIndex = index;
    const evt = timelineEvents[currentIndex];

    // Update Bar styles
    bars.forEach((bar) => {
      const barIdx = parseInt(bar.dataset.index, 10);
      if (barIdx === currentIndex) {
        bar.classList.add('active');
      } else {
        bar.classList.remove('active');
      }
    });

    // Update Card details
    if (typeEl) {
      typeEl.innerHTML = `${evt.type} · ${evt.period} ${evt.isCurrent ? '<span style="color: rgb(var(--lime)); margin-left: 0.5rem; font-weight: 700;">● Active</span>' : ''}`;
    }
    if (titleEl) {
      titleEl.textContent = evt.title;
    }
    if (orgEl) {
      orgEl.textContent = `· ${evt.organization}`;
    }
    if (linkEl) {
      linkEl.href = evt.link;
    }
    if (counterEl) {
      counterEl.textContent = `${currentIndex + 1} / ${timelineEvents.length}`;
    }

    // Update Buttons disabled state
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === timelineEvents.length - 1;
  }

  bars.forEach((bar) => {
    bar.addEventListener('click', () => {
      const idx = parseInt(bar.dataset.index, 10);
      renderEvent(idx);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) renderEvent(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < timelineEvents.length - 1) renderEvent(currentIndex + 1);
    });
  }

  // Initial render
  renderEvent(currentIndex);
});

/**
 * Sticky Selected Builds Preview Switcher
 * Dynamically switches sticky preview image and expands details on hover or click.
 */
document.addEventListener('DOMContentLoaded', () => {
  const buildItems = document.querySelectorAll('.build-item');
  const previewImgs = document.querySelectorAll('.preview-img');
  const previewStatus = document.getElementById('preview-status-text');
  const previewLink = document.getElementById('preview-case-link');

  if (!buildItems.length || !previewImgs.length) return;

  const projectDetails = [
    {
      name: 'RASTER AI Enrichment',
      status: 'Active · PETRONAS & Schlumberger',
      link: 'projects.html#raster',
      badge: 'Applied AI / OCR Pipeline'
    },
    {
      name: 'VIRTUS IP on Databricks',
      status: 'Active · Machine Learning Enablement',
      link: 'projects.html#virtus-ip',
      badge: 'Databricks & PySpark'
    },
    {
      name: 'DIC Consolidation Engine',
      status: 'Active · Production ETL',
      link: 'projects.html#dic-platform',
      badge: 'Data Integration & Quality'
    },
    {
      name: 'AIMS Membership System',
      status: 'Delivered · AFPM Platform',
      link: 'projects.html#aims-platform',
      badge: 'Full-Stack Web & Payment'
    }
  ];

  function setActiveBuild(index) {
    // Update build cards
    buildItems.forEach((item, idx) => {
      if (idx === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update sticky preview image
    previewImgs.forEach((img, idx) => {
      if (idx === index) {
        img.classList.add('visible');
      } else {
        img.classList.remove('visible');
      }
    });

    // Update bottom label & link
    if (previewStatus && projectDetails[index]) {
      previewStatus.textContent = `${projectDetails[index].name} · ${projectDetails[index].status}`;
    }
    if (previewLink && projectDetails[index]) {
      previewLink.href = projectDetails[index].link;
    }
  }

  buildItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => setActiveBuild(index));
    item.addEventListener('focusin', () => setActiveBuild(index));
    item.addEventListener('click', () => setActiveBuild(index));
  });

  // Initial state
  setActiveBuild(0);
});

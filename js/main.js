/**
 * Main application script
 * Handles mobile drawer, email copying, toasts, and dynamic year.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('site-menu');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuToggle.textContent = isExpanded ? 'Menu' : 'Close';
      mobileDrawer.classList.toggle('open', !isExpanded);
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close on navigation click
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = 'Menu';
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 2. Email Copy with Toast Notification
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailToast = document.getElementById('email-toast');
  const myEmail = 'hasrulmohamed.hm@gmail.com';

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(myEmail);
        showToast('Email copied to clipboard!');
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = myEmail;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Email copied to clipboard!');
      }
    });
  }

  function showToast(message) {
    if (!emailToast) return;
    emailToast.textContent = message;
    emailToast.classList.add('show');
    setTimeout(() => {
      emailToast.classList.remove('show');
    }, 2800);
  }

  // 3. Dynamic Copyright Year
  const yearEls = document.querySelectorAll('.copyright-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach((el) => {
    el.textContent = currentYear;
  });
});

/**
 * Scramble Text Rotator for Hero Monospace Headline
 * Cycles through specialty phrases with terminal character scrambling.
 */
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);
      this.queue.push({ from, to, start, end });
    }
    
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span style="opacity: 0.6; color: rgb(var(--lime));">${char}</span>`;
      } else {
        output += from;
      }
    }
    
    this.el.innerHTML = output;
    
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const rotatorTarget = document.getElementById('rotator-target');
  if (!rotatorTarget) return;

  const phrases = [
    'DATA PIPELINES & ETL',
    'DATABRICKS & PYSPARK',
    'SNOWFLAKE WAREHOUSING',
    'APPLIED AI/ML WORKFLOWS',
    'APACHE AIRFLOW ORCHESTRATION',
    'CLOUD DATA PLATFORMS'
  ];

  const scrambler = new TextScramble(rotatorTarget);
  let counter = 0;

  const nextPhrase = () => {
    scrambler.setText(phrases[counter]).then(() => {
      setTimeout(nextPhrase, 2400);
    });
    counter = (counter + 1) % phrases.length;
  };

  nextPhrase();
});

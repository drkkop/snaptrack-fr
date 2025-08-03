// script.js

document.addEventListener('DOMContentLoaded', () => {
  /* PAGE 1 */
  if (document.body.classList.contains('page1')) {
    const input = document.getElementById('username');
    const btn = document.getElementById('startBtn');
    const msg = document.querySelector('.validation-msg');
    btn.disabled = true;

    input.addEventListener('input', () => {
      if (input.value.trim().length < 3) {
        btn.disabled = true;
        msg.style.display = 'block';
      } else {
        btn.disabled = false;
        msg.style.display = 'none';
      }
    });

    btn.addEventListener('click', () => {
      const user = encodeURIComponent(input.value.trim());
      window.location.href = `page2.html?user=${user}`;
    });
  }

  /* PAGE 2 */
  if (document.body.classList.contains('page2')) {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user') || 'utilisateur';
    const title = document.querySelector('.loader-title');
    const tip = document.querySelector('.loader-tip');
    const barFill = document.querySelector('.progress-bar-fill');
    const stepsEls = Array.from(document.querySelectorAll('.step'));
    let current = 0;
    let pct = 0;

    title.textContent = `Analyse de @${user}`;

    function run() {
      if (current > 0) {
        stepsEls[current - 1].classList.add('done');
      }
      if (current >= stepsEls.length) {
        barFill.classList.add('done');
        document.querySelector('.loader-subtitle').textContent = 'Données récupérées';
        tip.style.display = 'none';
        setTimeout(() => {
          window.location.href = `page3.html?user=${encodeURIComponent(user)}`;
        }, 500);
        return;
      }

      const step = stepsEls[current];
      step.classList.add('active');
      const targetPct = Math.round(((current + 1) / stepsEls.length) * 100);
      const delta = targetPct - pct;
      const totalDur = 10000 / stepsEls.length;
      const duration = totalDur + Math.random() * 200;
      const interval = duration / (delta || 1);
      let ticks = 0;

      const iv = setInterval(() => {
        pct++;
        barFill.style.width = pct + '%';
        if (++ticks >= delta) clearInterval(iv);
      }, interval);

      setTimeout(() => {
        step.classList.remove('active');
        current++;
        run();
      }, duration);
    }

    run();
  }

  /* PAGE 3 */
  if (document.body.classList.contains('page3')) {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user') || 'utilisateur';
    const userSpan = document.getElementById('userName');
    userSpan.textContent = `@${user}`;

    const unlockBtn = document.getElementById('unlockBtn');
    if (unlockBtn) {
      unlockBtn.addEventListener('click', () => {
        window.location.href = `page4.html?user=${encodeURIComponent(user)}`;
      });
    }

    const blocks = document.querySelectorAll('.reveal-block, .reveal-flip');
    const revealOnScroll = () => {
      blocks.forEach(block => {
        const rect = block.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          block.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
  }

  /* PAGE 4 */
  if (document.body.classList.contains('page4')) {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user') || 'utilisateur';
    const userLine = document.getElementById('userLine');
    if (userLine) {
      userLine.textContent = `Accès complet aux informations de @${user}`;
    }

    // Timer promotion
    let timer = 600; // 10 minutes
    const countdownEl = document.getElementById("countdown");
    if (countdownEl) {
      const updateTimer = () => {
        const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
        const seconds = String(timer % 60).padStart(2, '0');
        countdownEl.textContent = `${minutes}:${seconds}`;
        if (timer > 0) timer--;
        if (timer < 30) countdownEl.parentElement.classList.add("soon");

      };
      setInterval(updateTimer, 1000);
    }

    // Redirection vers page finale après délai
    setTimeout(() => {
      window.location.href = 'final.html';
    }, 6000);
  }
});
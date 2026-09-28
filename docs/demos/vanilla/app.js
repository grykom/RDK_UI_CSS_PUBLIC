const sections = [...document.querySelectorAll('[data-section]')];
for (const section of sections) {
  section.addEventListener('click', () => {
    for (const item of sections) item.setAttribute('aria-pressed', String(item === section));
    document.querySelector('#service-status strong').textContent = `${section.dataset.section} selected`;
    document.querySelector('#service-status p').textContent = 'The selection changed in the Vanilla application.';
  });
}
const progress = document.querySelector('#service-progress');
const percent = document.querySelector('#service-percent');
const display = document.querySelector('#service-display');
document.querySelector('#service-run').addEventListener('click', () => {
  progress.value = Math.min(100, Number(progress.value) + 8);
  percent.value = `${progress.value}%`;
  display.textContent = progress.value === 100 ? 'COMPLETE' : 'READY 94';
  document.querySelector('#service-status strong').textContent = 'Readout refreshed';
  document.querySelector('#service-status p').textContent = `Calibration: ${progress.value}%.`;
});
document.querySelector('#service-reset').addEventListener('click', () => {
  progress.value = 0;
  percent.value = '0%';
  display.textContent = 'RESET 00';
  document.querySelector('#service-status strong').textContent = 'Reset complete';
  document.querySelector('#service-status p').textContent = 'Calibration is waiting for a new reading.';
});

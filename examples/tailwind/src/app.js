document.querySelector('#station-refresh').addEventListener('click', () => {
  const progress = document.querySelector('#station-progress');
  progress.value = Math.min(100, Number(progress.value) + 6);
  document.querySelector('#station-percent').value = `${progress.value}%`;
  document.querySelector('#station-display').textContent = progress.value === 100 ? 'COMPLETE' : 'READY 94';
  document.querySelector('#report-title').textContent = 'Odczyt odświeżony';
  document.querySelector('#report-copy').textContent = `Kalibracja: ${progress.value}%.`;
});

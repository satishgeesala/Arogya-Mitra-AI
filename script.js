const voiceBtn = document.getElementById('voiceBtn');
const analyzeBtn = document.getElementById('analyzeBtn');
const symptomInput = document.getElementById('symptomInput');
const resultBox = document.getElementById('result');
const langSelector = document.getElementById('lang');

let recognition = null;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'en-IN';
  recognition.onresult = (e) => {
    symptomInput.value = e.results[0][0].transcript;
  };
}

voiceBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  if (!recognition) {
    alert('Speech recognition not supported. Use Chrome.');
    return;
  }
  recognition.lang = langSelector.value;
  recognition.start();
});

analyzeBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  const text = symptomInput.value.trim().toLowerCase();
  if (!text) {
    alert('Please enter symptoms first.');
    return;
  }
  resultBox.classList.remove('d-none', 'alert-info', 'alert-danger');
  resultBox.textContent = 'Analyzing...';

  setTimeout(() => {
    const emergencies = ['chest pain', 'severe pain', 'bleeding', 'unconscious', 'fainting', 'breathless', 'trouble breathing', 'heart pain'];
    let isEmergency = emergencies.some(keyword => text.includes(keyword));
    if (isEmergency) {
      resultBox.classList.add('alert-danger');
      resultBox.textContent = '⚠️ Possible Emergency! Please seek immediate medical attention or call local emergency services.';
    } else {
      resultBox.classList.add('alert-info');
      resultBox.textContent = 'General advice: Rest, stay hydrated, and monitor your condition. Seek care if symptoms persist.';
    }
  }, 800);
});

const minSlider = document.getElementById('min-slider');
const maxSlider = document.getElementById('max-slider');
const minValue = document.getElementById('min-value');
const maxValue = document.getElementById('max-value');
const sliderRange = document.getElementById('slider-range');
const container = document.getElementById('slider-container');
const minInput = document.getElementById('min-input');
const maxInput = document.getElementById('max-input');

// Criar handles
const minHandle = document.createElement('div');
minHandle.className = 'slider-handle';
const maxHandle = document.createElement('div');
maxHandle.className = 'slider-handle';
container.appendChild(minHandle);
container.appendChild(maxHandle);

function updateSlider() {
  let min = parseInt(minSlider.value);
  let max = parseInt(maxSlider.value);

  if (min > max) {
    [min, max] = [max, min];
    minSlider.value = min;
    maxSlider.value = max;
  }

  minValue.textContent = min;
  maxValue.textContent = max;
  minInput.value = min;
  maxInput.value = max;

  const minPercent = (min / 100) * 100;
  const maxPercent = (max / 100) * 100;

  sliderRange.style.left = `${minPercent}%`;
  sliderRange.style.width = `${maxPercent - minPercent}%`;

  minHandle.style.left = `${minPercent}%`;
  maxHandle.style.left = `${maxPercent}%`;
}

function updateFromInput() {
  let min = parseInt(minInput.value);
  let max = parseInt(maxInput.value);

  min = Math.max(0, Math.min(min, 100));
  max = Math.max(0, Math.min(max, 100));

  if (min > max) {
    [min, max] = [max, min];
  }

  minSlider.value = min;
  maxSlider.value = max;
  minInput.value = min;
  maxInput.value = max;

  updateSlider();
}

minSlider.addEventListener('input', updateSlider);
maxSlider.addEventListener('input', updateSlider);
minInput.addEventListener('change', updateFromInput);
maxInput.addEventListener('change', updateFromInput);

updateSlider();
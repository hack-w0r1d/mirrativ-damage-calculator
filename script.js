const normalForm = document.querySelector('#normal-form');
const poisonForm = document.querySelector('#poison-form');
const normalResult = document.querySelector('#normal-result');
const poisonResult = document.querySelector('#poison-result');
const normalError = document.querySelector('#normal-error');
const poisonError = document.querySelector('#poison-error');
const attackInput = document.querySelector('#attack');
const defenseInput = document.querySelector('#defense');
const hpInput = document.querySelector('#hp');

function calculateNormalDamage(attack, defense) {
  const baseDamage = attack / 2 - defense / 4;
  return {
    min: Math.max(1, Math.floor(baseDamage * 0.82)),
    max: Math.max(1, Math.floor(baseDamage * 1.15)),
  };
}

function isValidStat(value) {
  return Number.isInteger(value) && value >= 0;
}

function showResult(panel, value, detail) {
  panel.querySelector('.result-value').innerHTML = `${value}<small>ダメージ</small>`;
  panel.querySelector('.result-value').classList.remove('empty-result');
  panel.querySelector('.result-detail').textContent = detail;
}

function showPlaceholder(panel, message, detail) {
  panel.querySelector('.result-value').innerHTML = `<span>${message}</span>`;
  panel.querySelector('.result-value').classList.add('empty-result');
  panel.querySelector('.result-detail').textContent = detail;
}

function updateNormalDamage() {
  if (attackInput.value === '' || defenseInput.value === '') {
    normalError.textContent = '';
    showPlaceholder(normalResult, '攻撃力と守備力を入力してください', '想定されるダメージ幅を表示します。');
    return;
  }

  const attack = Number(attackInput.value);
  const defense = Number(defenseInput.value);
  if (!isValidStat(attack) || !isValidStat(defense)) {
    normalError.textContent = '攻撃力・守備力には 0 以上の整数を入力してください。';
    return;
  }

  normalError.textContent = '';
  const { min, max } = calculateNormalDamage(attack, defense);
  showResult(normalResult, min === max ? `${min}` : `${min} 〜 ${max}`, '想定されるダメージ幅です。');
}

function updatePoisonDamage() {
  if (hpInput.value === '') {
    poisonError.textContent = '';
    showPlaceholder(poisonResult, '対象の 最大HP を入力してください', '想定される毒ダメージを表示します。');
    return;
  }

  const hp = Number(hpInput.value);
  if (!isValidStat(hp)) {
    poisonError.textContent = '対象の 最大HP には 0 以上の整数を入力してください。';
    return;
  }

  poisonError.textContent = '';
  showResult(poisonResult, `${Math.max(1, Math.floor(hp / 6))}`, '想定される毒ダメージです。');
}

normalForm.addEventListener('submit', (event) => event.preventDefault());
poisonForm.addEventListener('submit', (event) => event.preventDefault());
attackInput.addEventListener('input', updateNormalDamage);
defenseInput.addEventListener('input', updateNormalDamage);
hpInput.addEventListener('input', updatePoisonDamage);

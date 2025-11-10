const billInput = document.getElementById('billInput');
const tipBtn = Array.from(document.querySelectorAll('.tip-btn'));
const customTip = document.getElementById('customTip');
const peopleInput = document.getElementById('peopleInput');
const tipPerPerson = document.getElementById('tipPerPerson');
const totalPerPerson = document.getElementById('totalPerPerson');
const resetBtn = document.getElementById('resetBtn');
const errorPeople = document.getElementById('errorPeople');

const state = {
  bill: 0,
  tipPercent: 0,
  people: 1,
  dirty: false,
};

function parseInput(value) {
  if (typeof value === "number") return value; 
  const trimmed = String(value).trim();
  if (trimmed === '') return NaN;
  const normalized = trimmed.replace(/,/g, '');
  return parseFloat(normalized);
}

const currencyFormatter = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
function formatCurrency(amount) {
  if (!Number.isFinite(amount)) return '$0.00';
  return '$' + currencyFormatter.format(amount);
}

function validateInputs(bill, tipPercent, people) {
  const errors = {};
  if (!Number.isFinite(bill) || bill < 0) {
    errors.bill = 'Invalid bill';
  }
  if (!Number.isFinite(tipPercent) || tipPercent < 0) {
    errors.tip = 'Invalid tip';
  }
  if (!Number.isFinite(people) || people < 0) {
    errors.people = "Can't be zero";
  }
  return { ok: Object.keys(errors).length === 0, errors };
}

function getActiveTipPercent() {
  const activeBtn = tipBtn.find(btn => btn.classList.contains('active'));
  if (activeBtn) {
    const v = parseInput(activeBtn.dataset.tip);
    return Number.isFinite(v) ? v : 0;
  }
  const custom = parseInput(customTip.value);
  return Number.isFinite(custom) && custom >= 0 ? custom : 0;
}

function clearTipButtonActive() {
  tipBtn.forEach(btn => btn.classList.remove('active'));
}

function calculateTipPerPerson(bill, tipPercent, people) {
  const tipTotal = bill * (tipPercent / 100);
  const tipPerPerson = tipTotal / people;
  const totalPerPerson = (bill + tipTotal) / people;
  return { tipPerPerson, totalPerPerson };
}

function updateUI(results = { tipPerPerson: 0, totalPerPerson: 0 }, valid = true) {
  if (!valid) {
    tipPerPerson.textContent = '$0.00';
    totalPerPerson.textContent = '$0.00';
  } else {
    tipPerPerson.textContent = formatCurrency(results.tipPerPerson);
    totalPerPerson.textContent = formatCurrency(results.totalPerPerson);
  }

  resetBtn.disabled = !state.dirty;
}

function showValidationErrors(errors) {
  if (errors && errors.people) {
    errorPeople.textContent = errors.people;
    errorPeople.classList.remove('hidden');
    peopleInput.classList.add('ring-red-400', 'ring-2');
  } else {
    errorPeople.classList.add('hidden');
    peopleInput.classList.remove('ring-red-400', 'ring-2');
  }
}

function handleInputChange() {
  const bill = parseInput(billInput.value);
  const people = parseInput(peopleInput.value);
  const tipPercent = getActiveTipPercent();

  state.dirty = (
    (Number.isFinite(bill) && bill !== 0) ||
    (Number.isFinite(tipPercent) && tipPercent !== 0) ||
    (Number.isFinite(people) && people !== 1)
  );

  const validation = validateInputs(bill, tipPercent, people);
  showValidationErrors(validation.errors);
  if (!validation.ok) {
    updateUI({ tipPerPerson: 0, totalPerPerson: 0 }, false);
    return;
  }

  const { tipPerPerson, totalPerPerson } = calculateTipPerPerson(bill, tipPercent, people);

  updateUI({ tipPerPerson, totalPerPerson }, true);
}

function handleTipButtonClick(event) {
  const btn = event.currentTarget;
  clearTipButtonActive();
  btn.classList.add('active');
  customTip.value = '';
  handleInputChange();
}

function handleCustomTipInput() {
  clearTipButtonActive();
  handleInputChange();
}

function handlePeopleInput() {
  handleInputChange();
}

function resetAll() {
  billInput.value = '';
  customTip.value = '';
  peopleInput.value = 1;

  clearTipButtonActive();
  showValidationErrors({});

  state.bill = 0;
  state.tipPercent = 0;
  state.people = 1;
  state.dirty = false;
  
  updateUI({ tipPerPerson :0, totalPerPerson: 0 }, false);
}

function init() {
  tipBtn.forEach(btn => btn.addEventListener('click', handleTipButtonClick));

  customTip.addEventListener('input', handleCustomTipInput);

  billInput.addEventListener('input', handleInputChange);
  peopleInput.addEventListener('input', handlePeopleInput);

  resetBtn.addEventListener('click', resetAll);

  peopleInput.value = '1';
  updateUI({ tipPerPerson :0, totalPerPerson: 0 }, false);

  [billInput, customTip, peopleInput].forEach(inp => {
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'e' || e.key === 'E') e.preventDefault();
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
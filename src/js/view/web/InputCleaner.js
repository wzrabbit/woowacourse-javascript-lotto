import { $, $$ } from '../../util/web/querySelector.js';

const InputCleaner = {
  budgetInputs: [$('#budget-input')],
  winningLottoInputs: [...$$('.winning-number-input'), $('.bonus-number-input')],

  clearAllInputs() {
    [...this.budgetInputs, ...this.winningLottoInputs].forEach((currentInput) => {
      currentInput.value = '';
    });
  },

  clearWinningLottoInputs() {
    this.winningLottoInputs.forEach((currentInput) => {
      currentInput.value = '';
    });
  },
};

export default InputCleaner;

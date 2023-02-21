import { $ } from './util/querySelector.js';
import PurchaseView from './view/PurchaseView.js';
import WinningLottoInputView from './view/WinningLottoInputView.js';
import ResultModalView from './view/ResultModalView.js';
import InputCleaner from './view/InputCleaner.js';
import ErrorView from './view/ErrorView.js';
import LottoGame from './domain/LottoGame.js';
import validator from './domain/validator.js';

class LottoController {
  #lottoGame;
  #purchaseView = new PurchaseView((budget) => this.handleBudget(budget));
  #winningLottoInputView = new WinningLottoInputView((winningLotto) =>
    this.handleWinningLotto(winningLotto)
  );
  #resultModalView = new ResultModalView(() => this.handleRestart());

  handleBudget(budget) {
    const budgetErrorView = new ErrorView($('#buyErrorArea'), $('#budgetInput'));

    try {
      validator.throwErrorIfInvalidBudget(budget);
      budgetErrorView.hideErrorMessage();
      this.#lottoGame = new LottoGame(budget);
      this.#purchaseView.render(this.#lottoGame.getBoughtLottos());
      this.#winningLottoInputView.show();
    } catch ({ message }) {
      budgetErrorView.renderErrorMessage(message);
    }
  }

  handleWinningLotto(lottoFormData) {
    const winningLottoErrorView = new ErrorView(
      $('#winningNumbersErrorArea'),
      $('#firstNumberInput')
    );

    const winningLotto = this.#parseWinningLotto(lottoFormData);
    const bonusNumber = this.#parseBonusNumber(lottoFormData);
    console.log({ l: winningLotto, b: bonusNumber });

    try {
      validator.throwErrorIfInvalidWinningLotto(winningLotto);
      validator.throwErrorIfInvalidBonusNumber(bonusNumber);
      winningLottoErrorView.hideErrorMessage();
      this.#showLottoGameResult(winningLotto, bonusNumber);
    } catch ({ message }) {
      winningLottoErrorView.renderErrorMessage(message);
    }
  }

  #parseWinningLotto(lottoFormData) {
    const winningLottos = [];

    Array.from({ length: 6 }).forEach((_, index) => {
      winningLottos.push(Number(lottoFormData[`number-${index + 1}`]));
    });

    return winningLottos;
  }

  #parseBonusNumber(lottoFormData) {
    return Number(lottoFormData['bonus-number']);
  }

  #showLottoGameResult(winningLotto, bonusNumber) {
    const winningStatus = this.#lottoGame.getWinningStatus(winningLotto, bonusNumber);
    const profitRate = this.#lottoGame.getProfitRate();
    this.#resultModalView.displayResult(winningStatus, profitRate);
  }

  handleRestart() {
    this.#lottoGame = new LottoGame();
    this.#purchaseView.clear();
    this.#winningLottoInputView.hide();
    this.#resultModalView.hide();
    InputCleaner.clearAllInputs();
  }
}

export default LottoController;

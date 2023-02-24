import { $ } from '../../util/web/querySelector.js';
import getFormData from '../../util/web/getFormData.js';
import lottoIcon from '../../../images/lotto_icon.png';

class PurchaseView {
  #submitBudget;

  constructor(controllerFunction) {
    this.#submitBudget = controllerFunction;
    this.#setListener();
  }

  clear() {
    $('#purchased-lotto-count').innerText = '';
    $('#purchased-lotto-list').innerHTML = '';
  }

  render(lottos) {
    this.clear();
    this.#renderLottoCount(lottos.length);
    this.#renderPurchasedLottoList(lottos);
  }

  #setListener() {
    $('#buy-button').addEventListener('click', (event) => {
      event.preventDefault();

      const budget = getFormData($('#budget-input-form')).budget;
      const trimmedBudget = Number(budget);

      this.#submitBudget(trimmedBudget);
    });
  }

  #renderLottoCount(lottoCount) {
    $('#purchased-lotto-count').innerText = `총 ${lottoCount}개를 구매했습니다.`;
  }

  #renderPurchasedLottoList(lottos) {
    lottos.forEach((currentLotto) => {
      $('#purchased-lotto-list').insertAdjacentHTML(
        'beforeend',
        this.#getLottoInformationComponent(currentLotto)
      );
    });
  }

  #getLottoInformationComponent(currentLotto) {
    return `
      <div class="purchased-lotto">
        <img class="lotto-icon" src="${lottoIcon}" />
        <div class="lotto-numbers">${currentLotto.join(', ')}</div>
      </div>`;
  }
}

export default PurchaseView;

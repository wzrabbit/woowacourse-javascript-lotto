import { $ } from '../../util/web/querySelector.js';
import getFormData from '../../util/web/getFormData.js';

class WinningLottoInputView {
  #submitWinningLotto;

  constructor(controllerFunction) {
    this.#submitWinningLotto = controllerFunction;
    this.#setListener();
  }

  show() {
    $('#winning-lotto-input-menu').classList.remove('hidden');
  }

  hide() {
    $('#winning-lotto-input-menu').classList.add('hidden');
  }

  #setListener() {
    $('#result-button').addEventListener('click', (event) => {
      event.preventDefault();

      const formData = getFormData($('#winning-lotto-input-form'));
      this.#submitWinningLotto(formData);
    });
  }
}

export default WinningLottoInputView;

import { $ } from '../../util/web/querySelector.js';
import { GAME_VALUE } from '../../constants/index.js';

class ResultModalView {
  #submitRestart;

  constructor(controllerFunction) {
    this.#submitRestart = controllerFunction;
    this.#setListeners();
  }

  displayResult(gameData, rate) {
    this.show();
    this.#displayPrizeResult(gameData);
    this.#displayRateResult(rate);
  }

  show() {
    $('#result-modal').classList.remove('hidden');
  }

  hide() {
    $('#result-modal').classList.add('hidden');
  }

  #displayPrizeResult(gameData) {
    ['fifth', 'fourth', 'third', 'second', 'first'].forEach((rank, index) => {
      const currentIndex = 4 - index;
      $(`#${rank}-prize-money`).innerText = (
        gameData[rank] * GAME_VALUE.PRIZE[currentIndex]
      ).toLocaleString();
      $(`#${rank}-prize-count`).innerText = gameData[rank];
    });
  }

  #displayRateResult(rate) {
    $('#rate-result').innerText = `당신의 총 수익률은 ${rate.toLocaleString()} %입니다.`;
  }

  #setListeners() {
    $('#modal-background').addEventListener('click', () => {
      this.hide();
    });

    $('#modal-close-button').addEventListener('click', () => {
      this.hide();
    });

    $('#restart-button').addEventListener('click', () => {
      this.hide();
      this.#submitRestart();
    });
  }
}

export default ResultModalView;

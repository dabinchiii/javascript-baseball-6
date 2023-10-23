import { Console, Random } from "@woowacourse/mission-utils";
import MESSAGE from "./message.js";
import ERROR from "./error.js";

class Game {
  computerNums = [];

  start = async () => {
    Console.print(MESSAGE.GAME_START);
    do {
      await this.playRound();
    } while (await this.checkPlayAgain());
  };

  playRound = async () => {
    this.setComputerNums();
    //console.log("computer: ", this.computerNums);

    while (true) {
      const userNums = await this.getUserNums();

      const result = this.checkResult(userNums);
      const resultStr = this.getResultStr(result);
      Console.print(resultStr);

      if (result.strike === 3) {
        Console.print(MESSAGE.SUCCESS);
        break;
      }
    }
  };

  // 컴퓨터가 임의의 수를 선택하고 저장하는 메소드
  setComputerNums = () => {
    const computer = [];
    while (computer.length < 3) {
      const number = Random.pickNumberInRange(1, 9);
      if (!computer.includes(number)) {
        computer.push(number);
      }
    }
    this.computerNums = computer;
  };

  // 사용자의 입력을 받는 메소드
  getUserNums = async () => {
    const input = await Console.readLineAsync(MESSAGE.PROMPT.USER_NUMS);
    if (!this.isUserNumsInputValid(input)) {
      throw new Error(ERROR.MESSAGE.INVALID_INPUT);
    }
    const userNums = input.split("").map(Number);
    return userNums;
  };

  // 사용자의 입력이 유효한지 검사하는 메소드
  isUserNumsInputValid = (input) => {
    let isValid = true;
    const reg = /^[0-9]{3}$/;
    if (!reg.test(input)) {
      // 입력에 숫자가 아닌 문자가 포함된 경우
      isValid = false;
    } else if (new Set(input).size !== 3) {
      // 입력에 같은 문자가 포함된 경우
      isValid = false;
    }
    return isValid;
  };

  // computerNums와 userNums를 비교하여 스트라이크, 볼 개수를 반환하는 메소드
  checkResult = (userNums) => {
    const result = {
      strike: 0,
      ball: 0,
    };

    userNums.forEach((num, index) => {
      if (num === this.computerNums[index]) {
        result.strike++;
      } else if (this.computerNums.includes(num)) {
        result.ball++;
      }
    });
    return result;
  };

  // 스트라이크, 볼 개수로 구성된 객체를 문자열로 변환하는 메소드
  getResultStr = (result) => {
    if (result.strike === 0 && result.ball === 0) {
      return MESSAGE.RESULT.NOTHING;
    } else if (result.strike === 0) {
      return `${result.ball}${MESSAGE.RESULT.BALL}`;
    } else if (result.ball === 0) {
      return `${result.strike}${MESSAGE.RESULT.STRIKE}`;
    } else {
      return `${result.ball}${MESSAGE.RESULT.BALL} ${result.strike}${MESSAGE.RESULT.STRIKE}`;
    }
  };

  // 게임 재시작 여부를 입력받는 메소드
  checkPlayAgain = async () => {
    const input = await Console.readLineAsync(MESSAGE.PROMPT.RESTART_GAME);
    if (!this.isPlayAgainInputValid(input)) {
      throw new Error(ERROR.MESSAGE.INVALID_INPUT);
    }
    const inputNum = Number(input);
    return inputNum === 1;
  };

  // 게임 재시작 여부의 입력값이 유효한지 검사하는 메소드
  isPlayAgainInputValid = (input) => {
    if (input === "1" || input === "2") {
      return true;
    }
    return false;
  };
}

export default Game;

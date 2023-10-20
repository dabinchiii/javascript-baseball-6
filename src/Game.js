import { Console, Random } from "@woowacourse/mission-utils";
class Game {
  computerNums = [];

  start = () => {
    Console.print("숫자 야구 게임을 시작합니다.");
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
        Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
        break;
      }
    }
  };
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
  getUserNums = async () => {
    try {
      const input = await Console.readLineAsync("숫자를 입력해주세요 : ");
      const userNums = input.split("").map(Number);
      return userNums;
    } catch (err) {
      console.log(err);
    }
  };
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
  getResultStr = (result) => {
    if (result.strike === 0 && result.ball === 0) {
      return "낫싱";
    } else if (result.strike === 0) {
      return `${result.ball}볼`;
    } else if (result.ball === 0) {
      return `${result.strike}스트라이크`;
    } else {
      return `${result.ball}볼 ${result.strike}스트라이크`;
    }
  };
  checkPlayAgain = async () => {
    try {
      const input = await Console.readLineAsync(
        "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n"
      );

      const inputNum = Number(input);
      return inputNum === 1;
    } catch (error) {
      console.log(error);
    }
  };
}

export default Game;

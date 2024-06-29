document.addEventListener("DOMContentLoaded", function () {
  const choices = ["rock", "paper", "scissors"];
  const buttons = document.querySelectorAll("button");
  const resultText = document.getElementById("result");
  const scoreText = document.getElementById("score");

  let userScore = 0;
  let computerScore = 0;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const userChoice = button.id;
      const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];
      const result = determineWinner(userChoice, computerChoice);

      updateScore(result);
      displayResult(result, userChoice, computerChoice);
      displayScore();
    });
  });

  function determineWinner(user, computer) {
    if (user === computer) {
      return "draw";
    }
    if (
      (user === "rock" && computer === "scissors") ||
      (user === "paper" && computer === "rock") ||
      (user === "scissors" && computer === "paper")
    ) {
      return "win";
    }
    return "lose";
  }

  function updateScore(result) {
    if (result === "win") {
      userScore++;
    } else if (result === "lose") {
      computerScore++;
    }
  }

  function displayResult(result, userChoice, computerChoice) {
    if (result === "win") {
      resultText.textContent = `You win! ${userChoice} beats ${computerChoice}.`;
      resultText.className = "text-green-500";
    } else if (result === "lose") {
      resultText.textContent = `You lose! ${computerChoice} beats ${userChoice}.`;
      resultText.className = "text-red-500";
    } else {
      resultText.textContent = `It's a draw! You both chose ${userChoice}.`;
      resultText.className = "text-gray-500";
    }
  }

  function displayScore() {
    scoreText.textContent = `Score - You: ${userScore} | Computer: ${computerScore}`;
  }
});

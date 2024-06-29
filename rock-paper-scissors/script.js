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

    switch (user) {
      case "rock":
        return computer === "scissors" ? "win" : "lose";
      case "paper":
        return computer === "rock" ? "win" : "lose";
      case "scissors":
        return computer === "paper" ? "win" : "lose";
    }
  }

  function updateScore(result) {
    switch (result) {
      case "win":
        userScore++;
        break;
      case "lose":
        computerScore++;
        break;
      // 'draw' case does not affect the score
    }
  }

  function displayResult(result, userChoice, computerChoice) {
    switch (result) {
      case "win":
        resultText.textContent = `You win! ${userChoice} beats ${computerChoice}.`;
        resultText.className = "text-green-500";
        break;
      case "lose":
        resultText.textContent = `You lose! ${computerChoice} beats ${userChoice}.`;
        resultText.className = "text-red-500";
        break;
      case "draw":
        resultText.textContent = `It's a draw! You both chose ${userChoice}.`;
        resultText.className = "text-gray-500";
        break;
    }
  }

  function displayScore() {
    scoreText.textContent = `Score - You: ${userScore} | Computer: ${computerScore}`;
  }
});

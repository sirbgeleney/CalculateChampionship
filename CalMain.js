  document.getElementById("calculateButton").addEventListener("click", calculateChampionship);

function calculateChampionship() {
  const racesCompleted = parseInt(document.getElementById("racesCompleted").value);
  const totalRaces = parseInt(document.getElementById("totalRaces").value);

  const teams = {};

  // Leading Team
  const leadingTeamName = document.getElementById("leadingTeamName").value;
  const leadingTeamPoints = parseInt(document.getElementById("leadingTeamPoints").value);
  teams[leadingTeamName] = leadingTeamPoints;

  // Chasing Teams (Team 2 to Team 16)
  for (let i = 2; i <= 16; i++) {
    const teamName = document.getElementById(`chasingTeamName${i}`).value;
    const points = document.getElementById(`chasingTeamPoints${i}`).value;

    if (teamName && points) {
      teams[teamName] = parseInt(points);
    }
  }

  // Check if all required information is provided
  const resultElement = document.getElementById("result");
  if (Object.keys(teams).length < 2) {
    resultElement.textContent = "Please provide information for at least two teams.";
    return;
  }

// Calculate the maximum possible points for each team
const maxPoints = {};
for (const team in teams) {
  const remainingRaces = totalRaces - racesCompleted;
  const maxPossiblePoints = remainingRaces * 44; // 25 points for 1st place + 18 points for 2nd place + 1 point for fastest lap
  maxPoints[team] = teams[team] + maxPossiblePoints;
}

const chasingTeamName2 = document.getElementById("chasingTeamName2").value;
const chasingTeamPoints2 = parseInt(document.getElementById("chasingTeamPoints2").value);
const winDiff = leadingTeamPoints - chasingTeamPoints2;


// Check if the leading team has mathematically won the championship
const leadingTeamMaxPoints = maxPoints[leadingTeamName];

const chasingTeamName = "chasingTeamName2"; // Change this based on the specific team you are checking
const chasingTeamMaxPoints = maxPoints[chasingTeamName];

const resultMessage = (leadingTeamMaxPoints > chasingTeamMaxPoints)
  ? `Congratulations! ${leadingTeamName} has mathematically won the championship with a total of ${leadingTeamPoints} points, ${winDiff} more than the maximum possible points of ${chasingTeamName}.`
  : `${leadingTeamName} has not mathematically won the championship yet as the maximum possible points for ${chasingTeamName} (${chasingTeamMaxPoints}) surpasses ${leadingTeamName}'s current total of ${leadingTeamPoints} points.`;

document.getElementById('announcement').textContent = resultMessage;}

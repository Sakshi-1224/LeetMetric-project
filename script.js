const searchButton = document.getElementById("search-btn");
const usernameInput = document.getElementById("user-input");
const statsContainer = document.querySelector(".stats-container");
const easyProgressCircle = document.querySelector(".easy-progress");
const mediumProgressCircle = document.querySelector(".medium-progress");
const hardProgressCircle = document.querySelector(".hard-progress");
const easyLabel = document.getElementById("easy-label");
const mediumLabel = document.getElementById("medium-label");
const hardLabel = document.getElementById("hard-label");
const cardStatsContainer = document.querySelector(".stats-cards");
const acceptance= document.getElementById("acceptance");
const totalque= document.getElementById("totalque");
const ranking = document.getElementById("ranking");

function validateUsername(username) {
    if(username.trim() === "") {
        alert("Username should not be empty");
        return false;
    }
    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    const isMatching = regex.test(username);
    if(!isMatching) {
        alert("Invalid Username");
    }
    return isMatching;
}

async function fetchUserDetails(username) {

    try{
        searchButton.textContent = "Searching...";
        searchButton.disabled = true;
        const url=`https://leetcode-stats-api.herokuapp.com/${username}`;
        const userdata=await fetch(url);
        let user_data = await userdata.json();
        console.log(user_data);
        
        easyLabel.textContent = `${user_data.easySolved}/${user_data.totalEasy}`;
        let solved = user_data.easySolved; // Use numbers directly instead of strings for calculations
        let total = user_data.totalEasy;
        let progressDegree = (solved / total) * 100;
        easyProgressCircle.style.setProperty("--progress-degree", `${progressDegree}%`);
        
        // Update Medium Progress
        mediumLabel.textContent = `${user_data.mediumSolved}/${user_data.totalMedium}`;
        solved = user_data.mediumSolved;
        total = user_data.totalMedium;
        progressDegree = (solved / total) * 100;
        mediumProgressCircle.style.setProperty("--progress-degree", `${progressDegree}%`);
        
        // Update Hard Progress
        hardLabel.textContent = `${user_data.hardSolved}/${user_data.totalHard}`;
        solved = user_data.hardSolved;
        total = user_data.totalHard;
        progressDegree = (solved / total) * 100;
        hardProgressCircle.style.setProperty("--progress-degree", `${progressDegree}%`);
        
        acceptance.textContent=` Acceptance Rate-: ${user_data.acceptanceRate}`;
        totalque.textContent=`Total Questions Solved-: ${user_data.totalSolved}/${user_data.totalQuestions}`;
        ranking.textContent=`Ranking-: ${user_data.ranking}`;
            
    }
    catch(error) {
        statsContainer.innerHTML = `<p>${error.message}</p>`
    }
    finally {
        searchButton.textContent = "Search";
        searchButton.disabled = false;
    }
}

searchButton.addEventListener('click',function(event){
    const username = usernameInput.value;
    console.log("logggin username: ", username);
    if(validateUsername(username)) {
        fetchUserDetails(username);
    }
});
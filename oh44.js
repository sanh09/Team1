
const flowers = [
    { name: "철쭉", meaning: "사랑의 즐거움", image: "철쭉.jpg" },
    { name: "개나리", meaning: "희망", image: "개나리.jpg" },
    { name: "백목련", meaning: "이루지 못한 사랑", image: "백목련.jpg" },
    { name: "백일홍", meaning: "행복", image: "백일홍.jpg" },
    { name: "장미", meaning: "사랑", image: "장미.jpg" },
    { name: "참꽃", meaning: "다정", image: "참꽃.jpg" },
];


const flowerContainer = document.getElementById("flower-container"); 
const flowerInfo = document.getElementById("flower-info"); 
const giftForm = document.getElementById("gift-form"); 
const messageDiv = document.getElementById("message"); 
const flowerNameSpan = document.getElementById("flower-name"); 
const flowerMeaningSpan = document.getElementById("flower-meaning"); 
const recipientInput = document.getElementById("recipient-name"); 
const completionMessage = document.getElementById("completion-message"); 
function generateRandomFlowers() {
    const selectedFlowers = []; 
    while (selectedFlowers.length < 6) {
        const randomIndex = Math.floor(Math.random() * flowers.length); 
        if (!selectedFlowers.includes(flowers[randomIndex])) { 
            selectedFlowers.push(flowers[randomIndex]);
        }
    }

    flowerContainer.innerHTML = ""; 
    selectedFlowers.forEach((flower) => {
        const flowerDiv = document.createElement("div");
        flowerDiv.classList.add("flower");
        flowerDiv.innerHTML = `
            <img src="${flower.image}" alt="${flower.name}" style="width:100%; height:80px;"> <!-- 꽃 이미지 -->
            <p>${flower.name}</p> <!-- 꽃 이름 -->
            <p class="flower-meaning">${flower.meaning}</p> <!-- 꽃말 -->
        `;
        flowerDiv.addEventListener("click", () => selectFlower(flower)); 
        flowerContainer.appendChild(flowerDiv); 
    });
}


document.getElementById("next-flower").addEventListener("click", function () {
    const nextContainer = document.querySelectorAll(".container")[1]; 
    if (nextContainer) {
        nextContainer.classList.remove("hidden"); 
        const flowerContainer = document.getElementById("flower-container");
        flowerContainer.classList.add("hover-enabled"); 
        nextContainer.scrollIntoView({ behavior: "smooth" }); 
    } else {
        console.error("다음 컨테이너를 찾을 수 없습니다."); 
    }
});


function selectFlower(flower) {
    flowerInfo.classList.remove("hidden"); 
    giftForm.classList.add("hidden"); 
    messageDiv.classList.add("hidden"); 
    flowerNameSpan.textContent = flower.name; 
    flowerMeaningSpan.textContent = flower.meaning; 
    document.getElementById("gift-button").onclick = () => showGiftForm(flower); 
}


function showGiftForm(flower) {
    giftForm.classList.remove("hidden"); 
    flowerInfo.classList.add("hidden");
    messageDiv.classList.add("hidden"); 
}

document.getElementById("submit-gift").addEventListener("click", () => {
    const recipient = recipientInput.value.trim(); 
    const flowerName = flowerNameSpan.textContent; 
    const flowerMeaning = flowerMeaningSpan.textContent; 

    if (!recipient) { 
        alert("선물할 사람의 이름을 입력해주세요!");
        return;
    }

    const confirmation = confirm(`${recipient}에게 ${flowerName}(${flowerMeaning})를 선물하시겠습니까?`);
    if (!confirmation) {
        return; 
    }

    completionMessage.textContent = `${recipient}에게 ${flowerName}(${flowerMeaning})를 선물했습니다!`; 
    messageDiv.classList.remove("hidden");
    giftForm.classList.add("hidden"); 
    recipientInput.value = ""; 
});


document.getElementById("retry-button").addEventListener("click", () => {
    generateRandomFlowers(); 
    flowerInfo.classList.add("hidden"); 
    giftForm.classList.add("hidden"); 
    messageDiv.classList.add("hidden"); 
});


document.getElementById("re-exam").addEventListener("click", () => {
    localStorage.setItem("score", localStorage.getItem("score") + 20);
    window.location.href = "lee45.html"; 
});


document.addEventListener("DOMContentLoaded", generateRandomFlowers);

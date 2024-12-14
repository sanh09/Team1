// 꽃 데이터 배열
const flowers = [
    { name: "철쭉", meaning: "사랑의 즐거움", image: "철쭉.jpg" },
    { name: "개나리", meaning: "희망", image: "개나리.jpg" },
    { name: "백목련", meaning: "이루지 못한 사랑", image: "백목련.jpg" },
    { name: "백일홍", meaning: "행복", image: "백일홍.jpg" },
    { name: "장미", meaning: "사랑", image: "장미.jpg" },
    { name: "참꽃", meaning: "다정", image: "참꽃.jpg" },
];

// HTML 요소 선택 (getElementById를 사용하여 특정 id를 가진 요소를 선택)
const flowerContainer = document.getElementById("flower-container"); // 꽃들이 표시될 컨테이너
const flowerInfo = document.getElementById("flower-info"); // 꽃 정보 표시 영역
const giftForm = document.getElementById("gift-form"); // 선물 입력 폼
const messageDiv = document.getElementById("message"); // 선물 완료 메시지 영역
const flowerNameSpan = document.getElementById("flower-name"); // 선택된 꽃 이름 표시
const flowerMeaningSpan = document.getElementById("flower-meaning"); // 선택된 꽃의 꽃말 표시
const recipientInput = document.getElementById("recipient-name"); // 선물할 사람의 이름 입력 필드
const completionMessage = document.getElementById("completion-message"); // 선물 완료 메시지 텍스트

// 랜덤 꽃 생성 함수 (배열에서 6개의 꽃을 무작위로 선택해 화면에 표시)
function generateRandomFlowers() {
    const selectedFlowers = []; // 무작위로 선택된 꽃 배열
    while (selectedFlowers.length < 6) {
        const randomIndex = Math.floor(Math.random() * flowers.length); // 0부터 flowers.length - 1 사이의 랜덤 인덱스
        if (!selectedFlowers.includes(flowers[randomIndex])) { // 이미 선택된 꽃이 아닌 경우 추가
            selectedFlowers.push(flowers[randomIndex]);
        }
    }

    // 기존 화면 초기화 후 새로운 꽃 목록 추가
    flowerContainer.innerHTML = ""; // flowerContainer 내부를 비움
    selectedFlowers.forEach((flower) => { // 각 꽃 데이터에 대해 반복 처리
        const flowerDiv = document.createElement("div"); // 각 꽃을 위한 div 생성
        flowerDiv.classList.add("flower"); // "flower" 클래스 추가
        flowerDiv.innerHTML = `
            <img src="${flower.image}" alt="${flower.name}" style="width:100%; height:80px;"> <!-- 꽃 이미지 -->
            <p>${flower.name}</p> <!-- 꽃 이름 -->
            <p class="flower-meaning">${flower.meaning}</p> <!-- 꽃말 -->
        `;
        flowerDiv.addEventListener("click", () => selectFlower(flower)); // 클릭 이벤트 설정 (꽃 선택 시 처리)
        flowerContainer.appendChild(flowerDiv); // flowerContainer에 flowerDiv 추가
    });
}

// "다음 꽃" 버튼 클릭 시 실행
document.getElementById("next-flower").addEventListener("click", function () {
    const nextContainer = document.querySelectorAll(".container")[1]; // 두 번째 컨테이너 선택
    if (nextContainer) {
        nextContainer.classList.remove("hidden"); // 컨테이너 표시
        const flowerContainer = document.getElementById("flower-container");
        flowerContainer.classList.add("hover-enabled"); // hover-enabled 클래스 추가
        nextContainer.scrollIntoView({ behavior: "smooth" }); // 부드럽게 스크롤 이동
    } else {
        console.error("다음 컨테이너를 찾을 수 없습니다."); // 에러 메시지 출력
    }
});

// 꽃 선택 시 실행되는 함수 (선택한 꽃 정보를 표시하고 선물 폼 숨김)
function selectFlower(flower) {
    flowerInfo.classList.remove("hidden"); // 꽃 정보 영역 표시
    giftForm.classList.add("hidden"); // 선물 입력 폼 숨김
    messageDiv.classList.add("hidden"); // 완료 메시지 숨김
    flowerNameSpan.textContent = flower.name; // 선택된 꽃의 이름 표시
    flowerMeaningSpan.textContent = flower.meaning; // 선택된 꽃의 꽃말 표시
    document.getElementById("gift-button").onclick = () => showGiftForm(flower); // "선물하기" 버튼 클릭 시 처리 설정
}

// 선물 입력 폼을 표시하는 함수
function showGiftForm(flower) {
    giftForm.classList.remove("hidden"); // 선물 입력 폼 표시
    flowerInfo.classList.add("hidden"); // 꽃 정보 숨김
    messageDiv.classList.add("hidden"); // 완료 메시지 숨김
}
// "선물 완료" 버튼 클릭 시 실행
document.getElementById("submit-gift").addEventListener("click", () => {
    const recipient = recipientInput.value.trim(); // 입력된 이름 가져오기 (공백 제거)
    const flowerName = flowerNameSpan.textContent; // 선택된 꽃 이름 가져오기
    const flowerMeaning = flowerMeaningSpan.textContent; // 선택된 꽃말 가져오기

    if (!recipient) { // 이름이 입력되지 않았을 때 경고 표시
        alert("선물할 사람의 이름을 입력해주세요!");
        return;
    }

    const confirmation = confirm(`${recipient}에게 ${flowerName}(${flowerMeaning})를 선물하시겠습니까?`); // 확인창 표시
    if (!confirmation) {
        return; // 취소를 누른 경우 실행 중단
    }

    completionMessage.textContent = `${recipient}에게 ${flowerName}(${flowerMeaning})를 선물했습니다!`; // 완료 메시지 설정
    messageDiv.classList.remove("hidden"); // 완료 메시지 표시
    giftForm.classList.add("hidden"); // 선물 입력 폼 숨김
    recipientInput.value = ""; // 입력 필드 초기화
});

// "다시 하기" 버튼 클릭 시 실행
document.getElementById("retry-button").addEventListener("click", () => {
    generateRandomFlowers(); // 새로운 꽃 목록 생성
    flowerInfo.classList.add("hidden"); // 꽃 정보 숨김
    giftForm.classList.add("hidden"); // 선물 입력 폼 숨김
    messageDiv.classList.add("hidden"); // 완료 메시지 숨김
});

// "다음 문제 풀기" 버튼 클릭 시 실행
document.getElementById("re-exam").addEventListener("click", () => {
    localStorage.setItem("score", localStorage.getItem("score") + 20); // 로컬 스토리지에 점수 추가
    window.location.href = "lee45.html"; // 다음 페이지로 이동
});

// HTML 문서가 로드된 후 랜덤 꽃 생성 함수 실행
document.addEventListener("DOMContentLoaded", generateRandomFlowers); // DOMContentLoaded 이벤트 발생 시 실행

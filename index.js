document.addEventListener("DOMContentLoaded", () => { 
    const form = document.querySelector("form"); 
    const idInput = document.getElementById("id");
    const pwInput = document.getElementById("pw");
   
    form.addEventListener("submit", (event) => { 
        event.preventDefault(); 
        const id = idInput.value.trim(); 
        const pw = pwInput.value.trim();

        if (id === "" && pw === "") {
            alert("아이디와 비밀번호를 입력해주세요.");
        } else if (id === "") {
            alert("아이디를 입력해주세요.");
        } else if (pw === "") {
            alert("비밀번호를 입력해주세요.");
        } else if (id === "user" && pw === "1234") {
            window.location.href = "park42.html";  
        } else {
            alert("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    });
});

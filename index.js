// HTML 문서가 완전히 로드된 후 JavaScript 코드를 실행
document.addEventListener("DOMContentLoaded", () => { //화살표쓰는이유 : ()=> 대신 function() 을 써도 결과가 동일하지만 화살표 함수가 더 짧아서 코드가 깔끔해 보임
    const form = document.querySelector("form"); // 첫 번째로 일치하는 요소를 찾을 때 , 유연하게 요소 선택하고싶을때 사용
    const idInput = document.getElementById("id"); //특정 id 값을 가진 요소를 빠르고 한번에 명확하게 찾을 때 사용
    const pwInput = document.getElementById("pw");
    //form제출시 실행할 동작 설정
    form.addEventListener("submit", (event) => { //addEventListener: 폼에서 이벤트 발생 시 특정 동작 실행
        event.preventDefault(); // 기본 폼 제출 동작(새로고침) 방지
        const id = idInput.value.trim(); // idInput의 입력값 가져오기 (공백 제거)
        const pw = pwInput.value.trim(); // pwInput의 입력값 가져오기 (공백 제거)

        if (id === "" && pw === "") {
            alert("아이디와 비밀번호를 입력해주세요.");
        } else if (id === "") {
            alert("아이디를 입력해주세요.");
        } else if (pw === "") {
            alert("비밀번호를 입력해주세요.");
        } else if (id === "user" && pw === "1234") {
            window.location.href = "42p.html";  // 로그인 성공 시 이동
        } else {
            alert("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    });
});

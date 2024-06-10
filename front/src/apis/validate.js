/**
 * 이메일 주소 선택
 */

/* passCheck */
export const passCheck = (refs) => {
  let checkFlag = true;
  const pass = refs.userPassRef.current;
  const passCheck = refs.userPassCheckRef.current;

  if (!pass || !passCheck) {
    console.error("Reference not initialized");
    return false;
  }

  if (pass.value !== passCheck.value) {
    alert("비밀번호가 동일하지 않습니다. 다시 입력해주세요");
    pass.value = "";
    passCheck.value = "";
    pass.focus();
    checkFlag = false;
  } else {
    alert("비밀번호가 동일합니다.");
  }

  return checkFlag;
};

/**
 * 유효성 체크
 */
export const validateCheck = (refs, formData) => {
  let checkFlag = true;
  const userId = refs.userIdRef.current;

  if (userId.value === "") {
    alert("아이디를 입력해주세요");
    userId.focus();
    checkFlag = false;
  } else if (refs.emailIdRef.current.value === "") {
    alert("이메일 아이디를 입력해주세요");
    refs.emailIdRef.current.focus();
    checkFlag = false;
  } else if (refs.userPassRef.current.value === "") {
    alert("비밀번호를 입력해주세요");
    refs.userPassRef.current.focus();
    checkFlag = false;
  } else if (refs.userPassCheckRef.current.value === "") {
    alert("비밀번호 확인을 입력해주세요");
    refs.userPassCheckRef.current.focus();
    checkFlag = false;
  } else if (refs.userNameRef.current.value === "") {
    alert("이름을 입력해주세요");
    refs.userNameRef.current.focus();
    checkFlag = false;
  } else if (!formData.service) {
    alert("이용약관에 동의해 주세요.");
    checkFlag = false;
  } else if (!formData.personal) {
    alert("개인정보 수집 및 이용에 동의해 주세요.");
    checkFlag = false;
  }

  return checkFlag;
};

module.exports = {
  IsValidatePassword: (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    );
  },

  IsValidateEmail: (email) => {
    return /^[A-Za-z0-9\.\-_]+@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(email);
  },

  OnlyKorEng: (str) => {
    return /^[가-힣a-zA-Z]+$/.test(str);
  },

  OnlyNumber: (str) => {
    return /^[0-9]+$/.test(str);
  },
};
/*
function isMoreThan4Length(value) {
    return value.length >= 4;
}

function isMatch(password1, password2) {
    return password1 === password2;
}

function isMoreThan8Length(value) {
    return value.length >= 8;
}

// [유효성 검증 함수]: 영어 또는 숫자만 가능
function onlyNumberAndEnglish(str) {
    return /^[A-Za-z][A-Za-z0-9]*$/.test(str);
  }

// [유효성 검증 함수]: 최소 8자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함
function strongPassword(str) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
  }

*/

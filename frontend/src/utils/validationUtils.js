const isPhoneValid = () => {

  const re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
  const enteredPhone = document.getElementById('phone').value;

  return re.test(enteredPhone);
};

export default isPhoneValid;
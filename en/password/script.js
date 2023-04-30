document.getElementById('generateBtn').addEventListener('click', () => {
  const password = generatePassword();
  document.getElementById('password').value = password;
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const password = document.getElementById('password');
  password.select();
  document.execCommand('copy');
  alert('Your password has been copied to your clipboard.');
});

function generatePassword() {
  const length = 12;
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

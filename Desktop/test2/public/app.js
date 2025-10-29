document.addEventListener('DOMContentLoaded', () => {
  const app = firebase.app();
  console.log('Firebase App initialized:', app);

  const db = firebase.firestore();
  console.log('Firestore initialized:', db);

  // 🔹 Auto-redirect if user is already logged in
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log('User already signed in:', user.email || user.displayName);
      window.location.href = "dashboard.html";
    }
  });

  // 🔹 Attach login button event (after DOM loaded)
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          alert("Welcome " + userCredential.user.email);
          window.location.href = "dashboard.html";
        })
        .catch(error => {
          alert(error.message);
        });
    });
  }
});

// 🔹 Google Login
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      console.log('Google login successful:', user);
      alert(`Welcome ${user.displayName || user.email}`);
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      console.error('Google login error:', error);
      alert(error.message);
    });
}

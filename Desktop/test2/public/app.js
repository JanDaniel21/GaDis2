// app.js

// Wait for Firebase to initialize
document.addEventListener("DOMContentLoaded", () => {
  const auth = firebase.auth();
  const db = firebase.firestore();

  const loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      // 🔹 Log in user
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // 🔹 Fetch user data from Firestore (using UID)
      const userDoc = await db.collection("users").doc(user.uid).get();

      if (!userDoc.exists) {
        alert("No user profile found in Firestore. Please contact the administrator.");
        return;
      }

      const userData = userDoc.data();

      // 🔹 Store user info locally for other pages
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("email", userData.email);
      localStorage.setItem("department", userData.department);
      localStorage.setItem("isAdmin", userData.isadmin);

      //**  ✅ Redirect after login
      //if (userData.isadmin) {
      //  window.location.href = "admin.html";
      //} else {
      //  window.location.href = "user.html";
      //}

      //**  🔸 Redirect to a common dashboard for all users
      window.location.href = "dashboard.html";

    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        alert("Invalid email or password.");
      } else {
        alert("Login failed. Please try again later.");
      }
    }
  });
});

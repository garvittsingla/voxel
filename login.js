document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.querySelector(".action-btn.primary");
  const createAccountBtn = document.querySelector(".action-btn.secondary");
  const guestBtn = document.querySelector(".guest-btn");

  loginBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      showNotification("Please enter both username and password!", "error");
      return;
    }

    try {
      const response = await fetch("users.json");
      const data = await response.json();

      const user = data.users.find((u) =>
        (u.username.toLowerCase() === username.toLowerCase() ||
          u.email.toLowerCase() === username.toLowerCase()) &&
        u.password === password
      );

      if (user) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            id: user.id,
            username: user.username,
            email: user.email,
          }),
        );

        showNotification("Login Successful! Redirecting...", "success");

        setTimeout(() => {
          globalThis.location.href = "https://pixi-hero.vercel.app/";
          console.log("tried to enter the game");
        }, 1500);
      } else {
        showNotification("Invalid username or password!", "error");
        usernameInput.classList.add("shake");
        passwordInput.classList.add("shake");

        setTimeout(() => {
          usernameInput.classList.remove("shake");
          passwordInput.classList.remove("shake");
        }, 500);
      }
    } catch (error) {
      console.error("Error loading users:", error);
      showNotification("Error connecting to server!", "error");
    }
  });

  createAccountBtn.addEventListener("click", function (e) {
    e.preventDefault();
    showNotification("Account creation feature coming soon!", "info");
  });

  guestBtn.addEventListener("click", function (e) {
    e.preventDefault();

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: 0,
        username: "GUEST_PLAYER",
        email: "guest@voxelstudios.com",
      }),
    );

    showNotification("Playing as Guest! Redirecting...", "success");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  });

  usernameInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      passwordInput.focus();
    }
  });

  passwordInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      loginBtn.click();
    }
  });

  function showNotification(message, type) {
    const existingNotif = document.querySelector(".notification");
    if (existingNotif) {
      existingNotif.remove();
    }

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
});

async function hashPassword(password) {
  const encoder = new TextEncoder();

  const data = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

/* ---------------- Register ---------------- */

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value;

    const msg = document.getElementById("message");

    msg.style.color = "red";

    if (username === "" || password === "") {
      msg.textContent = "All fields are required.";

      return;
    }

    if (password.length < 8 || !/\d/.test(password)) {
      msg.textContent =
        "Password must be at least 8 characters and contain one number.";

      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((user) => user.username === username)) {
      msg.textContent = "User already exists.";

      return;
    }

    const hashedPassword = await hashPassword(password);

    users.push({
      username: username,

      password: hashedPassword,
    });

    localStorage.setItem("users", JSON.stringify(users));

    msg.style.color = "green";

    msg.textContent = "Registration successful!";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  });
}

/* ---------------- Login ---------------- */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("loginUser").value.trim();

    const password = document.getElementById("loginPass").value;

    const msg = document.getElementById("loginMessage");

    msg.style.color = "red";

    if (username === "" || password === "") {
      msg.textContent = "Please fill all fields.";

      return;
    }

    const hashedPassword = await hashPassword(password);

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.username === username && u.password === hashedPassword,
    );

    if (!user) {
      msg.textContent = "Invalid username/email or password.";

      return;
    }

    sessionStorage.setItem("loggedIn", "true");

    sessionStorage.setItem("username", username);

    window.location.href = "dashboard.html";
  });
}

/* ---------------- Dashboard ---------------- */

if (window.location.pathname.includes("dashboard.html")) {
  if (sessionStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }

  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", function () {
    sessionStorage.clear();

    window.location.href = "login.html";
  });
}

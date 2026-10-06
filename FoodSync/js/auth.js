/* ============================================================
   auth.js — role-tabbed login + signup, backed by DB (data.js)
   ============================================================ */

const ROLE_META = {
  customer: {
    label: "Customer",
    loginTitle: "Welcome back",
    loginSub: "Sign in to order from your favourite kitchens.",
    signupSub: "Takes less than a minute — start ordering right after.",
    redirect: "customer.html",
    demo: "customer@demo.com",
  },
  manager: {
    label: "Manager",
    loginTitle: "Manager sign in",
    loginSub: "Manage your menu and keep orders moving.",
    signupSub: "Register your restaurant account to manage orders and menu.",
    redirect: "manager.html",
    demo: "manager@demo.com",
  },
  delivery: {
    label: "Delivery Partner",
    loginTitle: "Delivery partner sign in",
    loginSub: "See what's ready to pick up near you.",
    signupSub: "Join as a delivery partner and start accepting orders.",
    redirect: "delivery.html",
    demo: "delivery@demo.com",
  },
};

let currentRole = "customer";

const roleTabs = document.getElementById("roleTabs");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginTitle = document.getElementById("loginTitle");
const loginSub = document.getElementById("loginSub");
const signupSub = document.getElementById("signupSub");
const demoHint = document.getElementById("demoHint");
const loginError = document.getElementById("loginError");
const signupError = document.getElementById("signupError");
const managerRestaurantField = document.getElementById("managerRestaurantField");
const signupRestaurant = document.getElementById("signupRestaurant");

function applyRole(role) {
  currentRole = role;
  document.querySelectorAll(".role-tab").forEach((t) =>
    t.classList.toggle("active", t.dataset.role === role)
  );
  const meta = ROLE_META[role];
  loginTitle.textContent = meta.loginTitle;
  loginSub.textContent = meta.loginSub;
  signupSub.textContent = meta.signupSub;
  managerRestaurantField.classList.toggle("hidden", role !== "manager");
  if (role === "manager") {
    signupRestaurant.innerHTML = DB.getRestaurants().map(r => `<option value="${r}">${r}</option>`).join("");
  }
  if (role === "manager") {
    const demos = DB.getUsers().filter(u => u.role === "manager" && u.email.endsWith("@demo.com"));
    demoHint.innerHTML = `Demo manager logins — ` + demos.map(u => `<code>${u.email}</code> (${u.restaurant})`).join(" · ") + ` · password: <code>demo123</code>`;
  } else {
    demoHint.innerHTML = `Demo login — email: <code>${meta.demo}</code>, password: <code>demo123</code>`;
  }
  loginError.classList.remove("show");
  signupError.classList.remove("show");
}

roleTabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".role-tab");
  if (!btn) return;
  applyRole(btn.dataset.role);
});

document.getElementById("showSignup").addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
});

document.getElementById("showLogin").addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const user = DB.findUser(email, currentRole);
  if (!user || user.password !== password) {
    loginError.textContent = "We couldn't find an account with that email, password and role. Check your details and try again.";
    loginError.classList.add("show");
    return;
  }

  DB.setSession(user);
  window.location.href = ROLE_META[currentRole].redirect;
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (password.length < 4) {
    signupError.textContent = "Password should be at least 4 characters.";
    signupError.classList.add("show");
    return;
  }

  if (DB.findUser(email, currentRole)) {
    signupError.textContent = "An account with this email already exists for this role. Try signing in instead.";
    signupError.classList.add("show");
    return;
  }

  const user = { name, email, password, role: currentRole };
  if (currentRole === "manager") user.restaurant = signupRestaurant.value;
  DB.addUser(user);
  DB.setSession(user);
  window.location.href = ROLE_META[currentRole].redirect;
});

applyRole("customer");


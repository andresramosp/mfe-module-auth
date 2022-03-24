import { BehaviorSubject } from "rxjs";

export const auth$ = new BehaviorSubject({
  sessionToken: '123', //JSON.parse(localStorage.getItem("session") || '{}').token,
  error: false,
  pending: false,
  userName: JSON.parse(localStorage.getItem("session") || '{}').userName,
  email: JSON.parse(localStorage.getItem("session") || '{}').email,
});

// This promise represents a request being made to some backend to have the user validated and logged in
// but is mocked here for convenience. I don't want to have to setup a backend just for this example.
const GET_LOGGED_IN = (username, password) =>
  new Promise((resolve, reject) => {
    auth$.next({
      sessionToken: null,
      error: false,
      pending: true,
      userName: '',
      email: '',

    });
    setTimeout(() => {
      if (username === "user" && password === "1234") {
        const sessionToken = "abc123def456";
        const userName  = 'Andrés Ramos';
        const email = 'andres@email.com'
        localStorage.setItem("session", JSON.stringify({ token: sessionToken, userName, email }));
        resolve({
          sessionToken,
          error: false,
          pending: false,
          userName,
          email
        });
      } else {
        // Why resolve when invalid? Because the "backend" provided a valid response
        resolve({
          sessionToken: null,
          error: "Invalid user or password",
          pending: false,
          email: ''
        });
      }
    }, 500);
  });

export function login(username, password) {
  if (!auth$.value.pending) {
    GET_LOGGED_IN(username, password).then((user) => {
      auth$.next(user);
    });
  }
}

export function logout() {
  // Trigger side-effects
  localStorage.removeItem("session");
  auth$.next({
    sessionToken: null,
    error: false,
    userName: '',
    email: ''
  });
}

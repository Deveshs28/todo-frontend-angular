importScripts("https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.5/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCIUk5z-JVpYDG0hDIIUyB6eCiRbKLHE3A",
  authDomain: "todo-list-node.firebaseapp.com",
  databaseURL: "https://todo-list-node.firebaseio.com",
  projectId: "todo-list-node",
  storageBucket: "todo-list-node.appspot.com",
  messagingSenderId: "429622267090",
  appId: "1:429622267090:web:e65f1f5c85867ad800310b",
});

const messaging = firebase.messaging();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

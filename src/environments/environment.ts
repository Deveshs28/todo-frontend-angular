// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCIUk5z-JVpYDG0hDIIUyB6eCiRbKLHE3A',
    authDomain: 'todo-list-node.firebaseapp.com',
    databaseURL: 'https://todo-list-node.firebaseio.com',
    projectId: 'todo-list-node',
    storageBucket: 'todo-list-node.appspot.com',
    messagingSenderId: '429622267090',
    appId: '1:429622267090:web:e65f1f5c85867ad800310b',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

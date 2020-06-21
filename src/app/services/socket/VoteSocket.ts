// import { WebSocketSubject, webSocket } from "rxjs/webSocket";
// import makeWebSocketObservable, {
//   GetWebSocketResponses,
//   normalClosureMessage,
// } from "rxjs-websockets";
// import { Injectable } from "@angular/core";
// import { switchAll, catchError, tap } from "rxjs/operators";
// import { Subject, EMPTY, Observable } from "rxjs";
// import { environment } from "src/environments/environment";
// export const WS_ENDPOINT = environment.WS_ENDPOINT;

// @Injectable({
//   providedIn: "root",
// })
// export class VoteService {
//   private socket$: WebSocketSubject<any>;

//   public connect(): Observable<any> {
//     if (!this.socket$ || this.socket$.closed) {
//       this.socket$ = this.getNewWebSocket();
//       const voteCount = this.socket$.pipe(
//         tap({
//           error: (error) => console.log(error),
//         }),
//         catchError((_) => EMPTY)
//       );
//       return voteCount;
//     }
//   }

//   private getNewWebSocket() {
//     return webSocket(WS_ENDPOINT);
//   }
// }

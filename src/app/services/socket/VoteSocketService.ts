import { Injectable } from "@angular/core";
import { SocketService } from "./SocketService";
import { Observable } from "rxjs/Observable";
import { SocketEvent } from "src/app/shared/Util";

@Injectable()
export class VoteSocketService {
  userTotalVote$: Observable<number>;

  constructor(private socket: SocketService) {
    this.socket.join("notes");
    // Every socket NOTES event has it's own observable, will be used by ngrx effects
    this.userTotalVote$ = this.socket.listen(SocketEvent.USER_TOTAL_VOTE);
  }

  // These methods will be called by ngrx effects (do not use directly in the components)
  fetchUserTotal() {
    this.socket.emit(SocketEvent.GET_VOTE_COUNT);
  }

  addNote(note) {
    this.socket.emit("[Notes] Add", note);
  }

  updateNote(note) {
    this.socket.emit("[Notes] Update", note);
  }

  deleteNote(note) {
    this.socket.emit("[Notes] Delete", note);
  }
}

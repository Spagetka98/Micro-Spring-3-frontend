import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/models/comment.model';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input({required:true}) public comment!: IComment;

  public isLoading: boolean = false;
  public author?: IUser;

  constructor(
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadAuthorDetails(this.comment.authId);
  }

  private loadAuthorDetails(userId: string): void {
    this.isLoading = true;

    this._userService.getUserDetails(userId)
    .subscribe({
      next: (data: IUser) => this.author = data,
      error: () => console.log("error"),
    }).add(() => this.isLoading = false); 
  }
}

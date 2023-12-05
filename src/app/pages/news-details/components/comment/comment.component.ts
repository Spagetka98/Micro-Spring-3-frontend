import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IComment } from 'src/app/models/comment.model';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule]
})
export class CommentComponent implements OnInit {
  private userService: UserService = inject(UserService);
  
  @Input({required:true}) public comment!: IComment;

  public isLoading: boolean = false;
  public author?: IUser;

  ngOnInit(): void {
    this.loadAuthorDetails(this.comment.authId);
  }

  private loadAuthorDetails(userId: string): void {
    this.isLoading = true;

    this.userService.getUserDetails(userId)
    .subscribe({
      next: (data: IUser) => this.author = data,
      error: () => console.log("error"),
    }).add(() => this.isLoading = false); 
  }
}

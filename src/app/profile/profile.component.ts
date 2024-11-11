import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import { LikeService } from '../services/like.service';
import { Comment } from '../DTOs/comment';  
import { User } from '../DTOs/user';
import { Post } from '../DTOs/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: any; 
  userPosts: any[] = [];
  commentForm!: FormGroup;
  showComments: { [key: number]: boolean } = {};
  isLikedMap: { [key: number]: boolean } = {};
  showLikesPopup: { [postId: number]: boolean } = {};  
  postLikes: { [postId: number]: User[] } = {}; 
  post: Post[] = [];

  constructor(
    private postService: PostService,
    private router: Router,
    private commentService: CommentService,
    private likeService: LikeService,
    private formBuilder: FormBuilder  
  ) { }

  ngOnInit(): void {
    const storedUserInfo = localStorage.getItem('userInfo');
    
    if (storedUserInfo) {
      this.userInfo = JSON.parse(storedUserInfo);
      console.log('User Info Loaded:', this.userInfo);
      this.loadUserPosts(); 
    } else {
      console.error('No user data found in localStorage!');
      this.router.navigate(['/login']);
    }
    
    this.createCommentForm();
  }

  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      txtContentText: [''],
      txtPostId: ['']
    });
  }

  loadUserPosts() {
    this.postService.loadPostByUserId(this.userInfo.id).subscribe({
      next: data => {
        this.post = data;
        console.log('User Posts Loaded:', this.post);
        this.post.forEach(p => {
          const likedStatus = localStorage.getItem(`likedPost_${p.postId}_${this.userInfo.id}`);
          this.isLikedMap[p.postId] = likedStatus === 'true'; 
          
          this.postLikes[p.postId] = p.like
            .filter(like => like.isLike)
            .map(like => like.user);
        });
      },
      error: err => console.error('Error loading posts:', err)
    });
  }
  

  toggleComments(postId: number) {
    this.showComments[postId] = !this.showComments[postId];
  }

  createComment(postId: number) {
    const commentContent = this.commentForm.get('txtContentText')?.value;

    const newComment = new Comment();
    newComment.content = commentContent.trim();
    newComment.userId = this.userInfo.id;
    newComment.user = this.userInfo;
    newComment.postId = postId;

    if (!newComment.content || !newComment.userId) {
      console.error('Content and UserId are required.');
      return;
    }

    this.commentService.createComment(newComment).subscribe({
      next: response => {
        console.log('Comment created successfully:', response);
        this.commentForm.reset();
        this.loadUserPosts();  
      },
      error: err => {
        console.error('Error creating comment:', err);
      }
    });
  }

  showLikesList(postId: number) {
    this.showLikesPopup[postId] = true;
  }

  closePopup(postId: number) {
    this.showLikesPopup[postId] = false;
  }

  toggleLike(postId: number) {
    this.likeService.toggleLike(postId, this.userInfo.id).subscribe({
      next: (isLiked: boolean) => {
        this.isLikedMap[postId] = isLiked;
        this.loadUserPosts();  
      },
      error: (err) => {
        console.error('Error toggling like:', err);
      }
    });
  }

  checkIfLiked(postId: number): boolean {
    return this.isLikedMap[postId] || false;
  }

  isLiked(postId: number): boolean {
    return this.isLikedMap[postId] || false;
  }

  Edit() {
    this.router.navigate(['/dashBoard/setting']);
  }
}

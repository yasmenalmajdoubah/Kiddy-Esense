import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../DTOs/post';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { User } from '../DTOs/user';
import { CommentService } from '../services/comment.service';
import { LikeService } from '../services/like.service';
import { Comment } from "../DTOs/comment";
import { SharePostService } from "../services/share-post.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userservice: UserService,
    private postService: PostService,
    private activeRouter: ActivatedRoute,
    private commentService: CommentService,
    private likeService: LikeService,
    private sharePostService: SharePostService
  ) { }

  ngOnInit(): void {
    this.activeUser = this.activeRouter.snapshot.queryParams['user'];
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      this.user = JSON.parse(storedUserInfo);
      console.log('User loaded from localStorage:', this.user);
    } else {
      console.log('No user data found in localStorage');
    }

    this.loadPost();
    this.createPostForm();
    this.createCommentForm();
  }

  activeUser!: string;
  postForm!: FormGroup;
  commentForm!: FormGroup;
  post: Post[] = [];
  user!: User;
  showComments: { [key: number]: boolean } = {};
  isLikedMap: { [key: number]: boolean } = {};  
  showLikesPopup: { [postId: number]: boolean } = {};
  postPic: any = '';
  postLikes: { [postId: number]: User[] } = {};

  findUser() {
    console.log('Finding user:', this.activeUser);
    this.userservice.getActiveUser(this.activeUser).subscribe({
      next: data => {
        console.log('API Response:', data);
        this.user = data;
        localStorage.setItem('userInfo', JSON.stringify(this.user));
        console.log('User loaded:', this.user);
      },
      error: err => {
        console.error('Error loading user:', err);
      }
    });
  }

  createPostForm() {
    this.postForm = this.formBuilder.group({
      txtContentText: ['', Validators.required],
      txtContentImage: ['']
    });
  }

  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      txtContentText: [''],
      txtPostId: ['']
    });
  }

  loadPost() {
    this.postService.loadAllPost().subscribe({
      next: data => {
        this.post = data;
        console.log(this.post);

        this.post.forEach(p => {
          const likedStatus = localStorage.getItem(`likedPost_${p.postId}_${this.user.id}`);
          this.isLikedMap[p.postId] = likedStatus === 'true'; 
          
          this.postLikes[p.postId] = p.like
            .filter(like => like.isLike)
            .map(like => like.user);
        });
      },
      error: err => console.error('Error loading posts:', err)
    });
  }

  submitPost() {
    let newPost = new Post();
    newPost.contentText = this.postForm.value['txtContentText'];
    newPost.contentImage = this.postPic; 
    newPost.userId = this.user.id;
    newPost.user = this.user;
    newPost.createdAt = new Date();

    console.log('Post data being sent:', newPost);

    this.postService.createPost(newPost).subscribe({
      next: response => {
        console.log('Post created successfully:', response);
        this.loadPost();  
        this.postForm.reset();
      },
      error: err => {
        console.error('Error creating post:', err);
        if (err.error) {
          console.error('Error details:', err.error);
        }
        if (err.status) {
          console.error('Status code:', err.status);
        }
      }
    });
  }

  toggleComments(postId: number) {
    this.showComments[postId] = !this.showComments[postId];
  }

  createComment(postId: number) {
    const commentContent = this.commentForm.get('txtContentText')?.value;

    const newComment = new Comment();
    newComment.content = commentContent.trim();
    newComment.userId = this.user.id;
    newComment.user = this.user;
    newComment.postId = postId;

    if (!newComment.content || !newComment.userId) {
      console.error('Content and UserId are required.');
      return;
    }

    this.commentService.createComment(newComment).subscribe({
      next: response => {
        console.log('Comment created successfully:', response);
        this.commentForm.reset();
        this.loadPost(); 
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
    const newStatus = !this.isLikedMap[postId];  

    this.likeService.toggleLike(postId, this.user.id).subscribe({
      next: () => {
        this.isLikedMap[postId] = newStatus;

        localStorage.setItem(`likedPost_${postId}_${this.user.id}`, newStatus.toString());

        if (newStatus) {
          this.postLikes[postId].push(this.user);  
        } else {
          this.postLikes[postId] = this.postLikes[postId].filter(user => user.id !== this.user.id);   
        }
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

  onFileSelected(file: any) {
    if (file.target.files && file.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = (_event) => {
        this.postPic = reader.result;
      };
    }
  }
}


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharePostService {
  private posts: any[] = [];

  setPosts(posts: any[]) {
    this.posts = posts;
  }

  getPosts() {
    return this.posts;
  }

  getPostsByUserId(userId: string) {
    return this.posts.filter(post => post.userId === userId);
  }
}

export default class Post  {
    constructor(post) {
        this.id = post.id;
        this.text = post.text;
        this.type = post.type;
        this.commentsNum = post.commentsNum;
        this.userId = post.userId;
        this.dateCreated = post.dateCreated;
        this.userDisplayName = post.userDisplayName;
        this.imageUrl = post.imageUrl;
        this.videoUrl = post.videoUrl; 
    }
}
export default class Profile  {
    constructor(profile) {
        this.about = profile.about;
        this.aboutShort = profile.aboutShort;
        this.avatarUrl = profile.avatarUrl;
        this.commentsCount = profile.commentsCount;
        this.email = profile.email;
        this.name = profile.name;
        this.postsCount = profile.postsCount;
        this.userId = profile.userId;
    }
}

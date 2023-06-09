"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Post = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../user/user.entity");
var commnet_entity_1 = require("../comment/commnet.entity");
var like_entity_1 = require("../like/like.entity");
var tag_entity_1 = require("../tag/tag.entity");
var Post = /** @class */ (function () {
    function Post() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Post.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Post.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)()
    ], Post.prototype, "text");
    __decorate([
        (0, typeorm_1.Column)()
    ], Post.prototype, "dateAndTimePublish");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return like_entity_1.Like; }, function (like) { return like.post; }, { eager: true })
    ], Post.prototype, "userLikes");
    __decorate([
        (0, typeorm_1.Column)()
    ], Post.prototype, "postImage");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.posts; }, { eager: true, onDelete: 'CASCADE' })
    ], Post.prototype, "user");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return commnet_entity_1.Comment; }, function (comment) { return comment.post; }, { eager: true })
    ], Post.prototype, "comments");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return tag_entity_1.Tag; }, { eager: true }),
        (0, typeorm_1.JoinTable)()
    ], Post.prototype, "tags");
    Post = __decorate([
        (0, typeorm_1.Entity)({ name: 'posts' })
    ], Post);
    return Post;
}());
exports.Post = Post;

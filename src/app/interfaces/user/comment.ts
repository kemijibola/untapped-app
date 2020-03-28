export interface IComment {
  _id?: string;
  media: string;
  comment: string;
  user?: CommenterViewModel;
  likeCount?: number;
  replies?: Reply[];
  hasLiked?: boolean;
  likedBy?: LikeViewModel[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Reply {
  _id?: string;
  user?: CommenterViewModel;
  reply: string;
}

export interface LikeViewModel {
  _id: string;
  fullName: string;
}

export interface CommenterViewModel {
  _id: string;
  fullName: string;
  profileImagePath: string;
  fullProfileImagePath?: string;
}

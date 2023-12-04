export interface INews {
    newsId: number,
    title: string,
    text: string,
    userId: string,
    creationDate: Date,
    updateDate: Date
    totalLikes: number,
    totalDislikes: number,
    totalComments: number,
    isLikedByUser: boolean,
    isDislikedByUser: boolean
}
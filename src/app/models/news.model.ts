export interface INews {
    newsId: number,
    title: string,
    uri: string,
    text: string,
    userId: string,
    creationDate: Date,
    updateDate: Date
    totalLikes: number,
    totalDislikes: number,
    isLikedByUser: boolean,
    isDislikedByUser: boolean
}
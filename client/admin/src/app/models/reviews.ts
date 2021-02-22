


export interface Reviews{

    _id:number,
    users:string,
    reviewTitle: String,
    reviewContent: String,
    rating: Number,
    lastUpdated: Number

}

export interface editReviews{

    reviewTitle: String,
    reviewContent: String,
    rating: Number,

}

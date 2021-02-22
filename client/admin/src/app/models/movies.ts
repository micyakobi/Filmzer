


export interface Movies{
    _id:number,
    title: {type:String, unique: true},
    year: Number,
    genre: String,  
    description: String,
    image_url: String,
    trailer_video: String
}
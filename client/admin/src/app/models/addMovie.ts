


export interface AddMovie{
    title: string,
    year: number,
    genre: string,  // delimiter ','
    description: string,
    image_url: string,
    trailer_video: string
}
export interface groupMovie{
 
    genre: string,  // delimiter ','
    movies:[]
}
export interface scrapeM{
 
    url:string
}

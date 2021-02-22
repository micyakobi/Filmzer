


export interface Users{
    _id: number,
    username: {
        type: String,
        index: { unique: true }
    },
    password: String,
    admin: Boolean,
    firstName: String,
    lastName: String,
    email: String


}

export interface Users2 {
    
    _id:number,
    username: string,
    password: number,
    admin: string,
    firstName: string,
    lastName: string,
    email: string

}

export class Country{
    constructor(
        public name: string,
        public capital: string,
        public currencyCode: string,
        public currencyName: string,        
        public flag: string,
        public population : number,        
        public region : string,
        public subregion: string,
        public timezone: string,
        public currentTime: string
    ){}
}

export class Iauthority {
    authority:string;
  
    public constructor( authority?:string){
      this.authority=authority;
    }
  
    public getAuthority():string{
      return this.authority;
    }
  
    public setAuthority(authority:string):void{
      this.authority=authority;
    }
     
    }
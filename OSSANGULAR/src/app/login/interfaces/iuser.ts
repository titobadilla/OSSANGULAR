import { Iauthority } from "./iauthority";

export class Iuser {
  sub: string;
  //scopes: Iauthority;
  rol:string;
  iss: string;
  iat: number;
  exp: number;

  public constructor(sub?: string, rol?:string, iss?: string, iat?: number, exp?: number) {
    this.sub = sub;
    this.rol=rol;
    this.iss = iss;
    this.iat = iat;
    this.exp = exp;

  }

  public getSub():string{
    return this.sub;
  }

  public setSub(sub:string):void{
    this.sub=sub;
  }

  public getRol():string{
    return this.rol;
  }

  public setScopes(rol:string):void{
    this.rol=rol;
  }

  public getIat():number{
    return this.iat;
  }

  public setIat(iat:number):void{
    this.iat=iat;
  }

  public getExp():number{
    return this.exp;
  }

  public setExp(exp:number):void{
    this.exp=exp;
  }


}



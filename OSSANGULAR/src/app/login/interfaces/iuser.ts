import { Iauthority } from "./iauthority";

export class Iuser {
  sub: string;
  //scopes: Iauthority;
  role:string;
  iss: string;
  iat: number;
  exp: number;
  idEmployee:string;

  public constructor(sub?: string, role?:string, iss?: string, iat?: number, exp?: number,idEmployee?:string) {
    this.sub = sub;
    this.role=role;
    this.iss = iss;
    this.iat = iat;
    this.exp = exp;
    this.idEmployee=idEmployee;

  }

  public getSub():string{
    return this.sub;
  }

  public setSub(sub:string):void{
    this.sub=sub;
  }

  public getRole():string{
    return this.role;
  }

  public setScopes(role:string):void{
    this.role=role;
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

 public getIdEmployee():string{
    return this.idEmployee;
  }

  public setIdEmployee(id:string):void{
    this.idEmployee=id;
  }

}



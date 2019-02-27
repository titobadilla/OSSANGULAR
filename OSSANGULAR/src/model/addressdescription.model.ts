import { District } from './district.model';


export class AddressDescription{

    id:number;
    description:String;
    district:District=new District();
}
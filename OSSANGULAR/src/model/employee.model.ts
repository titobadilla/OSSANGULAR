import { EmployeeRole } from './employeerole.model';
import { TelephoneEmployee } from './telephoneemployee.model';

export class Employee{

    id:String;
    name:String;
    lastName:String;
    position:String;
    role:EmployeeRole=new EmployeeRole();
    username:String;
    password:String;
    telephones:TelephoneEmployee[] = new Array();
}
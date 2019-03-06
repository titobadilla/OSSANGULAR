import { Client } from './client.model';

export class GroupClient{
    idGroup:number;
    nameGroup:String;
    contactName:String;
    contactLastName:String;
    email:String;
    phone1:String;
    phone2:String;    

    clients:Client[]=new Array();
    
}
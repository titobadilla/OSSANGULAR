import { Client } from './client.model';

export class GroupClient{
    idGroup:number;
    idHeadClient:String;
    clients:Client[]=new Array();
    
}
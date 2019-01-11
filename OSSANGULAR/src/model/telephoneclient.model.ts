import { Client } from './client.model';

export class TelephoneClient{

    id:number;
    type:String;
    number:String;
    client:Client=new Client();
}
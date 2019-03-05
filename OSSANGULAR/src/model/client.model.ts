import { AddressDescription } from './addressdescription.model';
import { GroupClient } from './groupclient.model';
import { TelephoneClient } from './telephoneclient.model';

export class Client{

  id:String;
  name:String;
  contactName:String;
  contactLastName:String;
  telephones: TelephoneClient[] = new Array();
  addressDescription:AddressDescription= new AddressDescription();
  group:GroupClient=new GroupClient();  

  
}
import { Client } from './client.model';
import { Employee } from './employee.model';
import { WorkOrderDetail } from './workorderdetail.model';
import { WorkOrderType } from './workordertype.model';
import { Color} from './color.model';

export class WorkOrder{

    id:number;
    description:String;
    client:Client=new Client();      
    startDate:String;
    endDate:String;
    employees:Employee[]=new Array();
    workOrderDetail:WorkOrderDetail;
    workOrderType:WorkOrderType=new WorkOrderType();
    color:Color = new Color();

}
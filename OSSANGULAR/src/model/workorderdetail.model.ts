import { WorkOrder } from './workorder.model';

export class WorkOrderDetail{

    id:number;
    date:Date;
    checkIn:String;
    checkOut:String;
    description:String;
    invoiceId:number;
    managerName:String;
}
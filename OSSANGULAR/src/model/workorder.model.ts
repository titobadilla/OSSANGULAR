import { Client } from './client.model';
import { Employee } from './employee.model';
import { WorkOrderDetail } from './workOrderDetail.model';
import { WorkOrderType } from './workordertype.model';
import { Color} from './color.model';
import { KitWorkOrder } from './kitWorkOrder.model';
import { WorkOrderDevice } from './workOrderdevice.model';
import { WorkOrderMaterial } from './workOrdermaterial.model';
import { WorkOrderTool } from './workOrdertool.model';

export class WorkOrder{

    id:number;
    description:String;
    client:Client=new Client();      
    startDate:String;
    endDate:String;
    employees:Employee[]=new Array();
    kitWorkOrder: KitWorkOrder = new KitWorkOrder();
    listWorkOrderDevices:WorkOrderDevice[] = new Array();
    listWorkOrderMaterials:WorkOrderMaterial[] = new Array();
    listWorkOrderTools:WorkOrderTool[] = new Array();
    workOrderDetail:WorkOrderDetail;
    workOrderType:WorkOrderType=new WorkOrderType();
    color:Color = new Color();


}
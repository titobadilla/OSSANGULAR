import { KitWorkOrder } from './kitWorkOrder.model';
import { Tool } from './tool.model';

export class SuppliesToolId{
    kitWorkOrder:KitWorkOrder;
    tool:Tool = new Tool();
}
import { MeasurementUnit } from './measurementunit.model';
import { InventoryCategory } from './inventorycategory.model';

export class Tool{

    id:number;
    name:String;
    quantity:number;
    description:String;
    measurementUnit:MeasurementUnit=new MeasurementUnit();
    inventoryCategory:InventoryCategory=new InventoryCategory();

}
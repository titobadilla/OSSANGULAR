import { InventoryCategory } from './inventorycategory.model';
import { Model } from './model.model';
import { MeasurementUnit } from './measurementunit.model';

export class Material{

    id:number;
    name:String;
    quantity:number;
    description:String;
    model:Model=new Model();
    inventoryCategory:InventoryCategory=new InventoryCategory();
    measurementUnit:MeasurementUnit=new MeasurementUnit();
}
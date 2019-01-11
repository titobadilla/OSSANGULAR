import { DeviceState } from './devicestate.model';
import { InventoryCategory } from './inventorycategory.model';
import { Model } from './model.model';
import { MeasurementUnit } from './measurementunit.model';

export class Device{

    id:number;
    serialNumber:String;
    name:String;
    description:String;
    quantity:number;
    manufactureModel:String;
    model:Model = new Model();
    inventoryCategory:InventoryCategory=new InventoryCategory();
    measurementUnit:MeasurementUnit=new MeasurementUnit();
    deviceState: DeviceState=new DeviceState();
}
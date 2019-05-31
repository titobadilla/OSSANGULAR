import { SuppliesDevice } from './suppliesDevice.model';
import { SuppliesMaterial } from './suppliesMaterial.model';
import { SuppliesTool } from './suppliestool.model';

export class KitWorkOrder{

    id: number;
    name:String;
    listSuppliesDevices: SuppliesDevice[] = new Array();
    listSuppliesMaterials: SuppliesMaterial[]= new Array();
    listSuppliesTools: SuppliesTool[]= new Array();
    
}
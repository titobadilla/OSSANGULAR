import { SuppliesDevice } from './SuppliesDevice.model';
import { SuppliesMaterial } from './SuppliesMaterial.model';
import { SuppliesTool } from './SuppliesTool.model';

export class KitWorkOrder{

    id: number;
    name:String;
    listSuppliesDevices: SuppliesDevice[] = new Array();
    listSuppliesMaterials: SuppliesMaterial[]= new Array();
    listSuppliesTools: SuppliesTool[]= new Array();
    
}
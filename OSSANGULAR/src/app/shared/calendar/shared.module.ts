import { NgModule } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TreeViewModule, TabModule } from '@syncfusion/ej2-angular-navigations';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

import { L10n } from '@syncfusion/ej2-base';

L10n.load({
    'es-CR': {
        'schedule': {
            'saveButton': 'Aceptar',
            'cancelButton': 'Cancelar',
            'deleteButton': 'Eliminar',
            'newEvent': '¿Desea crear una orden de trabajo?',
            'today':'Hoy',
            'day':'Por Día',
            'week':'Por Semana',
            'month':'Por Mes',
            'agenda':'Agenda',
            'more':'más',
            'noEvents':'No hay órdenes de trabajo en la fecha seleccionada.'
        },
        'calendar':{
            'today':'Hoy'
        },
         'grid': {
            'EmptyRecord': 'No hay datos a mostrar...',
            'EmptyDataSourceError': 'Error al mostrar datos...'
        },
        'pager':{
            'currentPageInfo': '{0} de {1} páginas',
            'totalItemsInfo': '({0} Registros)',
            'firstPageTooltip': 'Ir a primer página',
            'lastPageTooltip': 'Ir a última página',
            'nextPageTooltip': 'Ir a siguiente página',
            'previousPageTooltip': 'Regresar a la página anterior',
            'pagerDropDown':'Registros por página',
            'pagerAllDropDown':'Todos',
            'nextPagerTooltip':'Ir a siguiente página',
            'All':'Todos'

        }
    }
});



@NgModule({
    imports: [
        ButtonModule,
        ListViewModule,
        DropDownListModule,
        TreeViewModule,
        TabModule,
        RichTextEditorAllModule
   ],
     
    exports: [
        ButtonModule,
        TreeViewModule,
        ListViewModule,
        DropDownListModule,
        TabModule,
        RichTextEditorAllModule
    ]
})


export class SharedModule { }
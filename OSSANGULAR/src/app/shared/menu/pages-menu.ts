import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
 
  {
    title: 'Cambiar mi clave',
    icon: 'nb-star',
    link: '/change-password'    
  }, 
  {
    title: 'Cliente',
    icon: 'nb-star',
    children: [
      {
        title: 'Grupo de clientes',
        link: '/group-client'        
      },
      {
        title: 'Cliente',
        link: '/client'
      }    
    ],
  },
  {
    title: 'Empleado',
    icon: 'nb-star',
    children: [
      {
        title: 'Rol de empleado',
        link: '/employee-role',
      },
      {
        title: 'Empleado',
        link: '/employee',
      }    
    ],
  },
  {
    title: 'Orden de trabajo',
    icon: 'nb-star',
    children: [      
      {
        title: 'Orden de trabajo',
        link: '/work-order',
      },
      {
        title: 'Detalle de orden',
        link: '/work-order-detail',
      },
      {
        title: 'Tipo de orden',
        link: '/work-order-type',
      }    
    ],
  },
  {
    title: 'Inventario',
    icon: 'nb-star',
    children: [
      {
        title: 'Lista predefinidas',
        link: '/kit',
      },
      {
        title: 'Herramientas',
        link: '/tool',
      },
      {
        title: 'Materiales',
        link: '/material',
      },
      {
        title: 'Dispositivos',
        children:[ 
          {
          title: 'Dispositivo',
          link: '/device'
          },
          {
            title: 'Estado del dispositivo',
            link: '/device-state'
          }
      ]
      },
      {
        title: 'Marca',
        link: '/brand',
      },
      {
        title: 'Categoría de inventario',
        link: '/inventory-category',
      },
      {
        title: 'Unidades de Medida',
        link: '/measurement-unit',
      },
      {
        title: 'Modelo',
        link: '/model',
      }
      ],
  },
  {
    title: 'Salidas de inventario',    
    link: '/inventory-output-general',
    icon: 'nb-e-commerce'     
  },
  {
    title: 'Reportes',
    icon: 'nb-star',
    children: [
      {
        title: 'Ordenes de Trabajo por tipo',
        link: '/report-work-order-by-type',
      },
      {
        title: 'Ordenes de Trabajo por cliente',
        link: '/report-work-order-by-client',
      }    
    ],
  }/*
  {
    title: 'FEATURES',
    group: true,
  }*/
 
];


export const MENU_ITEMS_TECHNICAL: NbMenuItem[] = [
  {
    title: 'Orden de trabajo',
    icon: 'nb-star',
    link: '/work-order-detail'    
  },
  {
    title: 'Cambiar clave',
    icon: 'nb-star',
    link: '/change-password'    
  }
 
];


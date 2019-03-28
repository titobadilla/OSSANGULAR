import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'MENU OSS TVO',
    group: true,
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
        title: 'Lista predefinidas',
        link: '/',
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
        title: 'Reporte 1',
        link: '/',
      },
      {
        title: 'Reporte 2',
        link: '/',
      }    
    ],
  }/*
  {
    title: 'FEATURES',
    group: true,
  }*/
 
];

Ext.define('SMS.module.GeneralSetup.Menu.view.grid.GridMenu', {
    extend   : 'Ext.grid.Panel',
    store    : 'SMS.module.GeneralSetup.Menu.store.Menu',
    title    : 'Grid Menu',
    iconCls  : 'icon-grid',
    alias    : 'widget.gridmenu',
    id       : 'gridmenu',
    border   : true,
    frame    : true,
        margins     : '3px', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'MULTI',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : 'SMS.module.GeneralSetup.Menu.store.Menu',
        dock        : 'bottom'
    }], 
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '5%'
        },
        {
            text     : 'ID',
            dataIndex: 'id',
            width    : '5%'
        },
        {
            text     : 'Nama',
            dataIndex: 'name',
            width    : '35%'
        },
        {
            text     : 'Parent',
            dataIndex: 'parent',
            width    : '15%'
        },
        {
            text     : 'Icon',
            dataIndex: 'icon',
            width    : '35%'
        },
        {
            dataIndex: 'id_menu',
            hidden   : true
        }
    ],
    tbar: [
         { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete', disabled : deleteMenu },
         // { xtype: 'button', iconCls: 'icon-excel', text: 'Print', action : 'print' },
         {
            xtype               : 'textfield',
            emptyText           : 'Type a keyword Press Enter',
            width               : '75%',
            enableKeyEvents     : true,
            action              : 'search'
        }
    ]
});
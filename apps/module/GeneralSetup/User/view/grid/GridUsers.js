Ext.define('SMS.module.GeneralSetup.User.view.grid.GridUsers', {
    extend   : 'Ext.grid.Panel',
    store    : 'SMS.module.GeneralSetup.User.store.Users',
    title    : 'Grid Users',
    iconCls  : 'icon-grid',
    alias    : 'widget.gridusers',
    id       : 'gridusers',
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
        store       : 'SMS.module.GeneralSetup.User.store.Users',
        dock        : 'bottom'
    }], 
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '10%'
        },
        {
            text     : 'Nama',
            dataIndex: 'name',
            width    : '40%'
        },
        {
            text     : 'Username',
            dataIndex: 'username',
            width    : '35%'
        }
    ],
    tbar: [
         { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete', disabled : deleteUsers },
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
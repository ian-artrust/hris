Ext.define('SMS.module.Employee.Profile.view.grid.GridProfile', {
    extend   : 'Ext.grid.Panel',
    store    : 'SMS.module.Employee.Profile.store.Profile',
    title    : 'Grid Profile',
    iconCls  : 'icon-grid',
    alias    : 'widget.gridprofile',
    id       : 'gridprofile',
    border   : true,
    frame    : true,
    margins     : '3px', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'SINGLE',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : 'SMS.module.Employee.Profile.store.Profile',
        dock        : 'bottom'
    }], 
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '15%'
        },
        {
            text     : 'NIK',
            dataIndex: 'nik',
            width    : '20%'
        },
        {
            text     : 'Nama Lengkap',
            dataIndex: 'nama_lengkap',
            width    : '40%'
        }
    ],
    tbar: [
         { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete', disabled : deleteProfile },
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
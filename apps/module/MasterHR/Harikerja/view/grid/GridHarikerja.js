Ext.define('SMS.module.MasterHR.Harikerja.view.grid.GridHarikerja', {
    extend   : 'Ext.grid.Panel',
    store    : 'SMS.module.MasterHR.Harikerja.store.Harikerja',
    title    : 'Grid Harikerja',
    iconCls  : 'icon-grid',
    alias    : 'widget.gridharikerja',
    id       : 'gridharikerja',
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
        store       : 'SMS.module.MasterHR.Harikerja.store.Harikerja',
        dock        : 'bottom'
    }], 
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '10%'
        },
        {
            text     : 'Hari Kerja',
            dataIndex: 'name_harikerja',
            width    : '80%'
        }
    ],
    tbar: [
         { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete', disabled : deleteHarikerja },
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
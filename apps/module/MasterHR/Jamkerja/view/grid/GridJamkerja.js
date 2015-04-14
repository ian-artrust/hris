Ext.define('SMS.module.MasterHR.Jamkerja.view.grid.GridJamkerja', {
    extend   : 'Ext.grid.Panel',
    store    : 'SMS.module.MasterHR.Jamkerja.store.Jamkerja',
    title    : 'Grid Jamkerja',
    iconCls  : 'icon-grid',
    alias    : 'widget.gridjamkerja',
    id       : 'gridjamkerja',
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
        store       : 'SMS.module.MasterHR.Jamkerja.store.Jamkerja',
        dock        : 'bottom'
    }], 
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '10%'
        },
        {
            text     : 'Jam Kerja',
            dataIndex: 'name_jamkerja',
            width    : '80%'
        }
    ],
    tbar: [
         { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete', disabled : deleteJamkerja },
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
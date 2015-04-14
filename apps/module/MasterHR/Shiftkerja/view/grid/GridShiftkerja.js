Ext.define('SMS.module.MasterHR.Shiftkerja.view.grid.GridShiftkerja', {
    extend   : 'Ext.grid.Panel',
    store    : 'SMS.module.MasterHR.Shiftkerja.store.Shiftkerja',
    title    : 'Grid Shiftkerja',
    iconCls  : 'icon-grid',
    alias    : 'widget.gridshiftkerja',
    id       : 'gridshiftkerja',
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
        store       : 'SMS.module.MasterHR.Shiftkerja.store.Shiftkerja',
        dock        : 'bottom'
    }], 
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '10%'
        },
        {
            text     : 'Shif Kerja',
            dataIndex: 'name_shift',
            width    : '80%'
        }
    ],
    tbar: [
         { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete', disabled : deleteShiftkerja },
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
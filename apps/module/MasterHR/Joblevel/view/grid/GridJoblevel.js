Ext.define('SMS.module.MasterHR.Joblevel.view.grid.GridJoblevel', {
    extend   : 'Ext.grid.Panel',
    store    : 'SMS.module.MasterHR.Joblevel.store.Joblevel',
    title    : 'Grid Joblevel',
    iconCls  : 'icon-grid',
    alias    : 'widget.gridjoblevel',
    id       : 'gridjoblevel',
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
        store       : 'SMS.module.MasterHR.Joblevel.store.Joblevel',
        dock        : 'bottom'
    }], 
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '10%'
        },
        {
            text     : 'Job Level',
            dataIndex: 'name_joblevel',
            width    : '80%'
        }
    ],
    tbar: [
         { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete', disabled : deleteJoblevel },
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
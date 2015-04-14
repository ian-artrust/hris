Ext.define('SMS.module.MasterHR.Section.view.grid.GridSection', {
    extend   : 'Ext.grid.Panel',
    store    : 'SMS.module.MasterHR.Section.store.Section',
    title    : 'Grid Section',
    iconCls  : 'icon-grid',
    alias    : 'widget.gridsection',
    id       : 'gridsection',
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
        store       : 'SMS.module.MasterHR.Section.store.Section',
        dock        : 'bottom'
    }], 
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '10%'
        },
        {
            text     : 'Department',
            dataIndex: 'name_dept',
            width    : '40%'
        },
        {
            text     : 'Section',
            dataIndex: 'name_sect',
            width    : '35%'
        }
    ],
    tbar: [
         { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete', disabled : deleteSection },
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
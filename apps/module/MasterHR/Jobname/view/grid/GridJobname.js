Ext.define('SMS.module.MasterHR.Jobname.view.grid.GridJobname', {
    extend   : 'Ext.grid.Panel',
    store    : 'SMS.module.MasterHR.Jobname.store.Jobname',
    title    : 'Grid Jobname',
    iconCls  : 'icon-grid',
    alias    : 'widget.gridjobname',
    id       : 'gridjobname',
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
        store       : 'SMS.module.MasterHR.Jobname.store.Jobname',
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
            width    : '40%'
        },
        {
            text     : 'Job Name',
            dataIndex: 'name_jobname',
            width    : '40%'
        }
    ],
    tbar: [
         { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete', disabled : deleteJobname },
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
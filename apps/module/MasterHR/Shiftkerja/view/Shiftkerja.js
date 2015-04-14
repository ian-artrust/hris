Ext.define('SMS.module.MasterHR.Shiftkerja.view.Shiftkerja', {
    extend   :  'Ext.panel.Panel',
    title    : 'Shiftkerja',
    iconCls  : 'icon-shiftkerja',
    alias    : 'widget.Shiftkerja',
    id       : 'Shiftkerja',
    layout   : 'fit',     
    requires : [
        'SMS.module.MasterHR.Shiftkerja.view.grid.GridShiftkerja',
        'SMS.module.MasterHR.Shiftkerja.view.form.FormShiftkerja'
    ],
    layout      : {
        type    :'hbox',
        align   :'stretch'
    },
    defaults    : {
        flex    : 1
    },    
    closable    : true,
    items       : [ 
        {xtype   : 'gridshiftkerja', flex : 1},
        {xtype   : 'formshiftkerja', flex : 1}         
    ]
});
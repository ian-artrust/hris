Ext.define('SMS.module.MasterHR.Jamkerja.view.Jamkerja', {
    extend   :  'Ext.panel.Panel',
    title    : 'Jamkerja',
    iconCls  : 'icon-jamkerja',
    alias    : 'widget.Jamkerja',
    id       : 'Jamkerja',
    layout   : 'fit',     
    requires : [
        'SMS.module.MasterHR.Jamkerja.view.grid.GridJamkerja',
        'SMS.module.MasterHR.Jamkerja.view.form.FormJamkerja'
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
        {xtype   : 'gridjamkerja', flex : 1},
        {xtype   : 'formjamkerja', flex : 1}         
    ]
});
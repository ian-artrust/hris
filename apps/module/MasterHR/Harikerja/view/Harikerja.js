Ext.define('SMS.module.MasterHR.Harikerja.view.Harikerja', {
    extend   :  'Ext.panel.Panel',
    title    : 'Harikerja',
    iconCls  : 'icon-harikerja',
    alias    : 'widget.Harikerja',
    id       : 'Harikerja',
    layout   : 'fit',     
    requires : [
        'SMS.module.MasterHR.Harikerja.view.grid.GridHarikerja',
        'SMS.module.MasterHR.Harikerja.view.form.FormHarikerja'
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
        {xtype   : 'gridharikerja', flex : 1},
        {xtype   : 'formharikerja', flex : 1}         
    ]
});
Ext.define('SMS.module.MasterHR.Jobname.view.Jobname', {
    extend   :  'Ext.panel.Panel',
    title    : 'Jobname',
    iconCls  : 'icon-jobname',
    alias    : 'widget.Jobname',
    id       : 'Jobname',
    layout   : 'fit',     
    requires : [
        'SMS.module.MasterHR.Jobname.view.grid.GridJobname',
        'SMS.module.MasterHR.Jobname.view.form.FormJobname'
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
        {xtype   : 'gridjobname', flex : 1},
        {xtype   : 'formjobname', flex : 1}         
    ]
});
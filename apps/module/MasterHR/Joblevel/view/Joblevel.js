Ext.define('SMS.module.MasterHR.Joblevel.view.Joblevel', {
    extend   :  'Ext.panel.Panel',
    title    : 'Joblevel',
    iconCls  : 'icon-joblevel',
    alias    : 'widget.Joblevel',
    id       : 'Joblevel',
    layout   : 'fit',     
    requires : [
        'SMS.module.MasterHR.Joblevel.view.grid.GridJoblevel',
        'SMS.module.MasterHR.Joblevel.view.form.FormJoblevel'
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
        {xtype   : 'gridjoblevel', flex : 1},
        {xtype   : 'formjoblevel', flex : 1}         
    ]
});
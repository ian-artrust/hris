Ext.define('SMS.module.MasterHR.Section.view.Section', {
    extend   :  'Ext.panel.Panel',
    title    : 'Section',
    iconCls  : 'icon-sect',
    alias    : 'widget.Section',
    id       : 'Section',
    layout   : 'fit',     
    requires : [
        'SMS.module.MasterHR.Section.view.grid.GridSection',
        'SMS.module.MasterHR.Section.view.form.FormSection'
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
        {xtype   : 'gridsection', flex : 1},
        {xtype   : 'formsection', flex : 1}         
    ]
});
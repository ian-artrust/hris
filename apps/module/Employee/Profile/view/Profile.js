Ext.define('SMS.module.Employee.Profile.view.Profile', {
    extend   :  'Ext.panel.Panel',
    title    : 'Profile',
    iconCls  : 'icon-profile',
    alias    : 'widget.Profile',
    id       : 'Profile',
    layout   : 'fit',
    frame    : true,     
    requires : [
        'SMS.module.Employee.Profile.view.grid.GridProfile',
        'SMS.module.Employee.Profile.view.form.FormProfile'
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
        {xtype   : 'gridprofile', flex : 0.7},
        {xtype   : 'formprofile', flex : 1.3}         
    ]
});
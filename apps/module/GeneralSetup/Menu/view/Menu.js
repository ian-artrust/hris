Ext.define('SMS.module.GeneralSetup.Menu.view.Menu', {
    extend   :  'Ext.panel.Panel',
    title    : 'Menu',
    iconCls  : 'icon-menu2',
    alias    : 'widget.Menu',
    id       : 'Menu',
    layout   : 'fit',     
    requires : [
        'SMS.module.GeneralSetup.Menu.view.grid.GridMenu',
        'SMS.module.GeneralSetup.Menu.view.form.FormMenu'
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
        {xtype   : 'gridmenu', flex : 1.5},
        {xtype   : 'formmenu', flex : 1}         
    ]
});
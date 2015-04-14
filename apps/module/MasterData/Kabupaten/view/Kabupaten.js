Ext.define('SMS.module.MasterData.Kabupaten.view.Kabupaten', {
    extend   :  'Ext.panel.Panel',
    title    : 'Kabupaten',
    iconCls  : 'icon-kab',
    alias    : 'widget.Kabupaten',
    id       : 'Kabupaten',
    layout   : 'fit',     
    requires : [
        'SMS.module.MasterData.Kabupaten.view.grid.GridKabupaten',
        'SMS.module.MasterData.Kabupaten.view.form.FormKabupaten'
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
        {xtype   : 'gridkabupaten', flex : 1},
        {xtype   : 'formkabupaten', flex : 1}         
    ]
});
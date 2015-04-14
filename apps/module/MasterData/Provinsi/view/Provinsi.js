Ext.define('SMS.module.MasterData.Provinsi.view.Provinsi', {
    extend   :  'Ext.panel.Panel',
    title    : 'Provinsi',
    iconCls  : 'icon-prov',
    alias    : 'widget.Provinsi',
    id       : 'Provinsi',
    layout   : 'fit',     
    requires : [
        'SMS.module.MasterData.Provinsi.view.grid.GridProvinsi',
        'SMS.module.MasterData.Provinsi.view.form.FormProvinsi'
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
        {xtype   : 'gridprovinsi', flex : 1},
        {xtype   : 'formprovinsi', flex : 1}         
    ]
});
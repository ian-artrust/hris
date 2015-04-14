Ext.define('SMS.module.MasterData.Provinsi.view.form.FormProvinsi', {
    extend      : 'Ext.form.Panel',
    title       : 'Form Provinsi',
    iconCls     : 'icon-provinsi',
    store       : 'SMS.module.MasterData.Provinsi.store.Provinsi',
    requires    : ['SMS.module.MasterData.Provinsi.store.Provinsi'],
    alias       : 'widget.formprovinsi',
    id          : 'formprovinsi',
    layout      : 'fit',
    border      : true,
    frame       : true,
    margins     : '3px',
    initComponent: function() {
        var me = this;
        me.items  = [
            {
                xtype       : 'form',
                bodyPadding : 5,
                frame       : true,
                items       : [
                    {
                        xtype       : 'textfield',
                        name        : 'id',
                        hidden      : true,
                        fieldLabel  : 'ID',                    
                    },
                    {
                        xtype       : 'textfield',
                        name        : 'name_prov',
                        allowBlank  : true,
                        fieldLabel  : 'Provinsi',
                        emptyText   : 'Provinsi',
                        anchor      : '100%',
                        padding     : '0px 2px 0px 2px',
                    }
                ]
            }
        ];
        me.buttons = [
            {
                text    : 'Save Add',
                iconCls : 'icon-save',
                action  : 'save',
                disabled: createProvinsi
            },
            {
                text    : 'Edit Provinsi',
                iconCls : 'icon-edit',
                action  : 'update',
                disabled: updateProvinsi
            },
            {
                text    : 'Reset',
                iconCls : 'icon-refresh',
                action  : 'reset'
            }
        ];
        me.callParent(arguments);
    }  
});
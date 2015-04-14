Ext.define('SMS.module.MasterData.Kabupaten.view.form.FormKabupaten', {
    extend      : 'Ext.form.Panel',
    title       : 'Form Kabupaten',
    iconCls     : 'icon-kabupaten',
    store       : 'SMS.module.MasterData.Kabupaten.store.Kabupaten',
    requires    : ['SMS.module.MasterData.Kabupaten.store.Kabupaten'],
    alias       : 'widget.formkabupaten',
    id          : 'formkabupaten',
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
                        xtype       : 'combobox',
                        name        : 'id_prov',
                        emptyText   : 'Provinsi',
                        fieldLabel  : 'Provinsi',
                        autoScroll  : false,
                        store       : Ext.create('SMS.module.MasterData.Provinsi.store.Provinsi'),
                        displayField: 'name_prov',
                        valueField  : 'id',
                        anchor      : '100%',
                        padding     : '0px 2px 0px 2px',
                    },
                    {
                        xtype       : 'textfield',
                        name        : 'name_kab',
                        allowBlank  : true,
                        fieldLabel  : 'Kabupaten',
                        emptyText   : 'Kabupaten',
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
                disabled: createKabupaten
            },
            {
                text    : 'Edit Kabupaten',
                iconCls : 'icon-edit',
                action  : 'update',
                disabled: updateKabupaten
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
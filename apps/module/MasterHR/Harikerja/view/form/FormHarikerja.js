Ext.define('SMS.module.MasterHR.Harikerja.view.form.FormHarikerja', {
    extend      : 'Ext.form.Panel',
    title       : 'Form Harikerja',
    iconCls     : 'icon-harikerja',
    store       : 'SMS.module.MasterHR.Harikerja.store.Harikerja',
    requires    : ['SMS.module.MasterHR.Harikerja.store.Harikerja'],
    alias       : 'widget.formharikerja',
    id          : 'formharikerja',
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
                        name        : 'name_harikerja',
                        allowBlank  : true,
                        fieldLabel  : 'Hari Kerja',
                        emptyText   : 'Hari Kerja',
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
                disabled: createHarikerja
            },
            {
                text    : 'Edit Harikerja',
                iconCls : 'icon-edit',
                action  : 'update',
                disabled: updateHarikerja
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
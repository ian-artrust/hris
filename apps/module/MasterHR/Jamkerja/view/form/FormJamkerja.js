Ext.define('SMS.module.MasterHR.Jamkerja.view.form.FormJamkerja', {
    extend      : 'Ext.form.Panel',
    title       : 'Form Jamkerja',
    iconCls     : 'icon-jamkerja',
    store       : 'SMS.module.MasterHR.Jamkerja.store.Jamkerja',
    requires    : ['SMS.module.MasterHR.Jamkerja.store.Jamkerja'],
    alias       : 'widget.formjamkerja',
    id          : 'formjamkerja',
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
                        xtype       : 'timefield',
                        name        : 'name_jamkerja',
                        allowBlank  : true,
                        fieldLabel  : 'Jam Kerja',
                        emptyText   : 'Jam Kerja',
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
                disabled: createJamkerja
            },
            {
                text    : 'Edit Jamkerja',
                iconCls : 'icon-edit',
                action  : 'update',
                disabled: updateJamkerja
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
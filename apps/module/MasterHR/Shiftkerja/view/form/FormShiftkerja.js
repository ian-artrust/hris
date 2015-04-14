Ext.define('SMS.module.MasterHR.Shiftkerja.view.form.FormShiftkerja', {
    extend      : 'Ext.form.Panel',
    title       : 'Form Shiftkerja',
    iconCls     : 'icon-shiftkerja',
    store       : 'SMS.module.MasterHR.Shiftkerja.store.Shiftkerja',
    requires    : ['SMS.module.MasterHR.Shiftkerja.store.Shiftkerja'],
    alias       : 'widget.formshiftkerja',
    id          : 'formshiftkerja',
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
                        name        : 'name_shift',
                        allowBlank  : true,
                        fieldLabel  : 'Shift Kerja',
                        emptyText   : 'Shift Kerja',
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
                disabled: createShiftkerja
            },
            {
                text    : 'Edit Shiftkerja',
                iconCls : 'icon-edit',
                action  : 'update',
                disabled: updateShiftkerja
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
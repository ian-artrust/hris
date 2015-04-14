Ext.define('SMS.module.GeneralSetup.Role.view.form.FormRole', {
    extend      : 'Ext.form.Panel',
    closeable   : true,
    title       : 'Form Role',
    iconCls     : 'icon-form',
    store       : 'SMS.module.GeneralSetup.Role.store.Role',
    requires    : ['SMS.module.GeneralSetup.Role.store.Role'],
    alias       : 'widget.formrole',
    id          : 'formrole',
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
                        name        : 'name',
                        allowBlank  : true,
                        fieldLabel  : 'Name',
                        emptyText   : 'Nama',
                        anchor      : '100%',
                        padding     : '0px 2px 0px 2px',
                    },
                    {
                        fieldLabel  : 'Aktif',
                        tooltip     : 'Is Active?',
                        xtype       : 'checkboxfield',
                        name        : 'isactive',
                        checked     : false,
                        padding     : '0px 2px 5px 2px',
                    }
                ]
            }
        ];
        me.buttons = [
            {
                text    : 'Save Add',
                iconCls : 'icon-save',
                action  : 'save',
                disabled: createRole
            },
            {
                text    : 'Edit Role',
                iconCls : 'icon-edit',
                action  : 'update',
                disabled: updateRole
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
Ext.define('SMS.module.GeneralSetup.User.view.form.FormUsers', {
    extend      : 'Ext.form.Panel',
    title       : 'Form Users',
    iconCls     : 'icon-form',
    store       : 'SMS.module.GeneralSetup.User.store.Users',
    requires    : ['SMS.module.GeneralSetup.User.store.ViewRole'],
    alias       : 'widget.formusers',
    id          : 'formusers',
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
                        xtype       : 'textfield',
                        name        : 'username',
                        allowBlank  : false,
                        fieldLabel  : 'Username',
                        emptyText   : 'Username',
                        anchor      : '100%',
                        padding     : '0px 2px 5px 2px',
                    },
                    {
                        xtype       : 'textfield',
                        name        : 'password',
                        inputType   : 'password',
                        allowBlank  : false,
                        fieldLabel  : 'Password',
                        emptyText   : 'Password',
                        anchor      : '100%',
                        padding     : '0px 2px 5px 2px',
                    },
                    {
                        xtype       : 'combobox',
                        name        : 'id_role',
                        emptyText   : 'Role User',
                        fieldLabel  : 'Role User',
                        autoScroll  : false,
                        store       : Ext.create('SMS.module.GeneralSetup.User.store.ViewRole'),
                        displayField: 'name',
                        valueField  : 'id_role',
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
                disabled: createUsers
            },
            {
                text    : 'Edit Users',
                iconCls : 'icon-edit',
                action  : 'update',
                disabled: updateUsers
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
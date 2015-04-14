Ext.define('SMS.module.GeneralSetup.Account.view.form.EditPswd', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.editpswd',
    id      : 'editpswd',
    layout  : 'fit',
    modal   : true,
    title   : 'Rubah Password',
    iconCls : 'icon-password',
    autoShow: true,
    height  : 200,
    width   : 500,
    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype       : 'form',
                frame       : true,
                bodyPadding : 5,
                items: [
                    {
                        xtype       : 'textfield',
                        name        : 'oldpswd',
                        fieldLabel  : 'Password Lama',
                        inputType   : 'password',
                        allowBlank  : false,
                        anchor      : '100%'
                    },{
                        xtype       : 'textfield',
                        name        : 'newpswd',
                        fieldLabel  : 'Password Baru',
                        inputType   : 'password',
                        allowBlank  : false,
                        anchor      : '100%'
                    },{
                        xtype       : 'textfield',
                        name        : 'konfpswd',
                        inputType   : 'password',
                        allowBlank  : false,
                        fieldLabel  : 'Retype',
                        anchor      : '100%'
                    }
                ]
            }
        ];
        me.buttons = [
            {
                text   : 'Edit',
                xtype  : 'button',
                iconCls: 'icon-pencil',
                action : 'rubah'
            }
        ];
        me.callParent(arguments);
    }
});
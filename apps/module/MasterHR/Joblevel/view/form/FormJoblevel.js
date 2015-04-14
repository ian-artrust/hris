Ext.define('SMS.module.MasterHR.Joblevel.view.form.FormJoblevel', {
    extend      : 'Ext.form.Panel',
    title       : 'Form Joblevel',
    iconCls     : 'icon-joblevel',
    store       : 'SMS.module.MasterHR.Joblevel.store.Joblevel',
    requires    : ['SMS.module.MasterHR.Joblevel.store.Joblevel'],
    alias       : 'widget.formjoblevel',
    id          : 'formjoblevel',
    layout      : 'fit',
    border      : false,
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
                        name        : 'name_joblevel',
                        allowBlank  : true,
                        fieldLabel  : 'Job Level',
                        emptyText   : 'Job Level',
                        anchor      : '100%',
                        padding     : '0px 2px 0px 2px',
                    },
                    {
                        fieldLabel  : 'Over Time',
                        tooltip     : 'Is Active?',
                        xtype       : 'checkboxfield',
                        name        : 'ot',
                        checked     : false,
                        padding     : '0px 2px 5px 2px',
                    },
                    {
                        fieldLabel  : 'Aktif',
                        tooltip     : 'Is Active?',
                        xtype       : 'checkboxfield',
                        name        : 'active',
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
                disabled: createJoblevel
            },
            {
                text    : 'Edit Joblevel',
                iconCls : 'icon-edit',
                action  : 'update',
                disabled: updateJoblevel
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
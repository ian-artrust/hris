Ext.define('SMS.module.MasterHR.Department.view.form.FormDepartment', {
    extend      : 'Ext.form.Panel',
    title       : 'Form Department',
    iconCls     : 'icon-form',
    store       : 'SMS.module.MasterHR.Department.store.Department',
    requires    : ['SMS.module.MasterHR.Department.store.Department'],
    alias       : 'widget.formdepartment',
    id          : 'formdepartment',
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
                        name        : 'kode_dept',
                        allowBlank  : true,
                        fieldLabel  : 'Kode ',
                        emptyText   : 'Kode Department',
                        anchor      : '100%',
                        padding     : '0px 2px 0px 2px',
                    },
                    {
                        xtype       : 'textfield',
                        name        : 'name_dept',
                        allowBlank  : false,
                        fieldLabel  : 'Nama ',
                        emptyText   : 'Nama Department',
                        anchor      : '100%',
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
                disabled: createDepartment
            },
            {
                text    : 'Edit Department',
                iconCls : 'icon-edit',
                action  : 'update',
                disabled: updateDepartment
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
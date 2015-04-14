Ext.define('SMS.module.MasterHR.Section.view.form.FormSection', {
    extend      : 'Ext.form.Panel',
    title       : 'Form Section',
    iconCls     : 'icon-sect',
    // store       : 'SMS.module.MasterHR.Section.store.Section',
    // requires    : ['SMS.module.MasterHR.Section.store.Section'],
    alias       : 'widget.formsection',
    id          : 'formsection',
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
                        name        : 'id_dept',
                        emptyText   : 'Department',
                        fieldLabel  : 'Department',
                        autoScroll  : false,
                        store       : Ext.create('SMS.module.MasterHR.Department.store.Department'),
                        displayField: 'name_dept',
                        valueField  : 'id',
                        anchor      : '100%',
                        padding     : '0px 2px 0px 2px',
                    },
                    {
                        xtype       : 'textfield',
                        name        : 'name_sect',
                        allowBlank  : true,
                        fieldLabel  : 'Section',
                        emptyText   : 'Section',
                        anchor      : '100%',
                        padding     : '0px 2px 0px 2px',
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
                disabled: createSection
            },
            {
                text    : 'Edit Section',
                iconCls : 'icon-edit',
                action  : 'update',
                disabled: updateSection
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
Ext.define('SMS.module.MasterHR.Jobname.view.form.FormJobname', {
    extend      : 'Ext.form.Panel',
    title       : 'Form Jobname',
    iconCls     : 'icon-jobname',
    store       : 'SMS.module.MasterHR.Jobname.store.Jobname',
    requires    : ['SMS.module.MasterHR.Jobname.store.Jobname'],
    alias       : 'widget.formjobname',
    id          : 'formjobname',
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
                        name        : 'id_sect',
                        emptyText   : 'Section',
                        fieldLabel  : 'Section',
                        autoScroll  : false,
                        store       : Ext.create('SMS.module.MasterHR.Section.store.Section'),
                        displayField: 'name_sect',
                        valueField  : 'id',
                        anchor      : '100%',
                        padding     : '0px 2px 0px 2px',
                    },
                    {
                        xtype       : 'combobox',
                        name        : 'id_joblevel',
                        emptyText   : 'Job Level',
                        fieldLabel  : 'Job Level',
                        autoScroll  : false,
                        store       : Ext.create('SMS.module.MasterHR.Joblevel.store.Joblevel'),
                        displayField: 'name_joblevel',
                        valueField  : 'id',
                        anchor      : '100%',
                        padding     : '0px 2px 0px 2px',
                    },
                    {
                        xtype       : 'textfield',
                        name        : 'jobname',
                        allowBlank  : true,
                        fieldLabel  : 'Job Name',
                        emptyText   : 'Job Name',
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
                disabled: createJobname
            },
            {
                text    : 'Edit Jobname',
                iconCls : 'icon-edit',
                action  : 'update',
                disabled: updateJobname
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
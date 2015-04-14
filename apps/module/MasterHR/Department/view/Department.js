Ext.define('SMS.module.MasterHR.Department.view.Department', {
    extend   :  'Ext.panel.Panel',
    title    : 'Department',
    iconCls  : 'icon-dept',
    alias    : 'widget.Department',
    id       : 'Department',
    layout   : 'fit',     
    requires : [
        'SMS.module.MasterHR.Department.view.grid.GridDepartment',
        'SMS.module.MasterHR.Department.view.form.FormDepartment'
    ],
    layout      : {
        type    :'hbox',
        align   :'stretch'
    },
    defaults    : {
        flex    : 1
    },    
    closable    : true,
    items       : [ 
        {xtype   : 'griddepartment', flex : 1},
        {xtype   : 'formdepartment', flex : 1}         
    ]
});
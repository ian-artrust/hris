Ext.define('SMS.module.MasterHR.Department.store.Department', {
    extend      : 'Ext.data.Store',
    model       : 'SMS.module.MasterHR.Department.model.Department',
    requires    : [
        'SMS.module.MasterHR.Department.model.Department'
    ],
    autoLoad    : true,
    autoSync    : false,
    pageSize    : 20,
    root        : {
        expanded    : false
    },
    proxy       : {
        type            : 'ajax',
        api             : {
            read    : BASE_URL + 'department/c_dept/getDepartment'
        },
        actionMethods   : {
            read    : 'POST'
        },
        reader          : {
            type            : 'json',
            root            : 'data',
            successProperty : 'success',
            totalProperty   : 'total'
        },
        writer          : {
            type            : 'json',
            writeAllFields  : true,
            root            : 'data',
            encode          : true
        }
    }
});
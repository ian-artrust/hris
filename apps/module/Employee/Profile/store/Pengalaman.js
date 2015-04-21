Ext.define('SMS.module.Employee.Profile.store.Pengalaman', {
    extend      : 'Ext.data.Store',
    model       : 'SMS.module.Employee.Profile.model.Pengalaman',
    requires    : [
        'SMS.module.Employee.Profile.model.Pengalaman'
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
            read    : BASE_URL + 'profile/c_profile/getPengalaman'
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
Ext.define('SMS.module.Employee.Profile.store.Keahlian', {
    extend      : 'Ext.data.Store',
    model       : 'SMS.module.Employee.Profile.model.Keahlian',
    requires    : [
        'SMS.module.Employee.Profile.model.Keahlian'
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
            read    : BASE_URL + 'profile/c_profile/getKeahlian'
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
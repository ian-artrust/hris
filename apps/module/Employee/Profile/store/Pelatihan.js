Ext.define('SMS.module.Employee.Profile.store.Pelatihan', {
    extend      : 'Ext.data.Store',
    model       : 'SMS.module.Employee.Profile.model.Pelatihan',
    requires    : [
        'SMS.module.Employee.Profile.model.Pelatihan'
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
            read    : BASE_URL + 'profile/c_profile/getPelatihan'
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
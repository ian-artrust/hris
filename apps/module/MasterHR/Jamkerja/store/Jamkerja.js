Ext.define('SMS.module.MasterHR.Jamkerja.store.Jamkerja', {
    extend      : 'Ext.data.Store',
    model       : 'SMS.module.MasterHR.Jamkerja.model.Jamkerja',
    requires    : [
        'SMS.module.MasterHR.Jamkerja.model.Jamkerja'
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
            read    : BASE_URL + 'jamkerja/c_jamkerja/getJamkerja'
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
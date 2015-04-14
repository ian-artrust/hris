Ext.define('SMS.module.MasterHR.Harikerja.store.Harikerja', {
    extend      : 'Ext.data.Store',
    model       : 'SMS.module.MasterHR.Harikerja.model.Harikerja',
    requires    : [
        'SMS.module.MasterHR.Harikerja.model.Harikerja'
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
            read    : BASE_URL + 'harikerja/c_harikerja/getHarikerja'
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
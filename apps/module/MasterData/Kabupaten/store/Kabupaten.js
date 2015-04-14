Ext.define('SMS.module.MasterData.Kabupaten.store.Kabupaten', {
    extend      : 'Ext.data.Store',
    model       : 'SMS.module.MasterData.Kabupaten.model.Kabupaten',
    requires    : [
        'SMS.module.MasterData.Kabupaten.model.Kabupaten'
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
            read    : BASE_URL + 'kabupaten/c_kabupaten/getKabupaten'
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
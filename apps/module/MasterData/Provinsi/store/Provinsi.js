Ext.define('SMS.module.MasterData.Provinsi.store.Provinsi', {
    extend      : 'Ext.data.Store',
    model       : 'SMS.module.MasterData.Provinsi.model.Provinsi',
    requires    : [
        'SMS.module.MasterData.Provinsi.model.Provinsi'
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
            read    : BASE_URL + 'provinsi/c_provinsi/getProvinsi'
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
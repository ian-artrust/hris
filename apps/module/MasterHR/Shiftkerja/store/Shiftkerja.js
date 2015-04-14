Ext.define('SMS.module.MasterHR.Shiftkerja.store.Shiftkerja', {
    extend      : 'Ext.data.Store',
    model       : 'SMS.module.MasterHR.Shiftkerja.model.Shiftkerja',
    requires    : [
        'SMS.module.MasterHR.Shiftkerja.model.Shiftkerja'
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
            read    : BASE_URL + 'shiftkerja/c_shiftkerja/getShiftkerja'
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
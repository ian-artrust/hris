Ext.define('SMS.module.MasterHR.Joblevel.store.Joblevel', {
    extend      : 'Ext.data.Store',
    model       : 'SMS.module.MasterHR.Joblevel.model.Joblevel',
    requires    : [
        'SMS.module.MasterHR.Joblevel.model.Joblevel'
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
            read    : BASE_URL + 'joblevel/c_joblevel/getJoblevel'
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
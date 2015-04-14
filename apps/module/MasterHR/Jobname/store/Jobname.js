Ext.define('SMS.module.MasterHR.Jobname.store.Jobname', {
    extend      : 'Ext.data.Store',
    model       : 'SMS.module.MasterHR.Jobname.model.Jobname',
    requires    : [
        'SMS.module.MasterHR.Jobname.model.Jobname'
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
            read    : BASE_URL + 'jobname/c_jobname/getJobname'
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
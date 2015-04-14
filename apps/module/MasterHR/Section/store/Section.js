Ext.define('SMS.module.MasterHR.Section.store.Section', {
    extend      : 'Ext.data.Store',
    model       : 'SMS.module.MasterHR.Section.model.Section',
    requires    : [
        'SMS.module.MasterHR.Section.model.Section'
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
            read    : BASE_URL + 'section/c_section/getSection'
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
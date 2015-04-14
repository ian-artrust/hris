Ext.define('SMS.module.GeneralSetup.Role.store.RoleMenu', {
    extend      : 'Ext.data.Store',
    model       : 'SMS.module.GeneralSetup.Role.model.RoleMenu',
    requires    : ['SMS.module.GeneralSetup.Role.model.RoleMenu'],
    autoLoad    : true,
    autoSync    : true,
    pageSize    : 20,
    root        : {
        expanded    : false
    },
    proxy       : {
        type            : 'ajax',
        api             : {
            read    : BASE_URL + 'GeneralSetup/c_role/getMenu'
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
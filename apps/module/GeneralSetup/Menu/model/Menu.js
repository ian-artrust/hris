Ext.define('SMS.module.GeneralSetup.Menu.model.Menu', {
    extend  : 'Ext.data.Model',
    fields  : [
        {
            name    : 'id',
            type    : 'string'
        },
        {
            name    : 'id_menu',
            type    : 'string'
        },
        {
            name    : 'parent',
            type    : 'string'
        },
        {
            name    : 'name',
            type    : 'string'
        },
        {
            name    : 'icon',
            type    : 'string'
        },
        {
            name    : 'selector',
            type    : 'string'
        },
        {
            name    : 'cls',
            type    : 'string'
        },
        {
            name    : 'isactive',
            type    : 'string'
        }    
    ]
});
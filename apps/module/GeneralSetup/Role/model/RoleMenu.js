Ext.define('SMS.module.GeneralSetup.Role.model.RoleMenu', {
    extend  : 'Ext.data.Model',
    fields  : [
        {
            name    : 'id',
            type    : 'string'
        },
        {
            name    : 'id_role',
            type    : 'string'
        },
        {
            name    : 'name',
            type    : 'string'
        },
        {
            name    : 'menu',
            type    : 'string'
        },
        {
            name    : 'isactive',
            type    : 'string'
        },
        {
            name    : 'iscreate',
            type    : 'string'
        },
        {
            name    : 'isupdate',
            type    : 'string'
        },
        {
            name    : 'isdelete',
            type    : 'string'
        },
        {
            name    : 'isprocess',
            type    : 'string'
        }
    ]
});

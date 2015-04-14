Ext.define('SMS.module.GeneralSetup.User.model.Users', {
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
            name    : 'username',
            type    : 'string'
        },
        {
            name    : 'password',
            type    : 'string'
        },
        {
            name    : 'isactive',
            type    : 'string'
        },     
        {
            name    : 'id_profile',
            type    : 'string'
        },
    ]
});
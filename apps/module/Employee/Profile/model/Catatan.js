Ext.define('SMS.module.Employee.Profile.model.Keahlian', {
    extend  : 'Ext.data.Model',
    fields  : [
        {
            name    : 'id',
            type    : 'string'
        },
        {
            name    : 'id_bio',
            type    : 'string'
        },
        {
            name    : 'tanggal',
            type    : 'date'
        },
        {
            name    : 'keterangan',
            type    : 'string'
        },
        {
            name    : 'describtion',
            type    : 'string'
        }
    ]
});
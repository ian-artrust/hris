Ext.define('SMS.module.Employee.Profile.model.Profile', {
    extend  : 'Ext.data.Model',
    fields  : [
        {
            name    : 'id',
            type    : 'string'
        },
        {
            name    : 'nik',
            type    : 'string'
        },
        {
            name    : 'id_jobname',
            type    : 'string'
        },
        {
            name    : 'jobname',
            type    : 'string'
        },
        {
            name    : 'nama_lengkap',
            type    : 'string'
        },
        {
            name    : 'tempat',
            type    : 'string'
        },
        {
            name    : 'tgl_lahir',
            type    : 'date',
            dateFormat: 'Y-m-d'
        },
        {
            name    : 'gender',
            type    : 'string'
        },
        {
            name    : 'alamat',
            type    : 'string'
        },
        {
            name    : 'phone',
            type    : 'string'
        },
        {
            name    : 'marital_status',
            type    : 'string'
        },
        {
            name    : 'agama',
            type    : 'string'
        }, 
        {
            name    : 'status_kerja',
            type    : 'string'
        },
        {
            name    : 'active',
            type    : 'string'
        },
        {
            name    : 'userfile',
            type    : 'string'
        }
    ]
});
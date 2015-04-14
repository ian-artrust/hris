Ext.define('SMS.module.MasterData.Kabupaten.model.Kabupaten', {
    extend  : 'Ext.data.Model',
    fields  : [
        {
            name    : 'id',
            type    : 'string'
        },
        {
            name    : 'id_prov',
            type    : 'string'
        },
        {
            name    : 'name_prov',
            type    : 'string'
        },
        {
            name    : 'name_kab',
            type    : 'string'
        }
    ]
});
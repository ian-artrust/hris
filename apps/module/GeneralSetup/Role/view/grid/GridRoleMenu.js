Ext.define('SMS.module.GeneralSetup.Role.view.grid.GridRoleMenu', {
    extend   : 'Ext.grid.Panel',
    store    : 'SMS.module.GeneralSetup.Role.store.RoleMenu',
    title    : 'Grid Role Menu',
    alias    : 'widget.gridrolemenu',
    id       : 'gridrolemenu', 
    margins     :'3px 3px 3px 3px',
    border      : true,
    frame       : true,
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '5%'
        },
        {
            text     : 'ID',
            dataIndex: 'id',
            hidden   : true
        },
        {
            text     : 'Role',
            dataIndex: 'id_role',
            hidden   : true
        },
        {
            text     : 'Kode',
            dataIndex: 'menu',
            width    : '10%'
        },
        {
            text     : 'Nama',
            dataIndex: 'name',
            width    : '25%'
        },
        {
            text     : 'create',
            dataIndex: 'iscreate',
            width    : '10%'
        },
        {
            text     : 'update',
            dataIndex: 'isupdate',
            width    : '10%'
        },
        {
            text     : 'delete',
            dataIndex: 'isdelete',
            width    : '10%'
        },
        {
            text     : 'access',
            dataIndex: 'isprocess',
            width    : '10%'
        },
        {
            text     : 'Delete',
            xtype    :'actioncolumn',
            width    :'10%',
            items    : [{              
                iconCls: 'icon-delete',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var id = rec.get('id');
                    var idrole = rec.get('idrole');
                    Ext.MessageBox.show({
                        title           : 'Konfirmasi',
                        msg             : 'Anda yakin akan menghapus data yang terseleksi?',
                        buttons         : Ext.Msg.YESNO,
                        icon            : Ext.MessageBox.WARNING,
                        width           : 450,
                        fn              : function(btn, evtObj){
                            if (btn == 'yes') {
                                Ext.Ajax.request({
                                    url             : BASE_URL + 'GeneralSetup/c_role/delRoleMenu',
                                    method          : 'POST',
                                    params          : { id : id, idrole : idrole },   
                                    success         : function(response){
                                        var data    = Ext.JSON.decode(response.responseText);
                                        var storeModul = Ext.getStore('SMS.module.GeneralSetup.Role.store.RoleMenu');
                                        storeModul.removeAll();
                                        storeModul.reload();
                                        storeModul.add(data.data);
                                    }
                                });
                            }
                        }
                    });
                }
            }]
        }
    ]
});
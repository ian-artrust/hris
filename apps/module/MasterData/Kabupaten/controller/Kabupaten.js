Ext.define('SMS.module.MasterData.Kabupaten.controller.Kabupaten', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.getStore('SMS.module.MasterData.Kabupaten.store.Kabupaten').load();
        me.control({
            "gridkabupaten  button[action=delete]"          : {
                click: me.del
            }, 
            "#gridkabupaten"                                 : {
               itemclick: me.viewKabupaten
            },            
            "formkabupaten  button[action=save]"        : {
                click: me.save
            }, 
            "formkabupaten  button[action=reset]"       : {
                click: me.resetPanel
            },
            "gridkabupatenorg"                          : {
               itemdblclick: me.addorg
            },
            "gridkabupaten textfield[action=search]"    : {
               keypress: me.search
            },
            "gridkabupaten button[action=print]"        : {
               click: me.print
            },
            "formkabupaten button[action=update]"       : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    reloadStore: function(){
        var me = this;
        me.getStore('SMS.module.MasterData.Kabupaten.store.Kabupaten').reload();
    },
    viewKabupaten: function(grid, record, item, index, e, eOpts){
        var id = record.data.id;
        var form = Ext.getCmp('formkabupaten');
        var grid = Ext.getCmp('gridkabupatenorg');
        form.getForm().setValues(record.data);

        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(true);
        console.log(updateKabupaten);

        if(updateKabupaten == false) {
            var updateButton = form.down('button[action=update]');
            updateButton.setDisabled(false);
        } else { 
            var updateButton = form.down('button[action=update]');
            updateButton.setDisabled(true);
        }
    },

    del: function(gridPanel, selected){
        var me = this;
        me.CheckedDataEdit = new Array();
        var record = gridPanel.up('grid').getSelectionModel().getSelection();
        Ext.each(record, function(selected){
            me.CheckedDataEdit.push({
                id : selected.data.id
            });
        }); 

        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan menghapus data yang terseleksi?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url             : BASE_URL + 'kabupaten/c_kabupaten/delKabupaten',
                        method          : 'POST',
                        params          : {post : Ext.encode(me.CheckedDataEdit)},
                        success         : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data.msg);
                            if(data.msg === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Digunakan di Table Lain',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                }); 
                                var form    = Ext.getCmp('formkabupaten');
                                var grid    = Ext.getCmp('gridkabupaten');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridkabupaten')[0].getStore('SMS.module.MasterData.Kabupaten.store.Kabupaten').reload();                             
                            } else {
                                var form    = Ext.getCmp('formkabupaten');
                                var grid    = Ext.getCmp('gridkabupaten');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridkabupaten')[0].getStore('SMS.module.MasterData.Kabupaten.store.Kabupaten').reload(); 
                            }
                        }
                    });
                }
            }
        })
    },

    resetPanel: function(btn, gridPanel, selected) {//Reset Form
        var me = this;
        var form = Ext.getCmp('formkabupaten');
        var grid = Ext.getCmp('gridkabupaten');
        form.getForm().reset();

        if(createKabupaten == false){
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(false);
        }else{
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(true);
        }

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);
        grid.getSelectionModel().clearSelections();
        me.getStore('SMS.module.MasterData.Kabupaten.store.Kabupaten').reload();

    },
    save: function(btn, evt, opts){
        var me        = this;
        var form      = btn.up('form').getForm();
        var id_prov   = form.findField('id_prov').getValue();
        var name_kab  = form.findField('name_kab').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'kabupaten/c_kabupaten/saveKabupaten',
            method  : 'POST',
            params  : {
                id_prov         : id_prov,
                name_kab        : name_kab
            },
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                if(data.total === 1){
                    Ext.MessageBox.show({
                        title           : 'Informasi',
                        msg             : 'Data Telah Tersimpan',
                        icon            : Ext.MessageBox.INFO,
                        buttons         : Ext.MessageBox.OK
                    });
                    var form    = Ext.getCmp('formkabupaten');
                    var grid    = Ext.getCmp('gridkabupaten');
                    form.getForm().reset();
                    me.resetPanel();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#gridkabupaten')[0].getStore('SMS.module.MasterData.Kabupaten.store.Kabupaten').reload(); 
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Kabupaten Telah Terdaftar - Silahkan Gunakan Kabupaten Lain',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                    var form    = Ext.getCmp('formkabupaten');
                    var grid    = Ext.getCmp('gridkabupaten');
                    form.getForm().reset();
                    me.resetPanel();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#gridkabupaten')[0].getStore('SMS.module.MasterData.Kabupaten.store.Kabupaten').reload();
                } else {
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Pengisian Data Salah',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });                   
                }
            }
        });   
    },
    update: function(btn, evt, opts){
        var me           = this;
        var form         = btn.up('form').getForm();
        var id           = form.findField('id').getValue();
        var id_prov      = form.findField('id_prov').getValue();
        var name_kab     = form.findField('name_kab').getValue();
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'kabupaten/c_kabupaten/editKabupaten',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            id_prov     : id_prov,
                            name_kab    : name_kab
                        },
                        success : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data.total);
                            if(data.total === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Telah Dirubah',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });
                                var form    = Ext.getCmp('formkabupaten');
                                var grid    = Ext.getCmp('gridkabupaten');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridkabupaten')[0].getStore('SMS.module.MasterData.Kabupaten.store.Kabupaten').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Username Telah Terdaftar - Silahkan Gunakan Username Lain',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                            } else {
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Pengisian Data Salah',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });                   
                            }
                        }
                    });
                }
            }
        });      
    },
    search: function(field, evt, opts){
        var value       = field.getValue();
            Ext.Ajax.request({
                url     : BASE_URL + 'kabupaten/c_kabupaten/searchKabupaten',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('SMS.module.MasterData.Kabupaten.store.Kabupaten');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },

    print : function(){
        window.location = BASE_URL + 'kabupaten/c_kabupaten/printKabupaten/';
    },
})

Ext.define('SMS.module.MasterHR.Harikerja.controller.Harikerja', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.getStore('SMS.module.MasterHR.Harikerja.store.Harikerja').load();
        me.control({
            "gridharikerja  button[action=delete]"          : {
                click: me.del
            }, 
            "#gridharikerja"                                 : {
               itemclick: me.viewHarikerja
            },            
            "formharikerja  button[action=save]"        : {
                click: me.save
            }, 
            "formharikerja  button[action=reset]"       : {
                click: me.resetPanel
            },
            "gridharikerjaorg"                          : {
               itemdblclick: me.addorg
            },
            "gridharikerja textfield[action=search]"    : {
               keypress: me.search
            },
            "gridharikerja button[action=print]"        : {
               click: me.print
            },
            "formharikerja button[action=update]"       : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    reloadStore: function(){
        var me = this;
        me.getStore('SMS.module.MasterHR.Harikerja.store.Harikerja').reload();
    },
    viewHarikerja: function(grid, record, item, index, e, eOpts){
        var id = record.data.id;
        var form = Ext.getCmp('formharikerja');
        var grid = Ext.getCmp('gridharikerjaorg');
        form.getForm().setValues(record.data);

        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(true);
        console.log(updateHarikerja);

        if(updateHarikerja == false) {
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
                        url             : BASE_URL + 'harikerja/c_harikerja/delHarikerja',
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
                                var form    = Ext.getCmp('formharikerja');
                                var grid    = Ext.getCmp('gridharikerja');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridharikerja')[0].getStore('SMS.module.MasterHR.Harikerja.store.Harikerja').reload();                             
                            } else {
                                var form    = Ext.getCmp('formharikerja');
                                var grid    = Ext.getCmp('gridharikerja');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridharikerja')[0].getStore('SMS.module.MasterHR.Harikerja.store.Harikerja').reload();
                            }
                        }
                    });
                }
            }
        })
    },

    resetPanel: function(btn, gridPanel, selected) {//Reset Form
        var me = this;
        var form = Ext.getCmp('formharikerja');
        var grid = Ext.getCmp('gridharikerja');
        form.getForm().reset();

        if(createHarikerja == false){
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(false);
        }else{
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(true);
        }

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);
        grid.getSelectionModel().clearSelections();
        me.getStore('SMS.module.MasterHR.Harikerja.store.Harikerja').reload();

    },
    save: function(btn, evt, opts){
        var me                   = this;
        var form                 = btn.up('form').getForm();
        var name_harikerja       = form.findField('name_harikerja').getValue();
    
        // console.log(role);

        Ext.Ajax.request({
            url     : BASE_URL + 'harikerja/c_harikerja/saveHarikerja',
            method  : 'POST',
            params  : {
                name_harikerja        : name_harikerja,
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
                    var form    = Ext.getCmp('formharikerja');
                    var grid    = Ext.getCmp('gridharikerja');
                    form.getForm().reset();
                    me.resetPanel();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#gridharikerja')[0].getStore('SMS.module.MasterHR.Harikerja.store.Harikerja').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Username Telah Terdaftar - Silahkan Gunakan Username Lain',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                    var form    = Ext.getCmp('formharikerja');
                    var grid    = Ext.getCmp('gridharikerja');
                    form.getForm().reset();
                    me.resetPanel();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#gridharikerja')[0].getStore('SMS.module.MasterHR.Harikerja.store.Harikerja').reload();
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
        var me                = this;
        var form              = btn.up('form').getForm();
        var id                = form.findField('id').getValue();
        var name_harikerja    = form.findField('name_harikerja').getValue();
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'harikerja/c_harikerja/editHarikerja',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            name_harikerja    : name_harikerja,
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
                                var form    = Ext.getCmp('formharikerja');
                                var grid    = Ext.getCmp('gridharikerja');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridharikerja')[0].getStore('SMS.module.MasterHR.Harikerja.store.Harikerja').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Hari Kerja Telah Terdaftar - Silahkan Gunakan Hari Kerja Lain',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                                var form    = Ext.getCmp('formharikerja');
                                var grid    = Ext.getCmp('gridharikerja');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridharikerja')[0].getStore('SMS.module.MasterHR.Harikerja.store.Harikerja').reload();
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
                url     : BASE_URL + 'harikerja/c_harikerja/searchHarikerja',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('SMS.module.MasterHR.Harikerja.store.Harikerja');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },

    print : function(){
        window.location = BASE_URL + 'harikerja/c_harikerja/printHarikerja/';
    },
})
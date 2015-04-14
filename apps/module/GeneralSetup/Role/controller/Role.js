Ext.define('SMS.module.GeneralSetup.Role.controller.Role', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.getStore('SMS.module.GeneralSetup.Role.store.Role').load();
        me.getStore('SMS.module.GeneralSetup.Role.store.RoleMenu').load();
        me.control({

            "gridrole  button[action=delete]"      : {
                click: me.del
            }, 
            "#gridrole"                            : {
               itemclick: me.viewRole
            },            
            "formrole  button[action=save]"        : {
                click: me.save
            }, 
            "formrole  button[action=reset]"       : {
                click: me.reset
            },
            "gridroleorg"                          : {
               itemdblclick: me.addorg
            },
            "gridrole textfield[action=search]"    : {
               keypress: me.search
            },
            "gridrole button[action=print]"        : {
               click: me.print
            },
            "formrole button[action=update]"       : {
               click: me.update
            },
            "gridrolemenu"                         : {
                itemdblclick: me.addRole
            },
            "formrolemenu button[action=saveRole]"       : {
               click: me.saveRole
            },
        });
        me.callParent(arguments);
    },

    reloadStore: function(){
        var me = this;
        me.getStore('SMS.module.GeneralSetup.Role.store.Role').reload();
    },

    viewRole: function(grid, record, item, index, e, eOpts){
        var form = Ext.getCmp('formrole');
        var grid = Ext.getCmp('gridroleorg');
        form.getForm().setValues(record.data);

        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(true);
        // console.log(updateRole);
        
        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(false);

        //Get Role Menu
        var id = record.data.id;
        Ext.Ajax.request({
            url             : BASE_URL + 'GeneralSetup/c_role/getMenu',
            method          : 'POST',
            params          : {post : Ext.encode(id)},
            success         : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                var storeMenu = Ext.getStore('SMS.module.GeneralSetup.Role.store.RoleMenu');
                storeMenu.loadData([],false);
                storeMenu.add(data.data);
            }
        });
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
                        url             : BASE_URL + 'GeneralSetup/c_role/delRole',
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
                            } else {
                                var storeApproval = Ext.getStore('SMS.module.GeneralSetup.Role.store.Role');
                                storeApproval.removeAll();
                                storeApproval.add(data.data);
                                Ext.getCmp('formrole').getForm().reset();
                            }
                        }
                    });
                }
            }
        })
    },

    reset: function(btn) {//Reset Form
        var me = this;
        var form        = Ext.getCmp('formrole');
        var grid        = Ext.getCmp('gridrole');
        var gridrole    = Ext.getCmp('gridrolemenu');
        form.getForm().reset();

        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(false);

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);
        grid.getSelectionModel().clearSelections();
        me.getStore('SMS.module.GeneralSetup.Role.store.Role').reload();
        me.getStore('SMS.module.GeneralSetup.Role.store.RoleMenu').reload();

    },

    save: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
        var name        = form.findField('name').getValue();
        var isactive    = form.findField('isactive').getValue();
        // console.log(role);

        Ext.Ajax.request({
            url     : BASE_URL + 'GeneralSetup/c_role/saveRole',
            method  : 'POST',
            params  : {
                name        : name,
                isactive    : isactive
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
                    scope.reset();
                    me.getStore('SMS.module.GeneralSetup.Role.store.Role').removeAll();
                    me.getStore('SMS.module.GeneralSetup.Role.store.Role').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Rolename Telah Terdaftar - Silahkan Gunakan Rolename Lain',
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
    },

    update: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
        var id          = form.findField('id').getValue();
        var name        = form.findField('name').getValue();
        var isactive    = form.findField('isactive').getValue();
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'GeneralSetup/c_role/editRole',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            name        : name,
                            isactive    : isactive
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
                                me.reset();
                                me.getStore('SMS.module.GeneralSetup.Role.store.Role').removeAll();
                                me.getStore('SMS.module.GeneralSetup.Role.store.Role').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Rolename Telah Terdaftar - Silahkan Gunakan Rolename Lain',
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
                url     : BASE_URL + 'GeneralSetup/c_role/searchRole',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('SMS.module.GeneralSetup.Role.store.Role');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },

    print : function(){
        window.location = BASE_URL + 'GeneralSetup/c_role/printRole/';
    },

    addRole: function(grid, record, item, index, e, eOpts){
        // console.log(record);
        if(record.data.id_role === '' || record.data.id_role === null)
        {
            Ext.MessageBox.show({
                title           : 'Error',
                msg             : 'Pilih Role Terlebih Dahulu',
                icon            : Ext.MessageBox.ERROR,
                buttons         : Ext.MessageBox.OK
            });  
        } else {
            this.getStore('SMS.module.GeneralSetup.Role.store.ViewAllMenu').reload(); 
            this.getStore('SMS.module.GeneralSetup.Role.store.ViewAllMenu').removeAll();      
            var win = Ext.create('SMS.module.GeneralSetup.Role.view.form.FormRoleMenu');
            win.show();
            win.down('form').loadRecord(record);
        }
    },
    saveRole: function(btn, evt, opts){
        console.log('hai');
        var me          = this;
        var win         = btn.up('window');
        var form        = win.down('form').getForm();
        var id_role     = form.findField('id_role').getValue();
        var id          = form.findField('parent').getValue();
        var isactive    = form.findField('isactive').getValue();
        var iscreate    = form.findField('iscreate').getValue();
        var isupdate    = form.findField('isupdate').getValue();
        var isdelete    = form.findField('isdelete').getValue();
        var isprocess   = form.findField('isprocess').getValue();

        Ext.Ajax.request({
            url     : BASE_URL + 'GeneralSetup/c_role/saveRoleMenu',
            method  : 'POST',
            params  : {
                id_role      : id_role,
                id          : id,
                isactive    : isactive,
                iscreate    : iscreate,
                isupdate    : isupdate,
                isdelete    : isdelete,
                isprocess   : isprocess
            },
            success : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                // console.log(data.data);
                if(data.total === 0){
                    Ext.MessageBox.show({
                        title           : 'Informasi',
                        msg             : 'Data Telah Tersimpan',
                        icon            : Ext.MessageBox.INFO,
                        buttons         : Ext.MessageBox.OK
                    });
                    win.close();
                    var me = this;
                    var form        = Ext.getCmp('formrole');
                    var grid        = Ext.getCmp('gridrole');
                    var gridrole    = Ext.getCmp('gridrolemenu');
                    form.getForm().reset();

                    var saveButton = form.down('button[action=save]');
                    saveButton.setDisabled(false);

                    var updateButton = form.down('button[action=update]');
                    updateButton.setDisabled(true);
                    grid.getSelectionModel().clearSelections();
                    me.getStore('SMS.module.GeneralSetup.Role.store.Role').reload();
                    me.getStore('SMS.module.GeneralSetup.Role.store.RoleMenu').reload();
                    window.location.reload();
                }else if (data.total === 1){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Pilih Role Terlebih Dahulu',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Pilih Menu Terlebih Dahulu',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                }else if (data.total === 3){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Role Telah Terdaftar Ada',
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
});

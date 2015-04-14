Ext.define('SMS.module.GeneralSetup.User.controller.Users', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.getStore('SMS.module.GeneralSetup.User.store.Users').load();
        me.control({
            "gridusers  button[action=delete]"          : {
                click: me.del
            }, 
            "#gridusers"                                 : {
               itemclick: me.viewUsers
            },            
            "formusers  button[action=save]"        : {
                click: me.save
            }, 
            "formusers  button[action=reset]"       : {
                click: me.reset
            },
            "gridusersorg"                          : {
               itemdblclick: me.addorg
            },
            "gridusers textfield[action=search]"    : {
               keypress: me.search
            },
            "gridusers button[action=print]"        : {
               click: me.print
            },
            "formusers button[action=update]"       : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    reloadStore: function(){
        var me = this;
        me.getStore('SMS.module.GeneralSetup.User.store.Users').reload();
    },
    viewUsers: function(grid, record, item, index, e, eOpts){
        var id = record.data.id;
        var form = Ext.getCmp('formusers');
        var grid = Ext.getCmp('gridusersorg');
        form.getForm().setValues(record.data);

        // var saveButton = form.down('button[action=save]');
        // saveButton.setDisabled(true);
        // console.log(updateUsers);

        // if(updateUsers == false) {
            var updateButton = form.down('button[action=update]');
            updateButton.setDisabled(false);
        // } else { 
        //     var updateButton = form.down('button[action=update]');
        //     updateButton.setDisabled(true);
        // }
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
                        url             : BASE_URL + 'GeneralSetup/c_user/delUsers',
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
                                var storeApproval = Ext.getStore('SMS.module.GeneralSetup.User.store.Users');
                                storeApproval.removeAll();
                                storeApproval.add(data.data);
                                Ext.getCmp('formusers').getForm().reset();
                            }
                        }
                    });
                }
            }
        })
    },

    reset: function(btn, gridPanel, selected) {//Reset Form
        var me = this;
        var form = Ext.getCmp('formusers');
        var grid = Ext.getCmp('gridusers');
        form.getForm().reset();

        if(createUsers == false){
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(false);
        }else{
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(true);
        }

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);
        grid.getSelectionModel().clearSelections();
        me.getStore('SMS.module.GeneralSetup.User.store.Users').reload();

    },
    save: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
        var name        = form.findField('name').getValue();
        var role        = form.findField('id_role').getValue();
        var username    = form.findField('username').getValue();
        var password    = form.findField('password').getValue();
        var isactive    = form.findField('isactive').getValue();
        // console.log(role);

        Ext.Ajax.request({
            url     : BASE_URL + 'GeneralSetup/c_user/saveUsers',
            method  : 'POST',
            params  : {
                name        : name,
                role        : role,
                username    : username,
                password    : password,
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
                    me.reset();
                    me.getStore('SMS.module.GeneralSetup.User.store.Users').removeAll();
                    me.getStore('SMS.module.GeneralSetup.User.store.Users').reload();
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
    },
    update: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
                // console.log(form);
        var id          = form.findField('id').getValue();
        var username    = form.findField('username').getValue();
        var name        = form.findField('name').getValue();
        var role        = form.findField('id_role').getValue();
        var isactive    = form.findField('isactive').getValue();
// console.log(role);
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'GeneralSetup/c_user/editUsers',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            username    : username,
                            name        : name,
                            role        : role,
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
                                me.getStore('SMS.module.GeneralSetup.User.store.Users').removeAll();
                                me.getStore('SMS.module.GeneralSetup.User.store.Users').reload();
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
                url     : BASE_URL + 'GeneralSetup/c_user/searchUsers',
                method  : 'POST',
                params  : {username : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('SMS.module.GeneralSetup.User.store.Users');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },

    print : function(){
        window.location = BASE_URL + 'GeneralSetup/c_user/printUsers/';
    },
})

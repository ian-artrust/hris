Ext.define('SMS.module.Employee.Profile.controller.Profile', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        // me.getStore('SMS.module.Employee.Profile.store.Profile').load();
        me.control({
            "gridprofile button[action=delete]"          : {
                click: me.del
            }, 
            "#griddepartment"                                 : {
               itemclick: me.viewProfile
            },            
            "formprofile button[action=save]"        : {
                click: me.save
            }, 
            "formprofile button[action=reset]"       : {
                click: me.reset
            },
            "griddepartmentorg"                          : {
               itemdblclick: me.addorg
            },
            "gridprofiletextfield[action=search]"    : {
               keypress: me.search
            },
            "gridprofilebutton[action=print]"        : {
               click: me.print
            },
            "formprofilebutton[action=update]"       : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    reloadStore: function(){
        var me = this;
        // me.getStore('SMS.module.Employee.Profile.store.Profile').reload();
    },
    viewProfile: function(grid, record, item, index, e, eOpts){
        var id = record.data.id;
        var form = Ext.getCmp('formdepartment');
        var grid = Ext.getCmp('griddepartmentorg');
        form.getForm().setValues(record.data);

        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(true);
        console.log(updateProfile);

        if(updateProfile == false) {
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
                        url             : BASE_URL + 'department/c_dept/delProfile',
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
                                /* Yang Dicopy*/
                                var form    = Ext.getCmp('formdepartment');
                                var grid    = Ext.getCmp('griddepartment');
                                form.getForm().reset();
                                grid.getSelectionModel().deselectAll();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#griddepartment')[0].getStore('SMS.module.Employee.Profile.store.Profile').reload();
                                /* Sampai Sini */
                            } else {
                                var form    = Ext.getCmp('formdepartment');
                                var grid    = Ext.getCmp('griddepartment');
                                form.getForm().reset();
                                grid.getSelectionModel().deselectAll();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#griddepartment')[0].getStore('SMS.module.Employee.Profile.store.Profile').reload();
                            }
                        }
                    });
                }
            }
        })
    },

    reset: function(btn, gridPanel, selected) {//Reset Form
        var me = this;
        var form = Ext.getCmp('formdepartment');
        var grid = Ext.getCmp('griddepartment');
        form.getForm().reset();

        if(createProfile == false){
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(false);
        }else{
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(true);
        }

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);
        grid.getSelectionModel().clearSelections();
        me.getStore('SMS.module.Employee.Profile.store.Profile').reload();

    },
    save: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
        var kode_dept   = form.findField('kode_dept').getValue();
        var name_dept   = form.findField('name_dept').getValue();
        var active      = form.findField('active').getValue();
        // console.log(role);

        Ext.Ajax.request({
            url     : BASE_URL + 'department/c_dept/saveProfile',
            method  : 'POST',
            params  : {
                kode_dept       : kode_dept,
                name_dept       : name_dept,
                active          : active
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
                    var form    = Ext.getCmp('formdepartment');
                    var grid    = Ext.getCmp('griddepartment');
                    form.getForm().reset();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#griddepartment')[0].getStore('SMS.module.Employee.Profile.store.Profile').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Username Telah Terdaftar - Silahkan Gunakan Username Lain',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                    var form    = Ext.getCmp('formdepartment');
                    var grid    = Ext.getCmp('griddepartment');
                    form.getForm().reset();
                    grid.getSelectionModel().deselectAll();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#griddepartment')[0].getStore('SMS.module.Employee.Profile.store.Profile').reload();
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
        var kode_dept   = form.findField('kode_dept').getValue();
        var name_dept   = form.findField('name_dept').getValue();
        var active      = form.findField('active').getValue();
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'department/c_dept/editProfile',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            kode_dept   : kode_dept,
                            name_dept   : name_dept,
                            active      : active
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
                                var form    = Ext.getCmp('formdepartment');
                                var grid    = Ext.getCmp('griddepartment');
                                form.getForm().reset();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#griddepartment')[0].getStore('SMS.module.Employee.Profile.store.Profile').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Data Telah Terdaftar - Silahkan Gunakan Yang Lain',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                                var form    = Ext.getCmp('formdepartment');
                                var grid    = Ext.getCmp('griddepartment');
                                form.getForm().reset();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#griddepartment')[0].getStore('SMS.module.Employee.Profile.store.Profile').reload();
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
                url     : BASE_URL + 'department/c_dept/searchProfile',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('SMS.module.Employee.Profile.store.Profile');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },

    print : function(){
        window.location = BASE_URL + 'department/c_dept/printProfile/';
    },
})

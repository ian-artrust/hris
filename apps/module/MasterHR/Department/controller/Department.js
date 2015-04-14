Ext.define('SMS.module.MasterHR.Department.controller.Department', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.getStore('SMS.module.MasterHR.Department.store.Department').load();
        me.control({
            "griddepartment  button[action=delete]"          : {
                click: me.del
            }, 
            "#griddepartment"                                 : {
               itemclick: me.viewDepartment
            },            
            "formdepartment  button[action=save]"        : {
                click: me.save
            }, 
            "formdepartment  button[action=reset]"       : {
                click: me.resetPanel
            },
            "griddepartmentorg"                          : {
               itemdblclick: me.addorg
            },
            "griddepartment textfield[action=search]"    : {
               keypress: me.search
            },
            "griddepartment button[action=print]"        : {
               click: me.print
            },
            "formdepartment button[action=update]"       : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    reloadStore: function(){
        var me = this;
        me.getStore('SMS.module.MasterHR.Department.store.Department').reload();
    },
    viewDepartment: function(grid, record, item, index, e, eOpts){
        var id = record.data.id;
        var form = Ext.getCmp('formdepartment');
        var grid = Ext.getCmp('griddepartmentorg');
        form.getForm().setValues(record.data);

        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(true);
        console.log(updateDepartment);

        if(updateDepartment == false) {
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
                        url             : BASE_URL + 'department/c_dept/delDepartment',
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
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#griddepartment')[0].getStore('SMS.module.MasterHR.Department.store.Department').reload();
                                /* Sampai Sini */
                            } else {
                                var form    = Ext.getCmp('formdepartment');
                                var grid    = Ext.getCmp('griddepartment');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#griddepartment')[0].getStore('SMS.module.MasterHR.Department.store.Department').reload();
                            }
                        }
                    });
                }
            }
        })
    },

    resetPanel: function(btn, gridPanel, selected) {//Reset Form
        var me = this;
        var form = Ext.getCmp('formdepartment');
        var grid = Ext.getCmp('griddepartment');
        form.getForm().reset();

        if(createDepartment == false){
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(false);
        }else{
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(true);
        }

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);
        grid.getSelectionModel().clearSelections();
        me.getStore('SMS.module.MasterHR.Department.store.Department').reload();

    },
    save: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
        var kode_dept   = form.findField('kode_dept').getValue();
        var name_dept   = form.findField('name_dept').getValue();
        var active      = form.findField('active').getValue();
        // console.log(role);

        Ext.Ajax.request({
            url     : BASE_URL + 'department/c_dept/saveDepartment',
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
                    me.resetPanel();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#griddepartment')[0].getStore('SMS.module.MasterHR.Department.store.Department').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Department Telah Terdaftar - Silahkan Gunakan Department Lain',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                    var form    = Ext.getCmp('formdepartment');
                    var grid    = Ext.getCmp('griddepartment');
                    form.getForm().reset();
                    me.resetPanel();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#griddepartment')[0].getStore('SMS.module.MasterHR.Department.store.Department').reload();
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
                        url     : BASE_URL + 'department/c_dept/editDepartment',
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
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#griddepartment')[0].getStore('SMS.module.MasterHR.Department.store.Department').reload();
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
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#griddepartment')[0].getStore('SMS.module.MasterHR.Department.store.Department').reload();
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
                url     : BASE_URL + 'department/c_dept/searchDepartment',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('SMS.module.MasterHR.Department.store.Department');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },

    print : function(){
        window.location = BASE_URL + 'department/c_dept/printDepartment/';
    },
})

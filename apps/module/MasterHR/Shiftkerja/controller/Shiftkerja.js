Ext.define('SMS.module.MasterHR.Shiftkerja.controller.Shiftkerja', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.getStore('SMS.module.MasterHR.Shiftkerja.store.Shiftkerja').load();
        me.control({
            "gridshiftkerja  button[action=delete]"          : {
                click: me.del
            }, 
            "#gridshiftkerja"                                 : {
               itemclick: me.viewShiftkerja
            },            
            "formshiftkerja  button[action=save]"        : {
                click: me.save
            }, 
            "formshiftkerja  button[action=reset]"       : {
                click: me.resetPanel
            },
            "gridshiftkerjaorg"                          : {
               itemdblclick: me.addorg
            },
            "gridshiftkerja textfield[action=search]"    : {
               keypress: me.search
            },
            "gridshiftkerja button[action=print]"        : {
               click: me.print
            },
            "formshiftkerja button[action=update]"       : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    reloadStore: function(){
        var me = this;
        me.getStore('SMS.module.MasterHR.Shiftkerja.store.Shiftkerja').reload();
    },
    viewShiftkerja: function(grid, record, item, index, e, eOpts){
        var id = record.data.id;
        var form = Ext.getCmp('formshiftkerja');
        var grid = Ext.getCmp('gridshiftkerja');
        form.getForm().setValues(record.data);

        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(true);
        console.log(updateShiftkerja);

        if(updateShiftkerja == false) {
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
                        url             : BASE_URL + 'shiftkerja/c_shiftkerja/delShiftkerja',
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
                                var form    = Ext.getCmp('formshiftkerja');
                                var grid    = Ext.getCmp('gridshiftkerja');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridshiftkerja')[0].getStore('SMS.module.MasterHR.Shiftkerja.store.Shiftkerja').reload();                            
                            } else {
                                var form    = Ext.getCmp('formshiftkerja');
                                var grid    = Ext.getCmp('gridshiftkerja');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridshiftkerja')[0].getStore('SMS.module.MasterHR.Shiftkerja.store.Shiftkerja').reload();
                            }
                        }
                    });
                }
            }
        })
    },

    resetPanel: function(btn, gridPanel, selected) {//Reset Form
        var me = this;
        var form = Ext.getCmp('formshiftkerja');
        var grid = Ext.getCmp('gridshiftkerja');
        form.getForm().reset();

        if(createShiftkerja == false){
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(false);
        }else{
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(true);
        }

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);
        grid.getSelectionModel().clearSelections();
        me.getStore('SMS.module.MasterHR.Shiftkerja.store.Shiftkerja').reload();

    },
    save: function(btn, evt, opts){
        var me               = this;
        var form             = btn.up('form').getForm();
        var name_shift  = form.findField('name_shift').getValue();
        // console.log(role);

        Ext.Ajax.request({
            url     : BASE_URL + 'shiftkerja/c_shiftkerja/saveShiftkerja',
            method  : 'POST',
            params  : {
                name_shift        : name_shift,
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
                    var form    = Ext.getCmp('formshiftkerja');
                    var grid    = Ext.getCmp('gridshiftkerja');
                    form.getForm().reset();
                    me.resetPanel();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#gridshiftkerja')[0].getStore('SMS.module.MasterHR.Shiftkerja.store.Shiftkerja').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Shift Telah Terdaftar - Silahkan Gunakan Shift Lain',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                    var form    = Ext.getCmp('formshiftkerja');
                    var grid    = Ext.getCmp('gridshiftkerja');
                    form.getForm().reset();
                    me.resetPanel();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#gridshitfkerja')[0].getStore('SMS.module.MasterHR.Shiftkerja.store.Shiftkerja').reload();
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
        var me                 = this;
        var form               = btn.up('form').getForm();
        var id                 = form.findField('id').getValue();
        var name_shift         = form.findField('name_shift').getValue();
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'shiftkerja/c_shiftkerja/editShiftkerja',
                        method  : 'POST',
                        params  : {
                            id            : id,
                            name_shift    : name_shift
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
                                var form    = Ext.getCmp('formshiftkerja');
                                var grid    = Ext.getCmp('gridshiftkerja');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridshiftkerja')[0].getStore('SMS.module.MasterHR.Shiftkerja.store.Shiftkerja').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Shift Telah Terdaftar - Silahkan Gunakan Shift Lain',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                                var form    = Ext.getCmp('formshiftkerja');
                                var grid    = Ext.getCmp('gridshiftkerja');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridshitfkerja')[0].getStore('SMS.module.MasterHR.Shiftkerja.store.Shiftkerja').reload();
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
                url     : BASE_URL + 'shiftkerja/c_shiftkerja/searchShiftkerja',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('SMS.module.MasterHR.Shiftkerja.store.Shiftkerja');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },

    print : function(){
        window.location = BASE_URL + 'shiftkerja/c_shiftkerja/printShiftkerja/';
    },
})

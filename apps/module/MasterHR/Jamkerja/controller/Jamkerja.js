Ext.define('SMS.module.MasterHR.Jamkerja.controller.Jamkerja', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.getStore('SMS.module.MasterHR.Jamkerja.store.Jamkerja').load();
        me.control({
            "gridjamkerja  button[action=delete]"          : {
                click: me.del
            }, 
            "#gridjamkerja"                                 : {
               itemclick: me.viewJamkerja
            },            
            "formjamkerja  button[action=save]"        : {
                click: me.save
            }, 
            "formjamkerja  button[action=reset]"       : {
                click: me.resetPanel
            },
            "gridjamkerjaorg"                          : {
               itemdblclick: me.addorg
            },
            "gridjamkerja textfield[action=search]"    : {
               keypress: me.search
            },
            "gridjamkerja button[action=print]"        : {
               click: me.print
            },
            "formjamkerja button[action=update]"       : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    reloadStore: function(){
        var me = this;
        me.getStore('SMS.module.MasterHR.Jamkerja.store.Jamkerja').reload();
    },
    viewJamkerja: function(grid, record, item, index, e, eOpts){
        var id = record.data.id;
        var form = Ext.getCmp('formjamkerja');
        var grid = Ext.getCmp('gridjamkerja');
        form.getForm().setValues(record.data);

        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(true);
        console.log(updateJamkerja);

        if(updateJamkerja == false) {
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
                        url             : BASE_URL + 'jamkerja/c_jamkerja/delJamkerja',
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
                                var form    = Ext.getCmp('formjamkerja');
                                var grid    = Ext.getCmp('gridjamkerja');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridjamkerja')[0].getStore('SMS.module.MasterHR.Jamkerja.store.Jamkerja').reload();                           
                            } else {
                                var form    = Ext.getCmp('formjamkerja');
                                var grid    = Ext.getCmp('gridjamkerja');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridjamkerja')[0].getStore('SMS.module.MasterHR.Jamkerja.store.Jamkerja').reload();  
                            }
                        }
                    });
                }
            }
        })
    },

    resetPanel: function(btn, gridPanel, selected) {//Reset Form
        var me = this;
        var form = Ext.getCmp('formjamkerja');
        var grid = Ext.getCmp('gridjamkerja');
        form.getForm().reset();

        if(createJamkerja == false){
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(false);
        }else{
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(true);
        }

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);
        grid.getSelectionModel().clearSelections();
        me.getStore('SMS.module.MasterHR.Jamkerja.store.Jamkerja').reload();

    },
    save: function(btn, evt, opts){
        var me                  = this;
        var form                = btn.up('form').getForm();
        var name_jamkerja       = form.findField('name_jamkerja').getValue();
        // console.log(role);

        Ext.Ajax.request({
            url     : BASE_URL + 'jamkerja/c_jamkerja/saveJamkerja',
            method  : 'POST',
            params  : {
                name_jamkerja        : name_jamkerja,
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
                    var form    = Ext.getCmp('formjamkerja');
                    var grid    = Ext.getCmp('gridjamkerja');
                    form.getForm().reset();
                    me.resetPanel();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#gridjamkerja')[0].getStore('SMS.module.MasterHR.Jamkerja.store.Jamkerja').reload();  
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Username Telah Terdaftar - Silahkan Gunakan Username Lain',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                    var form    = Ext.getCmp('formjamkerja');
                    var grid    = Ext.getCmp('gridjamkerja');
                    form.getForm().reset();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#gridjamkerja')[0].getStore('SMS.module.MasterHR.Jamkerja.store.Jamkerja').reload();  
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
        var me             = this;
        var form           = btn.up('form').getForm();
        var id             = form.findField('id').getValue();
        var name_jamkerja  = form.findField('name_jamkerja').getValue();
                // console.log(form);
          
    
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
                        url     : BASE_URL + 'jamkerja/c_jamkerja/editJamkerja',
                        method  : 'POST',
                        params  : {
                            id : id,
                            name_jamkerja : name_jamkerja
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
                                var form    = Ext.getCmp('formjamkerja');
                                var grid    = Ext.getCmp('gridjamkerja');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridjamkerja')[0].getStore('SMS.module.MasterHR.Jamkerja.store.Jamkerja').reload();  
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Jam Kerja Telah Terdaftar - Silahkan Gunakan Jam Kerja Lain',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                                var form    = Ext.getCmp('formjamkerja');
                                var grid    = Ext.getCmp('gridjamkerja');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridjamkerja')[0].getStore('SMS.module.MasterHR.Jamkerja.store.Jamkerja').reload();  
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
                url     : BASE_URL + 'jamkerja/c_jamkerja/searchJamkerja',
                method  : 'POST',
                params  : {name_jamkerja : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('SMS.module.MasterHR.Jamkerja.store.Jamkerja');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },

    print : function(){
        window.location = BASE_URL + 'jamkerja/c_jamkerja/printJamkerja/';
    },
})

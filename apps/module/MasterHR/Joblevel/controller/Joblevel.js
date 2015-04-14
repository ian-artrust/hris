Ext.define('SMS.module.MasterHR.Joblevel.controller.Joblevel', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.getStore('SMS.module.MasterHR.Joblevel.store.Joblevel').load();
        me.control({
            "gridjoblevel  button[action=delete]"          : {
                click: me.del
            }, 
            "#gridjoblevel"                                 : {
               itemclick: me.viewJoblevel
            },            
            "formjoblevel  button[action=save]"        : {
                click: me.save
            }, 
            "formjoblevel  button[action=reset]"       : {
                click: me.resetPanel
            },
            "gridjoblevelorg"                          : {
               itemdblclick: me.addorg
            },
            "gridjoblevel textfield[action=search]"    : {
               keypress: me.search
            },
            "gridjoblevel button[action=print]"        : {
               click: me.print
            },
            "formjoblevel button[action=update]"       : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    reloadStore: function(){
        var me = this;
        me.getStore('SMS.module.MasterHR.Joblevel.store.Joblevel').reload();
    },
    viewJoblevel: function(grid, record, item, index, e, eOpts){
        var id = record.data.id;
        var form = Ext.getCmp('formjoblevel');
        var grid = Ext.getCmp('gridjoblevel');
        form.getForm().setValues(record.data);

        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(true);
        console.log(updateJoblevel);

        if(updateJoblevel == false) {
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
                        url             : BASE_URL + 'joblevel/c_joblevel/delJoblevel',
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
                                var form    = Ext.getCmp('formjoblevel');
                                var grid    = Ext.getCmp('gridjoblevel');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridjoblevel')[0].getStore('SMS.module.MasterHR.Joblevel.store.Joblevel').reload();                            
                            } else {
                                var form    = Ext.getCmp('formjoblevel');
                                var grid    = Ext.getCmp('gridjoblevel');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridjoblevel')[0].getStore('SMS.module.MasterHR.Joblevel.store.Joblevel').reload(); 
                            }
                        }
                    });
                }
            }
        })
    },

    resetPanel: function(btn, gridPanel, selected) {//Reset Form
        var me = this;
        var form = Ext.getCmp('formjoblevel');
        var grid = Ext.getCmp('gridjoblevel');
        form.getForm().reset();

        if(createJoblevel == false){
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(false);
        }else{
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(true);
        }

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);
        grid.getSelectionModel().clearSelections();
        me.getStore('SMS.module.MasterHR.Joblevel.store.Joblevel').reload();

    },
    save: function(btn, evt, opts){
        var me                  = this;
        var form                = btn.up('form').getForm();
        var name_joblevel       = form.findField('name_joblevel').getValue();
        var ot                  = form.findField('ot').getValue();
        var active              = form.findField('active').getValue();
        // console.log(role);

        Ext.Ajax.request({
            url     : BASE_URL + 'joblevel/c_joblevel/saveJoblevel',
            method  : 'POST',
            params  : {
                name_joblevel        : name_joblevel,
                ot                   : ot,
                active               : active,
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
                    var form    = Ext.getCmp('formjoblevel');
                    var grid    = Ext.getCmp('gridjoblevel');
                    form.getForm().reset();
                    me.resetPanel();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#gridjoblevel')[0].getStore('SMS.module.MasterHR.Joblevel.store.Joblevel').reload(); 
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Joblevel Telah Terdaftar - Silahkan Gunakan joblevel Lain',
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
        var me              = this;
        var form            = btn.up('form').getForm();
        var id              = form.findField('id').getValue();
        var name_joblevel   = form.findField('name_joblevel').getValue();
        var ot              = form.findField('ot').getValue();
        var active          = form.findField('active').getValue();
        Ext.MessageBox.show({
            title           : 'Konfirmasi',
            msg             : 'Anda yakin akan merubah data?',
            buttons         : Ext.Msg.YESNO,
            icon            : Ext.MessageBox.WARNING,
            width           : 450,
            fn              : function(btn, evtObj){
                if (btn == 'yes') {
                    Ext.Ajax.request({
                        url     : BASE_URL + 'joblevel/c_joblevel/editJoblevel',
                        method  : 'POST',
                        params  : {
                            id              : id,
                            name_joblevel   : name_joblevel,
                            ot              : ot,
                            active          : active
                        },
                        success : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            if(data.total === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'Data Telah Dirubah',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });
                                var form    = Ext.getCmp('formjoblevel');
                                var grid    = Ext.getCmp('gridjoblevel');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridjoblevel')[0].getStore('SMS.module.MasterHR.Joblevel.store.Joblevel').reload(); 
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Job Level Telah Terdaftar - Silahkan Gunakan Job Level Lain',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                                var form    = Ext.getCmp('formjoblevel');
                                var grid    = Ext.getCmp('gridjoblevel');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridjoblevel')[0].getStore('SMS.module.MasterHR.Joblevel.store.Joblevel').reload(); 
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
                url     : BASE_URL + 'joblevel/c_joblevel/searchJoblevel',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('SMS.module.MasterHR.Joblevel.store.Joblevel');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },

    print : function(){
        window.location = BASE_URL + 'joblevel/c_joblevel/printJoblevel/';
    },
})

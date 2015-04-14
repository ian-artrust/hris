Ext.define('SMS.module.GeneralSetup.Menu.controller.Menu', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.getStore('SMS.module.GeneralSetup.Menu.store.Menu').load();
        me.control({
            "gridmenu  button[action=delete]"          : {
                click: me.del
            }, 
            "#gridmenu"                                 : {
               itemclick: me.viewMenu
            },            
            "formmenu  button[action=save]"        : {
                click: me.save
            }, 
            "formmenu  button[action=reset]"       : {
                click: me.reset
            },
            "gridmenuorg"                          : {
               itemdblclick: me.addorg
            },
            "gridmenu textfield[action=search]"    : {
               keypress: me.search
            },
            "gridmenu button[action=print]"        : {
               click: me.print
            },
            "formmenu button[action=update]"       : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    reloadStore: function(){
        var me = this;
        me.getStore('SMS.module.GeneralSetup.Menu.store.Menu').reload();
    },
    viewMenu: function(grid, record, item, index, e, eOpts){
        var id = record.data.id;
        var form = Ext.getCmp('formmenu');
        var grid = Ext.getCmp('gridmenu');
        form.getForm().setValues(record.data);

        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(true);
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
                        url             : BASE_URL + 'GeneralSetup/c_menu/delMenu',
                        method          : 'POST',
                        params          : {post : Ext.encode(me.CheckedDataEdit)},
                        success         : function(response){
                            var data    = Ext.JSON.decode(response.responseText);
                            // console.log(data.msg);
                            if(data.msg === 1){
                                Ext.MessageBox.show({
                                    title           : 'Informasi',
                                    msg             : 'ERROR!.. Cek Child Menu',
                                    icon            : Ext.MessageBox.INFO,
                                    buttons         : Ext.MessageBox.OK
                                });                             
                            } else {
                                var storeApproval = Ext.getStore('SMS.module.GeneralSetup.Menu.store.Menu');
                                storeApproval.removeAll();
                                storeApproval.add(data.data);
                                Ext.getCmp('formmenu').getForm().reset();
                            }
                        }
                    });
                }
            }
        })
    },

    reset: function(btn) {//Reset Form
        var me = this;
        var form = Ext.getCmp('formmenu');
        var grid = Ext.getCmp('gridmenu');
        form.getForm().reset();

        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(false);

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);
        grid.getSelectionModel().clearSelections();
        me.getStore('SMS.module.GeneralSetup.Menu.store.Menu').reload();

    },
    save: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
        var id          = form.findField('id').getValue();
        var name        = form.findField('name').getValue();
        var parent      = form.findField('parent').getValue();
        var icon        = form.findField('icon').getValue();
        var isactive    = form.findField('isactive').getValue();
        // console.log(menu);

        Ext.Ajax.request({
            url     : BASE_URL + 'GeneralSetup/c_menu/saveMenu',
            method  : 'POST',
            params  : {
                 id         : id,
                name        : name,
                parent      : parent,
                icon        : icon,
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
                    Ext.getCmp('formmenu').getForm().reset();
                    me.getStore('SMS.module.GeneralSetup.Menu.store.Menu').removeAll();
                    me.getStore('SMS.module.GeneralSetup.Menu.store.Menu').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Menuname Telah Terdaftar - Silahkan Gunakan Menuname Lain',
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
        var parent      = form.findField('id_menu').getValue();
        var icon        = form.findField('icon').getValue();
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
                        url     : BASE_URL + 'GeneralSetup/c_menu/editMenu',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            name        : name,
                            parent      : parent,
                            icon        : icon,
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
                                me.getStore('SMS.module.GeneralSetup.Menu.store.Menu').removeAll();
                                me.getStore('SMS.module.GeneralSetup.Menu.store.Menu').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Menuname Telah Terdaftar - Silahkan Gunakan Menuname Lain',
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
                url     : BASE_URL + 'GeneralSetup/c_menu/searchMenu',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('SMS.module.GeneralSetup.Menu.store.Menu');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },

    print : function(){
        window.location = BASE_URL + 'GeneralSetup/c_menu/printMenu/';
    },
})

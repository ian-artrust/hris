Ext.define('SMS.module.MasterHR.Section.controller.Section', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.getStore('SMS.module.MasterHR.Section.store.Section').load();
        me.control({
            "gridsection  button[action=delete]"          : {
                click: me.del
            }, 
            "#gridsection"                                 : {
               itemclick: me.viewSection
            },            
            "formsection  button[action=save]"        : {
                click: me.save
            }, 
            "formsection  button[action=reset]"       : {
                click: me.resetPanel
            },
            "gridsectionorg"                          : {
               itemdblclick: me.addorg
            },
            "gridsection textfield[action=search]"    : {
               keypress: me.search
            },
            "gridsection button[action=print]"        : {
               click: me.print
            },
            "formsection button[action=update]"       : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    reloadStore: function(){
        var me = this;
        me.getStore('SMS.module.MasterHR.Section.store.Section').reload();
    },
    viewSection: function(grid, record, item, index, e, eOpts){
        var id = record.data.id;
        var form = Ext.getCmp('formsection');
        var grid = Ext.getCmp('gridsectionorg');
        form.getForm().setValues(record.data);

        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(true);
        console.log(updateSection);

        if(updateSection == false) {
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
                        url             : BASE_URL + 'section/c_section/delSection',
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
                                var form    = Ext.getCmp('formsection');
                                var grid    = Ext.getCmp('gridsection');
                                form.getForm().reset();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridsection')[0].getStore('SMS.module.MasterHR.Section.store.Section').reload();                           
                            } else {
                                var form    = Ext.getCmp('formsection');
                                var grid    = Ext.getCmp('gridsection');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridsection')[0].getStore('SMS.module.MasterHR.Section.store.Section').reload(); 
                            }
                        }
                    });
                }
            }
        })
    },

    resetPanel: function(btn, gridPanel, selected) {//Reset Form
        var me = this;
        var form = Ext.getCmp('formsection');
        var grid = Ext.getCmp('gridsection');
        form.getForm().reset();

        if(createSection == false){
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(false);
        }else{
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(true);
        }

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);
        grid.getSelectionModel().clearSelections();
        me.getStore('SMS.module.MasterHR.Section.store.Section').reload();

    },
    save: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
        var id_dept     = form.findField('id_dept').getValue();
        var name_sect   = form.findField('name_sect').getValue();
        var active      = form.findField('active').getValue();
        // console.log(role);

        Ext.Ajax.request({
            url     : BASE_URL + 'section/c_section/saveSection',
            method  : 'POST',
            params  : {
                id_dept     : id_dept,
                name_sect   : name_sect,
                active      : active
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
                    var form    = Ext.getCmp('formsection');
                    var grid    = Ext.getCmp('gridsection');
                    form.getForm().reset();
                    me.resetPanel();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#gridsection')[0].getStore('SMS.module.MasterHR.Section.store.Section').reload(); 
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Section Telah Terdaftar - Silahkan Gunakan Section Lain',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                    var form    = Ext.getCmp('formsection');
                    var grid    = Ext.getCmp('gridsection');
                    form.getForm().reset();
                    me.resetPanel();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#gridsection')[0].getStore('SMS.module.MasterHR.Section.store.Section').reload(); 
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
        var id_dept     = form.findField('id_dept').getValue();
        var name_sect   = form.findField('name_sect').getValue();
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
                        url     : BASE_URL + 'section/c_section/editSection',
                        method  : 'POST',
                        params  : {
                            id          : id,
                            id_dept     : id_dept,
                            name_sect   : name_sect,
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
                               var form    = Ext.getCmp('formsection');
                                var grid    = Ext.getCmp('gridsection');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridsection')[0].getStore('SMS.module.MasterHR.Section.store.Section').reload(); 
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Section Telah Terdaftar - Silahkan Gunakan Section Lain',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                                var form    = Ext.getCmp('formsection');
                                var grid    = Ext.getCmp('gridsection');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridsection')[0].getStore('SMS.module.MasterHR.Section.store.Section').reload(); 
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
                url     : BASE_URL + 'section/c_section/searchSection',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('SMS.module.MasterHR.Section.store.Section');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },

    print : function(){
        window.location = BASE_URL + 'section/c_section/printSection/';
    },
})

Ext.define('SMS.module.MasterHR.Jobname.controller.Jobname', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.getStore('SMS.module.MasterHR.Jobname.store.Jobname').load();
        me.control({
            "gridjobname  button[action=delete]"          : {
                click: me.del
            }, 
            "#gridjobname"                                 : {
               itemclick: me.viewJobname
            },            
            "formjobname  button[action=save]"        : {
                click: me.save
            }, 
            "formjobname  button[action=reset]"       : {
                click: me.resetPanel
            },
            "gridjobname"                          : {
               itemdblclick: me.add
            },
            "gridjobname textfield[action=search]"    : {
               keypress: me.search
            },
            "gridjobname button[action=print]"        : {
               click: me.print
            },
            "formjobname button[action=update]"       : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },
    reloadStore: function(){
        var me = this;
        me.getStore('SMS.module.MasterHR.Jobname.store.Jobname').reload();
    },
    viewJobname: function(grid, record, item, index, e, eOpts){
        var id = record.data.id;
        var form = Ext.getCmp('formjobname');
        var grid = Ext.getCmp('gridjobname');
        form.getForm().setValues(record.data);

        var saveButton = form.down('button[action=save]');
        saveButton.setDisabled(true);
        console.log(updateJobname);

        if(updateJobname == false) {
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
                        url             : BASE_URL + 'jobname/c_jobname/delJobname',
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
                                var storeApproval = Ext.getStore('SMS.module.MasterHR.Jobname.store.Jobname');
                                storeApproval.removeAll();
                                storeApproval.add(data.data);
                                Ext.getCmp('formjobname').getForm().reset();
                            }
                        }
                    });
                }
            }
        })
    },

    resetPanel: function(btn, gridPanel, selected) {//Reset Form
        var me = this;
        var form = Ext.getCmp('formjobname');
        var grid = Ext.getCmp('gridjobname');
        form.getForm().reset();

        if(createJobname == false){
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(false);
        }else{
            var saveButton = form.down('button[action=save]');
            saveButton.setDisabled(true);
        }

        var updateButton = form.down('button[action=update]');
        updateButton.setDisabled(true);
        grid.getSelectionModel().clearSelections();
        me.getStore('SMS.module.MasterHR.Jobname.store.Jobname').reload();

    },
    save: function(btn, evt, opts){
        var me               = this;
        var form             = btn.up('form').getForm();
        var name_dept        = form.findField('name_dept').getValue();
        var name_sect        = form.findField('name_sect').getValue();
        var name_joblevel    = form.findField('name_joblevel').getValue();
        var name_jobname     = form.findField('name_jobname').getValue();
        var active         = form.findField('active').getValue();
        // console.log(role);

        Ext.Ajax.request({
            url     : BASE_URL + 'jobname/c_jobname/saveJobname',
            method  : 'POST',
            params  : {
                name_dept        : name_dept,
                name_sect        : name_sect,
                name_jobelevel   : name_jobelevel,
                name_jobname     : name_jobname,
                active           : active
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
                    var form    = Ext.getCmp('formjobname');
                    var grid    = Ext.getCmp('gridjobname');
                    form.getForm().reset();
                    me.resetPanel();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#gridjobname')[0].getStore('SMS.module.MasterHR.Jobname.store.Jobname').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Jobname Telah Terdaftar - Silahkan Gunakan Jobname Lain',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                    var form    = Ext.getCmp('formjobname');
                    var grid    = Ext.getCmp('gridjobname');
                    form.getForm().reset();
                    me.resetPanel();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#gridjobname')[0].getStore('SMS.module.MasterHR.Jobname.store.Jobname').reload();
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
                // console.log(form);
        var id              = form.findField('id').getValue();
        var name_dept       = form.findField('name_dept').getValue();
        var name_sect       = form.findField('name_sect').getValue();
        var name_joblevel   = form.findField('name_joblevel').getValue();
        var name_jobname    = form.findField('name_jobname').getValue();
        var active          = form.findField('active').getValue();
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
                        url     : BASE_URL + 'jobname/c_jobname/editJobname',
                        method  : 'POST',
                        params  : {
                            id              : id,
                            name_dept       : name_dept,
                            name_sect       : name_sect,
                            name_joblevel   : name_joblevel,
                            name_jobname    : name_jobname,
                            isactive        : active
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
                                var form    = Ext.getCmp('formjobname');
                                var grid    = Ext.getCmp('gridjobname');
                                form.getForm().reset();
                                me.resetPanel();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridjobname')[0].getStore('SMS.module.MasterHR.Jobname.store.Jobname').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Jobname Telah Terdaftar - Silahkan Gunakan Jobname Lain',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                                var form    = Ext.getCmp('formjobname');
                                var grid    = Ext.getCmp('gridjobname');
                                form.getForm().reset();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridjobname')[0].getStore('SMS.module.MasterHR.Jobname.store.Jobname').reload();
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
                url     : BASE_URL + 'jobname/c_jobname/searchJobname',
                method  : 'POST',
                params  : {name : value},
                success : function(response){
                    var data    = Ext.JSON.decode(response.responseText);
                    if(data.success){
                            var storeApproval = Ext.getStore('SMS.module.MasterHR.Jobname.store.Jobname');
                            storeApproval.removeAll();
                            storeApproval.add(data.data);
                    }
                }
            });
    },

    print : function(){
        window.location = BASE_URL + 'jobname/c_jobname/printJobname/';
    },
})

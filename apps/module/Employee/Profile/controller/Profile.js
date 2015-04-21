Ext.define('SMS.module.Employee.Profile.controller.Profile', {
    extend  : 'Ext.app.Controller',
    CheckedDataEdit: [],

    init: function() {
        var me = this;
        me.getStore('SMS.module.Employee.Profile.store.Profile').load();
        me.getStore('SMS.module.Employee.Profile.store.Pendidikan').load();
        me.getStore('SMS.module.Employee.Profile.store.Keahlian').load();
        me.control({
            "gridprofile button[action=delete]"     : {
                click: me.del
            }, 
            "#gridprofile"                          : {
               select : me.viewProfile
            },            
            "formprofile button[action=save]"       : {
                click: me.save
            }, 
            "biography button[action=reset]"        : {
                click: me.reset
            },
            "pendidikan button[action=reset]"       : {
                click: me.reset
            },
            "keahlian button[action=reset]"       : {
                click: me.reset
            },
            "gridprofile"                           : {
               itemdblclick: me.addorg
            },
            "gridprofiletextfield[action=search]"   : {
               keypress: me.search
            },
            "gridprofilebutton[action=print]"       : {
               click: me.print
            },
            "formprofilebutton[action=update]"      : {
               click: me.update
            }
        });
        me.callParent(arguments);
    },

    reloadStore: function(){
        var me = this;
        me.getStore('SMS.module.Employee.Profile.store.Profile').reload();
    },

    viewProfile: function(grid, record, item, index, e, eOpts){
        var me      = this;
        var id      = record.data.id;
        var form    = Ext.getCmp('biography');
        var grid    = Ext.getCmp('gridprofile');
        form.getForm().setValues(record.data);
        var pic     = form.queryById('imagePreview');
        pic.setSrc(record.data.userfile);
        form.getForm().setValues(record.data);

        /*====== Load Data Pendidikan ======*/
        var form = Ext.getCmp('pendidikan');
        var grid = Ext.getCmp('gridpendidikan');
        form.getForm().setValues(record.data);

        var id_bio =  record.data.id;
        Ext.Ajax.request({
            url             : BASE_URL + 'profile/c_profile/getPendidikan',
            method          : 'POST',
            params          : {post : Ext.encode(id_bio)},
            success         : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                var storeMenu = Ext.getStore('SMS.module.Employee.Profile.store.Pendidikan');
                storeMenu.loadData([],false);
                // storeMenu.removeAll();
                storeMenu.add(data.data);
            }
        });

        /*====== Load Data Keahlian ======*/
        var form = Ext.getCmp('keahlian');
        var grid = Ext.getCmp('gridkeahlian');
        form.getForm().setValues(record.data);

        var id_bio = record.data.id_bio;
        Ext.Ajax.request({
            url             : BASE_URL + 'profile/c_profile/getKeahlian',
            method          : 'POST',
            params          : {post : Ext.encode(id_bio)},
            success         : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                var storeMenu = Ext.getStore('SMS.module.Employee.Profile.store.Keahlian');
                storeMenu.loadData([],false);
                storeMenu.add(data.data);
            }
        });
    },

    viewPendidikan : function(grid, record, item, index, e, eOpts){
        var form = Ext.getCmp('pendidikan');
        var grid = Ext.getCmp('gridpendidikan');
        form.getForm().setValues(record.data);

        var id_bio =  record.data.id;
        Ext.Ajax.request({
            url             : BASE_URL + 'profile/c_profile/getPendidikan',
            method          : 'POST',
            params          : {post : Ext.encode(id_bio)},
            success         : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                var storeMenu = Ext.getStore('SMS.module.Employee.Profile.store.Pendidikan');
                storeMenu.loadData([],false);
                // storeMenu.removeAll();
                storeMenu.add(data.data);
            }
        });
    },

    viewKeahlian : function(grid, record, item, index, e, eOpts){
        var form = Ext.getCmp('keahlian');
        var grid = Ext.getCmp('gridprofile');
        form.getForm().setValues(record.data);

        var id_bio = record.data.id_bio;
        Ext.Ajax.request({
            url             : BASE_URL + 'profile/c_profile/getKeahlian',
            method          : 'POST',
            params          : {post : Ext.encode(id_bio)},
            success         : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                var storeMenu = Ext.getStore('SMS.module.Employee.Profile.store.Keahlian');
                storeMenu.loadData([],false);
                storeMenu.add(data.data);
            }
        });
    },

    viewPengalaman : function(grid, record, item, index, e, eOpts){
        var form = Ext.getCmp('pengalaman');
        var grid = Ext.getCmp('gridprofile');
        form.getForm().setValues(record.data);

        var id_bio = record.data.id_bio;
        Ext.Ajax.request({
            url             : BASE_URL + 'profile/c_profile/getPengalaman',
            method          : 'POST',
            params          : {post : Ext.encode(id_bio)},
            success         : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                var storeMenu = Ext.getStore('SMS.module.Employee.Profile.store.Pengalaman');
                storeMenu.loadData([],false);
                storeMenu.add(data.data);
            }
        });
    },
     viewPelatihan : function(grid, record, item, index, e, eOpts){
        var form = Ext.getCmp('pelatihan');
        var grid = Ext.getCmp('gridprofile');
        form.getForm().setValues(record.data);

        var id_bio = record.data.id_bio;
        Ext.Ajax.request({
            url             : BASE_URL + 'profile/c_profile/getPelatihan',
            method          : 'POST',
            params          : {post : Ext.encode(id_bio)},
            success         : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                var storeMenu = Ext.getStore('SMS.module.Employee.Profile.store.Pelatihan');
                storeMenu.loadData([],false);
                storeMenu.add(data.data);
            }
        });
    },
     viewCatatan : function(grid, record, item, index, e, eOpts){
        var form = Ext.getCmp('catatan');
        var grid = Ext.getCmp('gridprofile');
        form.getForm().setValues(record.data);

        var id_bio = record.data.id_bio;
        Ext.Ajax.request({
            url             : BASE_URL + 'profile/c_profile/getCatatan',
            method          : 'POST',
            params          : {post : Ext.encode(id_bio)},
            success         : function(response){
                var data    = Ext.JSON.decode(response.responseText);
                var storeMenu = Ext.getStore('SMS.module.Employee.Profile.store.Catatan');
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
                        url             : BASE_URL + 'profile/c_profile/delProfile',
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
                                var form    = Ext.getCmp('biography');
                                var grid    = Ext.getCmp('gridprofile');
                                form.getForm().reset();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Profile.store.Profile').reload();
                                /* Sampai Sini */
                            } else {
                                var form    = Ext.getCmp('formprofile');
                                var grid    = Ext.getCmp('gridprofile');
                                form.getForm().reset();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Profile.store.Profile').reload();
                            }
                        }
                    });
                }
            }
        })
    },

    reset: function(btn, gridPanel, selected) {//Reset Form
        var me = this;
        var form            = Ext.getCmp('biography');
        var formpendidikan  = Ext.getCmp('pendidikan');
        var grid            = Ext.getCmp('gridprofile');
        var gridpendidikan  = Ext.getCmp('gridpendidikan');
        var pic     = form.queryById('imagePreview');
        pic.setSrc('');
        form.getForm().reset();
        formpendidikan.getForm().reset();

        grid.getSelectionModel().clearSelections();
        gridpendidikan.getSelectionModel().clearSelections();
        me.getStore('SMS.module.Employee.Profile.store.Profile').reload();
        me.getStore('SMS.module.Employee.Profile.store.Pendidikan').reload();

    },
    save: function(btn, evt, opts){
        var me          = this;
        var form        = btn.up('form').getForm();
        var kode_dept   = form.findField('kode_dept').getValue();
        var name_dept   = form.findField('name_dept').getValue();
        var active      = form.findField('active').getValue();
        // console.log(role);

        Ext.Ajax.request({
            url     : BASE_URL + 'profile/c_dept/saveProfile',
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
                    var form    = Ext.getCmp('formprofile');
                    var grid    = Ext.getCmp('gridprofile');
                    form.getForm().reset();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Profile.store.Profile').reload();
                }else if (data.total === 2){
                    Ext.MessageBox.show({
                        title           : 'Error',
                        msg             : 'Username Telah Terdaftar - Silahkan Gunakan Username Lain',
                        icon            : Ext.MessageBox.ERROR,
                        buttons         : Ext.MessageBox.OK
                    });
                    var form    = Ext.getCmp('formprofile');
                    var grid    = Ext.getCmp('gridprofile');
                    form.getForm().reset();
                    grid.getSelectionModel().deselectAll();
                    grid.getSelectionModel().deselectAll();
                    Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Profile.store.Profile').reload();
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
                        url     : BASE_URL + 'profile/c_dept/editProfile',
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
                                var form    = Ext.getCmp('formprofile');
                                var grid    = Ext.getCmp('gridprofile');
                                form.getForm().reset();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Profile.store.Profile').reload();
                            }else if (data.total === 2){
                                Ext.MessageBox.show({
                                    title           : 'Error',
                                    msg             : 'Data Telah Terdaftar - Silahkan Gunakan Yang Lain',
                                    icon            : Ext.MessageBox.ERROR,
                                    buttons         : Ext.MessageBox.OK
                                });
                                var form    = Ext.getCmp('formprofile');
                                var grid    = Ext.getCmp('gridprofile');
                                form.getForm().reset();
                                grid.getSelectionModel().deselectAll();
                                Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Profile.store.Profile').reload();
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
                url     : BASE_URL + 'profile/c_dept/searchProfile',
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
        window.location = BASE_URL + 'profile/c_dept/printProfile/';
    },
})

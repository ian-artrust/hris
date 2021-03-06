Ext.define('SMS.module.Employee.Profile.view.form.FormProfile', {
    extend      : 'Ext.form.Panel',
    store       : 'SMS.module.Employee.Profile.store.Profile',
    requires    : ['SMS.module.Employee.Profile.store.Profile'],
    alias       : 'widget.formprofile',
    id          : 'formprofile',
    layout      : 'fit',
    border      : false,
    frame       : false,
    margins     : '3px',
    initComponent: function() {
        var me = this;
        me.items  = [
            {
                xtype       : 'tabpanel',
                activeTab   : 0,
                border      : false,
                frame       : false,
                items       : [
                    {
                        xtype       : 'panel',
                        autoScroll  : true,
                        border      : false,
                        frame       : false,
                        layout      : {
                            type    : 'fit'
                        },
                        title       : 'Biography',
                        defaults    : {
                            anchor      : '100%',
                            msgTarget   : 'under'
                        },
                        items       : [
                            {
                                xtype   : 'biography'
                            }
                        ]
                    },
                    {
                        xtype       : 'panel',
                        autoScroll  : true,
                        border      : false,
                        layout      : {
                            type    : 'fit'
                        },
                        title       : 'Pendidikan',
                        defaults    : {
                            anchor      : '100%',
                            msgTarget   : 'under'
                        },
                        items       : [
                            {
                                xtype : 'panelpendidikan'
                            }
                        ]
                    },
                    {
                        xtype       : 'panel',
                        autoScroll  : true,
                        border      : false,
                        layout      : {
                            type    : 'fit'
                        },
                        title       : 'Keahlian',
                        defaults    : {
                            anchor      : '100%',
                            msgTarget   : 'under'
                        },
                        items       : [
                            {
                                xtype   : 'panelkeahlian'
                            }
                        ]
                    },
                    {
                        xtype       : 'panel',
                        autoScroll  : true,
                        border      : false,
                        layout      : {
                            type    : 'fit'
                        },
                        title       : 'Pengalaman Kerja',
                        defaults    : {
                            anchor      : '100%',
                            msgTarget   : 'under'
                        },
                        items       : [
                            {
                                xtype   : 'panelpengalaman'
                            }
                        ]
                    },
                    {
                        xtype       : 'panel',
                        autoScroll  : true,
                        border      : false,
                        layout      : {
                            type    : 'fit'
                        },
                        title       : 'Pelatihan',
                        defaults    : {
                            anchor      : '100%',
                            msgTarget   : 'under'
                        },
                        items       : [
                            {
                                xtype   : 'panelpelatihan'
                            }
                        ]
                    },
                    {
                        xtype       : 'panel',
                        autoScroll  : true,
                        border      : false,
                        layout      : {
                            type    : 'fit'
                        },
                        title       : 'Catatan',
                        defaults    : {
                            anchor      : '100%',
                            msgTarget   : 'under'
                        },
                        items       : [
                            {
                                xtype   : 'panelcatatan'
                            }
                        ]
                    },
                    {
                        xtype       : 'panel',
                        autoScroll  : true,
                        border      : false,
                        layout      : {
                            type    : 'anchor'
                        },
                        title       : 'Keluarga',
                        defaults    : {
                            anchor      : '100%',
                            msgTarget   : 'under'
                        },
                        items       : [
                            {
                                xtype   : 'toolbar',
                                dock    : 'bottom',
                                items   : [
                                    {
                                        text    : 'Save',
                                        iconCls : 'icon-save'
                                    },
                                    {
                                        text    : 'Edit',
                                        iconCls : 'icon-edit'
                                    },
                                    {
                                        text    : 'Reset',
                                        iconCls : 'icon-refresh'
                                    }
                                ] 
                            }
                        ]
                    }
                ]                    
            }
        ];
        me.buttons = [
            
        ];
        me.callParent(arguments);
    }  
});

/*===================================== Panel Biography ==========================================*/

Ext.define('SMS.module.Employee.Profile.view.form.Biography', {
    extend  : 'Ext.form.Panel',
    alias   : 'widget.biography',
    id      : 'biography',
    frame   : true,
    border  : false,
    items   : [
        {
            xtype   : 'container',
            layout  : { type: 'column' },
            items   : [
                {
                    columnWidth : .23,
                    frame       : true,
                    items       : [
                        {
                            xtype   : 'image',
                            itemId  : 'imagePreview',
                            height  : 210,
                            width   : 150
                        }
                    ]
                },
                {
                    xtype       : 'container',
                    columnWidth : .77,
                    layout      : 'anchor',
                    padding     : '7px',
                    defaults   : {
                        anchor: '100%'
                    },
                    items       : [
                        {
                            xtype   : 'fieldcontainer',
                            layout  : 'hbox',
                            padding : '5px',
                            items   : [
                                {
                                    xtype       : 'textfield',
                                    name        : 'id',
                                    hidden      : true,
                                    fieldLabel  : 'ID'                    
                                },
                                {
                                    xtype       : 'textfield',
                                    fieldLabel  : 'Nama Lengkap',
                                    name        : 'nama_lengkap',
                                    emptyText   : 'Masukan Nama Lengkap',
                                    labelWidth  : 85,
                                    margins     : '2px 2px 2px 2px',
                                    allowBlank  : true,
                                    msgTarget   : 'under',
                                    minLength   : 4,
                                    flex        : 1.2
                                },
                                {
                                    xtype       : 'textfield',
                                    name        : 'phone',
                                    emptyText   : 'Masukan Nomor Handphone',
                                    margins     : '2px 2px 2px 2px',
                                    allowBlank  : true,
                                    msgTarget   : 'under',
                                    minLength   : 4,
                                    flex        : 0.8
                                },
                                {
                                    fieldLabel  : 'Aktif',
                                    tooltip     : 'Is Active?',
                                    xtype       : 'checkboxfield',
                                    name        : 'active',
                                    labelWidth  : 25,
                                    checked     : false,
                                    padding     : '0px 2px 5px 2px',
                                } 
                            ]
                        },
                        {
                            xtype   : 'fieldcontainer',
                            layout  : 'hbox',
                            padding : '5px',
                            items   : [
                                {
                                    xtype       : 'textfield',
                                    fieldLabel  : 'NIK',
                                    name        : 'nik',
                                    emptyText   : 'Masukan NIK Karyawan',
                                    labelWidth  : 85,
                                    margins     : '2px 2px 2px 2px',
                                    allowBlank  : true,
                                    msgTarget   : 'under',
                                    flex        : 1
                                },
                                {
                                    xtype           : 'combobox',
                                    name            : 'id_jobname',
                                    emptyText       : 'Pilih Job Name',
                                    labelWidth      : 85,
                                    margins         : '2px 2px 2px 2px',
                                    flex            : 1,
                                    allowBlank      : true,
                                    msgTarget       : 'under',
                                    store           : Ext.create('SMS.module.Employee.Profile.store.loadJobname'),
                                    queryMode       : 'local',
                                    displayField    : 'jobname',
                                    valueField      : 'id',  
                                    typeAhead       : true,
                                    minChars        : 2                                     
                                }
                            ]
                        },
                        {
                            xtype   : 'fieldcontainer',
                            layout  : 'hbox',
                            padding : '5px',
                            items   : [
                                {
                                    xtype           : 'combobox',
                                    fieldLabel      : 'Gender',
                                    name            : 'gender',
                                    emptyText       : 'Select Gender',
                                    labelWidth      : 85,
                                    margins         : '2px 2px 2px 2px',
                                    flex            : 1.3,
                                    allowBlank      : true,
                                    msgTarget       : 'under',
                                    store           : Ext.create('SMS.module.Employee.Profile.store.Gender'),
                                    queryMode       : 'local',
                                    displayField    : 'gender',
                                    valueField      : 'id'
                                },
                                {
                                    xtype           : 'combobox',
                                    name            : 'agama',
                                    emptyText       : 'Pilih Agama',
                                    labelWidth      : 85,
                                    margins         : '2px 2px 2px 2px',
                                    flex            : 0.7,
                                    allowBlank      : true,
                                    msgTarget       : 'under', 
                                    store           : Ext.create('SMS.module.Employee.Profile.store.Religion'),
                                    queryMode       : 'local',
                                    displayField    : 'religion',
                                    valueField      : 'id'
                                }                        
                            ]
                        },
                        {
                            xtype   : 'fieldcontainer',
                            layout  : 'hbox',
                            padding : '5px',
                            items   : [
                                {
                                    xtype           : 'combobox',
                                    fieldLabel      : 'Birth Place',
                                    name            : 'tempat',
                                    emptyText       : 'Select Birth Place',
                                    labelWidth      : 85,
                                    margins         : '2px 2px 2px 2px',
                                    flex            : 1.3,
                                    allowBlank      : true,
                                    msgTarget       : 'under',
                                    store           : Ext.create('SMS.module.MasterData.Kabupaten.store.Kabupaten'),
                                    displayField    : 'name_kab',
                                    valueField      : 'name_kab',
                                    queryMode       : 'local',
                                    typeAhead       : true,
                                    minChars        : 2,
                                },
                                {
                                    xtype       : 'datefield',
                                    name        : 'tgl_lahir',
                                    emptyText   : 'Select Birth Date',
                                    labelWidth  : 85,
                                    margins     : '2px 2px 2px 2px',
                                    allowBlank  : true,
                                    msgTarget   : 'under',
                                    type        : 'date', 
                                    format      : 'Y-m-d',
                                    submitFormat : 'Y-m-d',
                                    flex        : 0.7
                                }                        
                            ]
                        },
                        {
                            xtype   : 'fieldcontainer',
                            layout  : 'hbox',
                            padding : '5px',
                            items   : [
                                {
                                    xtype           : 'combobox',
                                    fieldLabel      : 'Marital Status',
                                    name            : 'marital_status',
                                    emptyText       : 'Select Marital Status',
                                    labelWidth      : 85,
                                    margins         : '2px 2px 2px 2px',
                                    flex            : 1.3,
                                    allowBlank      : true,
                                    msgTarget       : 'under',
                                    store           : Ext.create('SMS.module.Employee.Profile.store.Marry'),
                                    queryMode       : 'local',
                                    displayField    : 'marry',
                                    valueField      : 'id'
                                },
                                {
                                    xtype           : 'combobox',
                                    name            : 'status_kerja',
                                    emptyText       : 'Status Karyawan',
                                    labelWidth      : 85,
                                    margins         : '2px 2px 2px 2px',
                                    flex            : 0.7,
                                    allowBlank      : true,
                                    msgTarget       : 'under',
                                    store           : Ext.create('SMS.module.Employee.Profile.store.Status'),
                                    queryMode       : 'local',
                                    displayField    : 'status',
                                    valueField      : 'id'                                       
                                },                     
                            ]
                        },
                        {
                            xtype       : 'filefield',
                            flex        : 1,
                            fieldLabel  : 'Upload Foto',
                            name        : 'userfile',
                            id          : 'userfile',
                            emptyText   : 'Upload Photo',
                            labelWidth  : 85,
                            flex        : 1,
                            buttonText  : '',
                            buttonConfig : {
                                iconCls : 'icon-user'
                            },
                            listeners   : {
                            'afterrender': function(field, value, opts){
                                var me = this;
                                imagem = me.up('form').queryById('imagePreview');

                                //If is multiple file upload
                                field.fileInputEl.dom.multiple = false;
                                
                                //ação de selecionar arquivos
                                field.fileInputEl.dom.onchange = function(){
                                    var filerdr = new FileReader();
                                        input = this;
                                    
                                    filerdr.onload = function(e) {
                                       imagem.setSrc(e.target.result);
                                    }
                                    //Possui todas os arquivos a serem enviados.
                                    filerdr.readAsDataURL(input.files[0]);    
                                }                        
                            }
                        }
                        }
                    ]
                }
            ]                    
        },
        {
            emptyText   : 'Masukan Alamat Karyawan',
            name        : 'alamat',
            tooltip     : 'Masukan Alamat Karyawan',
            margin      : '0px 0px 5px 0px',
            allowBlank  : true,
            msgTarget   : 'under',
            anchor      : '100%',
            xtype       : 'textareafield'
        }
    ],
    buttons : [
        {
            text    : 'Save Add',
            iconCls : 'icon-save',
            disabled: createProfile,
            handler : function(){
                var form    = this.up('form').getForm();
                var nama_lengkap    = form.findField('nama_lengkap').getValue();
                var phone           = form.findField('phone').getValue();
                var nik             = form.findField('nik').getValue();
                var id_jobname      = form.findField('id_jobname').getValue();
                var gender          = form.findField('gender').getValue(); 
                var agama           = form.findField('agama').getValue();
                var tempat          = form.findField('tempat').getValue();
                var tgl_lahir       = form.findField('tgl_lahir').getRawValue();  
                var marital_status  = form.findField('marital_status').getValue();
                var status_kerja    = form.findField('status_kerja').getValue();
                var userfile        = form.findField('userfile').getValue();
                var alamat          = form.findField('alamat').getValue();  
                var active          = form.findField('active').getValue();  

                if(form.isValid()){
                   form.submit({
                        url     : BASE_URL + 'profile/c_profile/saveBio',
                        headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
                        method  : 'POST',
                        params  : {
                            nama_lengkap    : nama_lengkap,
                            phone           : phone, 
                            nik             : nik,
                            id_jobname      : id_jobname,
                            gender          : gender,
                            agama           : agama,
                            tempat          : tempat,
                            tgl_lahir       : tgl_lahir,
                            marital_status  : marital_status,
                            status_kerja    : status_kerja,
                            userfile        : userfile,
                            alamat          : alamat,
                            active          : active
                        },
                        waitMsg: 'Please Wait Data is Processing',
                          success : function(response, op){
                            Ext.MessageBox.show({
                                title           : 'Informasi',
                                msg             : Ext.data.JsonReader(op.result.msg),
                                icon            : Ext.MessageBox.INFO,
                                buttons         : Ext.MessageBox.OK
                            });
                            var form    = Ext.getCmp('formprofile');
                            var grid    = Ext.getCmp('gridprofile');
                            var pic     = form.queryById('imagePreview');
                            pic.setSrc('');
                            form.getForm().reset();
                            grid.getSelectionModel().deselectAll();
                            Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Profile.store.Profile').reload();
                        },
                        failure : function(response, op){
                            Ext.MessageBox.show({
                                title           : 'Error',
                                msg             : Ext.data.JsonReader(op.result.total),
                                icon            : Ext.MessageBox.ERROR,
                                buttons         : Ext.MessageBox.OK
                            });                   
                        }                          
                   }); 
                } 
            }
        },
        {
            text    : 'Edit Profile',
            iconCls : 'icon-edit',
            action  : 'update',
            disabled: updateProfile,
            handler     : function(){
                var form            = this.up('form').getForm();
                var id              = form.findField('id').getValue();
                var nama_lengkap    = form.findField('nama_lengkap').getValue();
                var phone           = form.findField('phone').getValue();
                var nik             = form.findField('nik').getValue();
                var id_jobname      = form.findField('id_jobname').getValue();
                var gender          = form.findField('gender').getValue(); 
                var agama           = form.findField('agama').getValue();
                var tempat          = form.findField('tempat').getValue();
                var tgl_lahir       = form.findField('tgl_lahir').getRawValue();  
                var marital_status  = form.findField('marital_status').getValue();
                var status_kerja    = form.findField('status_kerja').getValue();
                var userfile        = form.findField('userfile').getValue();
                var alamat          = form.findField('alamat').getValue();    
                var active          = form.findField('active').getValue();

                Ext.MessageBox.show({
                    title   : 'Konfirmasi',
                    msg     : 'Anda Yakin Merubah Data',
                    buttons : Ext.Msg.YESNO,
                    icon    : Ext.MessageBox.WARNING,
                    width   : 500,
                    fn      : function(btn,evtObj){
                        if(btn == 'yes'){
                            form.submit({
                                url     : BASE_URL + 'profile/c_profile/editProfile',
                                headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
                                method  : 'POST',
                                params  : {
                                    id              : id,
                                    nama_lengkap    : nama_lengkap, 
                                    phone           : phone, 
                                    nik             : nik,
                                    id_jobname      : id_jobname,
                                    gender          : gender,
                                    agama           : agama,
                                    tempat          : tempat,
                                    tgl_lahir       : tgl_lahir,
                                    marital_status  : marital_status,
                                    status_kerja    : status_kerja,
                                    userfile        : userfile,
                                    alamat          : alamat,
                                    active          : active
                                },
                                success : function(response, op){
                                    Ext.MessageBox.show({
                                        title       : 'Informasi',
                                        msg         : Ext.data.JsonReader(op.result.total),
                                        icon        : Ext.MessageBox.INFO,
                                        buttons     : Ext.MessageBox.OK,
                                        fn          : function(btn, gridPanel, selected){
                                            var form    = Ext.getCmp('biography');
                                            var grid    = Ext.getCmp('gridprofile');
                                            var pic     = form.queryById('imagePreview');
                                            pic.setSrc('');
                                            form.getForm().reset();
                                            grid.getSelectionModel().deselectAll();
                                            Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Profile.store.Profile').reload();
                                        }        
                                    });
                                },
                                failure : function(response, op){
                                    Ext.MessageBox.show({
                                        title   : 'Error',
                                        msg     : Ext.data.JsonReader(op.result.total),
                                        icon    : Ext.MessageBox.ERROR,
                                        buttons : Ext.MessageBox.OK,
                                        fn      : function(btn, gridPanel, selected){
                                            var form    = Ext.getCmp('biography');
                                            var grid    = Ext.getCmp('gridprofile');
                                            var pic     = form.queryById('imagePreview');
                                            pic.setSrc('');
                                            form.getForm().reset();
                                            grid.getSelectionModel().deselectAll();
                                            updateButton.setDisabled(true);
                                            Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Profile.store.Profile').reload();
                                        }  
                                    });                   
                                }
                            });
                        }
                    }
                });
            }
        },
        {
            text    : 'Reset',
            iconCls : 'icon-refresh',
            handler : function(){
                var form    = Ext.getCmp('biography');
                var grid    = Ext.getCmp('gridprofile');
                var pic     = form.queryById('imagePreview');
                pic.setSrc('');
                form.getForm().reset();

                grid.getSelectionModel().clearSelections();
                Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Profile.store.Profile').reload();               
            }
        }
    ]
});

/*===================================== Panel Pendidikan ==========================================*/

Ext.define('SMS.module.Employee.Profile.view.form.PanelPendidikan', {
    extend   :  'Ext.panel.Panel',
    alias    : 'widget.panelpendidikan',
    id       : 'panelpendidikan',
    layout   : 'fit',
    title    : 'Management Data Pendidikan Karyawan',
    frame    : true, 
    border   : false,    
    requires : [
        'SMS.module.Employee.Profile.view.form.Pendidikan',
        'SMS.module.Employee.Profile.view.form.GridPendidikan'
    ],
    layout      : {
        type    :'vbox',
        align   :'stretch'
    },
    defaults    : {
        flex    : 1
    },    
    closable    : false,
    items       : [ 
        {xtype   : 'pendidikan', flex : 0.6},
        {xtype   : 'gridpendidikan', flex : 1.4}         
    ]
});

Ext.define('SMS.module.Employee.Profile.view.form.Pendidikan', {
    extend  : 'Ext.form.Panel',
    alias   : 'widget.pendidikan',
    id      : 'pendidikan',
    frame   : true,
    border  : false,
    items   : [
        {
            xtype   : 'textfield',
            hidden  : true,
            name    : 'id'
        },
        {
            xtype   : 'fieldcontainer',
            layout  : 'hbox',
            padding : '5px',
            items   : [
                {
                    xtype       : 'textfield',
                    fieldLabel  : 'Nama Sekolah',
                    name        : 'school_name',
                    emptyText   : 'Masukan Nama Sekolah',
                    labelWidth  : 85,
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                },
                                {
                    xtype       : 'textfield',
                    name        : 'jurusan',
                    emptyText   : 'Masukan Jurusan',
                    labelWidth  : 85,
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                }
            ]
        },
        {
            xtype   : 'fieldcontainer',
            layout  : 'hbox',
            padding : '5px',
            items   : [
                 {
                    xtype           : 'combobox',
                    fieldLabel      : 'Jenjang',
                    name            : 'jenjang',
                    emptyText       : 'Pilih Jenjang Pendidikan',
                    labelWidth      : 85,
                    margins         : '2px 2px 2px 2px',
                    flex            : 1.5,
                    allowBlank      : true,
                    msgTarget       : 'under',
                    store           : Ext.create('SMS.module.Employee.Profile.store.Jenjang'),
                    displayField    : 'name',
                    valueField      : 'name',
                    queryMode       : 'local'
                },
                {
                    xtype       : 'textfield',
                    name        : 'no_ijazah',
                    emptyText   : 'Masukan Nomor Ijazah',
                    labelWidth  : 85,
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                },
                {
                    xtype       : 'textfield',
                    name        : 'tahun',
                    emptyText   : 'Tahun Lulus',
                    labelWidth  : 85,
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 0.8
                }
            ]
        },
    ],
    buttons : [
        {
            text    : 'Save',
            iconCls : 'icon-save',
            handler : function(){
                var form            = this.up('form').getForm();
                var id_bio          = form.findField('id').getValue();
                var school_name     = form.findField('school_name').getValue();
                var jurusan         = form.findField('jurusan').getValue();
                var jenjang         = form.findField('jenjang').getValue();
                var no_ijazah       = form.findField('no_ijazah').getValue(); 
                var tahun           = form.findField('tahun').getValue();

                if(form.isValid()){
                   form.submit({
                        url     : BASE_URL + 'profile/c_profile/savePendidikan',
                        method  : 'POST',
                        params  : {
                            id_bio          : id_bio,
                            school_name     : school_name, 
                            jurusan         : jurusan,
                            jenjang         : jenjang,
                            no_ijazah       : no_ijazah,
                            tahun           : tahun
                        },
                        waitMsg: 'Please Wait Data is Processing',
                          success : function(response, op){
                            Ext.MessageBox.show({
                                title           : 'Informasi',
                                msg             : Ext.data.JsonReader(op.result.pesan),
                                icon            : Ext.MessageBox.INFO,
                                buttons         : Ext.MessageBox.OK
                            });
                            var form            = Ext.getCmp('pendidikan');
                            var gridpendidikan  = Ext.getCmp('gridpendidikan');
                            var grid            = Ext.getCmp('gridprofile');
                            form.getForm().reset();
                            gridpendidikan.getSelectionModel().deselectAll();
                            grid.getSelectionModel().deselectAll();
                            Ext.ComponentQuery.query('#gridpendidikan')[0].getStore('SMS.module.Employee.Profile.store.Pendidikan').reload();
                        },
                        failure : function(response, op){
                            Ext.MessageBox.show({
                                title           : 'Error',
                                msg             : Ext.data.JsonReader(op.result.pesan),
                                icon            : Ext.MessageBox.ERROR,
                                buttons         : Ext.MessageBox.OK
                            });                   
                        }                          
                   }); 
                } 
            }
        },
        // {
        //     text    : 'Edit',
        //     iconCls : 'icon-edit',
        //     handler     : function(){
        //         var form            = this.up('form').getForm();
        //         var id              = form.findField('id').getValue();
        //         var school_name     = form.findField('school_name').getValue();
        //         var jurusan         = form.findField('jurusan').getValue();
        //         var jenjang         = form.findField('jenjang').getValue();
        //         var no_ijazah       = form.findField('no_ijazah').getValue(); 
        //         var tahun           = form.findField('tahun').getValue();
        //         Ext.MessageBox.show({
        //             title   : 'Konfirmasi',
        //             msg     : 'Anda Yakin Merubah Data',
        //             buttons : Ext.Msg.YESNO,
        //             icon    : Ext.MessageBox.WARNING,
        //             width   : 500,
        //             fn      : function(btn,evtObj){
        //                 if(btn == 'yes'){
        //                     form.submit({
        //                         url     : BASE_URL + 'profile/c_profile/editPendidikan',
        //                         method  : 'POST',
        //                         params  : {
        //                             id              : id,
        //                             school_name     : school_name, 
        //                             jurusan         : jurusan,
        //                             jenjang         : jenjang,
        //                             no_ijazah       : no_ijazah,
        //                             tahun           : tahun
        //                         },
        //                         success : function(response, op){
        //                             Ext.MessageBox.show({
        //                                 title       : 'Informasi',
        //                                 msg         : Ext.data.JsonReader(op.result.total),
        //                                 icon        : Ext.MessageBox.INFO,
        //                                 buttons     : Ext.MessageBox.OK,
        //                                 fn          : function(btn, gridPanel, selected){
        //                                     var form    = Ext.getCmp('formprofile');
        //                                     var grid    = Ext.getCmp('gridprofile');
        //                                     var pic     = form.queryById('imagePreview');
        //                                     pic.setSrc('');
        //                                     form.getForm().reset();
        //                                     grid.getSelectionModel().deselectAll();
        //                                     if(createAnggota == false){
        //                                         var saveButton = form.down('button[text=Save]');
        //                                         saveButton.setDisabled(false);
        //                                     }else{
        //                                         var saveButton = form.down('button[text=Save]');
        //                                         saveButton.setDisabled(true);
        //                                     }

        //                                     var updateButton = form.down('button[text=Edit]');
        //                                     updateButton.setDisabled(true);
        //                                     Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Pendidikan.store.Pendidikan').reload();
        //                                 }        
        //                             });
        //                         },
        //                         failure : function(response, op){
        //                             Ext.MessageBox.show({
        //                                 title   : 'Error',
        //                                 msg     : Ext.data.JsonReader(op.result.total),
        //                                 icon    : Ext.MessageBox.ERROR,
        //                                 buttons : Ext.MessageBox.OK,
        //                                 fn      : function(btn, gridPanel, selected){
        //                                     var form    = Ext.getCmp('formprofile');
        //                                     var grid    = Ext.getCmp('gridprofile');
        //                                     var pic     = form.queryById('imagePreview');
        //                                     pic.setSrc('');
        //                                     form.getForm().reset();
        //                                     grid.getSelectionModel().deselectAll();
        //                                     if(createAnggota == false){
        //                                         var saveButton = form.down('button[text=Save]');
        //                                         saveButton.setDisabled(false);
        //                                     }else{
        //                                         var saveButton = form.down('button[text=Save]');
        //                                         saveButton.setDisabled(true);
        //                                     }

        //                                     var updateButton = form.down('button[text=Edit]');
        //                                     updateButton.setDisabled(true);
        //                                     Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Pendidikan.store.Pendidikan').reload();
        //                                 }  
        //                             });                   
        //                         }
        //                     });
        //                 }
        //             }
        //         });
        //     }
        // },
        {
            text    : 'Reset',
            iconCls : 'icon-refresh',
            action  : 'reset'
        }
    ]
});

Ext.define('SMS.module.Employee.Profile.view.form.GridPendidikan', {
    extend   : 'Ext.grid.Panel',
    store    : 'SMS.module.Employee.Profile.store.Pendidikan',
    alias    : 'widget.gridpendidikan',
    id       : 'gridpendidikan',
    border   : false,
    frame    : true,
    margins     : '3px', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'SINGLE',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : 'SMS.module.Employee.Profile.store.Pendidikan',
        dock        : 'bottom'
    }], 
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '7%'
        },
        {
            text     : 'Nama Sekolah',
            dataIndex: 'school_name',
            width    : '45%'
        },
        {
            text     : 'Jenjang',
            dataIndex: 'jenjang',
            width    : '25%'
        },
        {
            text     : 'Tahun',
            dataIndex: 'tahun',
            width    : '10%'
        },
        {
            xtype    :'actioncolumn',
            width    :'5%',
            items    : [{              
                iconCls: 'icon-delete',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                    var rec         = grid.getStore().getAt(rowIndex);
                    var id          = rec.get('id');
                    var id_bio      = rec.get('id_bio');
                    Ext.MessageBox.show({
                        title           : 'Konfirmasi',
                        msg             : 'Anda yakin akan menghapus data yang terseleksi?',
                        buttons         : Ext.Msg.YESNO,
                        icon            : Ext.MessageBox.WARNING,
                        width           : 450,
                        fn              : function(btn, evtObj){
                            if (btn == 'yes') {
                                Ext.Ajax.request({
                                    url             : BASE_URL + 'profile/c_profile/delPendidikan',
                                    method          : 'POST',
                                    params          : { id : id, id_bio : id_bio },   
                                    success         : function(response){
                                        // var data    = Ext.JSON.decode(response.responseText);
                                        var storeModul = Ext.getStore('SMS.module.Employee.Profile.store.Pendidikan');
                                        storeModul.loadData([],false);
                                        var form            = Ext.getCmp('pendidikan');
                                        var gridpendidikan  = Ext.getCmp('gridpendidikan');
                                        var grid            = Ext.getCmp('gridprofile');
                                        form.getForm().reset();
                                        gridpendidikan.getSelectionModel().deselectAll();
                                        grid.getSelectionModel().deselectAll();
                                        Ext.ComponentQuery.query('#gridpendidikan')[0].getStore('SMS.module.Employee.Profile.store.Pendidikan').reload();
                                    }
                                });
                            }
                        }
                    });
                }
            }]
        }
    ],
});

/*===================================== Panel Keahlian ==========================================*/
Ext.define('SMS.module.Employee.Profile.view.form.PanelKeahlian', {
    extend   :  'Ext.panel.Panel',
    alias    : 'widget.panelkeahlian',
    id       : 'panelkeahlian',
    layout   : 'fit',
    title    : 'Management Data Keahlian Karyawan',
    frame    : true,     
    requires : [
        'SMS.module.Employee.Profile.view.form.Keahlian',
        'SMS.module.Employee.Profile.view.form.GridKeahlian'
    ],
    layout      : {
        type    :'vbox',
        align   :'stretch'
    },
    defaults    : {
        flex    : 1
    },    
    closable    : false,
    items       : [ 
        {xtype   : 'keahlian', flex : 1},
        {xtype   : 'gridkeahlian', flex : 1}         
    ]
});

Ext.define('SMS.module.Employee.Profile.view.form.Keahlian', {
    extend  : 'Ext.form.Panel',
    alias   : 'widget.keahlian',
    id      : 'keahlian',
    frame   : true,
    border  : false,
    items   : [
        {
            xtype   : 'textfield',
            hidden  : true,
            name    : 'id'
        },
        {
            xtype   : 'fieldcontainer',
            layout  : 'hbox',
            padding : '5px',
            items   : [
                {
                    xtype       : 'textfield',
                    fieldLabel  : 'Nama Keahlian',
                    name        : 'nama_keahlian',
                    emptyText   : 'Masukan Nama Keahlian',
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                }
            ]
        },
        {
            xtype   : 'fieldcontainer',
            layout  : 'hbox',
            padding : '5px',
            items   : [
                {
                    xtype       : 'textareafield',
                    fieldLabel  : 'Keterangan',
                    name        : 'keterangan',
                    emptyText   : 'Masukan Keterangan Disini',
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                }
            ]
        },
        {
            xtype   : 'fieldcontainer',
            layout  : 'hbox',
            padding : '5px',
            items   : [
                {
                    xtype       : 'textareafield',
                    fieldLabel  : 'Describtion',
                    name        : 'describtion',
                    emptyText   : 'Masukan Deskripsi Disini',
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                }
            ]
        }
    ],
    buttons : [
        {
            text    : 'Save',
            iconCls : 'icon-save',
            handler : function(){
                var form            = this.up('form').getForm();
                var id_bio          = form.findField('id').getValue();
                var nama_keahlian   = form.findField('nama_keahlian').getValue();
                var keterangan      = form.findField('keterangan').getValue();
                var describtion     = form.findField('describtion').getValue();
                if(form.isValid()){
                   form.submit({
                        url     : BASE_URL + 'profile/c_profile/saveKeahlian',
                        method  : 'POST',
                        params  : {
                            id_bio           : id_bio,
                            nama_keahlian    : nama_keahlian, 
                            keterangan       : keterangan,
                            describtion      : describtion
                        },
                        waitMsg: 'Please Wait Data is Processing',
                          success : function(response, op){
                            Ext.MessageBox.show({
                                title           : 'Informasi',
                                msg             : Ext.data.JsonReader(op.result.total),
                                icon            : Ext.MessageBox.INFO,
                                buttons         : Ext.MessageBox.OK
                            });
                            var form    = Ext.getCmp('keahlian');
                            var grid    = Ext.getCmp('gridkeahlian');
                            form.getForm().reset();
                            grid.getSelectionModel().deselectAll();
                            Ext.ComponentQuery.query('#gridkeahlian')[0].getStore('SMS.module.Employee.Profile.store.Keahlian').reload();
                        },
                        failure : function(response, op){
                            Ext.MessageBox.show({
                                title           : 'Error',
                                msg             : Ext.data.JsonReader(op.result.total),
                                icon            : Ext.MessageBox.ERROR,
                                buttons         : Ext.MessageBox.OK
                            });                   
                        }                          
                   }); 
                } 
            }
        },
        // {
        //     text    : 'Edit',
        //     iconCls : 'icon-edit',
        //     handler     : function(){
        //         var form            = this.up('form').getForm();
        //         var id              = form.findField('id').getValue();
        //         var nama_keahlian   = form.findField('nama_keahlian').getValue();
        //         var keterangan      = form.findField('keterangan').getValue();
        //         var describtion     = form.findField('describtion').getValue();
        //         Ext.MessageBox.show({
        //             title   : 'Konfirmasi',
        //             msg     : 'Anda Yakin Merubah Data',
        //             buttons : Ext.Msg.YESNO,
        //             icon    : Ext.MessageBox.WARNING,
        //             width   : 500,
        //             fn      : function(btn,evtObj){
        //                 if(btn == 'yes'){
        //                     form.submit({
        //                         url     : BASE_URL + 'profile/c_profile/editKeahlian',
        //                         headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
        //                         method  : 'POST',
        //                         params  : {
        //                             id               : id,
        //                             nama_keahlian    : nama_keahlian, 
        //                             keterangan       : keterangan,
        //                             describtion      : describtion
        //                         },
        //                         success : function(response, op){
        //                             Ext.MessageBox.show({
        //                                 title       : 'Informasi',
        //                                 msg         : Ext.data.JsonReader(op.result.total),
        //                                 icon        : Ext.MessageBox.INFO,
        //                                 buttons     : Ext.MessageBox.OK,
        //                                 fn          : function(btn, gridPanel, selected){
        //                                     var form    = Ext.getCmp('formprofile');
        //                                     var grid    = Ext.getCmp('gridprofile');
        //                                     var pic     = form.queryById('imagePreview');
        //                                     pic.setSrc('');
        //                                     form.getForm().reset();
        //                                     grid.getSelectionModel().deselectAll();
        //                                     if(createAnggota == false){
        //                                         var saveButton = form.down('button[text=Save]');
        //                                         saveButton.setDisabled(false);
        //                                     }else{
        //                                         var saveButton = form.down('button[text=Save]');
        //                                         saveButton.setDisabled(true);
        //                                     }

        //                                     var updateButton = form.down('button[text=Edit]');
        //                                     updateButton.setDisabled(true);
        //                                     Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Keahlian.store.Keahlian').reload();
        //                                 }        
        //                             });
        //                         },
        //                         failure : function(response, op){
        //                             Ext.MessageBox.show({
        //                                 title   : 'Error',
        //                                 msg     : Ext.data.JsonReader(op.result.total),
        //                                 icon    : Ext.MessageBox.ERROR,
        //                                 buttons : Ext.MessageBox.OK,
        //                                 fn      : function(btn, gridPanel, selected){
        //                                     var form    = Ext.getCmp('formprofile');
        //                                     var grid    = Ext.getCmp('gridprofile');
        //                                     var pic     = form.queryById('imagePreview');
        //                                     pic.setSrc('');
        //                                     form.getForm().reset();
        //                                     grid.getSelectionModel().deselectAll();
        //                                     if(createAnggota == false){
        //                                         var saveButton = form.down('button[text=Save]');
        //                                         saveButton.setDisabled(false);
        //                                     }else{
        //                                         var saveButton = form.down('button[text=Save]');
        //                                         saveButton.setDisabled(true);
        //                                     }

        //                                     var updateButton = form.down('button[text=Edit]');
        //                                     updateButton.setDisabled(true);
        //                                     Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Keahlian.store.Keahlian').reload();
        //                                 }  
        //                             });                   
        //                         }
        //                     });
        //                 }
        //             }
        //         });
        //     }
        // },
        {
            text    : 'Reset',
            iconCls : 'icon-refresh',
            action  : 'reset'
        }
    ]
});

Ext.define('SMS.module.Employee.Profile.view.form.GridKeahlian', {
    extend   : 'Ext.grid.Panel',
    store    : Ext.create('SMS.module.Employee.Profile.store.Keahlian'),
    alias    : 'widget.gridkeahlian',
    id       : 'gridkeahlian',
    border   : false,
    frame    : true,
    margins     : '3px', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'SINGLE',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : Ext.create('SMS.module.Employee.Profile.store.Keahlian'),
        dock        : 'bottom'
    }], 
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '7%'
        },
        {
            text     : 'Nama Kehalian',
            dataIndex: 'school_name',
            width    : '80%'
        }
    ],
});

/*===================================== Panel Pengalaman Kerja ==========================================*/
Ext.define('SMS.module.Employee.Profile.view.form.PanelPengalaman', {
    extend   : 'Ext.panel.Panel',
    alias    : 'widget.panelpengalaman',
    id       : 'panelpengalaman',
    layout   : 'fit',
    frame    : true,
    border   : false,
    title    : 'Management Data Pengalaman Kerja Karyawan',     
    requires : [
        'SMS.module.Employee.Profile.view.form.Pengalaman',
        'SMS.module.Employee.Profile.view.form.GridPengalaman'
    ],
    layout      : {
        type    :'vbox',
        align   :'stretch'
    },
    defaults    : {
        flex    : 1
    },    
    closable    : false,
    items       : [ 
        {xtype   : 'pengalaman', flex : 0.8},
        {xtype   : 'gridpengalaman', flex : 1.2}         
    ]
});

Ext.define('SMS.module.Employee.Profile.view.form.Pengalaman', {
    extend  : 'Ext.form.Panel',
    alias   : 'widget.pengalaman',
    id      : 'pengalaman',
    frame   : true,
    border  : false,
    items   : [
        {
            xtype   : 'textfield',
            hidden  : true,
            name    : 'id'
        },
        {
            xtype   : 'textfield',
            hidden  : true,
            name    : 'id_bio'
        },
        {
            xtype   : 'fieldcontainer',
            layout  : 'hbox',
            padding : '5px',
            items   : [
                {
                    xtype       : 'textfield',
                    fieldLabel  : 'Nama Perusahaan',
                    name        : 'nama_perusahaan',
                    emptyText   : 'Masukan Nama Perusahaan',
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                },
                {
                    xtype       : 'textfield',
                    fieldLabel  : 'Jenis Usaha',
                    name        : 'jenis_usaha',
                    emptyText   : 'Masukan Jenis Usaha',
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                }
            ]
        },
        {
            xtype   : 'fieldcontainer',
            layout  : 'hbox',
            padding : '5px',
            items   : [
                {
                    xtype       : 'textfield',
                    fieldLabel  : 'Jabatan',
                    name        : 'jabatan',
                    emptyText   : 'Jabatan',
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                },
                {
                    xtype       : 'textfield',
                    fieldLabel  : 'Masa Kerja',
                    name        : 'masa_kerja',
                    emptyText   : 'Masa Kerja',
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                }
            ]
        },
        {
            xtype   : 'fieldcontainer',
            layout  : 'hbox',
            padding : '5px',
            items   : [
                {
                    xtype       : 'textareafield',
                    fieldLabel  : 'Alamat',
                    name        : 'alamat',
                    emptyText   : 'Masukan Alamat Disini',
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                }
            ]
        }
    ],
    buttons : [
        {
            text    : 'Save',
            iconCls : 'icon-save',
            handler : function(){
                var form              = this.up('form').getForm();
                var nama_perusahaan   = form.findField('nama_perusahaan').getValue();
                var jenis_usaha       = form.findField('jenis_usaha').getValue();
                var jabatan           = form.findField('jabatan').getValue();
                var masa_kerja        = form.findField('masa_kerja').getValue();
                var alamat            = form.findField('alamat').getValue();
                if(form.isValid()){
                   form.submit({
                        url     : BASE_URL + 'profile/c_profile/savePengalaman',
                        headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
                        method  : 'POST',
                        params  : {
                            nama_perusahaan  : nama_perusahaan, 
                            jenis_usaha      : jenis_usaha,
                            jabatan          : jabatan,
                            masa_kerja       : masa_kerja,
                            alamat           : alamat
                        },
                        waitMsg: 'Please Wait Data is Processing',
                          success : function(response, op){
                            Ext.MessageBox.show({
                                title           : 'Informasi',
                                msg             : Ext.data.JsonReader(op.result.total),
                                icon            : Ext.MessageBox.INFO,
                                buttons         : Ext.MessageBox.OK
                            });
                            var form    = Ext.getCmp('pengalaman');
                            var grid    = Ext.getCmp('gridprofile');
                            var pic     = form.queryById('imagePreview');
                            pic.setSrc('');
                            form.getForm().reset();
                            grid.getSelectionModel().deselectAll();
                            Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Pengalaman.store.Pengalaman').reload();
                        },
                        failure : function(response, op){
                            Ext.MessageBox.show({
                                title           : 'Error',
                                msg             : Ext.data.JsonReader(op.result.total),
                                icon            : Ext.MessageBox.ERROR,
                                buttons         : Ext.MessageBox.OK
                            });                   
                        }                          
                   }); 
                } 
            }
        },
        {
            text    : 'Edit',
            iconCls : 'icon-edit',
            handler     : function(){
                var form              = this.up('form').getForm();
                var id                = form.findField('id').getValue();
                var nama_perusahaan   = form.findField('nama_perusahaan').getValue();
                var jenis_usaha       = form.findField('jenis_usaha').getValue();
                var jabatan           = form.findField('jabatan').getValue();
                var masa_kerja        = form.findField('masa_kerja').getValue();
                var alamat            = form.findField('alamat').getValue();
                Ext.MessageBox.show({
                    title   : 'Konfirmasi',
                    msg     : 'Anda Yakin Merubah Data',
                    buttons : Ext.Msg.YESNO,
                    icon    : Ext.MessageBox.WARNING,
                    width   : 500,
                    fn      : function(btn,evtObj){
                        if(btn == 'yes'){
                            form.submit({
                                url     : BASE_URL + 'profile/c_profile/editPengalaman',
                                headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
                                method  : 'POST',
                                params  : {
                                    id               : id,
                                    nama_perusahaan  : nama_perusahaan, 
                                    jenis_usaha      : jenis_usaha,
                                    jabatan          : jabatan,
                                    masa_kerja       : masa_kerja,
                                    alamat           : alamat
                                },
                                success : function(response, op){
                                    Ext.MessageBox.show({
                                        title       : 'Informasi',
                                        msg         : Ext.data.JsonReader(op.result.total),
                                        icon        : Ext.MessageBox.INFO,
                                        buttons     : Ext.MessageBox.OK,
                                        fn          : function(btn, gridPanel, selected){
                                            var form    = Ext.getCmp('formprofile');
                                            var grid    = Ext.getCmp('gridprofile');
                                            var pic     = form.queryById('imagePreview');
                                            pic.setSrc('');
                                            form.getForm().reset();
                                            grid.getSelectionModel().deselectAll();
                                            if(createAnggota == false){
                                                var saveButton = form.down('button[text=Save]');
                                                saveButton.setDisabled(false);
                                            }else{
                                                var saveButton = form.down('button[text=Save]');
                                                saveButton.setDisabled(true);
                                            }

                                            var updateButton = form.down('button[text=Edit]');
                                            updateButton.setDisabled(true);
                                            Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Pengalaman.store.Pengalaman').reload();
                                        }        
                                    });
                                },
                                failure : function(response, op){
                                    Ext.MessageBox.show({
                                        title   : 'Error',
                                        msg     : Ext.data.JsonReader(op.result.total),
                                        icon    : Ext.MessageBox.ERROR,
                                        buttons : Ext.MessageBox.OK,
                                        fn      : function(btn, gridPanel, selected){
                                            var form    = Ext.getCmp('formprofile');
                                            var grid    = Ext.getCmp('gridprofile');
                                            var pic     = form.queryById('imagePreview');
                                            pic.setSrc('');
                                            form.getForm().reset();
                                            grid.getSelectionModel().deselectAll();
                                            if(createAnggota == false){
                                                var saveButton = form.down('button[text=Save]');
                                                saveButton.setDisabled(false);
                                            }else{
                                                var saveButton = form.down('button[text=Save]');
                                                saveButton.setDisabled(true);
                                            }

                                            var updateButton = form.down('button[text=Edit]');
                                            updateButton.setDisabled(true);
                                            Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Pengalaman.store.Pengalaman').reload();
                                        }  
                                    });                   
                                }
                            });
                        }
                    }
                });
            }
        },
        {
            text    : 'Reset',
            iconCls : 'icon-refresh',
            action  : 'reset'
        }
    ]
});

Ext.define('SMS.module.Employee.Profile.view.form.GridPengalaman', {
    extend   : 'Ext.grid.Panel',
    store    : Ext.create('SMS.module.Employee.Profile.store.Pengalaman'),
    alias    : 'widget.gridpengalaman',
    id       : 'gridpengalaman',
    border   : false,
    frame    : true,
    margins     : '3px', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'SINGLE',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : Ext.create('SMS.module.Employee.Profile.store.Pengalaman'),
        dock        : 'bottom'
    }], 
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '7%'
        },
        {
            text     : 'Nama Perusahaan',
            dataIndex: 'nama_perusahaan',
            width    : '40%'
        },
         {
            text     : 'Jabatan',
            dataIndex: 'jabatan',
            width    : '40%'
        }
    ],
});

/*===================================== Panel Pelatihan ==========================================*/
Ext.define('SMS.module.Employee.Profile.view.form.PanelPelatihan', {
    extend   : 'Ext.panel.Panel',
    alias    : 'widget.panelpelatihan',
    id       : 'panelpelatihan',
    layout   : 'fit',
    frame    : true,
    border   : false,
    title    : 'Management Data Pelatihan Karyawan',     
    requires : [
        'SMS.module.Employee.Profile.view.form.Pelatihan',
        'SMS.module.Employee.Profile.view.form.GridPelatihan'
    ],
    layout      : {
        type    :'vbox',
        align   :'stretch'
    },
    defaults    : {
        flex    : 1
    },    
    closable    : false,
    items       : [ 
        {xtype   : 'pelatihan', flex : 0.7},
        {xtype   : 'gridpelatihan', flex : 1.3}         
    ]
});

Ext.define('SMS.module.Employee.Profile.view.form.Pelatihan', {
    extend  : 'Ext.form.Panel',
    alias   : 'widget.pelatihan',
    id      : 'pelatihan',
    frame   : true,
    border  : false,
    items   : [
        {
            xtype   : 'textfield',
            hidden  : true,
            name    : 'id'
        },
        {
            xtype   : 'textfield',
            hidden  : true,
            name    : 'id_bio'
        },
        {
            xtype   : 'fieldcontainer',
            layout  : 'hbox',
            padding : '5px',
            items   : [
                {
                    xtype       : 'textfield',
                    fieldLabel  : 'Materi Pelatihan',
                    name        : 'materi_pelatihan',
                    emptyText   : 'Masukan Materi Pelatihan',
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                }
            ]
        },
        {
            xtype   : 'fieldcontainer',
            layout  : 'hbox',
            padding : '5px',
            items   : [
                {
                    xtype       : 'textfield',
                    fieldLabel  : 'No Sertifikat',
                    name        : 'no_sertifikat',
                    emptyText   : 'No Sertifikat',
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                },
                {
                    xtype       : 'textfield',
                    name        : 'penyelenggara',
                    emptyText   : 'Penyelenggara',
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                }
            ]
        },
        {
            xtype   : 'fieldcontainer',
            layout  : 'hbox',
            padding : '5px',
            items   : [
                {
                    xtype       : 'textfield',
                    fieldLabel  : 'Tempat',
                    name        : 'tempat',
                    emptyText   : 'Tempat Pelatihan',
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                },
                {
                    xtype       : 'datefield',
                    name        : 'waktu',
                    emptyText   : 'Waktu Pelatihan',
                    dateFormat  : 'Y:m:d',
                    submitFormat : 'Y:m:d',
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                }
            ]
        }
    ],
    buttons : [
        {
            text    : 'Save',
            iconCls : 'icon-save',
            handler : function(){
                var form              = this.up('form').getForm();
                var materi_pelatihan  = form.findField('materi_pelatihan').getValue();
                var no_sertifikat     = form.findField('no_sertifikat').getValue();
                var penyelenggara     = form.findField('penyelenggara').getValue();
                var tempat            = form.findField('tempat').getValue();
                var waktu             = form.findField('waktu').getValue();
                if(form.isValid()){
                   form.submit({
                        url     : BASE_URL + 'profile/c_profile/savePelatihan',
                        headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
                        method  : 'POST',
                        params  : {
                            materi_pelatihan : nama_perusahaan, 
                            no_sertifikat    : jenis_usaha,
                            penyelenggara    : penyelenggara,
                            tempat           : tempat,
                            waktu            : waktu
                        },
                        waitMsg: 'Please Wait Data is Processing',
                          success : function(response, op){
                            Ext.MessageBox.show({
                                title           : 'Informasi',
                                msg             : Ext.data.JsonReader(op.result.total),
                                icon            : Ext.MessageBox.INFO,
                                buttons         : Ext.MessageBox.OK
                            });
                            var form    = Ext.getCmp('pelatihan');
                            var grid    = Ext.getCmp('gridprofile');
                            var pic     = form.queryById('imagePreview');
                            pic.setSrc('');
                            form.getForm().reset();
                            grid.getSelectionModel().deselectAll();
                            Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Pelatihan.store.Pelatihan').reload();
                        },
                        failure : function(response, op){
                            Ext.MessageBox.show({
                                title           : 'Error',
                                msg             : Ext.data.JsonReader(op.result.total),
                                icon            : Ext.MessageBox.ERROR,
                                buttons         : Ext.MessageBox.OK
                            });                   
                        }                          
                   }); 
                } 
            }
        },
        {
            text    : 'Edit',
            iconCls : 'icon-edit',
            handler     : function(){
                var form              = this.up('form').getForm();
                var id                = form.findField('id').getValue();
                var materi_pelatihan  = form.findField('materi_pelatihan').getValue();
                var no_sertifikat     = form.findField('no_sertifikat').getValue();
                var penyelenggara     = form.findField('penyelenggara').getValue();
                var tempat            = form.findField('tempat').getValue();
                var waktu             = form.findField('waktu').getValue();
                Ext.MessageBox.show({
                    title   : 'Konfirmasi',
                    msg     : 'Anda Yakin Merubah Data',
                    buttons : Ext.Msg.YESNO,
                    icon    : Ext.MessageBox.WARNING,
                    width   : 500,
                    fn      : function(btn,evtObj){
                        if(btn == 'yes'){
                            form.submit({
                                url     : BASE_URL + 'profile/c_profile/editPelatihan',
                                headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
                                method  : 'POST',
                                params  : {
                                    id               : id,
                                    materi_pelatihan : nama_perusahaan, 
                                    no_sertifikat    : jenis_usaha,
                                    penyelenggara    : penyelenggara,
                                    tempat           : tempat,
                                    waktu            : waktu
                                },
                                success : function(response, op){
                                    Ext.MessageBox.show({
                                        title       : 'Informasi',
                                        msg         : Ext.data.JsonReader(op.result.total),
                                        icon        : Ext.MessageBox.INFO,
                                        buttons     : Ext.MessageBox.OK,
                                        fn          : function(btn, gridPanel, selected){
                                            var form    = Ext.getCmp('formprofile');
                                            var grid    = Ext.getCmp('gridprofile');
                                            var pic     = form.queryById('imagePreview');
                                            pic.setSrc('');
                                            form.getForm().reset();
                                            grid.getSelectionModel().deselectAll();
                                            if(createAnggota == false){
                                                var saveButton = form.down('button[text=Save]');
                                                saveButton.setDisabled(false);
                                            }else{
                                                var saveButton = form.down('button[text=Save]');
                                                saveButton.setDisabled(true);
                                            }

                                            var updateButton = form.down('button[text=Edit]');
                                            updateButton.setDisabled(true);
                                            Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Pelatihan.store.Pelatihan').reload();
                                        }        
                                    });
                                },
                                failure : function(response, op){
                                    Ext.MessageBox.show({
                                        title   : 'Error',
                                        msg     : Ext.data.JsonReader(op.result.total),
                                        icon    : Ext.MessageBox.ERROR,
                                        buttons : Ext.MessageBox.OK,
                                        fn      : function(btn, gridPanel, selected){
                                            var form    = Ext.getCmp('formprofile');
                                            var grid    = Ext.getCmp('gridprofile');
                                            var pic     = form.queryById('imagePreview');
                                            pic.setSrc('');
                                            form.getForm().reset();
                                            grid.getSelectionModel().deselectAll();
                                            if(createAnggota == false){
                                                var saveButton = form.down('button[text=Save]');
                                                saveButton.setDisabled(false);
                                            }else{
                                                var saveButton = form.down('button[text=Save]');
                                                saveButton.setDisabled(true);
                                            }

                                            var updateButton = form.down('button[text=Edit]');
                                            updateButton.setDisabled(true);
                                            Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Pelatihan.store.Pelatihan').reload();
                                        }  
                                    });                   
                                }
                            });
                        }
                    }
                });
            }
        },
        {
            text    : 'Reset',
            iconCls : 'icon-refresh',
            action  : 'reset'
        }
    ]
});

Ext.define('SMS.module.Employee.Profile.view.form.GridPelatihan', {
    extend   : 'Ext.grid.Panel',
    store    : Ext.create('SMS.module.Employee.Profile.store.Pelatihan'),
    alias    : 'widget.gridpelatihan',
    id       : 'gridpelatihan',
    border   : false,
    frame    : true,
    margins     : '3px', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'SINGLE',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : Ext.create('SMS.module.Employee.Profile.store.Pelatihan'),
        dock        : 'bottom'
    }], 
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '7%'
        },
        {
            text     : 'Materi Pelatihan',
            dataIndex: 'nama_perusahaan',
            width    : '40%'
        },
         {
            text     : 'No Sertifikat',
            dataIndex: 'no_sertifikat',
            width    : '40%'
        }
    ],
});

/*===================================== Panel Catatan ==========================================*/
Ext.define('SMS.module.Employee.Profile.view.form.PanelCatatan', {
    extend   :  'Ext.panel.Panel',
    alias    : 'widget.panelcatatan',
    id       : 'panelcatatan',
    layout   : 'fit',
    frame    : true,     
    requires : [
        'SMS.module.Employee.Profile.view.form.Catatan',
        'SMS.module.Employee.Profile.view.form.GridCatatan'
    ],
    layout      : {
        type    :'vbox',
        align   :'stretch'
    },
    defaults    : {
        flex    : 1
    },    
    closable    : false,
    items       : [ 
        {xtype   : 'catatan', flex : 1},
        {xtype   : 'gridcatatan', flex : 1}         
    ]
});

Ext.define('SMS.module.Employee.Profile.view.form.Catatan', {
    extend  : 'Ext.form.Panel',
    alias   : 'widget.catatan',
    id      : 'catatan',
    title    : 'Data Catatan Karyawan',
    frame   : true,
    border  : false,
    items   : [
        {
            xtype   : 'textfield',
            hidden  : true,
            name    : 'id'
        },
        {
            xtype   : 'textfield',
            hidden  : true,
            name    : 'id_bio'
        },
        {
            xtype   : 'fieldcontainer',
            layout  : 'hbox',
            padding : '5px',
            items   : [
               {
                    xtype       : 'datefield',
                    fieldLabel  : 'Tanggal',
                    name        : 'tanggal',
                    emptyText   : 'Tanggal',
                    dateFormat  : 'Y:m:d',
                    submitFormat : 'Y:m:d',
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                }
            ]
        },
        {
            xtype   : 'fieldcontainer',
            layout  : 'hbox',
            padding : '5px',
            items   : [
                {
                    xtype       : 'textareafield',
                    fieldLabel  : 'Keterangan',
                    name        : 'keterangan',
                    emptyText   : 'Masukan Keterangan Disini',
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                }
            ]
        },
        {
            xtype   : 'fieldcontainer',
            layout  : 'hbox',
            padding : '5px',
            items   : [
                {
                    xtype       : 'textareafield',
                    fieldLabel  : 'Describtion',
                    name        : 'describtion',
                    emptyText   : 'Masukan Deskripsi Disini',
                    margins     : '2px 2px 2px 2px',
                    allowBlank  : true,
                    msgTarget   : 'under',
                    flex        : 1
                }
            ]
        }
    ],
    buttons : [
        {
            text    : 'Save',
            iconCls : 'icon-save',
            handler : function(){
                var form              = this.up('form').getForm();
                var tanggal           = form.findField('tanggal').getValue();
                var keterangan        = form.findField('keterangan').getValue();
                var describtion       = form.findField('describtion').getValue();
                if(form.isValid()){
                   form.submit({
                        url     : BASE_URL + 'profile/c_profile/saveCatatan',
                        headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
                        method  : 'POST',
                        params  : {
                                tanggal          : tanggal, 
                                keterangan       : keterangan,
                                describtion      : describtion
                        },
                        waitMsg: 'Please Wait Data is Processing',
                          success : function(response, op){
                            Ext.MessageBox.show({
                                title           : 'Informasi',
                                msg             : Ext.data.JsonReader(op.result.total),
                                icon            : Ext.MessageBox.INFO,
                                buttons         : Ext.MessageBox.OK
                            });
                            var form    = Ext.getCmp('catatan');
                            var grid    = Ext.getCmp('gridprofile');
                            var pic     = form.queryById('imagePreview');
                            pic.setSrc('');
                            form.getForm().reset();
                            grid.getSelectionModel().deselectAll();
                            Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Catatan.store.Catatan').reload();
                        },
                        failure : function(response, op){
                            Ext.MessageBox.show({
                                title           : 'Error',
                                msg             : Ext.data.JsonReader(op.result.total),
                                icon            : Ext.MessageBox.ERROR,
                                buttons         : Ext.MessageBox.OK
                            });                   
                        }                          
                   }); 
                } 
            }
        },
        {
            text    : 'Edit',
            iconCls : 'icon-edit',
            handler     : function(){
                var form              = this.up('form').getForm();
                var id                = form.findField('id').getValue();
                var tanggal           = form.findField('tanggal').getValue();
                var keterangan        = form.findField('keterangan').getValue();
                var describtion       = form.findField('describtion').getValue();
                Ext.MessageBox.show({
                    title   : 'Konfirmasi',
                    msg     : 'Anda Yakin Merubah Data',
                    buttons : Ext.Msg.YESNO,
                    icon    : Ext.MessageBox.WARNING,
                    width   : 500,
                    fn      : function(btn,evtObj){
                        if(btn == 'yes'){
                            form.submit({
                                url     : BASE_URL + 'profile/c_profile/editCatatan',
                                headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
                                method  : 'POST',
                                params  : {
                                    id               : id,
                                    tanggal          : tanggal, 
                                    keterangan       : keterangan,
                                    describtion      : describtion
                                },
                                success : function(response, op){
                                    Ext.MessageBox.show({
                                        title       : 'Informasi',
                                        msg         : Ext.data.JsonReader(op.result.total),
                                        icon        : Ext.MessageBox.INFO,
                                        buttons     : Ext.MessageBox.OK,
                                        fn          : function(btn, gridPanel, selected){
                                            var form    = Ext.getCmp('formprofile');
                                            var grid    = Ext.getCmp('gridprofile');
                                            var pic     = form.queryById('imagePreview');
                                            pic.setSrc('');
                                            form.getForm().reset();
                                            grid.getSelectionModel().deselectAll();
                                            if(createAnggota == false){
                                                var saveButton = form.down('button[text=Save]');
                                                saveButton.setDisabled(false);
                                            }else{
                                                var saveButton = form.down('button[text=Save]');
                                                saveButton.setDisabled(true);
                                            }

                                            var updateButton = form.down('button[text=Edit]');
                                            updateButton.setDisabled(true);
                                            Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Catatan.store.Catatan').reload();
                                        }        
                                    });
                                },
                                failure : function(response, op){
                                    Ext.MessageBox.show({
                                        title   : 'Error',
                                        msg     : Ext.data.JsonReader(op.result.total),
                                        icon    : Ext.MessageBox.ERROR,
                                        buttons : Ext.MessageBox.OK,
                                        fn      : function(btn, gridPanel, selected){
                                            var form    = Ext.getCmp('formprofile');
                                            var grid    = Ext.getCmp('gridprofile');
                                            var pic     = form.queryById('imagePreview');
                                            pic.setSrc('');
                                            form.getForm().reset();
                                            grid.getSelectionModel().deselectAll();
                                            if(createAnggota == false){
                                                var saveButton = form.down('button[text=Save]');
                                                saveButton.setDisabled(false);
                                            }else{
                                                var saveButton = form.down('button[text=Save]');
                                                saveButton.setDisabled(true);
                                            }

                                            var updateButton = form.down('button[text=Edit]');
                                            updateButton.setDisabled(true);
                                            Ext.ComponentQuery.query('#gridprofile')[0].getStore('SMS.module.Employee.Catatan.store.Catatan').reload();
                                        }  
                                    });                   
                                }
                            });
                        }
                    }
                });
            }
        },
        {
            text    : 'Reset',
            iconCls : 'icon-refresh',
            action  : 'reset'
        }
    ]
});

Ext.define('SMS.module.Employee.Profile.view.form.GridCatatan', {
    extend   : 'Ext.grid.Panel',
    store    : Ext.create('SMS.module.Employee.Profile.store.Catatan'),
    alias    : 'widget.gridcatatan',
    id       : 'gridcatatan',
    border   : false,
    frame    : true,
    margins     : '3px', 
    selModel: {
        selType     : 'checkboxmodel',
        mode        : 'SINGLE',
        checkOnly   : true,
        width       : '3%',
        action      : 'selected',
    },
    dockedItems: [{
        xtype       : 'pagingtoolbar',
        store       : Ext.create('SMS.module.Employee.Profile.store.Catatan'),
        dock        : 'bottom'
    }], 
    columns  : [
        {
            text    : 'No',
            xtype   : 'rownumberer',
            width   : '7%'
        },
        {
            text     : 'Tanggal',
            dataIndex: 'tanggal',
            width    : '20%'
        },
        {
            text     : 'Keterangan',
            dataIndex: 'keterangan',
            width    : '60%'
        }
    ],
});
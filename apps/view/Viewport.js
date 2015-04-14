Ext.define('SMS.view.panel.Dashboard',{
	extend 	: 'Ext.container.Container',
	alias 	: 'widget.paneldashboard',
	id 		: 'paneldashboard',
	initComponent : function(){
		var pnl = this;
		Ext.apply(pnl,{
			title 	: 'Home',
			iconCls : 'icon-home',
			layout 	: {
				type : 'fit', align : 'stretch'
			},
			xtype 	: 'container',
            items   : [
                {
                    xtype       : 'form',
                    cls         : 'logo',
                    modal       : true,
                    frame       : true,
                    hideHeader  : true,
                    html        : '<div id="welcome"></div>' 
                }
            ]   
		});
		pnl.callParent(arguments);
	}
});

Ext.define('SMS.view.Tab',{
	extend 			: 'Ext.tab.Panel',
	alias 			: 'widget.mainTab',
	resizeTab		: true,
	id 				: 'mainTab',
	layout 			: 'fit',
	margins			: '2px 2px 2px 0px',
    bodyStyle		: 'background : transparent',
    closeAction		: 'hide',
    autoDestroy		: false,
    frame			: true,
    plain			: true,
    enableTabScroll	: true,
    defaults 		: {autoScroll : true},
    items 			: [
    	{
    		xtype : 'paneldashboard'
    	}
    ]
});

Ext.define('SMS.view.Menu',{
	extend 	: 'Ext.tree.Panel',
	alias 	: 'widget.mainmenu',
	id 		: 'mainmenu',
	initComponent:function(){
		var conmn = this;
		Ext.apply(conmn,{
			xtype 		: 'panel',
			store 		: 'SMS.store.TreeStore',
			iconCls		: 'icon-menu',
			cls 		: 'scrollarea',
			title 		: 'MAIN MENU',
			autoScroll	: true,
            rootVisible	: false,
            useArrows	: true,
            layout		: 'fit',
            bodyStyle	: 'padding : 0px',
            disabled	: false,
            width		: 250,
            border		: false,
            frame		: true,
            collapsible	: true,
            split		: true,
            items		: [],		
   			tbar 		: [
                {
                    id		: 'user',
                    text	: 'USERNAME',
                    tooltip	: 'Show Profile',
                    iconCls	: 'icon-username',
                    action  : 'resetpassword'
                },
                '->',
                {
                    id		: 'logout',
                    text	: 'LOGOUT',
                    tooltip	: 'Exit Application',
                    iconCls	: 'icon-logout',
                    action  : 'logout'
                }
            ]
		});
		conmn.callParent(arguments);
	}
});

/**
 * @class SMSIA Viewport
 * @extends Container Viewport
 * Copyright PT. ART MEDIA INDONESIA 
 */
Ext.define('SMS.view.Viewport', {
    extend 		: 'Ext.container.Viewport',
    requires 	: ['SMS.view.Menu'],
    alias 		: 'widget.viewport',
    id 			: 'viewport',
    initComponent:function(){
    	Ext.apply(this,{
			layout 		: 'border',
			xtype		: 'panel',
			defaults	: {frame: false, border: false},
			border		: false,
			items		:[
				{
					xtype 	: 'panel',
					layout 	: 'fit',
					region	: 'north',
                    iconCls : 'icon-pip',
					title 	: 'PT. PANGANMAS INTI PERSADA',
					id		: 'appHeader'
				},
				{
					xtype	: 'mainmenu',
					region 	: 'west',
					width	: 200
				},
                {
                    region	: 'center',
                    xtype	: 'mainTab'
                },				
				{
					id 		: 'mainContainer ',
					xtype 	: 'panel',
					region	: 'south',
					layout	: 'fit',
					margins : '2px 2px 2x 2px',
					bbar       : [                    
                        '->',
                        {
                            text        : 'Copyright &copy; 2015 Vikosha Perdana',
                            enabled    : true
                        },
                        '-',
                        {
                            text        : 'HRIS System',
                            enabled    : true
                        },
                        '-',
                        {
                            id          : 'datestamp',
                            text        : '01-01-1970',
                            enabled    : true
                        },
                        '-',
                        {
                            id          : 'timestamp',
                            enabled     : true,
                            iconCls     : 'icon-clock',
                            text        : '00:00:00'
                        }
                    ]        
				}
			]
    	});
    	this.callParent(arguments);
    }
});
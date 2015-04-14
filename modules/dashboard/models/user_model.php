<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda
| Copyright Ardian Webi Kirda
| Created By ian  18-01-2015
|---------------------------------
*/

class User_model extends CI_Model{

	private $connectionName;

	public function __construct(){
		parent::__construct();
	}

	public function setConnection($connectionName){
		$this->connectionName = $connectionName;
	}

	public function getConnection(){
		return $this->load->database($this->connectionName, TRUE);
	}

	public function validasi($username, $password){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select('id_user, name, username, password');
		$db->from('sys_user');
		$db->where('username',$username);
		$db->where('password',base64_encode(sha1($password,TRUE)));
		$db->where('isactive','Y');
		$db->limit(1);
		$query = $db->get();
		if($query->num_rows()==1){
			return $query->result();
		} else {
			return FALSE;
		}
	}

	function user_rules($id){
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

		$db->select('gm.id_menu AS id');
		$db->from('sys_role_menu AS gm');
		$db->join('sys_role r', 'r.id_role=gm.id_role');
		$db->join('sys_user u', 'r.id_role=u.id_role');
		$db->where('u.id_user',$id);
		$query = $db->get();
		return $query;
	}

	public function cekrulesparent($rules){
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

		$db->select('id_menu AS id, name AS name, icon AS icon, leaf AS leaf, selector AS selector, cls AS cls');
		$db->from('sys_menu');
		$db->where_in('id_menu',$rules);
		$db->where('parent',0);
		$db->where('isactive','Y');
		$db->order_by('id_menu');
		$query = $db->get(); 		
		return $query;
	}

	public function cekruleschild($id, $rules){
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

		$db->select('id_menu AS id, name AS name, icon AS icon, leaf AS leaf, selector AS selector, cls AS cls');
		$db->from('sys_menu');
		$db->where_in('parent',$id);
		$db->where('parent !=',0);
		$db->where('isactive','Y');
		$db->where_in('id_menu',$rules);
		$db->order_by('id_menu');
		$query = $db->get();     		    
		return $query;
	}

	function validasi_rule($node){
	  	$menus = $this->user_rules($this->session->userdata('id'));
	    foreach($menus->result() as $val){
	        $data[]       = $val->id;
	    }
	  	// var_dump($menus);
	  	// exit();
	  	if ($node) {
	    	$result = $this->cekruleschild($node, $data);
	  	} else {
	    	$result = $this->cekrulesparent($data);
	  	}

	    foreach ($result->result() as $key => $value) {
	      $rules[] = array(
	        'id' 		=> $value->id,        
	        'text' 		=> $value->name,
	        'iconCls' 	=> $value->icon,
	        'leaf' 		=> ($value->leaf === 't') ? true : false,
	        'selector' 	=> $value->selector,
	        'cls' 		=> $value->cls
	        );
	    }
	  	return $rules;
	}

	public function iscreatePrevilege(){ 
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

        $db->select(" REPLACE(m.name, ' ', '') AS menu, CASE WHEN rm.iscreate = 'Y' THEN 'false' ELSE 'true' END AS iscreate", FALSE);
        $db->from('sys_role_menu rm');
        $db->join('sys_role r','r.id_role=rm.id_role');
        $db->join('sys_user u','r.id_role=u.id_role');
        $db->join('sys_menu m','rm.id_menu=m.id_menu');
        $db->where('u.id_user',$this->session->userdata('id'));
        $query = $db->get();        
        return $query;
    }

    public function isupdatePrevilege(){   
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

        $db->select(" REPLACE(m.name, ' ', '') AS menu, CASE WHEN rm.isupdate = 'Y' THEN 'false' ELSE 'true' END AS isupdate", FALSE);
        $db->from('sys_role_menu rm');
        $db->join('sys_role r','r.id_role=rm.id_role');
        $db->join('sys_user u','r.id_role=u.id_role');
        $db->join('sys_menu m','rm.id_menu=m.id_menu');
        $db->where('u.id_user',$this->session->userdata('id'));
        $query = $db->get();         
        return $query;
    }

    public function isdeletePrevilege(){              
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
       
        $db->select(" REPLACE(m.name, ' ', '') AS menu, CASE WHEN rm.isdelete = 'Y' THEN 'false' ELSE 'true' END AS isdelete", FALSE);
        $db->from('sys_role_menu rm');
        $db->join('sys_role r','r.id_role=rm.id_role');
        $db->join('sys_user u','r.id_role=u.id_role');
        $db->join('sys_menu m','rm.id_menu=m.id_menu');
        $db->where('u.id_user',$this->session->userdata('id'));
        $query = $db->get();          
        return $query;
    }

    public function isprocessPrevilege(){              
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

        $db->select(" REPLACE(m.name, ' ', '') AS menu, CASE WHEN rm.isprocess = 'Y' THEN 'false' ELSE 'true' END AS isprocess", FALSE);
        $db->from('sys_role_menu rm');
        $db->join('sys_role r','r.id_role=rm.id_role');
        $db->join('sys_user u','r.id_role=u.id_role');
        $db->join('sys_menu m','rm.id_menu=m.id_menu');
        $db->where('u.id_user',$this->session->userdata('id'));
        // $this->db->where('m.name','Users');
        $query = $db->get();
        return $query;
    }
}
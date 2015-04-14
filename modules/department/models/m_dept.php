<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class M_dept extends CI_Model{
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

	public function getGridDept($limit, $offset){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
			u.id_dept AS id,
			u.kode_dept AS kode_dept,
			u.name_dept AS name_dept,
			u.active AS active,
            CASE WHEN u.active = 'Y' THEN 1 ELSE 0 END AS active", FALSE);
        $db->from('tm_dept u');
        $db->order_by('u.name_dept');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
	}

	public function countGridDept(){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
			u.id_dept AS id,
			u.kode_dept AS kode_dept,
			u.name_dept AS name_dept,
			u.active AS active,
            CASE WHEN u.active = 'Y' THEN 1 ELSE 0 END AS active", FALSE);
        $db->from('tm_dept u');
        $db->order_by('u.name_dept');
        $query = $db->get();
        return $query;
	}

	public function getUUID(){   
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->query('SELECT get_uuid() AS uuid;')->row()->uuid;
    }

    public function cekRelasi($id){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('tm_sect')->where('id_dept',$id)->get()->row()->id;
    }

    public function cekData($kode_dept){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
    	return $db->select('COUNT(*) AS id', FALSE)->from('tm_dept')->where('kode_dept',$kode_dept)->get()->row()->id;
    }

    public function saveDept($uuid, $kode_dept, $name_dept, $active){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->set('id_dept', $uuid);
        $db->set('kode_dept', $kode_dept);
        $db->set('name_dept', $name_dept);
        $db->set('active', $active);
        $db->insert('tm_dept');
    }

    public function updateDept($id, $kode_dept, $name_dept, $active){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        
        $data = array(
        	'kode_dept' => $kode_dept,
        	'name_dept'	=> $name_dept,
        	'active' 	=> $active
        );
        $db->where('id_dept', $id);
        $db->update('tm_dept', $data);

    }

    public function deleteDept($id){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->where('id_dept',$id);
        $db->delete('tm_dept');
    }

    public function searchDept($name){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();

        $db->select("
			u.id_dept AS id,
			u.kode_dept AS kode_dept,
			u.name_dept AS name_dept,
			u.active AS active,
            CASE WHEN u.active = 'Y' THEN 1 ELSE 0 END AS active", FALSE);
        $db->from('tm_dept u');
        $db->like('LOWER(u.kode_dept)', strtolower($name));
        $db->or_like('LOWER(u.name_dept)', strtolower($name));
        $query = $db->get();
        return $query;
    }
}
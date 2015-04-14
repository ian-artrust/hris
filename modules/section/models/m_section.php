<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class M_section extends CI_Model{
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

	public function getGridSect($limit, $offset){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
			u.id_sect AS id,
			u.id_dept AS id_dept,
			u.name_sect AS name_sect,
            v.name_dept AS name_dept,
			u.active AS active,
            CASE WHEN u.active = 'Y' THEN 1 ELSE 0 END AS active", FALSE);
        $db->from('tm_sect u');
        $db->join('tm_dept v', 'u.id_dept=v.id_dept');
        $db->order_by('u.name_sect');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
	}

	public function countGridSect(){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
            u.id_sect AS id,
            u.id_dept AS id_dept,
            u.name_sect AS name_sect,
            v.name_dept AS name_dept,
            u.active AS active,
            CASE WHEN u.active = 'Y' THEN 1 ELSE 0 END AS active", FALSE);
        $db->from('tm_sect u');
        $db->join('tm_dept v', 'u.id_dept=v.id_dept');
        $db->order_by('u.name_sect');
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
        return $db->select('COUNT(*) AS id', FALSE)->from('tm_jobname')->where('id_sect',$id)->get()->row()->id;
    }

    public function cekData($name_sect){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
    	return $db->select('COUNT(*) AS id', FALSE)->from('tm_sect')->where('name_sect',$name_sect)->get()->row()->id;
    }

    public function saveSect($uuid, $id_dept, $name_sect, $active){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->set('id_sect', $uuid);
        $db->set('id_dept', $id_dept);
        $db->set('name_sect', $name_sect);
        $db->set('active', $active);
        $db->insert('tm_sect');
    }

    public function updateSect($id, $id_dept, $name_sect, $active){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        
        $data = array(
        	'id_dept'      => $id_dept,
        	'name_sect'	   => $name_sect,
        	'active' 	   => $active
        );
        $db->where('id_sect', $id);
        $db->update('tm_sect', $data);

    }

    public function deleteSect($id){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->where('id_sect',$id);
        $db->delete('tm_sect');
    }

    public function searchSect($name){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();

      $db->select("
            u.id_sect AS id,
            u.id_dept AS id_dept,
            u.name_sect AS name_sect,
            v.name_dept AS name_dept,
            u.active AS active,
            CASE WHEN u.active = 'Y' THEN 1 ELSE 0 END AS active", FALSE);
        $db->from('tm_sect u');
        $db->join('tm_dept v', 'u.id_dept=v.id_dept');
        $db->like('LOWER(u.name_sect)', strtolower($name));
        $db->or_like('LOWER(v.name_dept)', strtolower($name));
        $query = $db->get();
        return $query;
    }
}
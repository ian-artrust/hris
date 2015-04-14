<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class M_shiftkerja extends CI_Model{
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

	public function getGridShiftkerja($limit, $offset){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
			u.id_shift AS id,
			u.name_shift AS name_shift", FALSE);
        $db->from('tm_shift u');
        $db->order_by('u.name_shift');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
	}

	public function countGridShiftkerja(){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
            u.id_shift AS id,
            u.name_shift AS name_shift", FALSE);
        $db->from('tm_shift u');
        $db->order_by('u.name_shift');
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
        return $db->select('COUNT(*) AS id', FALSE)->from('tm_shift')->where('id_shift',$id)->get()->row()->id;
    }

    public function cekData($name_shift){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
    	return $db->select('COUNT(*) AS id', FALSE)->from('tm_shift')->where('name_shift',$name_shift)->get()->row()->id;
    }

    public function saveShiftkerja($uuid, $name_shift){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->set('id_shift', $uuid);
        $db->set('name_shift', $name_shift);
        $db->insert('tm_shift');
    }

    public function updateShiftkerja($id, $name_shift){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        
        $data = array(
        	'name_shift'   => $name_shift
        );
        $db->where('id_shift', $id);
        $db->update('tm_shift', $data);

    }

    public function deleteShiftkerja($id){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->where('id_shift',$id);
        $db->delete('tm_shift');
    }

    public function searchShiftkerja($name){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();

      $db->select("
            u.id_shift AS id,
            u.name_shift AS name_shift", FALSE);
        $db->from('tm_shift u');
        $db->like('LOWER(u.name_shift)', strtolower($name));
        $query = $db->get();
        return $query;
    }
}
<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class M_jamkerja extends CI_Model{
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

	public function getGridJamkerja($limit, $offset){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
			u.id_jamkerja AS id,
			u.name_jamkerja AS name_jamkerja", FALSE);
        $db->from('tm_jamkerja u');
        $db->order_by('u.name_jamkerja');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
	}

	public function countGridJamkerja(){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
            u.id_jamkerja AS id,
            u.name_jamkerja AS name_jamkerja", FALSE);
        $db->from('tm_jamkerja u');
        $db->order_by('u.name_jamkerja');
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
        return $db->select('COUNT(*) AS id', FALSE)->from('tm_jamkerja')->where('id_jamkerja',$id)->get()->row()->id;
    }

    public function cekData($name_jamkerja){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
    	return $db->select('COUNT(*) AS id', FALSE)->from('tm_jamkerja')->where('name_jamkerja',$name_jamkerja)->get()->row()->id;
    }

    public function saveJamkerja($uuid, $name_jamkerja){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->set('id_jamkerja', $uuid);
        $db->set('name_jamkerja', $name_jamkerja);
        $db->insert('tm_jamkerja');
    }

    public function updateJamkerja($id, $name_jamkerja){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        
        $data = array(
        	'name_jamkerja'   => $name_jamkerja
        );
        $db->where('id_jamkerja', $id);
        $db->update('tm_jamkerja', $data);

    }

    public function deleteJamkerja($id){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->where('id_jamkerja',$id);
        $db->delete('tm_jamkerja');
    }

    public function searchJamkerja($name){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();

      $db->select("
            u.id_jamkerja AS id,
            u.name_jamkerja AS name_jamkerja", FALSE);
        $db->from('tm_jamkerja u');
        $db->like('LOWER(u.name_jamkerja)', strtolower($name));
        $query = $db->get();
        return $query;
    }
}
<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class M_harikerja extends CI_Model{
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

	public function getGridHarikerja($limit, $offset){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
			u.id_harikerja AS id,
			u.name_harikerja AS name_harikerja", FALSE);
        $db->from('tm_harikerja u');
        $db->order_by('u.name_harikerja');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
	}

	public function countGridHarikerja(){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
            u.id_harikerja AS id,
            u.name_harikerja AS name_harikerja", FALSE);
        $db->from('tm_harikerja u');
        $db->order_by('u.name_harikerja');
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
        return $db->select('COUNT(*) AS id', FALSE)->from('tm_harikerja')->where('id_harikerja',$id)->get()->row()->id;
    }

    public function cekData($name_harikerja){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
    	return $db->select('COUNT(*) AS id', FALSE)->from('tm_harikerja')->where('name_harikerja',$name_harikerja)->get()->row()->id;
    }

    public function saveHarikerja($uuid, $name_harikerja){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->set('id_harikerja', $uuid);
        $db->set('name_harikerja', $name_harikerja);
        $db->insert('tm_harikerja');
    }

    public function updateHarikerja($id, $name_harikerja){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        
        $data = array(
        	'name_harikerja'   => $name_harikerja
        );
        $db->where('id_harikerja', $id);
        $db->update('tm_harikerja', $data);

    }

    public function deleteHarikerja($id){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->where('id_harikerja',$id);
        $db->delete('tm_harikerja');
    }

    public function searchHarikerja($name){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();

      $db->select("
            u.id_harikerja AS id,
            u.name_harikerja AS name_harikerja", FALSE);
        $db->from('tm_harikerja u');
        $db->like('LOWER(u.name_harikerja)', strtolower($name));
        $query = $db->get();
        return $query;
    }
}
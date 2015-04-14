<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class M_kabupaten extends CI_Model{
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

	public function getGridKabupaten($limit, $offset){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
			u.id_kab AS id,
            u.id_prov AS id_prov,
            v.name_prov AS name_prov,
			u.name_kab AS name_kab", FALSE);
        $db->from('tm_kab u');
        $db->join('tm_prov v','u.id_prov = v.id_prov');
        $db->order_by('u.name_kab');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
	}

	public function countGridKabupaten(){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
            u.id_kab AS id,
            u.id_prov AS id_prov,
            v.name_prov AS name_prov,
            u.name_kab AS name_kab", FALSE);
        $db->from('tm_kab u');
        $db->join('tm_prov v','u.id_prov = v.id_prov');
        $db->order_by('u.name_kab');
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
        return $db->select('COUNT(*) AS id', FALSE)->from('tm_kab')->where('id_kab',$id)->get()->row()->id;
    }

    public function cekData($name_kab){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
    	return $db->select('COUNT(*) AS id', FALSE)->from('tm_kab')->where('name_kab',$name_kab)->get()->row()->id;
    }

    public function saveKabupaten($uuid, $id_prov, $name_kab){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->set('id_kab', $uuid);
        $db->set('id_prov', $id_prov);
        $db->set('name_kab', $name_kab);
        $db->insert('tm_kab');
    }

    public function updateKabupaten($id, $id_prov, $name_kab){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        
        $data = array(
            'id_prov'    => $id_prov,
        	'name_kab'   => $name_kab
        );
        $db->where('id_kab', $id);
        $db->update('tm_kab', $data);

    }

    public function deleteKabupaten($id){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->where('id_kab',$id);
        $db->delete('tm_kab');
    }

    public function searchKabupaten($name){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();

       $db->select("
            u.id_kab AS id,
            u.id_prov AS id_prov,
            v.name_prov AS name_prov,
            u.name_kab AS name_kab", FALSE);
        $db->from('tm_kab u');
        $db->join('tm_prov v','u.id_prov = v.id_prov');
        $db->like('LOWER(u.name_kab)',strtolower($name));
        $db->or_like('LOWER(v.name_prov)',strtolower($name));
        $db->order_by('u.name_kab');
        $query = $db->get();
        return $query;
    }
}
<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class M_provinsi extends CI_Model{
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

	public function getGridProvinsi($limit, $offset){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
			u.id_prov AS id,
			u.name_prov AS name_prov", FALSE);
        $db->from('tm_prov u');
        $db->order_by('u.name_prov');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
	}

	public function countGridProvinsi(){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
            u.id_prov AS id,
            u.name_prov AS name_prov", FALSE);
        $db->from('tm_prov u');
        $db->order_by('u.name_prov');
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
        return $db->select('COUNT(*) AS id', FALSE)->from('tm_prov')->where('id_prov',$id)->get()->row()->id;
    }

    public function cekData($name_prov){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
    	return $db->select('COUNT(*) AS id', FALSE)->from('tm_prov')->where('name_prov',$name_prov)->get()->row()->id;
    }

    public function saveProvinsi($uuid, $name_prov){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->set('id_prov', $uuid);
        $db->set('name_prov', $name_prov);
        $db->insert('tm_prov');
    }

    public function updateProvinsi($id, $name_prov){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        
        $data = array(
        	'name_prov'   => $name_prov
        );
        $db->where('id_prov', $id);
        $db->update('tm_prov', $data);

    }

    public function deleteProvinsi($id){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->where('id_prov',$id);
        $db->delete('tm_prov');
    }

    public function searchProvinsi($name){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();

       $db->select("
           u.id_prov AS id,
           u.name_prov AS name_prov", FALSE);
        $db->from('tm_prov u');
        $db->like('LOWER(u.name_prov)', strtolower($name));
        $query = $db->get();
        return $query;
    }
}
<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class M_joblevel extends CI_Model{
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

	public function getGridJoblevel($limit, $offset){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
			u.id_joblevel AS id,
			u.name_joblevel AS name_joblevel,
			u.ot AS ot,
            CASE WHEN u.ot = 'Y' THEN 1 ELSE 0 END AS ot,
			u.active AS active,
            CASE WHEN u.active = 'Y' THEN 1 ELSE 0 END AS active", FALSE);
        $db->from('tm_joblevel u');
        $db->order_by('u.name_joblevel');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
	}

	public function countGridJoblevel(){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
            u.id_joblevel AS id,
            u.name_joblevel AS name_joblevel,
            u.ot AS ot,
            CASE WHEN u.ot = 'Y' THEN 1 ELSE 0 END AS ot,
            u.active AS active,
            CASE WHEN u.active = 'Y' THEN 1 ELSE 0 END AS active", FALSE);
        $db->from('tm_joblevel u');
        $db->order_by('u.name_joblevel');
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
        return $db->select('COUNT(*) AS id', FALSE)->from('tm_jobname')->where('id_joblevel',$id)->get()->row()->id;
    }

    public function cekData($name_joblevel){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
    	return $db->select('COUNT(*) AS id', FALSE)->from('tm_joblevel')->where('name_joblevel',$name_joblevel)->get()->row()->id;
    }

    public function saveJoblevel($uuid, $name_joblevel, $ot, $active){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->set('id_joblevel', $uuid);
        $db->set('name_joblevel', $name_joblevel);
        $db->set('ot', $ot);
        $db->set('active', $active);
        $db->insert('tm_joblevel');
    }

    public function updateJoblevel($id, $name_joblevel, $ot, $active){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        
        $data = array(
        	'name_joblevel'   => $name_joblevel,
        	'ot'	          => $ot,
        	'active' 	      => $active
        );
        $db->where('id_joblevel', $id);
        $db->update('tm_joblevel', $data);

    }

    public function deleteJoblevel($id){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->where('id_joblevel',$id);
        $db->delete('tm_joblevel');
    }

    public function searchJoblevel($name){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();

       $db->select("
            u.id_joblevel AS id,
            u.name_joblevel AS name_joblevel,
            u.ot AS ot,
            CASE WHEN u.ot = 'Y' THEN 1 ELSE 0 END AS ot,
            u.active AS active,
            CASE WHEN u.active = 'Y' THEN 1 ELSE 0 END AS active", FALSE);
        $db->from('tm_joblevel u');
        $db->like('LOWER(u.name_joblevel)', strtolower($name));
        $query = $db->get();
        return $query;
    }
}
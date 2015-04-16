<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class M_jobname extends CI_Model{
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

	public function getGridJobname($limit, $offset){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
			u.id_jobname AS id,
			u.jobname AS jobname,
            u.id_sect AS id_sect,
            u.id_joblevel AS id_joblevel,
            w.name_sect AS name_sect,
            v.name_joblevel AS name_joblevel,
			u.active AS active,
            CASE WHEN u.active = 'Y' THEN 1 ELSE 0 END AS active", FALSE);
        $db->from('tm_jobname u');
        $db->join('tm_sect w', 'u.id_sect=w.id_sect');
        $db->join('tm_joblevel v', 'u.id_joblevel=v.id_joblevel');
        $db->order_by('u.jobname');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
	}

	public function countGridJobname(){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
            u.id_jobname AS id,
            u.jobname AS jobname,
            u.id_sect AS id_sect,
            u.id_joblevel AS id_joblevel,
            w.name_sect AS name_sect,
            v.name_joblevel AS name_joblevel,
            u.active AS active,
            CASE WHEN u.active = 'Y' THEN 1 ELSE 0 END AS active", FALSE);
        $db->from('tm_jobname u');
        $db->join('tm_sect w', 'u.id_sect=w.id_sect');
        $db->join('tm_joblevel v', 'u.id_joblevel=v.id_joblevel');
        $db->order_by('u.jobname');
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
        return $db->select('COUNT(*) AS id', FALSE)->from('tm_bio')->where('id_jobname',$id)->get()->row()->id;
    }

    public function cekData($jobname){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
    	return $db->select('COUNT(*) AS id', FALSE)->from('tm_jobname')->where('jobname',$jobname)->get()->row()->id;
    }

    public function saveJobname($uuid, $id_sect, $id_joblevel, $jobname, $active){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->set('id_jobname', $uuid);
        $db->set('id_sect', $id_sect);
        $db->set('id_joblevel', $id_joblevel);
        $db->set('jobname', $jobname);
        $db->set('active', $active);
        $db->insert('tm_jobname');
    }

    public function updateJobname($id, $id_sect, $id_joblevel, $jobname, $active){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        
        $data = array(
            'id_joblevel'   => $id_joblevel,
        	'id_sect'	    => $id_sect,
            'jobname'       => $jobname,
        	'active' 	    => $active
        );
        $db->where('id_jobname', $id);
        $db->update('tm_jobname', $data);

    }

    public function deleteJobname($id){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->where('id_jobname',$id);
        $db->delete('tm_jobname');
    }

    public function searchJobname($name){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();

        $db->select("
            u.id_jobname AS id,
            u.jobname AS jobname,
            u.id_sect AS id_sect,
            u.id_joblevel AS id_joblevel,
            w.name_sect AS name_sect,
            v.name_joblevel AS name_joblevel,
            u.active AS active,
            CASE WHEN u.active = 'Y' THEN 1 ELSE 0 END AS active", FALSE);
        $db->from('tm_jobname u');
        $db->join('tm_joblevel v', 'u.id_joblevel=v.id_joblevel');
        $db->join('tm_sect w', 'u.id_sect=w.id_sect');
        $db->like('LOWER(u.jobname)', strtolower($name));
        $db->or_like('LOWER(v.name_joblevel)', strtolower($name));
        $db->or_like('LOWER(w.name_sect)', strtolower($name));
        $query = $db->get();
        return $query;
    }
}
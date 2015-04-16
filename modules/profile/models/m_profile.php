<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class M_profile extends CI_Model{
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

	public function getGridProfile($limit, $offset){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
			u.id_bio AS id,
            u.nik AS nik,
			u.id_jobname AS id_jobname,
			v.jobname AS jobname,
            u.tempat AS tempat,
            u.tgl_lahir AS tgl_lahir,
            u.alamat AS alamat,
            u.phone AS phone,
            u.marital_status AS marital_status,
            u.agama AS agama,
            u.status_kerja AS status_kerja,
            u.photo AS photo,
			u.active AS active,
            CASE WHEN u.active = 'Y' THEN 1 ELSE 0 END AS active", FALSE);
        $db->from('tm_bio u');
        $db->join('tm_jobname v', 'u.id_jobname=v.id_jobname');
        $db->order_by('u.nama_lengkap');
        $db->limit($offset, $limit);
        $query = $db->get();
        return $query;
	}

	public function countGridProfile(){
		$this->setConnection('dbsystem');
		$db = $this->getConnection();

		$db->select("
            u.id_bio AS id,
            u.nik AS nik,
            u.id_jobname AS id_jobname,
            v.jobname AS jobname,
            u.tempat AS tempat,
            u.tgl_lahir AS tgl_lahir,
            u.alamat AS alamat,
            u.phone AS phone,
            u.marital_status AS marital_status,
            u.agama AS agama,
            u.status_kerja AS status_kerja,
            u.photo AS photo,
            u.active AS active,
            CASE WHEN u.active = 'Y' THEN 1 ELSE 0 END AS active", FALSE);
        $db->from('tm_bio u');
        $db->join('tm_jobname v', 'u.id_jobname=v.id_jobname');
        $db->order_by('u.nama_lengkap');
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
        return $db->select('COUNT(*) AS id', FALSE)->from('tm_sect')->where('id_bio',$id)->get()->row()->id;
    }

    public function cekData($nik){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
    	return $db->select('COUNT(*) AS id', FALSE)->from('tm_bio')->where('nik',$nik)->get()->row()->id;
    }

    public function saveProfile($uuid, $nama_lengkap, $nik, $id_jobname, $gender, $agama, $tempat, $tgl_lahir, $marital_status, $status_kerja, $photo, $alamat, $active){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->set('id_bio', $uuid);
        $db->set('nama_lengkap', $nama_lengkap);
        $db->set('nik', $nik);
        $db->set('gender', $gender);
        $db->set('agama', $agama);
        $db->set('tempat', $tempat);
        $db->set('tgl_lahir', $tgl_lahir);
        $db->set('marital_status', $marital_status);
        $db->set('status_kerja', $status_kerja);
        $db->set('photo', $photo);
        $db->set('alamat', $alamat);
        $db->set('active', $active);
        $db->insert('tm_bio');
    }

    public function updateProfile($id, $kode_profile, $name_profile, $active){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        
        $data = array(
        	'kode_profile' => $kode_profile,
        	'name_profile'	=> $name_profile,
        	'active' 	=> $active
        );
        $db->where('id_bio', $id);
        $db->update('tm_bio', $data);

    }

    public function deleteProfile($id){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->where('id_bio',$id);
        $db->delete('tm_bio');
    }

    public function searchProfile($name){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();

       $db->select("
            u.id_bio AS id,
            u.nik AS nik,
            u.id_jobname AS id_jobname,
            v.jobname AS jobname,
            u.tempat AS tempat,
            u.tgl_lahir AS tgl_lahir,
            u.alamat AS alamat,
            u.phone AS phone,
            u.marital_status AS marital_status,
            u.agama AS agama,
            u.status_kerja AS status_kerja,
            u.photo AS photo,
            u.active AS active,
            CASE WHEN u.active = 'Y' THEN 1 ELSE 0 END AS active", FALSE);
        $db->from('tm_bio u');
        $db->join('tm_jobname v', 'u.id_jobname=v.id_jobname');
        $db->like('LOWER(u.nik)', strtolower($name));
        $db->or_like('LOWER(u.nama_lengkap)', strtolower($name));
        $query = $db->get();
        return $query;
    }
}
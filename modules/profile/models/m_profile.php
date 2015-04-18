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
            u.nama_lengkap AS nama_lengkap,
            u.nik AS nik,
			u.id_jobname AS id_jobname,
			v.jobname AS jobname,
            u.tempat AS tempat,
            u.tgl_lahir AS tgl_lahir,
            u.gender AS gender,
            u.alamat AS alamat,
            u.phone AS phone,
            u.marital_status AS marital_status,
            u.agama AS agama,
            u.status_kerja AS status_kerja,
            u.userfile AS userfile,
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
            u.nama_lengkap AS nama_lengkap,
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
            u.userfile AS userfile,
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

    public function getID($id){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('*', FALSE)->from('tm_bio')->where('id_bio',$id)->get()->row();
    }

    public function cekData($nik){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
    	return $db->select('COUNT(*) AS id', FALSE)->from('tm_bio')->where('nik',$nik)->get()->row()->id;
    }

     public function cekUserID($nik, $id){ 
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        return $db->select('COUNT(*) AS id', FALSE)->from('tm_bio')->where('nik',$nik)->where('id_bio !=',$id)->get()->row()->id;
    } 

    public function saveProfile($uuid, $nama_lengkap, $nik, $phone, $id_jobname, $gender, $agama, $tempat, $tgl_lahir, $marital_status, $status_kerja, $userfile, $alamat, $active){
    	$this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $db->set('id_bio', $uuid);
        $db->set('nama_lengkap', $nama_lengkap);
        $db->set('nik', $nik);
        $db->set('phone', $phone);
        $db->set('id_jobname', $id_jobname);
        $db->set('gender', $gender);
        $db->set('agama', $agama);
        $db->set('tempat', $tempat);
        $db->set('tgl_lahir', $tgl_lahir);
        $db->set('marital_status', $marital_status);
        $db->set('status_kerja', $status_kerja);
        $db->set('userfile', $userfile);
        $db->set('alamat', $alamat);
        $db->set('active', $active);
        $db->insert('tm_bio');
    }

    public function updateProfileWP($id, $nama_lengkap, $nik, $id_jobname, $gender, $agama, $tempat, $tgl_lahir, $marital_status, $status_kerja, $alamat, $active){
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $data = array(
                       'nama_lengkap'       => $nama_lengkap,
                       'nik'                => $nik,
                       'id_jobname'         => $id_jobname,
                       'gender'             => $gender,
                       'agama'              => $agama,
                       'tempat'             => $tgl_lahir,
                       'marital_status'     => $marital_status,
                       'status_kerja'       => $status_kerja,
                       'alamat'             => $alamat,                       
                       'active'             => $active
                    );
        $db->where('id_bio',$id);
        $db->update('tm_bio', $data);              
    }

    public function updateProfile($id, $nama_lengkap, $nik, $id_jobname, $gender, $agama, $tempat, $tgl_lahir, $marital_status, $status_kerja, $alamat, $userfile, $active){
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();
        $data = array(
                       'nama_lengkap'       => $nama_lengkap,
                       'nik'                => $nik,
                       'id_jobname'         => $id_jobname,
                       'gender'             => $gender,
                       'agama'              => $agama,
                       'tempat'             => $tgl_lahir,
                       'marital_status'     => $marital_status,
                       'status_kerja'       => $status_kerja,
                       'alamat'             => $alamat,
                       'userfile'           => $userfile,                       
                       'active'             => $active
                    );
        $db->where('id_bio',$id);
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
            u.nama_lengkap AS nama_lengkap,
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
            u.userfile AS userfile,
            u.active AS active,
            CASE WHEN u.active = 'Y' THEN 1 ELSE 0 END AS active", FALSE);
        $db->from('tm_bio u');
        $db->join('tm_jobname v', 'u.id_jobname=v.id_jobname');
        $db->like('LOWER(u.nik)', strtolower($name));
        $db->or_like('LOWER(u.nama_lengkap)', strtolower($name));
        $query = $db->get();
        return $query;
    }

    public function savePendidikan($uuid, $school_name, $jurusan, $jenjang, $no_ijazah, $tahun){
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

        $db->set('id_biopendidikan', $uuid);
        $db->set('school_name', $school_name);
        $db->set('jurusan', $jurusan);
        $db->set('level', $jenjang);
        $db->set('no_ijazah', $no_ijazah);
        $db->set('tahun', $tahun);
        $db->insert('tm_biopendidikan');
    }

    public function updatePendidikan($id, $school_name, $jurusan, $jenjang, $no_ijazah, $tahun){
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

        $data = array(
            'school_name'   => $school_name,
            'jurusan'       => $jurusan,
            'level'         => $jenjang,
            'no_ijazah'     => $no_ijazah,
            'tahun'         => $tahun
        );

        $db->where('id_biopendidikan', $id);
        $db->update('tm_biopendidikan', $data);
    }   
    public function saveKeahlian($uuid, $nama_keahlian, $keterangan, $describtion){
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

        $db->set('id_keahlian', $uuid);
        $db->set('nama_keahlian', $nama_keahlian);
        $db->set('describtion', $describtion);
        $db->insert('tm_keahlian');
    }

    public function updateKeahlian($id, $nama_keahlian, $keterangan, $describtion){
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

        $data = array(
            'nama_keahlian' => $nama_keahlian,
            'describtion'   => $describtion
        );

        $db->where('id_keahlian', $id);
        $db->update('tm_keahlian', $data);
    }  
    public function savePengalaman($uuid, $nama_perusahaan, $jenis_usaha, $masa_kerja, $alamat){
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

        $db->set('id_pengalaman', $uuid);
        $db->set('nama_perusahaan', $nama_perusahaan);
        $db->set('jenis_usaha', $jenis_usaha);
        $db->insert('tm_pengalaman');
    }

    public function updatePengalaman($id, $nama_perusahaan, $jenis_usaha, $masa_kerja, $alamat){
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

        $data = array(
            'nama_perusahaan' => $nama_perusahaan,
            'jenis_usaha'     => $jenis_usaha,
            'masa_kerja'      => $masa_kerja,
            'alamat'          => $alamat
        );

        $db->where('id_pengalaman', $id);
        $db->update('tm_pengalaman', $data);
    }   
    public function savePelatihan($uuid, $materi_pelatihan, $no_sertifikat, $penyelenggara, $waktu){
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

        $db->set('id_pelatihan', $uuid);
        $db->set('materi_pelatihan', $materi_pelatihan);
        $db->set('no_sertifikat', $no_sertifikat);
        $db->set('penyelenggara', $penyelenggara);
        $db->set('waktu', $waktu);
        $db->insert('tm_pelatihan');
    }

    public function updatePelatihan($id, $materi_pelatihan, $no_sertifikat, $penyelenggara, $waktu){
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

        $data = array(
            'materi_pelatihan' => $materi_pelatihan,
            'no_sertifikat'    => $no_sertifikat,
            'penyelenggara'    => $penyelenggara,
            'waktu'            => $waktu
        );

        $db->where('id_pelatihan', $id);
        $db->update('tm_pelatihan', $data);
    }  
      public function saveCatatan($uuid, $tanggal, $keterangan, $describtion){
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

        $db->set('id_catatan', $uuid);
        $db->set('tanggal', $tanggal);
        $db->set('keterangan', $keterangan);
        $db->set('describtion', $describtion);
    }

    public function updatePelatihan($id, $tanggal, $keterangan, $describtion){
        $this->setConnection('dbsystem');
        $db   = $this->getConnection();

        $data = array(
            'tanggal'       => $tanggal,
            'keterangan'    => $keterangan,
            'describtion'   => $describtion
        );

        $db->where('id_catatan', $id);
        $db->update('tm_catatan', $data);
    }   
}
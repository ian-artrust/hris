<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class C_profile extends IAN_Controller{

	var $image_path;
	var $image_url;

	public function __construct(){
		parent::__construct();
		$this->load->model('profile/m_profile');
		$this->image_path   = 'images';
        $this->image_url    = base_url().'images/';
	}

	public function getProfile(){
        $start      = ($this->input->post('start', TRUE) ? $this->input->post('start', TRUE) : 0);
        $limit      = ($this->input->post('limit', TRUE) ? $this->input->post('limit', TRUE) : 20);
		
		$result 		= $this->m_profile->getGridProfile($start, $limit);
		$resultCount 	= $this->m_profile->countGridProfile();
		$count 			= $resultCount->num_rows();

		foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 				=> $value->id,
				'nama_lengkap'		=> $value->nama_lengkap,
				'nik'				=> $value->nik,
				'id_jobname' 		=> $value->id_jobname,
				'jobname'			=> $value->jobname,
				'tempat' 			=> $value->tempat,
				'tgl_lahir' 		=> $value->tgl_lahir,
				'gender' 			=> $value->gender,
				'alamat' 			=> $value->alamat,
				'phone' 			=> $value->phone,
				'marital_status' 	=> $value->marital_status,
				'agama' 			=> $value->agama,
				'status_kerja' 		=> $value->status_kerja,
				'active' 			=> $value->active,
				'userfile' 			=> base_url().'images/'.$value->userfile
			);
		}

		$data['total'] 		= $count;
		$data['success']	= true;
		echo json_encode($data);
	}

	public function delProfile(){
		$data = json_decode($this->input->post('post'));
		foreach ($data as $row) {
			$picfile = $this->m_profile->getID($row->id)->userfile;
			$path = FCPATH.'images'.DIRECTORY_SEPARATOR.$picfile;
			$this->m_profile->deleteProfile($row->id);
			unlink($path);
		}
		echo json_encode($data);
	}

	public function saveBio(){
		$config = array(
	      'allowed_types' => 'jpg|png|gif',
	      'upload_path'   => $this->image_path,
	      'max_size'      => '200',
	      'max_width'     => '1024',
	      'max_height'    => '768'
	    );
    
	    $this->load->library('upload', $config);
	    $this->upload->initialize($config);
	    $up = $this->upload->do_upload();
	    $userfile      = $this->input->post('photo');
	    if (!$up) {
	      $error    = array('error' => $this->upload->display_errors());
	      $msg 		= "Ukuran Gambar Maskimal 200Kb";
	    } else {
	        $upload_data    = $this->upload->data();
	        $userfile       = $upload_data['file_name'];
	        $data_ary = array(
	          'images'      => $upload_data['file_name'],
	          'post_date'   =>  date('d-m-Y H:i:s'),  
	        );
	    }

		$uuid         = $this->m_profile->getUUID();
		$nama_lengkap    = ($this->input->post('nama_lengkap', TRUE) ? $this->input->post('nama_lengkap', TRUE) : '');
		$nik		     = ($this->input->post('nik', TRUE) ? $this->input->post('nik', TRUE) : '');
		$phone		     = ($this->input->post('phone', TRUE) ? $this->input->post('phone', TRUE) : '');
		$id_jobname      = ($this->input->post('id_jobname', TRUE) ? $this->input->post('id_jobname', TRUE) : '');
		$gender   		 = ($this->input->post('gender', TRUE) ? $this->input->post('gender', TRUE) : '');
		$agama   		 = ($this->input->post('agama', TRUE) ? $this->input->post('agama', TRUE) : '');
		$tempat   		 = ($this->input->post('tempat', TRUE) ? $this->input->post('tempat', TRUE) : '');
		$tgl_lahir 	     = ($this->input->post('tgl_lahir', TRUE) ? $this->input->post('tgl_lahir', TRUE) : '');
		$marital_status  = ($this->input->post('marital_status', TRUE) ? $this->input->post('marital_status', TRUE) : '');
		$status_kerja    = ($this->input->post('status_kerja', TRUE) ? $this->input->post('status_kerja', TRUE) : '');
		$alamat   		 = ($this->input->post('alamat', TRUE) ? $this->input->post('alamat', TRUE) : '');
		$active 		 = ($this->input->post('active', TRUE) ? $this->input->post('active', TRUE) : '');
    	if($active == TRUE) { 
    		$active = 'Y'; 
    	} else { 
    		$active = 'N'; 
    	}

    	if(empty($nik)){
    		$success 	= 3;
    		$msg 		= "Data Tidak Boleh Kosong";
    	} elseif($this->m_profile->cekData($nik) == 0){
    		$this->m_profile->saveProfile($uuid, $nama_lengkap, $nik, $phone, $id_jobname, $gender, $agama, $tempat, $tgl_lahir, $marital_status, $status_kerja, $userfile, $alamat, $active);
    		$success 	= 1;
    		$msg 		= "Data Berhasil Disimpan";
    	} else {
    		$success 	= 2;
    		$msg 		= "Error Please Contact Your Vendor";
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	$data['msg']		= $msg;
    	echo json_encode($data);    	
	}

	public function editProfile(){
		$config = array(
	      'allowed_types' => 'jpg|png|gif',
	      'upload_path'   => $this->image_path,
	      'max_size'      => '200',
	      'max_width'     => '1024',
	      'max_height'    => '768'
		 );
		    
		  $this->load->library('upload', $config);
		  $this->upload->initialize($config);
		  $userfile     ='noimage.jpg';
		  if (!($this->upload->do_upload())) {
		    $error = array('error' => $this->upload->display_errors());
		    $msg = "Periksa Kembali Ukuran Gambar";
		  } else {
		      $upload_data = $this->upload->data();
		      $userfile     = $upload_data['file_name'];
		      $data_ary = array(
		        'images'      => $upload_data['file_name'],
		        'post_date'   =>  date('d-m-Y H:i:s'),  
		      );
		  }

		$id 			 = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$nama_lengkap    = ($this->input->post('nama_lengkap', TRUE) ? $this->input->post('nama_lengkap', TRUE) : '');
		$nik		     = ($this->input->post('nik', TRUE) ? $this->input->post('nik', TRUE) : '');
		$id_jobname      = ($this->input->post('id_jobname', TRUE) ? $this->input->post('id_jobname', TRUE) : '');
		$gender   		 = ($this->input->post('gender', TRUE) ? $this->input->post('gender', TRUE) : '');
		$agama   		 = ($this->input->post('agama', TRUE) ? $this->input->post('agama', TRUE) : '');
		$tempat   		 = ($this->input->post('tempat', TRUE) ? $this->input->post('tempat', TRUE) : '');
		$tgl_lahir 	     = ($this->input->post('tgl_lahir', TRUE) ? $this->input->post('tgl_lahir', TRUE) : '');
		$marital_status  = ($this->input->post('marital_status', TRUE) ? $this->input->post('marital_status', TRUE) : '');
		$status_kerja    = ($this->input->post('status_kerja', TRUE) ? $this->input->post('status_kerja', TRUE) : '');
		$alamat   		 = ($this->input->post('alamat', TRUE) ? $this->input->post('alamat', TRUE) : '');
		$active 	= ($this->input->post('active', TRUE) ? $this->input->post('active', TRUE) : '');
		if($active == TRUE) { 
    		$active = 'Y'; 
    	} else { 
    		$active = 'N'; 
    	}

    	if($userfile=="noimage.jpg"){
	      $this->m_profile->updateProfileWP($id, $nama_lengkap, $nik, $id_jobname, $gender, $agama, $tempat, $tgl_lahir, $marital_status, $status_kerja, $alamat, $active);
	      $success = "Data Berhasil Dirubah"; 
	    } else {
	      if(empty($nik)){ 
	        $success = "Pengisian Data Salah"; 
	      } else if($this->m_profile->cekUserID($nik, $id) == 0){ 
	        $data       = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
	        $picfile    = $this->m_profile->getID($data)->userfile;
	        $path       = FCPATH.'images'.DIRECTORY_SEPARATOR.$picfile;
	        unlink($path);
	        $this->m_profile->updateProfile($id, $nama_lengkap, $nik, $id_jobname, $gender, $agama, $tempat, $tgl_lahir, $marital_status, $status_kerja, $alamat, $userfile, $active);
	        $success = "Data Berhasil Dirubah"; 
	      } else { 
	        $success = "Pengisian Data Salah";  
	      }
	    }
	    $data = array('total'=>$success, 'success'=>TRUE);
	    echo json_encode($data); 

	}

	public function searchProfile(){
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    	$result 	= $this->m_profile->searchProfile($name);
    	foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 				=> $value->id,
				'nama_lengkap'		=> $value->nama_lengkap,
				'nik'				=> $value->nik,
				'id_jobname' 		=> $value->id_jobname,
				'jobname'			=> $value->jobname,
				'tempat' 			=> $value->tempat,
				'tgl_lahir' 		=> $value->tgl_lahir,
				'gender' 			=> $value->gender,
				'alamat' 			=> $value->alamat,
				'phone' 			=> $value->phone,
				'marital_status' 	=> $value->marital_status,
				'agama' 			=> $value->agama,
				'status_kerja' 		=> $value->status_kerja,
				'active' 			=> $value->active,
				'photo' 			=> $value->photo
			);
		}
		$data['success']	= true;
		echo json_encode($data);
	}

	public function savePendidikan(){
		$uuid         	 = $this->m_profile->getUUID();
		$school_name     = ($this->input->post('school_name', TRUE) ? $this->input->post('school_name', TRUE) : '');
		$jurusan	     = ($this->input->post('jurusan', TRUE) ? $this->input->post('jurusan', TRUE) : '');
		$jenjang         = ($this->input->post('jenjang', TRUE) ? $this->input->post('jenjang', TRUE) : '');
		$no_ijazah       = ($this->input->post('no_ijazah', TRUE) ? $this->input->post('no_ijazah', TRUE) : '');
		$tahun   		 = ($this->input->post('tahun', TRUE) ? $this->input->post('tahun', TRUE) : '');

		if(empty($school_name)){
    		$success = 3;
    	} elseif($this->m_profile->cekData($school_name) == 0){
    		$this->m_profile->savePendidikan($uuid, $school_name, $jurusan, $jenjang, $no_ijazah, $tahun);
    		$success = 1;
    	} else {
    		$success = 2;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);    	
	}

	public function editPendidikan(){
		$id 			= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$school_name     = ($this->input->post('school_name', TRUE) ? $this->input->post('school_name', TRUE) : '');
		$jurusan	     = ($this->input->post('jurusan', TRUE) ? $this->input->post('jurusan', TRUE) : '');
		$jenjang         = ($this->input->post('jenjang', TRUE) ? $this->input->post('jenjang', TRUE) : '');
		$no_ijazah       = ($this->input->post('no_ijazah', TRUE) ? $this->input->post('no_ijazah', TRUE) : '');
		$tahun   		 = ($this->input->post('tahun', TRUE) ? $this->input->post('tahun', TRUE) : '');
    	if(empty($school_name)){
    		$success = 2;
    	} else {
    		$this->m_profile->updatePendidikan($id, $school_name, $jurusan, $jenjang, $no_ijazah, $tahun);
    		$success = 1;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);   

	}

	public function saveKeahlian(){
		$uuid         	 = $this->m_profile->getUUID();
		$nama_keahlian   = ($this->input->post('nama_keahlian', TRUE) ? $this->input->post('nama_keahlian', TRUE) : '');
		$keterangan	     = ($this->input->post('jurusan', TRUE) ? $this->input->post('keterangan', TRUE) : '');
		$describtion     = ($this->input->post('describtion', TRUE) ? $this->input->post('describtion', TRUE) : '');

		if(empty($jobname)){
    		$success = 3;
    	} elseif($this->m_profile->cekData($nama_keahlian) == 0){
    		$this->m_jobname->saveKeahlian($uuid, $nama_keahlian, $keterangan, $describtion);
    		$success = 1;
    	} else {
    		$success = 2;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);    	
	}

	public function editKeahlian(){
		$id 			= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$nama_keahlian   = ($this->input->post('nama_keahlian', TRUE) ? $this->input->post('nama_keahlian', TRUE) : '');
		$keterangan	     = ($this->input->post('jurusan', TRUE) ? $this->input->post('keterangan', TRUE) : '');
		$describtion     = ($this->input->post('describtion', TRUE) ? $this->input->post('describtion', TRUE) : '');

    	if(empty($nama_keahlian)){
    		$success = 2;
    	} else {
    		$this->m_profile->updateKeahlan($id, $nama_keahlian, $keterangan, $describtion);
    		$success = 1;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);   

	}
	public function savePengalaman(){
		$uuid         	 = $this->m_profile->getUUID();
		$nama_perusahaan = ($this->input->post('nama_perusahaan', TRUE) ? $this->input->post('nama_perusahaan', TRUE) : '');
		$jenis_usaha	 = ($this->input->post('jenis_usaha', TRUE) ? $this->input->post('jenis_usaha', TRUE) : '');
		$masa_kerja      = ($this->input->post('masa_kerja', TRUE) ? $this->input->post('masa_kerja', TRUE) : '');
		$alamat          = ($this->input->post('alamat', TRUE) ? $this->input->post('alamat', TRUE) : '');

		if(empty($nama_perusahaan)){
    		$success = 3;
    	} elseif($this->m_profile->cekData($Pengalaman) == 0){
    		$this->m_profile->savePengalaman($uuid, $nama_perusahaan, $jenis_usaha, $masa_kerja, $alamat);
    		$success = 1;
    	} else {
    		$success = 2;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);    	
	}

	public function editPengalaman(){
		$id 			= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$nama_perusahaan = ($this->input->post('nama_perusahaan', TRUE) ? $this->input->post('nama_perusahaan', TRUE) : '');
		$jenis_usaha	 = ($this->input->post('jenis_usaha', TRUE) ? $this->input->post('jenis_usaha', TRUE) : '');
		$masa_kerja      = ($this->input->post('masa_kerja', TRUE) ? $this->input->post('masa_kerja', TRUE) : '');
		$alamat          = ($this->input->post('alamat', TRUE) ? $this->input->post('alamat', TRUE) : '');

    	if(empty($nama_perusahaan)){
    		$success = 2;
    	} else {
    		$this->m_profile->updatePengalaman($id, $nama_perusahaan, $jenis_usaha, $masa_kerja, $alamat);
    		$success = 1;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);   

	}
		public function savePelatihan(){
		$uuid         	 	= $this->m_profile->getUUID();
		$materi_pelatihan   = ($this->input->post('materi_pelatihan', TRUE) ? $this->input->post('materi_pelatihan', TRUE) : '');
		$no_sertifikat		= ($this->input->post('no_sertifikat', TRUE) ? $this->input->post('no_sertifikat', TRUE) : '');
		$penyelenggara      = ($this->input->post('penyelenggara', TRUE) ? $this->input->post('penyelenggara', TRUE) : '');
		$tempat 			= ($this->input->post('tempat', TRUE) ? $this->input->post('tempat', TRUE) : '');
		$waktu				= ($this->input->post('waktu', TRUE) ? $this->input->post('waktu', TRUE) : '');

		if(empty($materi_pelatihan)){
    		$success = 3;
    	} elseif($this->m_profile->cekData($Pelatihan) == 0){
    		$this->m_profile->savePelatihan($uuid, $materi_pelatihan, $no_sertifikat, $penyelenggara, $waktu);
    		$success = 1;
    	} else {
    		$success = 2;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);    	
	}

	public function editPelatihan(){
		$id 			= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$materi_pelatihan   = ($this->input->post('materi_pelatihan', TRUE) ? $this->input->post('materi_pelatihan', TRUE) : '');
		$no_sertifikat		= ($this->input->post('no_sertifikat', TRUE) ? $this->input->post('no_sertifikat', TRUE) : '');
		$penyelenggara      = ($this->input->post('penyelenggara', TRUE) ? $this->input->post('penyelenggara', TRUE) : '');
		$tempat 			= ($this->input->post('tempat', TRUE) ? $this->input->post('tempat', TRUE) : '');
		$waktu				= ($this->input->post('waktu', TRUE) ? $this->input->post('waktu', TRUE) : '');

    	if(empty($materi_pelatihan)){
    		$success = 2;
    	} else {
    		$this->m_jobname->updateJobname($id, $materi_pelatihan, $no_sertifikat, $penyelenggara, $waktu);
    		$success = 1;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);   

	}
	public function saveCatatan(){
		$uuid         	 	= $this->m_profile->getUUID();
		$tanggal   			= ($this->input->post('tanggal', TRUE) ? $this->input->post('tanggal', TRUE) : '');
		$keterangan			= ($this->input->post('keterangan', TRUE) ? $this->input->post('keterangan', TRUE) : '');
		$describtion    	= ($this->input->post('describtion', TRUE) ? $this->input->post('describtion', TRUE) : '');

		if(empty($tanggal)){
    		$success = 3;
    	} elseif($this->m_profile->cekData($Catatan) == 0){
    		$this->m_profile->saveCatatan($uuid, $tanggal, $keterangan, $describtion);
    		$success = 1;
    	} else {
    		$success = 2;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);    	
	}

	public function editCatatan(){
		$id 			= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$tanggal   		= ($this->input->post('tanggal', TRUE) ? $this->input->post('tanggal', TRUE) : '');
		$keterangan		= ($this->input->post('keterangan', TRUE) ? $this->input->post('keterangan', TRUE) : '');
		$describtion    = ($this->input->post('describtion', TRUE) ? $this->input->post('describtion', TRUE) : '');

    	if(empty($tanggal)){
    		$success = 2;
    	} else {
    		$this->m_profile->updateCatatan($id, $tanggal, $keterangan, $describtion);
    		$success = 1;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);   

	}

}
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
				'nik'				=> $value->nik,
				'id_jobname' 		=> $value->id_jobname,
				'jobname'			=> $value->jobname,
				'tempat' 			=> $value->tempat,
				'tgl_lahir' 		=> $value->tgl_lahir,
				'alamat' 			=> $value->alamat,
				'phone' 			=> $value->phone,
				'marital_status' 	=> $value->marital_status,
				'agama' 			=> $value->agama,
				'status_kerja' 		=> $value->status_kerja,
				'active' 			=> $value->active,
				'photo' 			=> $value->photo
			);
		}

		$data['total'] 		= $count;
		$data['success']	= true;
		echo json_encode($data);
	}

	public function delProfile(){
		$data = json_decode($this->input->post('post'));
		foreach ($data as $row) {
			$cekResult = $this->m_profile->cekRelasi($row->id);

			if($cekResult == 0){
				$this->m_profile->deleteProfile($row->id);
				$data['msg']=0;
			} else {
				$data['msg']=1;
			}
		}
		echo json_encode($data);
	}

	public function saveProfile(){
		$config = array(
	      'allowed_types' => 'jpg|png|gif',
	      'upload_path'   => $this->image_path,
	      'max_size'      => '200',
	      'max_width'     => '1024',
	      'max_height'    => '768'
	    );
    
	    $this->load->library('upload', $config);
	    $this->upload->initialize($config);
	    $userfile      = $this->input->post('photo');
	    if (!($this->upload->do_upload())) {
	      $error    = array('error' => $this->upload->display_errors());
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
		$id_jobname      = ($this->input->post('id_jobname', TRUE) ? $this->input->post('id_jobname', TRUE) : '');
		$gender   		 = ($this->input->post('gender', TRUE) ? $this->input->post('gender', TRUE) : '');
		$agama   		 = ($this->input->post('agama', TRUE) ? $this->input->post('agama', TRUE) : '');
		$tempat   		 = ($this->input->post('tempat', TRUE) ? $this->input->post('tempat', TRUE) : '');
		$tgl_lahir 	     = ($this->input->post('tgl_lahir', TRUE) ? $this->input->post('tgl_lahir', TRUE) : '');
		$marital_status  = ($this->input->post('marital_status', TRUE) ? $this->input->post('marital_status', TRUE) : '');
		$status_kerja    = ($this->input->post('status_kerja', TRUE) ? $this->input->post('status_kerja', TRUE) : '');
		$photo    		 = ($this->input->post('photo', TRUE) ? $this->input->post('photo', TRUE) : '');
		$alamat   		 = ($this->input->post('alamat', TRUE) ? $this->input->post('alamat', TRUE) : '');
		$active 		 = ($this->input->post('active', TRUE) ? $this->input->post('active', TRUE) : '');
    	if($active == TRUE) { 
    		$active = 'Y'; 
    	} else { 
    		$active = 'N'; 
    	}

    	if(empty($nik)){
    		$success = 3;
    	} elseif($this->m_profile->cekData($nik) == 0){
    		$this->m_profile->saveProfile($uuid, $nama_lengkap, $nik, $id_jobname, $gender, $agama, $tempat, $tgl_lahir, $marital_status, $status_kerja, $photo, $alamat, $active);
    		$success = 1;
    	} else {
    		$success = 2;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
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
		    $success = "Periksa Kembali Ukuran Gambar";
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
		$photo    		 = ($this->input->post('photo', TRUE) ? $this->input->post('photo', TRUE) : '');
		$alamat   		 = ($this->input->post('alamat', TRUE) ? $this->input->post('alamat', TRUE) : '');
		$active 	= ($this->input->post('active', TRUE) ? $this->input->post('active', TRUE) : '');
		if($active == TRUE) { 
    		$active = 'Y'; 
    	} else { 
    		$active = 'N'; 
    	}

    	if($userfile=="noimage.jpg"){
	      $this->m_anggota->updateAnggotaWP($id, $nama_lengkap, $nik, $id_jobname, $gender, $agama, $tempat, $tgl_lahir, $marital_status, $status_kerja, $alamat, $active);
	      $success = "Data Berhasil Dirubah"; 
	    } else {
	      if($first_name == '' && $first_name == NULL){ 
	        $success = "Pengisian Data Salah"; 
	      } else if($this->m_anggota->cekUserID($first_name, $id) == 0){ 
	        $data       = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
	        $picfile    = $this->m_anggota->getID($data)->photo;
	        $path       = FCPATH.'images'.DIRECTORY_SEPARATOR.$picfile;
	        unlink($path);
	        $this->m_anggota->updateAnggota($id, $nama_lengkap, $nik, $id_jobname, $gender, $agama, $tempat, $tgl_lahir, $marital_status, $status_kerja, $photo, $alamat, $active);
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
				'nik'				=> $value->nik,
				'id_jobname' 		=> $value->id_jobname,
				'jobname'			=> $value->jobname,
				'tempat' 			=> $value->tempat,
				'tgl_lahir' 			=> $value->tglahir,
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
}
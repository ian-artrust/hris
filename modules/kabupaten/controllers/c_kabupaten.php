<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class C_kabupaten extends IAN_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->model('kabupaten/m_kabupaten');
	}

	public function getKabupaten(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
		
		$result 		= $this->m_kabupaten->getGridKabupaten($start, $limit);
		$resultCount 	= $this->m_kabupaten->countGridKabupaten();
		$count 			= $resultCount->num_rows();

		foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 			=> $value->id,
				'id_prov'		=> $value->id_prov,
				'name_prov' 	=> $value->name_prov,
				'name_kab'		=> $value->name_kab
			);
		}

		$data['total'] 		= $count;
		$data['success']	= true;
		echo json_encode($data);
	}

	public function delKabupaten(){
		$data = json_decode($this->input->post('post'));
		foreach ($data as $row) {
			// $cekResult = $this->m_kabupaten->cekRelasi($row->id);

			// if($cekResult == 0){
				$this->m_kabupaten->deleteKabupaten($row->id);
				$data['msg']=0;
			// } else {
			// 	$data['msg']=1;
			// }
		}
		echo json_encode($data);
	}

	public function saveKabupaten(){
		$uuid        = $this->m_kabupaten->getUUID();
		$id_prov     = ($this->input->post('id_prov', TRUE) ? $this->input->post('id_prov', TRUE) : '');
		$name_kab    = ($this->input->post('name_kab', TRUE) ? $this->input->post('name_kab', TRUE) : '');

    	if(empty($name_kab)){
    		$success = 3;
    	} elseif($this->m_kabupaten->cekData($name_kab) == 0){
    		$this->m_kabupaten->saveKabupaten($uuid, $id_prov, $name_kab);
    		$success = 1;
    	} else {
    		$success = 2;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);    	
	}

	public function editKabupaten(){
		$id 		 = ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$id_prov     = ($this->input->post('id_prov', TRUE) ? $this->input->post('id_prov', TRUE) : '');
		$name_kab    = ($this->input->post('name_kab', TRUE) ? $this->input->post('name_kab', TRUE) : '');
		
    	if(empty($name_kab)){
    		$success = 2;
    	} else {
    		$this->m_kabupaten->updateKabupaten($id, $id_prov, $name_kab);
    		$success = 1;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);

	}

	public function searchKabupaten(){
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    	$result 	= $this->m_kabupaten->searchKabupaten($name);
    	foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 			=> $value->id,
				'id_prov'		=> $value->id_prov,
				'name_kab'		=> $value->name_kab
			);
		}
		$data['success']	= true;
		echo json_encode($data);
	}
}
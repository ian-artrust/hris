<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class C_harikerja extends IAN_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->model('harikerja/m_harikerja');
	}

	public function getHarikerja(){
        $start      = ($this->input->post('start', TRUE) ? $this->input->post('start', TRUE) : 0);
        $limit      = ($this->input->post('limit', TRUE) ? $this->input->post('limit', TRUE) : 20);
		
		$result 		= $this->m_harikerja->getGridHarikerja($start, $limit);
		$resultCount 	= $this->m_harikerja->countGridHarikerja();
		$count 			= $resultCount->num_rows();

		foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 				=> $value->id,
				'name_harikerja'	=> $value->name_harikerja,
			);
		}

		$data['total'] 		= $count;
		$data['success']	= true;
		echo json_encode($data);
	}

	public function delHarikerja(){
		$data = json_decode($this->input->post('post'));
		foreach ($data as $row) {
			// $cekResult = $this->m_harikerja->cekRelasi($row->id);

			// if($cekResult == 1){
				$this->m_harikerja->deleteHarikerja($row->id);
				$data['msg']=0;
			// } else {
			// 	$data['msg']=1;
			// }
		}
		echo json_encode($data);
	}

	public function saveHarikerja(){
		$uuid         		= $this->m_harikerja->getUUID();
		$name_harikerja  	= ($this->input->post('name_harikerja', TRUE) ? $this->input->post('name_harikerja', TRUE) : '');
    	

    	if(empty($name_harikerja)){
    		$success = 3;
    	} elseif($this->m_harikerja->cekData($name_harikerja) == 0){
    		$this->m_harikerja->saveHarikerja($uuid, $name_harikerja);
    		$success = 1;
    	} else {
    		$success = 2;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);    	
	}

	public function editHarikerja(){
		$id					= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name_harikerja    	= ($this->input->post('name_harikerja', TRUE) ? $this->input->post('name_harikerja', TRUE) : '');
		
    	if(empty($name_harikerja)){
    		$success = 2;
    	} else {
    		$this->m_harikerja->updateHarikerja($id, $name_harikerja);
    		$success = 1;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);

	}

	public function searchHarikerja(){
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    	$result 	= $this->m_harikerja->searchHarikerja($name);
    	foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 				=> $value->id,
				'name_harikerja'	=> $value->name_harikerja,
			);
		}
		$data['success']	= true;
		echo json_encode($data);
	}
}
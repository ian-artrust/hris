<?php (defined('BASEPATH')) OR exit('No direct script access allowed');
/*
|---------------------------------
| Ardian Webi Kirda 
| Copyright Ardian Webi Kira 
| Created By ian  18-01-2015
| Supported by Vikosha Perdana
|---------------------------------
*/
class C_jamkerja extends IAN_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->model('jamkerja/m_jamkerja');
	}

	public function getJamkerja(){
        $start      = ($this->input->get('start', TRUE) ? $this->input->get('start', TRUE) : 0);
        $limit      = ($this->input->get('limit', TRUE) ? $this->input->get('limit', TRUE) : 20);
		
		$result 		= $this->m_jamkerja->getGridJamkerja($start, $limit);
		$resultCount 	= $this->m_jamkerja->countGridJamkerja();
		$count 			= $resultCount->num_rows();

		foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 				=> $value->id,
				'name_jamkerja'		=> $value->name_jamkerja,
			);
		}

		$data['total'] 		= $count;
		$data['success']	= true;
		echo json_encode($data);
	}

	public function delJamkerja(){
		$data = json_decode($this->input->post('post'));
		foreach ($data as $row) {
			// $cekResult = $this->m_jamkerja->cekRelasi($row->id);

			// if($cekResult == 0){
				$this->m_jamkerja->deleteJamkerja($row->id);
				$data['msg']=0;
			// } else {
			// 	$data['msg']=1;
			// }
		}
		echo json_encode($data);
	}

	public function saveJamkerja(){
		$uuid         	= $this->m_jamkerja->getUUID();
		$name_jamkerja  = ($this->input->post('name_jamkerja', TRUE) ? $this->input->post('name_jamkerja', TRUE) : '');
    	

    	if(empty($name_jamkerja)){
    		$success = 3;
    	} elseif($this->m_jamkerja->cekData($name_jamkerja) == 0){
    		$this->m_jamkerja->saveJamkerja($uuid, $name_jamkerja);
    		$success = 1;
    	} else {
    		$success = 2;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);    	
	}

	public function editJamkerja(){
		$id 				= ($this->input->post('id', TRUE) ? $this->input->post('id', TRUE) : '');
		$name_jamkerja    	= ($this->input->post('name_jamkerja', TRUE) ? $this->input->post('name_jamkerja', TRUE) : '');
		
    	if(empty($name_jamkerja)){
    		$success = 2;
    	} else {
    		$this->m_jamkerja->updateJamkerja($id, $name_jamkerja);
    		$success = 1;
    	}

    	$data['total'] 		= $success;
    	$data['success'] 	= TRUE;
    	echo json_encode($data);

	}

	public function searchJamkerja(){
		$name 		= ($this->input->post('name', TRUE) ? $this->input->post('name', TRUE) : '');
    	$result 	= $this->m_jamkerja->searchJamkerja($name);
    	foreach ($result->result() as $key => $value) {
			$data['data'][]=array(
				'id' 				=> $value->id,
				'name_jamkerja'		=> $value->name_jamkerja,
			);
		}
		$data['success']	= true;
		echo json_encode($data);
	}
}